import type {
  ApplicationLetter as PrismaApplicationLetter,
  Prisma,
} from "../../generated/prisma/client";
import path from "path";
import fs from "fs/promises";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import type {
  ApplicationLetter as ApplicationLetterResponse,
  Pagination,
} from "../types/api-schemas";
import { prisma } from "../config/prisma.config";
import { validate } from "../utils/validate.util";
import {
  ApplicationLetterValidation,
  type ApplicationLetterListQuery,
  type ApplicationLetterPayloadInput,
} from "../validations/application-letter.validation";
import { ResponseError } from "../utils/response-error.util";

type ApplicationLetterListResult = {
  items: ApplicationLetterResponse[];
  pagination: Pagination;
};

type ApplicationLetterMutableFields = Omit<
  Prisma.ApplicationLetterUncheckedCreateInput,
  "id" | "userId" | "createdAt" | "updatedAt"
>;

type GeneratedDocument = {
  buffer: Buffer;
  mimeType: string;
  fileName: string;
};

const sortFieldMap = {
  created_at: "createdAt",
  updated_at: "updatedAt",
  application_date: "applicationDate",
  company_name: "companyName",
  subject: "subject",
} as const satisfies Record<
  string,
  keyof Prisma.ApplicationLetterOrderByWithRelationInput
>;

export class ApplicationLetterService {
  static async list(
    userId: string,
    query: unknown
  ): Promise<ApplicationLetterListResult> {
    const filters: ApplicationLetterListQuery = validate(
      ApplicationLetterValidation.LIST_QUERY,
      query
    );

    const where: Prisma.ApplicationLetterWhereInput = {
      userId,
    };

    if (filters.q) {
      const search = filters.q;
      where.OR = [
        { name: { contains: search } },
        { subject: { contains: search } },
        { companyName: { contains: search } },
        { receiverTitle: { contains: search } },
        { applicantCity: { contains: search } },
      ];
    }

    if (filters.language) {
      where.language = filters.language;
    }

    if (filters.company_name) {
      where.companyName = {
        contains: filters.company_name,
      };
    }

    if (filters.application_date) {
      where.applicationDate = filters.application_date;
    }

    const orderByField = sortFieldMap[filters.sort_by] ?? "createdAt";
    const orderBy: Prisma.ApplicationLetterOrderByWithRelationInput = {
      [orderByField]: filters.sort_order,
    };

    const page = filters.page;
    const perPage = filters.per_page;

    const [totalItems, records] = await Promise.all([
      prisma.applicationLetter.count({ where }),
      prisma.applicationLetter.findMany({
        where,
        orderBy,
        skip: (page - 1) * perPage,
        take: perPage,
      }),
    ]);

    const totalPages =
      totalItems === 0 ? 0 : Math.ceil(totalItems / Math.max(perPage, 1));

    return {
      items: records.map((record) =>
        ApplicationLetterService.toResponse(record)
      ),
      pagination: {
        page,
        per_page: perPage,
        total_items: totalItems,
        total_pages: totalPages,
      },
    };
  }

  static async create(
    userId: string,
    request: unknown
  ): Promise<ApplicationLetterResponse> {
    const payload: ApplicationLetterPayloadInput = validate(
      ApplicationLetterValidation.PAYLOAD,
      request
    );
    const data = ApplicationLetterService.mapPayloadToData(payload);
    const now = new Date();

    const letter = await prisma.applicationLetter.create({
      data: {
        ...data,
        userId,
        createdAt: now,
        updatedAt: now,
      },
    });

    return ApplicationLetterService.toResponse(letter);
  }

  static async get(
    userId: string,
    id: string
  ): Promise<ApplicationLetterResponse> {
    const letter = await ApplicationLetterService.findOwnedLetter(userId, id);
    return ApplicationLetterService.toResponse(letter);
  }

  static async update(
    userId: string,
    id: string,
    request: unknown
  ): Promise<ApplicationLetterResponse> {
    await ApplicationLetterService.findOwnedLetter(userId, id);
    const payload: ApplicationLetterPayloadInput = validate(
      ApplicationLetterValidation.PAYLOAD,
      request
    );
    const data = ApplicationLetterService.mapPayloadToData(payload);

    const letter = await prisma.applicationLetter.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });

    return ApplicationLetterService.toResponse(letter);
  }

  static async delete(userId: string, id: string): Promise<void> {
    await ApplicationLetterService.findOwnedLetter(userId, id);
    await prisma.applicationLetter.delete({
      where: { id },
    });
  }

  static async duplicate(
    userId: string,
    id: string
  ): Promise<ApplicationLetterResponse> {
    const source = await ApplicationLetterService.findOwnedLetter(userId, id);
    const now = new Date();

    const duplicate = await prisma.applicationLetter.create({
      data: {
        userId,
        name: source.name,
        birthPlaceDate: source.birthPlaceDate,
        gender: source.gender,
        maritalStatus: source.maritalStatus,
        education: source.education,
        phone: source.phone,
        email: source.email,
        address: source.address,
        subject: source.subject,
        applicantCity: source.applicantCity,
        applicationDate: source.applicationDate,
        receiverTitle: source.receiverTitle,
        companyName: source.companyName,
        companyCity: source.companyCity,
        companyAddress: source.companyAddress,
        openingParagraph: source.openingParagraph,
        bodyParagraph: source.bodyParagraph,
        attachments: source.attachments,
        closingParagraph: source.closingParagraph,
        signature: source.signature,
        language: source.language,
        createdAt: now,
        updatedAt: now,
      },
    });

    return ApplicationLetterService.toResponse(duplicate);
  }

  static async generateDocx(
    userId: string,
    id: string
  ): Promise<GeneratedDocument> {
    const letter = await ApplicationLetterService.findOwnedLetter(userId, id);
    const docxBuffer = await ApplicationLetterService.renderDocx(letter);

    return {
      buffer: docxBuffer,
      mimeType:
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      fileName: `${ApplicationLetterService.buildFileName(letter)}.docx`,
    };
  }

  private static async findOwnedLetter(
    userId: string,
    id: string
  ): Promise<PrismaApplicationLetter> {
    const letter = await prisma.applicationLetter.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!letter) {
      throw new ResponseError(404, "Application letter not found");
    }

    return letter;
  }

  private static mapPayloadToData(
    payload: ApplicationLetterPayloadInput
  ): ApplicationLetterMutableFields {
    return {
      name: payload.name,
      birthPlaceDate: payload.birth_place_date,
      gender: payload.gender,
      maritalStatus: payload.marital_status,
      education: payload.education,
      phone: payload.phone,
      email: payload.email,
      address: payload.address,
      subject: payload.subject,
      applicantCity: payload.applicant_city,
      applicationDate: payload.application_date,
      receiverTitle: payload.receiver_title,
      companyName: payload.company_name,
      companyCity: payload.company_city ?? null,
      companyAddress: payload.company_address ?? null,
      openingParagraph: payload.opening_paragraph,
      bodyParagraph: payload.body_paragraph,
      attachments: payload.attachments,
      closingParagraph: payload.closing_paragraph,
      signature: payload.signature,
      language: payload.language,
    };
  }

  private static async renderDocx(
    letter: PrismaApplicationLetter
  ): Promise<Buffer> {
    const templatePath = path.join(
      process.cwd(),
      "application_letter_templates",
      "template_001.docx"
    );
    const templateBinary = await fs.readFile(templatePath);
    const zip = new PizZip(templateBinary);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    doc.render(ApplicationLetterService.buildTemplateContext(letter));

    const uint8Array = doc.getZip().generate({
      type: "uint8array",
      compression: "DEFLATE",
    }) as Uint8Array;

    return Buffer.from(uint8Array);
  }

  private static buildTemplateContext(
    letter: PrismaApplicationLetter
  ): Record<string, unknown> {
    return {
      applicant_city: letter.applicantCity ?? "",
      application_date: letter.applicationDate ?? "",
      subject: letter.subject ?? "",
      receiver_title: letter.receiverTitle ?? "",
      company_name: letter.companyName ?? "",
      company_address: letter.companyAddress ?? "",
      company_city: letter.companyCity ?? "",
      opening_paragraph: letter.openingParagraph ?? "",
      body_paragraph: letter.bodyParagraph ?? "",
      attachments: letter.attachments ?? "",
      attachments_items: ApplicationLetterService.parseAttachmentItems(
        letter.attachments
      ),
      closing_paragraph: letter.closingParagraph ?? "",
      name: letter.name ?? "",
      birth_place_date: letter.birthPlaceDate ?? "",
      gender: ApplicationLetterService.toTitleCase(letter.gender ?? ""),
      marital_status: ApplicationLetterService.toTitleCase(
        letter.maritalStatus ?? ""
      ),
      education: letter.education ?? "",
      phone: letter.phone ?? "",
      email: letter.email ?? "",
      address: letter.address ?? "",
      signature: letter.signature ?? letter.name ?? "",
    };
  }

  private static buildFileName(letter: PrismaApplicationLetter): string {
    const base = `${letter.name ?? "application"}-${
      letter.companyName ?? "letter"
    }`;
    const normalized = base
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60);
    return normalized || "application-letter";
  }

  private static toTitleCase(value: string): string {
    return value
      .split("_")
      .filter(Boolean)
      .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
      .join(" ");
  }

  private static parseAttachmentItems(value?: string | null): string[] {
    if (!value) {
      return [];
    }

    return value
      .split(/[,;\n]/)
      .map((item) => item.trim())
      .filter((item) => item.length > 0);
  }

  private static toResponse(
    letter: PrismaApplicationLetter
  ): ApplicationLetterResponse {
    return {
      id: letter.id,
      user_id: letter.userId,
      name: letter.name,
      birth_place_date: letter.birthPlaceDate,
      gender: letter.gender,
      marital_status: letter.maritalStatus,
      education: letter.education,
      phone: letter.phone,
      email: letter.email,
      address: letter.address,
      subject: letter.subject,
      applicant_city: letter.applicantCity,
      application_date: letter.applicationDate,
      receiver_title: letter.receiverTitle,
      company_name: letter.companyName,
      company_city: letter.companyCity ?? null,
      company_address: letter.companyAddress ?? null,
      opening_paragraph: letter.openingParagraph,
      body_paragraph: letter.bodyParagraph,
      attachments: letter.attachments,
      closing_paragraph: letter.closingParagraph,
      signature: letter.signature,
      language: letter.language,
      created_at: letter.createdAt?.toISOString(),
      updated_at: letter.updatedAt?.toISOString(),
    };
  }
}

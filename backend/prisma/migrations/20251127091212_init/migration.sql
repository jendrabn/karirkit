-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `username` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `role` ENUM('admin', 'user') NOT NULL DEFAULT 'user',
    `phone` VARCHAR(255) NULL,
    `google_id` VARCHAR(255) NULL,
    `avatar` VARCHAR(255) NULL,
    `created_at` TIMESTAMP(0) NULL,
    `updated_at` TIMESTAMP(0) NULL,
    `deleted_at` TIMESTAMP(0) NULL,

    UNIQUE INDEX `users_username_key`(`username`),
    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cvs` (
    `id` VARCHAR(255) NOT NULL,
    `user_id` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `headline` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(255) NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `about` TEXT NOT NULL,
    `photo` VARCHAR(255) NULL,
    `created_at` TIMESTAMP(0) NULL,
    `updated_at` TIMESTAMP(0) NULL,
    `deleted_at` TIMESTAMP(0) NULL,

    INDEX `idx_cvs_user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `portfolios` (
    `id` VARCHAR(255) NOT NULL,
    `user_id` VARCHAR(255) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(255) NOT NULL,
    `sort_description` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `role_title` VARCHAR(255) NOT NULL,
    `project_type` ENUM('work', 'freelance', 'personal', 'academic') NOT NULL,
    `industry` VARCHAR(255) NOT NULL,
    `month` TINYINT NOT NULL,
    `year` YEAR NOT NULL,
    `live_url` VARCHAR(255) NULL,
    `repo_url` VARCHAR(255) NULL,
    `cover` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP(0) NULL,
    `updated_at` TIMESTAMP(0) NULL,
    `deleted_at` TIMESTAMP(0) NULL,

    UNIQUE INDEX `uq_portfolios_slug`(`slug`),
    INDEX `idx_portfolios_user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `applications` (
    `id` VARCHAR(255) NOT NULL,
    `user_id` VARCHAR(255) NOT NULL,
    `company_name` VARCHAR(255) NOT NULL,
    `company_url` TEXT NULL,
    `position` VARCHAR(255) NOT NULL,
    `job_source` VARCHAR(255) NULL,
    `job_type` ENUM('full_time', 'contract', 'internship', 'freelance', 'part_time') NOT NULL,
    `work_system` ENUM('onsite', 'hybrid', 'remote') NOT NULL,
    `salary_min` BIGINT NULL,
    `salary_max` BIGINT NULL,
    `location` VARCHAR(255) NULL,
    `date` DATE NOT NULL,
    `status` ENUM('draft', 'submitted', 'administration_screening', 'hr_screening', 'online_test', 'psychological_test', 'technical_test', 'hr_interview', 'user_interview', 'final_interview', 'offering', 'mcu', 'onboarding', 'accepted', 'rejected') NOT NULL,
    `result_status` ENUM('pending', 'passed', 'failed') NOT NULL,
    `contact_name` VARCHAR(255) NULL,
    `contact_email` VARCHAR(255) NULL,
    `contact_phone` VARCHAR(255) NULL,
    `follow_up_date` DATE NULL,
    `follow_up_note` TEXT NULL,
    `job_url` TEXT NULL,
    `notes` TEXT NULL,
    `created_at` TIMESTAMP(0) NULL,
    `updated_at` TIMESTAMP(0) NULL,
    `deleted_at` TIMESTAMP(0) NULL,

    INDEX `idx_applications_user_id`(`user_id`),
    INDEX `idx_applications_status`(`status`),
    INDEX `idx_applications_date`(`date`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `application_letters` (
    `id` VARCHAR(255) NOT NULL,
    `user_id` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `birth_place_date` VARCHAR(255) NOT NULL,
    `gender` ENUM('male', 'female') NOT NULL,
    `marital_status` ENUM('single', 'married', 'widowed') NOT NULL,
    `education` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `subject` VARCHAR(255) NOT NULL,
    `applicant_city` VARCHAR(255) NOT NULL,
    `application_date` VARCHAR(255) NOT NULL,
    `receiver_title` VARCHAR(255) NOT NULL,
    `company_name` VARCHAR(255) NOT NULL,
    `company_city` VARCHAR(255) NULL,
    `company_address` VARCHAR(255) NULL,
    `opening_paragraph` TEXT NOT NULL,
    `body_paragraph` TEXT NOT NULL,
    `attachments` TEXT NOT NULL,
    `closing_paragraph` TEXT NOT NULL,
    `signature` VARCHAR(255) NOT NULL,
    `language` ENUM('en', 'id') NOT NULL DEFAULT 'id',
    `created_at` TIMESTAMP(0) NULL,
    `updated_at` TIMESTAMP(0) NULL,
    `deleted_at` TIMESTAMP(0) NULL,

    INDEX `idx_application_letters_user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cv_educations` (
    `id` VARCHAR(255) NOT NULL,
    `cv_id` VARCHAR(255) NOT NULL,
    `degree` ENUM('highschool', 'associate', 'bachelor', 'master', 'doctorate', 'other') NOT NULL,
    `school_name` VARCHAR(255) NOT NULL,
    `major` VARCHAR(255) NOT NULL,
    `start_month` TINYINT NOT NULL,
    `start_year` YEAR NOT NULL,
    `end_month` TINYINT NULL,
    `end_year` YEAR NULL,
    `is_current` BOOLEAN NOT NULL DEFAULT false,
    `gpa` FLOAT NULL,
    `description` TEXT NULL,
    `created_at` TIMESTAMP(0) NULL,
    `updated_at` TIMESTAMP(0) NULL,
    `deleted_at` TIMESTAMP(0) NULL,

    INDEX `idx_cv_educations_cv_id`(`cv_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cv_certificates` (
    `id` VARCHAR(255) NOT NULL,
    `cv_id` VARCHAR(255) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `issuer` VARCHAR(255) NOT NULL,
    `issue_month` TINYINT NOT NULL,
    `issue_year` YEAR NOT NULL,
    `expiry_month` TINYINT NULL,
    `expiry_year` YEAR NULL,
    `no_expiry` BOOLEAN NOT NULL DEFAULT false,
    `credential_id` VARCHAR(255) NULL,
    `credential_url` VARCHAR(255) NULL,
    `description` TEXT NULL,
    `created_at` TIMESTAMP(0) NULL,
    `updated_at` TIMESTAMP(0) NULL,
    `deleted_at` TIMESTAMP(0) NULL,

    INDEX `idx_cv_certificates_cv_id`(`cv_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cv_experiences` (
    `id` VARCHAR(255) NOT NULL,
    `cv_id` VARCHAR(255) NOT NULL,
    `job_title` VARCHAR(255) NOT NULL,
    `company_name` VARCHAR(255) NOT NULL,
    `company_location` VARCHAR(255) NOT NULL,
    `job_type` ENUM('full_time', 'contract', 'internship', 'freelance', 'part_time') NOT NULL,
    `start_month` TINYINT NOT NULL,
    `start_year` YEAR NOT NULL,
    `end_month` TINYINT NULL,
    `end_year` YEAR NULL,
    `is_current` BOOLEAN NOT NULL DEFAULT false,
    `description` TEXT NULL,
    `created_at` TIMESTAMP(0) NULL,
    `updated_at` TIMESTAMP(0) NULL,
    `deleted_at` TIMESTAMP(0) NULL,

    INDEX `idx_cv_experiences_cv_id`(`cv_id`),
    INDEX `idx_cv_experiences_company`(`company_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cv_skills` (
    `id` VARCHAR(255) NOT NULL,
    `cv_id` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `level` ENUM('beginner', 'intermediate', 'advanced', 'expert') NOT NULL,
    `created_at` TIMESTAMP(0) NULL,
    `updated_at` TIMESTAMP(0) NULL,
    `deleted_at` TIMESTAMP(0) NULL,

    INDEX `idx_cv_skills_cv_id`(`cv_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cv_awards` (
    `id` VARCHAR(255) NOT NULL,
    `cv_id` VARCHAR(255) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `issuer` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `year` YEAR NOT NULL,
    `created_at` TIMESTAMP(0) NULL,
    `updated_at` TIMESTAMP(0) NULL,
    `deleted_at` TIMESTAMP(0) NULL,

    INDEX `idx_cv_awards_cv_id`(`cv_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cv_social_links` (
    `id` VARCHAR(255) NOT NULL,
    `cv_id` VARCHAR(255) NOT NULL,
    `platform` VARCHAR(255) NOT NULL,
    `url` VARCHAR(255) NOT NULL,
    `icon` VARCHAR(255) NULL,
    `created_at` TIMESTAMP(0) NULL,
    `updated_at` TIMESTAMP(0) NULL,
    `deleted_at` TIMESTAMP(0) NULL,

    INDEX `idx_cv_social_links_cv_id`(`cv_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `portfolio_medias` (
    `id` VARCHAR(255) NOT NULL,
    `portfolio_id` VARCHAR(255) NOT NULL,
    `path` VARCHAR(255) NOT NULL,
    `caption` VARCHAR(255) NULL,
    `created_at` TIMESTAMP(0) NULL,
    `updated_at` TIMESTAMP(0) NULL,
    `deleted_at` TIMESTAMP(0) NULL,

    INDEX `idx_portfolio_medias_portfolio_id`(`portfolio_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `portfolio_tools` (
    `id` VARCHAR(255) NOT NULL,
    `portfolio_id` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP(0) NULL,
    `updated_at` TIMESTAMP(0) NULL,
    `deleted_at` TIMESTAMP(0) NULL,

    INDEX `idx_portfolio_tools_portfolio_id`(`portfolio_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `cvs` ADD CONSTRAINT `cvs_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `portfolios` ADD CONSTRAINT `portfolios_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `applications` ADD CONSTRAINT `applications_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `application_letters` ADD CONSTRAINT `application_letters_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cv_educations` ADD CONSTRAINT `cv_educations_cv_id_fkey` FOREIGN KEY (`cv_id`) REFERENCES `cvs`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cv_certificates` ADD CONSTRAINT `cv_certificates_cv_id_fkey` FOREIGN KEY (`cv_id`) REFERENCES `cvs`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cv_experiences` ADD CONSTRAINT `cv_experiences_cv_id_fkey` FOREIGN KEY (`cv_id`) REFERENCES `cvs`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cv_skills` ADD CONSTRAINT `cv_skills_cv_id_fkey` FOREIGN KEY (`cv_id`) REFERENCES `cvs`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cv_awards` ADD CONSTRAINT `cv_awards_cv_id_fkey` FOREIGN KEY (`cv_id`) REFERENCES `cvs`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cv_social_links` ADD CONSTRAINT `cv_social_links_cv_id_fkey` FOREIGN KEY (`cv_id`) REFERENCES `cvs`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `portfolio_medias` ADD CONSTRAINT `portfolio_medias_portfolio_id_fkey` FOREIGN KEY (`portfolio_id`) REFERENCES `portfolios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `portfolio_tools` ADD CONSTRAINT `portfolio_tools_portfolio_id_fkey` FOREIGN KEY (`portfolio_id`) REFERENCES `portfolios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

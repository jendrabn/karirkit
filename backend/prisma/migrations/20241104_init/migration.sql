-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `username` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password_hash` VARCHAR(255) NOT NULL,
    `google_id` VARCHAR(255) NULL,
    `phone` VARCHAR(255) NULL,
    `birth_date` DATE NULL,
    `intro` MEDIUMTEXT NULL,
    `gender` ENUM('MALE', 'FEMALE') NULL,
    `role` ENUM('ADMIN', 'USER') NOT NULL,
    `resume` VARCHAR(255) NULL,
    `avatar` VARCHAR(255) NULL,
    `email_verified_at` TIMESTAMP(6) NULL,
    `created_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` TIMESTAMP(6) NOT NULL,
    `deleted_at` TIMESTAMP(6) NULL,
    `banned_at` TIMESTAMP(6) NULL,

    UNIQUE INDEX `users_username_key`(`username`),
    UNIQUE INDEX `users_email_key`(`email`),
    UNIQUE INDEX `users_password_hash_key`(`password_hash`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `applications` (
    `id` VARCHAR(255) NOT NULL,
    `user_id` VARCHAR(255) NOT NULL,
    `company_name` VARCHAR(255) NOT NULL,
    `company_website` MEDIUMTEXT NULL,
    `location` VARCHAR(255) NULL,
    `position` VARCHAR(255) NOT NULL,
    `source` VARCHAR(255) NULL,
    `job_link` MEDIUMTEXT NULL,
    `employment_type` ENUM('FULLTIME', 'CONTRACT', 'INTERNSHIP', 'FREELANCE', 'PART_TIME') NOT NULL,
    `work_mode` ENUM('ONSITE', 'REMOTE', 'HYBRID') NOT NULL,
    `status` ENUM('APPLIED', 'ADMIN_SCREENING', 'DOCS_COMPLETION', 'TEST', 'INTERVIEW_HR', 'INTERVIEW_TECH', 'INTERVIEW_USER', 'INTERVIEW_FINAL', 'MCU', 'BG_CHECK', 'OFFER', 'HIRED', 'REJECTED', 'WITHDRAWN') NOT NULL,
    `applied_date` DATE NOT NULL,
    `duration` INTEGER NULL,
    `salary_min` BIGINT NULL,
    `salary_max` BIGINT NULL,
    `currency` VARCHAR(255) NULL DEFAULT 'IDR',
    `contact_person` VARCHAR(255) NULL,
    `contact_person_email` VARCHAR(255) NULL,
    `contact_person_phone` VARCHAR(255) NULL,
    `next_action` VARCHAR(255) NULL,
    `next_action_due` DATE NULL,
    `notes` MEDIUMTEXT NULL,
    `deadline` DATE NULL,
    `created_at` TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updated_at` TIMESTAMP(6) NOT NULL,
    `deleted_at` TIMESTAMP(6) NULL,
    `order` TINYINT NOT NULL DEFAULT 0,

    INDEX `applications_user_id_idx`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `applications` ADD CONSTRAINT `applications_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
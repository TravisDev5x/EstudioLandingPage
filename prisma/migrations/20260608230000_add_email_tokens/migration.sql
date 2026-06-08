ALTER TABLE `AdminUser`
  ADD COLUMN `emailVerified`  BOOLEAN   NOT NULL DEFAULT false,
  ADD COLUMN `verifyToken`    VARCHAR(191) NULL,
  ADD COLUMN `verifyTokenExp` DATETIME(3) NULL,
  ADD COLUMN `resetToken`     VARCHAR(191) NULL,
  ADD COLUMN `resetTokenExp`  DATETIME(3) NULL,
  ADD UNIQUE INDEX `AdminUser_verifyToken_key`(`verifyToken`),
  ADD UNIQUE INDEX `AdminUser_resetToken_key`(`resetToken`);

-- MySQL Script generated by MySQL Workbench
-- Mon Dec  5 16:18:45 2022
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema origins_digital_wcs
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema origins_digital_wcs
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `origins_digital_wcs` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `origins_digital_wcs` ;

-- -----------------------------------------------------
-- Table `origins_digital_wcs`.`category`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `origins_digital_wcs`.`category` ;

CREATE TABLE IF NOT EXISTS `origins_digital_wcs`.`category` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `origins_digital_wcs`.`color`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `origins_digital_wcs`.`color` ;

CREATE TABLE IF NOT EXISTS `origins_digital_wcs`.`color` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `theme` VARCHAR(100) NOT NULL,
  `background_color` VARCHAR(100) NOT NULL,
  `font_color` VARCHAR(100) NOT NULL,
  `button_color` VARCHAR(100) NOT NULL,
  `button_color_hover` VARCHAR(100) NOT NULL,
  `header_footer_color` VARCHAR(100) NOT NULL,
  `section_color` VARCHAR(100) NOT NULL,
  `button_shadow_color` VARCHAR(100) NOT NULL,
  `border_button_color` VARCHAR(100) NOT NULL,
  `border_section_color` VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `origins_digital_wcs`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `origins_digital_wcs`.`user` ;

CREATE TABLE IF NOT EXISTS `origins_digital_wcs`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `firstname` VARCHAR(80) NOT NULL,
  `lastname` VARCHAR(80) NOT NULL,
  `nickname` VARCHAR(80) NOT NULL,
  `birthday` DATE NULL DEFAULT NULL,
  `email` VARCHAR(100) NOT NULL,
  `password` VARCHAR(60) NOT NULL,
  `is_admin` TINYINT NOT NULL,
  `token` VARCHAR(256) NULL DEFAULT NULL,
  `token_start` DATE NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `origins_digital_wcs`.`video`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `origins_digital_wcs`.`video` ;

CREATE TABLE IF NOT EXISTS `origins_digital_wcs`.`video` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `url` VARCHAR(255) NOT NULL,
  `description` VARCHAR(500) NOT NULL,
  `display` TINYINT NOT NULL,
  `title` VARCHAR(90) NOT NULL,
  `date` DATE NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `origins_digital_wcs`.`favorites`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `origins_digital_wcs`.`favorites` ;

CREATE TABLE IF NOT EXISTS `origins_digital_wcs`.`favorites` (
  `video_fav_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  INDEX `user_id_idx` (`user_id` ASC) VISIBLE,
  INDEX `video_fav_id_idx` (`video_fav_id` ASC) VISIBLE,
  CONSTRAINT `user_id`
    FOREIGN KEY (`user_id`)
    REFERENCES `origins_digital_wcs`.`user` (`id`),
  CONSTRAINT `video_fav_id`
    FOREIGN KEY (`video_fav_id`)
    REFERENCES `origins_digital_wcs`.`video` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `origins_digital_wcs`.`hero_slider`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `origins_digital_wcs`.`hero_slider` ;

CREATE TABLE IF NOT EXISTS `origins_digital_wcs`.`hero_slider` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `fk_video` INT NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_vid`
    FOREIGN KEY (`id`)
    REFERENCES `origins_digital_wcs`.`video` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `origins_digital_wcs`.`publicity`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `origins_digital_wcs`.`publicity` ;

CREATE TABLE IF NOT EXISTS `origins_digital_wcs`.`publicity` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `url_image` VARCHAR(255) NOT NULL,
  `description` VARCHAR(500) NULL DEFAULT NULL,
  `url_link` VARCHAR(255) NOT NULL,
  `name` VARCHAR(155) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `origins_digital_wcs`.`video_category`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `origins_digital_wcs`.`video_category` ;

CREATE TABLE IF NOT EXISTS `origins_digital_wcs`.`video_category` (
  `video_id` INT NULL DEFAULT NULL,
  `category_id` INT NULL DEFAULT NULL,
  INDEX `fk_category_id_idx` (`category_id` ASC) VISIBLE,
  INDEX `fk_video_id_idx` (`video_id` ASC) VISIBLE,
  CONSTRAINT `fk_category_id`
    FOREIGN KEY (`category_id`)
    REFERENCES `origins_digital_wcs`.`category` (`id`),
  CONSTRAINT `fk_video_id`
    FOREIGN KEY (`video_id`)
    REFERENCES `origins_digital_wcs`.`video` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
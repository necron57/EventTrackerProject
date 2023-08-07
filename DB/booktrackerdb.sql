-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema booktrackerdb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `booktrackerdb` ;

-- -----------------------------------------------------
-- Schema booktrackerdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `booktrackerdb` DEFAULT CHARACTER SET utf8 ;
USE `booktrackerdb` ;

-- -----------------------------------------------------
-- Table `author`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `author` ;

CREATE TABLE IF NOT EXISTS `author` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(300) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `genre`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `genre` ;

CREATE TABLE IF NOT EXISTS `genre` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(300) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `book`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `book` ;

CREATE TABLE IF NOT EXISTS `book` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(100) NOT NULL,
  `description` TEXT NOT NULL,
  `page_count` VARCHAR(500) NULL,
  `price` DECIMAL(10,0) NULL,
  `created_at` TIMESTAMP NOT NULL,
  `author_id` INT NOT NULL,
  `genre_id` INT NOT NULL,
  `image_url` VARCHAR(2000) NULL,
  `has_read` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_book_author_idx` (`author_id` ASC),
  INDEX `fk_book_genre1_idx` (`genre_id` ASC),
  CONSTRAINT `fk_book_author`
    FOREIGN KEY (`author_id`)
    REFERENCES `author` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_book_genre1`
    FOREIGN KEY (`genre_id`)
    REFERENCES `genre` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SET SQL_MODE = '';
DROP USER IF EXISTS bookuser@localhost;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'bookuser'@'localhost' IDENTIFIED BY 'bookuser';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'bookuser'@'localhost';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `author`
-- -----------------------------------------------------
START TRANSACTION;
USE `booktrackerdb`;
INSERT INTO `author` (`id`, `name`) VALUES (1, 'ShienBishop');
INSERT INTO `author` (`id`, `name`) VALUES (2, 'Hajime Isayama');

COMMIT;


-- -----------------------------------------------------
-- Data for table `genre`
-- -----------------------------------------------------
START TRANSACTION;
USE `booktrackerdb`;
INSERT INTO `genre` (`id`, `name`) VALUES (1, 'Fantasy');
INSERT INTO `genre` (`id`, `name`) VALUES (2, 'Dystopian');

COMMIT;


-- -----------------------------------------------------
-- Data for table `book`
-- -----------------------------------------------------
START TRANSACTION;
USE `booktrackerdb`;
INSERT INTO `book` (`id`, `title`, `description`, `page_count`, `price`, `created_at`, `author_id`, `genre_id`, `image_url`, `has_read`) VALUES (1, 'The Wolf Never Sleeps', 'Seeking strength and glory, the adventurer Lecan challenges monster and maze alike. Until one day, he finds a mysterious black hole…leading to another world! But even in a different world, the path of the “One-Eyed Wolf” remains unchanged. The only question is-can he survive the new world? ', '174', 15.00, DEFAULT, 1, 1, 'https://m.media-amazon.com/images/I/81J+wmROfjL.jpg', '1');
INSERT INTO `book` (`id`, `title`, `description`, `page_count`, `price`, `created_at`, `author_id`, `genre_id`, `image_url`, `has_read`) VALUES (2, 'Attack On Titan colossal edition', 'Collection of attack on titan volumes 1-5', '1000+', 59.99, DEFAULT, 2, 2, 'https://m.media-amazon.com/images/I/517DXSNzuWL._SY291_BO1,204,203,200_QL40_FMwebp_.jpg', '1');

COMMIT;


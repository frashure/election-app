-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema election_test
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema election_test
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `election_test` DEFAULT CHARACTER SET utf8 ;
USE `election_test` ;

-- -----------------------------------------------------
-- Table `election_test`.`parties`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `election_test`.`parties` (
  `party_id` INT(11) NOT NULL AUTO_INCREMENT,
  `partyName` VARCHAR(45) NOT NULL,
  `partyColor` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`party_id`),
  UNIQUE INDEX `party_id_UNIQUE` (`party_id` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `election_test`.`candidates`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `election_test`.`candidates` (
  `candidate_id` INT(11) NOT NULL AUTO_INCREMENT,
  `fName` VARCHAR(45) NOT NULL,
  `lName` VARCHAR(45) NOT NULL,
  `incumbent` TINYINT(1) NOT NULL,
  `party_id` INT(11) NOT NULL DEFAULT NULL,
  PRIMARY KEY (`candidate_id`, `party_id`),
  UNIQUE INDEX `candidate_id_UNIQUE` (`candidate_id` ASC),
  INDEX `fk_candidates_parties1_idx` (`party_id` ASC),
  CONSTRAINT `fk_candidates_parties1`
    FOREIGN KEY (`party_id`)
    REFERENCES `election_test`.`parties` (`party_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 15
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `election_test`.`voters`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `election_test`.`voters` (
  `voter_id` INT(11) NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(320) NOT NULL,
  `voter_password` BINARY(60) NOT NULL,
  `date_registered` DATE NOT NULL,
  `fName` VARCHAR(45) NOT NULL,
  `lName` VARCHAR(45) NOT NULL,
  `party_id` INT(11) NOT NULL DEFAULT NULL,
  PRIMARY KEY (`voter_id`, `party_id`),
  INDEX `fk_voters_parties1_idx` (`party_id` ASC),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC),
  CONSTRAINT `fk_voters_parties1`
    FOREIGN KEY (`party_id`)
    REFERENCES `election_test`.`parties` (`party_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `election_test`.`endorsements`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `election_test`.`endorsements` (
  `voter_id` INT(11) NOT NULL,
  `candidate_id` INT(11) NOT NULL,
  `dateEndorsed` DATE NOT NULL,
  INDEX `fk_voters_has_candidates_candidates1_idx` (`candidate_id` ASC),
  INDEX `fk_voters_has_candidates_voters_idx` (`voter_id` ASC),
  PRIMARY KEY (`voter_id`, `candidate_id`),
  UNIQUE INDEX `voter_id_UNIQUE` (`voter_id` ASC),
  UNIQUE INDEX `candidate_id_UNIQUE` (`candidate_id` ASC),
  CONSTRAINT `fk_voters_has_candidates_candidates1`
    FOREIGN KEY (`candidate_id`)
    REFERENCES `election_test`.`candidates` (`candidate_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_voters_has_candidates_voters`
    FOREIGN KEY (`voter_id`)
    REFERENCES `election_test`.`voters` (`voter_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

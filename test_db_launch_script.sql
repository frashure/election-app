-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

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
  `party_id` INT NOT NULL AUTO_INCREMENT,
  `partyName` VARCHAR(45) NULL,
  `partyColor` VARCHAR(45) NULL,
  PRIMARY KEY (`party_id`),
  UNIQUE INDEX `party_id_UNIQUE` (`party_id` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `election_test`.`candidates`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `election_test`.`candidates` (
  `candidate_id` INT NOT NULL AUTO_INCREMENT,
  `fName` VARCHAR(45) NULL,
  `lName` VARCHAR(45) NULL,
  `incumbent` TINYINT(1) NULL,
  `parties_party_id` INT NULL,
  PRIMARY KEY (`candidate_id`),
  UNIQUE INDEX `candidate_id_UNIQUE` (`candidate_id` ASC),
  INDEX `fk_candidates_parties1_idx` (`parties_party_id` ASC),
  CONSTRAINT `fk_candidates_parties1`
    FOREIGN KEY (`parties_party_id`)
    REFERENCES `election_test`.`parties` (`party_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `election_test`.`voters`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `election_test`.`voters` (
  `voter_id` INT NOT NULL,
  `fName` VARCHAR(45) NOT NULL,
  `lName` VARCHAR(45) NOT NULL,
  `parties_party_id` INT NULL,
  PRIMARY KEY (`voter_id`),
  INDEX `fk_voters_parties1_idx` (`parties_party_id` ASC),
  CONSTRAINT `fk_voters_parties1`
    FOREIGN KEY (`parties_party_id`)
    REFERENCES `election_test`.`parties` (`party_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `election_test`.`endorsements`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `election_test`.`endorsements` (
  `voter_id` INT NOT NULL,
  `candidate_id` INT NOT NULL,
  `endorsement_id` INT NOT NULL AUTO_INCREMENT,
  `dateEndorsed` DATE NULL,
  INDEX `fk_voters_has_candidates_candidates1_idx` (`candidate_id` ASC),
  INDEX `fk_voters_has_candidates_voters_idx` (`voter_id` ASC),
  PRIMARY KEY (`endorsement_id`),
  CONSTRAINT `fk_voters_has_candidates_voters`
    FOREIGN KEY (`voter_id`)
    REFERENCES `election_test`.`voters` (`voter_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_voters_has_candidates_candidates1`
    FOREIGN KEY (`candidate_id`)
    REFERENCES `election_test`.`candidates` (`candidate_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

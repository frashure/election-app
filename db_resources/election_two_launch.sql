-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema election_two
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema election_two
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `election_two` DEFAULT CHARACTER SET utf8 ;
USE `election_two` ;

-- -----------------------------------------------------
-- Table `election_two`.`parties`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `election_two`.`parties` (
  `party_id` VARCHAR(3) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `color` VARCHAR(45) NULL,
  `website` VARCHAR(45) NULL,
  PRIMARY KEY (`party_id`),
  UNIQUE INDEX `party_id_UNIQUE` (`party_id` ASC),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `election_two`.`voters`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `election_two`.`voters` (
  `voter_id` INT NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(45) NOT NULL,
  `lastName` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `date_registered` DATE NOT NULL,
  `voter_password` BINARY(60) NULL,
  `party_id` VARCHAR(3) NOT NULL,
  PRIMARY KEY (`voter_id`),
  UNIQUE INDEX `user_id_UNIQUE` (`voter_id` ASC),
  INDEX `fk_users_parties1_idx` (`party_id` ASC),
  CONSTRAINT `fk_users_parties1`
    FOREIGN KEY (`party_id`)
    REFERENCES `election_two`.`parties` (`party_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `election_two`.`candidates`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `election_two`.`candidates` (
  `candidate_id` INT NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(45) NOT NULL,
  `lastName` VARCHAR(45) NOT NULL,
  `middleName` VARCHAR(45) NULL,
  `isActive` TINYINT NULL,
  `website` VARCHAR(255) NULL,
  `party_id` VARCHAR(3) NOT NULL,
  PRIMARY KEY (`candidate_id`),
  UNIQUE INDEX `candidate_id_UNIQUE` (`candidate_id` ASC),
  INDEX `fk_candidates_parties_idx` (`party_id` ASC),
  CONSTRAINT `fk_candidates_parties`
    FOREIGN KEY (`party_id`)
    REFERENCES `election_two`.`parties` (`party_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `election_two`.`legislatures`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `election_two`.`legislatures` (
  `legislature_id` INT NOT NULL AUTO_INCREMENT,
  `fed_state` CHAR(1) NOT NULL,
  `state` CHAR(2) NULL,
  `name` VARCHAR(45) NOT NULL,
  `upper_lower` VARCHAR(45) NULL,
  `tenure` INT NOT NULL,
  `num_districts` VARCHAR(45) NULL,
  PRIMARY KEY (`legislature_id`),
  UNIQUE INDEX `legislature_id_UNIQUE` (`legislature_id` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `election_two`.`offices`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `election_two`.`offices` (
  `office_id` INT NOT NULL AUTO_INCREMENT,
  `district` INT NULL,
  `legislature_id` INT NOT NULL,
  `state` CHAR(2) NULL,
  PRIMARY KEY (`office_id`),
  UNIQUE INDEX `office_id_UNIQUE` (`office_id` ASC),
  INDEX `fk_offices_legislatures1_idx` (`legislature_id` ASC),
  CONSTRAINT `fk_offices_legislatures1`
    FOREIGN KEY (`legislature_id`)
    REFERENCES `election_two`.`legislatures` (`legislature_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `election_two`.`elections`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `election_two`.`elections` (
  `election_id` INT NOT NULL AUTO_INCREMENT,
  `type` VARCHAR(45) NOT NULL,
  `date` DATE NULL,
  `office_id` INT NOT NULL,
  PRIMARY KEY (`election_id`),
  UNIQUE INDEX `election_id_UNIQUE` (`election_id` ASC),
  INDEX `fk_elections_offices1_idx` (`office_id` ASC),
  CONSTRAINT `fk_elections_offices1`
    FOREIGN KEY (`office_id`)
    REFERENCES `election_two`.`offices` (`office_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `election_two`.`endorsements`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `election_two`.`endorsements` (
  `dateEndorsed` DATE NOT NULL,
  `voter_id` INT NOT NULL,
  `candidate_id` INT NOT NULL,
  `election_id` INT NOT NULL,
  INDEX `fk_endorsements_users1_idx` (`voter_id` ASC),
  INDEX `fk_endorsements_candidates1_idx` (`candidate_id` ASC),
  INDEX `fk_endorsements_elections1_idx` (`election_id` ASC),
  PRIMARY KEY (`voter_id`, `candidate_id`, `election_id`),
  CONSTRAINT `fk_endorsements_users1`
    FOREIGN KEY (`voter_id`)
    REFERENCES `election_two`.`voters` (`voter_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_endorsements_candidates1`
    FOREIGN KEY (`candidate_id`)
    REFERENCES `election_two`.`candidates` (`candidate_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_endorsements_elections1`
    FOREIGN KEY (`election_id`)
    REFERENCES `election_two`.`elections` (`election_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `election_two`.`election_candidates`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `election_two`.`election_candidates` (
  `candidate_id` INT NOT NULL,
  `election_id` INT NOT NULL,
  `isIncumbent` TINYINT NOT NULL,
  INDEX `fk_election_candidates_candidates1_idx` (`candidate_id` ASC),
  INDEX `fk_election_candidates_elections1_idx` (`election_id` ASC),
  PRIMARY KEY (`election_id`, `candidate_id`),
  CONSTRAINT `fk_election_candidates_candidates1`
    FOREIGN KEY (`candidate_id`)
    REFERENCES `election_two`.`candidates` (`candidate_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_election_candidates_elections1`
    FOREIGN KEY (`election_id`)
    REFERENCES `election_two`.`elections` (`election_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `election_two`.`user_ballot`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `election_two`.`user_ballot` (
  `voter_id` INT NOT NULL,
  `office_id` INT NOT NULL,
  PRIMARY KEY (`voter_id`, `office_id`),
  INDEX `fk_user_ballot_offices1_idx` (`office_id` ASC),
  CONSTRAINT `fk_user_ballot_users1`
    FOREIGN KEY (`voter_id`)
    REFERENCES `election_two`.`voters` (`voter_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_ballot_offices1`
    FOREIGN KEY (`office_id`)
    REFERENCES `election_two`.`offices` (`office_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `election_two`.`daily_poll`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `election_two`.`daily_poll` (
  `poll_date` DATETIME NOT NULL DEFAULT NOW(),
  `election_id` INT NOT NULL,
  `candidate_id` INT NOT NULL,
  `num_endorsements` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`poll_date`, `election_id`, `candidate_id`),
  INDEX `fk_daily_poll_elections1_idx` (`election_id` ASC),
  INDEX `fk_daily_poll_candidates1_idx` (`candidate_id` ASC),
  CONSTRAINT `fk_daily_poll_elections1`
    FOREIGN KEY (`election_id`)
    REFERENCES `election_two`.`elections` (`election_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_daily_poll_candidates1`
    FOREIGN KEY (`candidate_id`)
    REFERENCES `election_two`.`candidates` (`candidate_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `election_two`.`parties`
-- -----------------------------------------------------
START TRANSACTION;
USE `election_two`;
INSERT INTO `election_two`.`parties` (`party_id`, `name`, `color`, `website`) VALUES ('IND', 'Independent', 'white', NULL);
INSERT INTO `election_two`.`parties` (`party_id`, `name`, `color`, `website`) VALUES ('DEM', 'Democratic', 'blue', NULL);
INSERT INTO `election_two`.`parties` (`party_id`, `name`, `color`, `website`) VALUES ('REP', 'Republican', 'red', NULL);
INSERT INTO `election_two`.`parties` (`party_id`, `name`, `color`, `website`) VALUES ('LIB', 'Libertarian', 'yellow', NULL);
INSERT INTO `election_two`.`parties` (`party_id`, `name`, `color`, `website`) VALUES ('GRN', 'Green', 'green', NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `election_two`.`candidates`
-- -----------------------------------------------------
START TRANSACTION;
USE `election_two`;
INSERT INTO `candidates` (`candidate_id`,`firstName`,`lastName`,`middleName`,`isActive`,`website`,`party_id`) VALUES (1,'Donald','Trump','J',1,NULL,'REP');
INSERT INTO `candidates` (`candidate_id`,`firstName`,`lastName`,`middleName`,`isActive`,`website`,`party_id`) VALUES (2,'Andrew','Yang',NULL,1,NULL,'DEM');
INSERT INTO `candidates` (`candidate_id`,`firstName`,`lastName`,`middleName`,`isActive`,`website`,`party_id`) VALUES (3,'Arvin','Vohra',NULL,1,NULL,'LIB');
INSERT INTO `candidates` (`candidate_id`,`firstName`,`lastName`,`middleName`,`isActive`,`website`,`party_id`) VALUES (4,'John','Delaney',NULL,1,NULL,'DEM');
INSERT INTO `candidates` (`candidate_id`,`firstName`,`lastName`,`middleName`,`isActive`,`website`,`party_id`) VALUES (5,'Richard','Oeda',NULL,1,NULL,'DEM');
INSERT INTO `candidates` (`candidate_id`,`firstName`,`lastName`,`middleName`,`isActive`,`website`,`party_id`) VALUES (6,'Micheal','Arth',NULL,1,NULL,'DEM');
INSERT INTO `candidates` (`candidate_id`,`firstName`,`lastName`,`middleName`,`isActive`,`website`,`party_id`) VALUES (7,'Ken','Nwadike',NULL,1,NULL,'DEM');
INSERT INTO `candidates` (`candidate_id`,`firstName`,`lastName`,`middleName`,`isActive`,`website`,`party_id`) VALUES (8,'Bobby','Well',NULL,1,NULL,'DEM');
INSERT INTO `candidates` (`candidate_id`,`firstName`,`lastName`,`middleName`,`isActive`,`website`,`party_id`) VALUES (10,'Andrew','Kokesh',NULL,1,NULL,'LIB');
INSERT INTO `candidates` (`candidate_id`,`firstName`,`lastName`,`middleName`,`isActive`,`website`,`party_id`) VALUES (11,'Vermin','Supreme',NULL,1,NULL,'LIB');
INSERT INTO `candidates` (`candidate_id`,`firstName`,`lastName`,`middleName`,`isActive`,`website`,`party_id`) VALUES (12,'Jessie','Ventura',NULL,1,NULL,'GRN');

COMMIT;


-- -----------------------------------------------------
-- Data for table `election_two`.`legislatures`
-- -----------------------------------------------------
START TRANSACTION;
USE `election_two`;
INSERT INTO `election_two`.`legislatures` (`legislature_id`, `fed_state`, `state`, `name`, `upper_lower`, `tenure`, `num_districts`) VALUES (1, 'f', '', 'President', NULL, 4, NULL);
INSERT INTO `election_two`.`legislatures` (`legislature_id`, `fed_state`, `state`, `name`, `upper_lower`, `tenure`, `num_districts`) VALUES (2, 'f', '', 'US House', 'lower', 2, '435');
INSERT INTO `election_two`.`legislatures` (`legislature_id`, `fed_state`, `state`, `name`, `upper_lower`, `tenure`, `num_districts`) VALUES (3, 'f', '', 'US Senate', 'upper', 6, '100');
INSERT INTO `election_two`.`legislatures` (`legislature_id`, `fed_state`, `state`, `name`, `upper_lower`, `tenure`, `num_districts`) VALUES (4, 's', 'VA', 'Senate', 'upper', 4, '40');
INSERT INTO `election_two`.`legislatures` (`legislature_id`, `fed_state`, `state`, `name`, `upper_lower`, `tenure`, `num_districts`) VALUES (5, 's', 'VA', 'House of Representatives', 'lower', 2, '60');

COMMIT;


-- -----------------------------------------------------
-- Data for table `election_two`.`offices`
-- -----------------------------------------------------
START TRANSACTION;
USE `election_two`;
INSERT INTO `election_two`.`offices` (`office_id`, `district`, `legislature_id`, `state`) VALUES (1, NULL, 1, NULL);
INSERT INTO `election_two`.`offices` (`office_id`, `district`, `legislature_id`, `state`) VALUES (2, 1, 2, 'VA');
INSERT INTO `election_two`.`offices` (`office_id`, `district`, `legislature_id`, `state`) VALUES (3, 2, 2, 'VA');
INSERT INTO `election_two`.`offices` (`office_id`, `district`, `legislature_id`, `state`) VALUES (4, 3, 2, 'VA');
INSERT INTO `election_two`.`offices` (`office_id`, `district`, `legislature_id`, `state`) VALUES (5, 4, 2, 'VA');
INSERT INTO `election_two`.`offices` (`office_id`, `district`, `legislature_id`, `state`) VALUES (6, 5, 2, 'VA');
INSERT INTO `election_two`.`offices` (`office_id`, `district`, `legislature_id`, `state`) VALUES (7, 6, 2, 'VA');
INSERT INTO `election_two`.`offices` (`office_id`, `district`, `legislature_id`, `state`) VALUES (8, 7, 2, 'VA');
INSERT INTO `election_two`.`offices` (`office_id`, `district`, `legislature_id`, `state`) VALUES (9, 8, 2, 'VA');
INSERT INTO `election_two`.`offices` (`office_id`, `district`, `legislature_id`, `state`) VALUES (10, 9, 2, 'VA');
INSERT INTO `election_two`.`offices` (`office_id`, `district`, `legislature_id`, `state`) VALUES (11, 10, 2, 'VA');
INSERT INTO `election_two`.`offices` (`office_id`, `district`, `legislature_id`, `state`) VALUES (12, 11, 2, 'VA');

COMMIT;


-- -----------------------------------------------------
-- Data for table `election_two`.`elections`
-- -----------------------------------------------------
START TRANSACTION;
USE `election_two`;
INSERT INTO `election_two`.`elections` (`election_id`, `type`, `date`, `office_id`) VALUES (1, 'General', '2020-11-03', 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `election_two`.`election_candidates`
-- -----------------------------------------------------
START TRANSACTION;
USE `election_two`;
INSERT INTO `election_candidates` (`candidate_id`,`election_id`,`isIncumbent`) VALUES (1,1,1);
INSERT INTO `election_candidates` (`candidate_id`,`election_id`,`isIncumbent`) VALUES (2,1,0);
INSERT INTO `election_candidates` (`candidate_id`,`election_id`,`isIncumbent`) VALUES (3,1,0);
INSERT INTO `election_candidates` (`candidate_id`,`election_id`,`isIncumbent`) VALUES (4,1,0);
INSERT INTO `election_candidates` (`candidate_id`,`election_id`,`isIncumbent`) VALUES (5,1,0);
INSERT INTO `election_candidates` (`candidate_id`,`election_id`,`isIncumbent`) VALUES (6,1,0);
INSERT INTO `election_candidates` (`candidate_id`,`election_id`,`isIncumbent`) VALUES (7,1,0);
INSERT INTO `election_candidates` (`candidate_id`,`election_id`,`isIncumbent`) VALUES (8,1,0);
INSERT INTO `election_candidates` (`candidate_id`,`election_id`,`isIncumbent`) VALUES (10,1,0);
INSERT INTO `election_candidates` (`candidate_id`,`election_id`,`isIncumbent`) VALUES (11,1,0);
INSERT INTO `election_candidates` (`candidate_id`,`election_id`,`isIncumbent`) VALUES (12,1,0);

COMMIT;



-- CREATE POLL LOGGING EVENT
CREATE EVENT poll_logger
ON SCHEDULE EVERY 1 DAY
DO 
INSERT INTO daily_poll (election_id, candidate_id, num_endorsements)
  SELECT election_id, candidate_id, count(voter_id)
  FROM endorsements
  GROUP BY election_id, candidate_id
;

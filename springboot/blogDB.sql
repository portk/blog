-- --------------------------------------------------------
-- 호스트:                          127.0.0.1
-- 서버 버전:                        8.0.34 - MySQL Community Server - GPL
-- 서버 OS:                        Win64
-- HeidiSQL 버전:                  12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- blog 데이터베이스 구조 내보내기
CREATE DATABASE IF NOT EXISTS `blog` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `blog`;

-- 테이블 blog.board 구조 내보내기
CREATE TABLE IF NOT EXISTS `board` (
  `board_id` bigint NOT NULL AUTO_INCREMENT,
  `subject_id` bigint NOT NULL,
  `writer` varchar(60) NOT NULL DEFAULT '',
  `board_name` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`board_id`),
  KEY `FK_board_subject` (`subject_id`),
  CONSTRAINT `FK_board_subject` FOREIGN KEY (`subject_id`) REFERENCES `subject` (`subject_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 테이블 데이터 blog.board:~9 rows (대략적) 내보내기
DELETE FROM `board`;
INSERT INTO `board` (`board_id`, `subject_id`, `writer`, `board_name`) VALUES
	(1, 1, 'tester1', 'board1'),
	(2, 1, 'tester1', 'board2'),
	(3, 2, 'tester1', 'board1'),
	(4, 2, 'tester1', 'board2'),
	(5, 3, 'tester2', 'board1'),
	(6, 3, 'tester2', 'board2'),
	(7, 4, 'tester2', 'board1'),
	(8, 4, 'tester2', 'board2'),
	(11, 4, 'tester2', 'tesraerw');

-- 테이블 blog.file 구조 내보내기
CREATE TABLE IF NOT EXISTS `file` (
  `file_id` bigint NOT NULL AUTO_INCREMENT,
  `uuid` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `file_name` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `post_id` bigint NOT NULL,
  `writer` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `file_size` bigint NOT NULL,
  PRIMARY KEY (`file_id`) USING BTREE,
  KEY `FK_file_post` (`post_id`),
  CONSTRAINT `FK_file_post` FOREIGN KEY (`post_id`) REFERENCES `post` (`post_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 테이블 데이터 blog.file:~0 rows (대략적) 내보내기
DELETE FROM `file`;

-- 테이블 blog.post 구조 내보내기
CREATE TABLE IF NOT EXISTS `post` (
  `post_id` bigint NOT NULL AUTO_INCREMENT,
  `board_id` bigint NOT NULL,
  `writer` varchar(60) NOT NULL DEFAULT '',
  `post_title` varchar(300) NOT NULL,
  `post_context` varchar(2000) DEFAULT NULL,
  `post_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `post_modify` tinyint(1) DEFAULT '0',
  `read_count` int DEFAULT '0',
  `post_recommand` int DEFAULT '0',
  PRIMARY KEY (`post_id`),
  KEY `FK_post_board` (`board_id`),
  CONSTRAINT `FK_post_board` FOREIGN KEY (`board_id`) REFERENCES `board` (`board_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 테이블 데이터 blog.post:~7 rows (대략적) 내보내기
DELETE FROM `post`;
INSERT INTO `post` (`post_id`, `board_id`, `writer`, `post_title`, `post_context`, `post_date`, `post_modify`, `read_count`, `post_recommand`) VALUES
	(1, 1, 'tester1', 'post1', 'postContext', '2023-12-03 09:35:14', 1, 0, 0),
	(2, 1, 'tester1', 'post2', 'postContexte', '2023-12-03 02:54:21', 1, 0, 0),
	(3, 2, 'tester1', 'post1', 'postContextdfa', '2023-12-03 05:40:35', 1, 0, 0),
	(4, 2, 'tester1', 'post2', 'postContext', '2023-11-24 10:34:39', 0, 0, 0),
	(5, 2, 'tester1', 'post3', 'posttest2', '2023-12-03 06:44:12', 1, 0, 0),
	(8, 6, 'tester2', 'rewtwaqffeawfw', 'teawwefgawervwearvwetewarafwea', '2023-12-02 19:13:35', 1, 0, 0),
	(9, 5, 'tester2', 'tweare', 'aefwfaf', '2023-12-02 18:58:02', 1, 0, 0),
	(10, 3, 'tester1', 'testa', 'feawfewavwrv', '2023-12-03 05:01:37', 0, 0, 0);

-- 테이블 blog.reply 구조 내보내기
CREATE TABLE IF NOT EXISTS `reply` (
  `reply_id` bigint NOT NULL AUTO_INCREMENT,
  `post_id` bigint NOT NULL,
  `writer` varchar(60) NOT NULL DEFAULT '',
  `reply_context` varchar(600) DEFAULT NULL,
  `reply_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `reply_modify` tinyint(1) DEFAULT '0',
  `sub_id` bigint DEFAULT NULL,
  PRIMARY KEY (`reply_id`),
  KEY `FK_reply_post` (`post_id`),
  KEY `FK_reply_reply` (`sub_id`),
  CONSTRAINT `FK_reply_post` FOREIGN KEY (`post_id`) REFERENCES `post` (`post_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_reply_reply` FOREIGN KEY (`sub_id`) REFERENCES `reply` (`reply_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 테이블 데이터 blog.reply:~13 rows (대략적) 내보내기
DELETE FROM `reply`;
INSERT INTO `reply` (`reply_id`, `post_id`, `writer`, `reply_context`, `reply_date`, `reply_modify`, `sub_id`) VALUES
	(1, 1, 'tester1', 'reply1', '2023-12-02 21:36:51', 1, NULL),
	(2, 1, 'tester1', 'reply2', '2023-11-24 10:36:42', 0, NULL),
	(3, 1, 'tester2', 'reply1', '2023-11-24 10:36:42', 0, NULL),
	(4, 2, 'tester2', 'reply1ee', '2023-12-03 10:24:56', 1, NULL),
	(5, 2, 'tester2', 'reply1w', '2023-12-03 02:54:39', 1, NULL),
	(7, 1, 'tester1', 'teawra', '2023-12-02 19:55:56', 0, NULL),
	(8, 1, 'tester1', 'tewafawf', '2023-12-02 19:55:59', 0, NULL),
	(10, 1, 'tester1', 'teafwrewaf', '2023-12-02 20:32:35', 1, NULL),
	(13, 1, 'tester1', 'test', '2023-12-02 22:27:08', 0, 1),
	(14, 1, 'tester1', 'tesraeteawfew', '2023-12-02 22:38:40', 1, 1),
	(15, 1, 'tester1', 'teawfewafwa', '2023-12-02 22:37:15', 0, 1),
	(16, 2, 'tester1', 'tewrfa', '2023-12-03 02:54:32', 0, NULL),
	(17, 2, 'tester1', 'tesrae', '2023-12-03 02:54:41', 0, 5);

-- 테이블 blog.subject 구조 내보내기
CREATE TABLE IF NOT EXISTS `subject` (
  `subject_id` bigint NOT NULL AUTO_INCREMENT,
  `writer` varchar(60) NOT NULL DEFAULT '',
  `subject_name` varchar(300) NOT NULL,
  PRIMARY KEY (`subject_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 테이블 데이터 blog.subject:~4 rows (대략적) 내보내기
DELETE FROM `subject`;
INSERT INTO `subject` (`subject_id`, `writer`, `subject_name`) VALUES
	(1, 'tester1', 'testPagereawa'),
	(2, 'tester1', 'testPage2'),
	(3, 'tester2', 'testPage1'),
	(4, 'tester2', 'testPage2'),
	(7, 'tester1', 'testaefaewaaa');

-- 테이블 blog.user 구조 내보내기
CREATE TABLE IF NOT EXISTS `user` (
  `code` bigint NOT NULL AUTO_INCREMENT,
  `id` varchar(60) NOT NULL,
  `pw` varchar(60) NOT NULL,
  `nickname` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `email` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- 테이블 데이터 blog.user:~4 rows (대략적) 내보내기
DELETE FROM `user`;
INSERT INTO `user` (`code`, `id`, `pw`, `nickname`, `email`) VALUES
	(1, 'tester1', 'password', 'test1', 'test@test.com'),
	(2, 'tester2', 'password', 'test2', 'test2@test.com'),
	(3, 'tester3', 'password', 'tester3', 'test3@test.com'),
	(4, 'tester4', 'password', 'tester4', 'test4@test.com'),
	(5, 'tester5', 'password', 'tester5', 'test@test.com');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;

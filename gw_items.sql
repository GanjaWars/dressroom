-- phpMyAdmin SQL Dump
-- version 
-- http://www.phpmyadmin.net
--

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

-- --------------------------------------------------------

--
-- Структура таблицы `gw_items`
--

DROP TABLE IF EXISTS `gw_items`;
CREATE TABLE IF NOT EXISTS `gw_items` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `item_id` varchar(32) NOT NULL,
  `name` varchar(64) NOT NULL,
  `gb` int(11) NOT NULL DEFAULT '0',
  `eun` int(11) NOT NULL DEFAULT '0',
  `weight` int(11) NOT NULL DEFAULT '0',
  `type` tinyint(4) NOT NULL DEFAULT '0',
  `slots` varchar(16) NOT NULL,
  `skill` tinyint(4) NOT NULL DEFAULT '0',
  `required-level-combat` smallint(6) NOT NULL DEFAULT '0',
  `required-level-economic` smallint(6) NOT NULL DEFAULT '0',
  `required-level-production` smallint(6) NOT NULL DEFAULT '0',
  `required-level-synd` int(11) NOT NULL DEFAULT '0',
  `required-param-straight` int(11) NOT NULL DEFAULT '0',
  `required-param-sharpshooting` int(11) NOT NULL DEFAULT '0',
  `required-param-endurance` int(11) NOT NULL DEFAULT '0',
  `required-param-life` int(11) NOT NULL DEFAULT '0',
  `required-skill-auto` int(11) NOT NULL DEFAULT '0',
  `required-skill-bomb` int(11) NOT NULL DEFAULT '0',
  `required-skill-heavy` int(11) NOT NULL DEFAULT '0',
  `required-skill-pistol` int(11) NOT NULL DEFAULT '0',
  `required-skill-shotgun` int(11) NOT NULL DEFAULT '0',
  `required-skill-sniper` int(11) NOT NULL DEFAULT '0',
  `required-pro-killer` int(11) NOT NULL DEFAULT '0',
  `required-pro-mercenary` int(11) NOT NULL DEFAULT '0',
  `required-pro-hitman` int(11) NOT NULL DEFAULT '0',
  `add-armorHead` int(11) NOT NULL DEFAULT '0',
  `add-armorBody` int(11) NOT NULL DEFAULT '0',
  `add-armorFoots` int(11) NOT NULL DEFAULT '0',
  `add-armorActiveHead` int(11) NOT NULL DEFAULT '0',
  `add-armorActiveBody` int(11) NOT NULL DEFAULT '0',
  `add-armorActiveFoots` int(11) NOT NULL DEFAULT '0',
  `add-param-straight` int(11) NOT NULL DEFAULT '0',
  `add-param-sharpshooting` int(11) NOT NULL DEFAULT '0',
  `add-param-endurance` int(11) NOT NULL DEFAULT '0',
  `add-param-life` int(11) NOT NULL DEFAULT '0',
  `add-hp` int(11) NOT NULL,
  `add-camouflage` int(11) NOT NULL DEFAULT '0',
  `add-nightvision` int(11) NOT NULL DEFAULT '0',
  `add-bonus-sapper` int(11) NOT NULL DEFAULT '0',
  `add-bonus-sniper` int(11) NOT NULL DEFAULT '0',
  `add-bonus-skill` int(11) NOT NULL DEFAULT '0',
  `add-bonus-mcCloud` int(11) NOT NULL DEFAULT '0',
  `add-bonus-dieHard` int(11) NOT NULL DEFAULT '0',
  `add-bonus-aceInHole` int(11) NOT NULL DEFAULT '0',
  `add-bonus-healthRecovery` int(11) NOT NULL DEFAULT '0',
  `add-bonus-durability` int(11) NOT NULL DEFAULT '0',
  `add-bonus-selfMedication` int(11) NOT NULL DEFAULT '0',
  `add-bonus-stability` int(11) NOT NULL DEFAULT '0',
  `add-bonus-secondStep` int(11) NOT NULL DEFAULT '0',
  `add-bonus-adrenalin` int(11) NOT NULL DEFAULT '0',
  `add-bonus-manBonus` int(11) NOT NULL DEFAULT '0',
  `add-bonus-antikiller` int(11) NOT NULL DEFAULT '0',
  `add-bonus-bloodLust` int(11) NOT NULL DEFAULT '0',
  `add-bonus-exp` int(11) NOT NULL DEFAULT '0',
  `add-bonus-nightCamouflage` int(11) NOT NULL DEFAULT '0',
  `add-bonus-rage` int(11) NOT NULL DEFAULT '0',
  `add-bonus-secondShot` int(11) NOT NULL DEFAULT '0',
  `add-bonus-progress` int(11) NOT NULL DEFAULT '0',
  `add-bonus-luck` int(11) NOT NULL DEFAULT '0',
  `speed-ground` int(10) unsigned NOT NULL DEFAULT '0',
  `speed-water` int(10) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`item_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8;

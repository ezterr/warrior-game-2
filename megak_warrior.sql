-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 20 Lut 2022, 15:39
-- Wersja serwera: 10.4.22-MariaDB
-- Wersja PHP: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `megak_warrior`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `warrior`
--

CREATE TABLE `warrior` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT uuid(),
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `strength` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `defense` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `stamina` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `agility` tinyint(3) UNSIGNED NOT NULL DEFAULT 0,
  `winFights` int(11) UNSIGNED NOT NULL DEFAULT 0,
  `loseFights` int(11) UNSIGNED NOT NULL DEFAULT 0,
  `avatar` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '463.jpg'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `warrior`
--
ALTER TABLE `warrior`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

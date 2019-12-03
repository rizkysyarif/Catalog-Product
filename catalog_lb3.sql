-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 03 Des 2019 pada 20.50
-- Versi server: 10.4.6-MariaDB
-- Versi PHP: 7.1.32

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `catalog_lb3`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name_category` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `category`
--

INSERT INTO `category` (`id`, `name_category`) VALUES
(1, 'Smartphone'),
(2, 'Laptop');

-- --------------------------------------------------------

--
-- Struktur dari tabel `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `price` int(20) NOT NULL,
  `description` varchar(200) NOT NULL,
  `image` varchar(100) NOT NULL,
  `categoryId` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `product`
--

INSERT INTO `product` (`id`, `name`, `price`, `description`, `image`, `categoryId`) VALUES
(14, 'Lenovo Thinkpad L480', 5400000, 'Bagus', 'lenovo-thinkpad-L480.png', 2),
(15, 'Lenovo V310', 4300000, 'Keren', 'lenovo-v310.png', 2),
(16, 'Oppo A9', 5500000, 'Keren', 'oppo-a9.PNG', 1),
(17, 'Oppo', 3300000, 'Bagus', 'oppo.png', 1),
(18, 'Redmi Note 8', 4200000, 'Bagus', 'redmi-note-8.png', 1),
(19, 'Samsung A10', 4400000, 'Bagus', 'samsung-a10.png', 1),
(20, 'Samsung Galaxy S10', 4500000, 'Keren', 'samsung-galaxy-s10.png', 1),
(21, 'Samsung Galaxy S8', 4200000, 'Keren', 'samsung-galaxy-s8.png', 1),
(26, 'Acer Aspire E', 2000000, 'Bagus', 'acer-aspire-e.png', 2);

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `verificationToken` varchar(255) DEFAULT NULL,
  `emailVerified` varchar(255) DEFAULT NULL,
  `credentials` varchar(255) DEFAULT NULL,
  `challenges` varchar(255) DEFAULT NULL,
  `realm` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `created` varchar(255) DEFAULT NULL,
  `lastUpdated` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `user`
--

INSERT INTO `user` (`id`, `email`, `password`, `username`, `verificationToken`, `emailVerified`, `credentials`, `challenges`, `realm`, `status`, `created`, `lastUpdated`) VALUES
(1, 'rizky@gmail.com', '$2a$10$2iv9/mGzQerS4MzRuF6Hp.J04kLl5MJFQqioii7VPm/lFPMIWcPmG', 'Rizky', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(2, 'alvin@gmail.com', '$2a$10$KTTUOnVJVgAP4YfkAkWdhOAPy4frnakzCQyZdc.107cbxl4ojLuMO', 'alvin', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(3, 'diaz@gmail.com', '$2a$10$zHlZADNIfvhqf3gYnKFg8O2dUB6iXsBk2pR39OpDquwl/JgjkQj.m', 'Diaz', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(4, 'aditya@gmail.com', '$2a$10$OmrQ8fkQG1jzjW0IIs3PzOP3TYL7r.UdMNzo7b67WBA8xxJKvVb2O', 'Aditya', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT untuk tabel `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

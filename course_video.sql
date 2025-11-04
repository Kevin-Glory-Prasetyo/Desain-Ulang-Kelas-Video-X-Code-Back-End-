-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 04, 2025 at 12:52 PM
-- Server version: 8.0.40
-- PHP Version: 8.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `course_video`
--

-- --------------------------------------------------------

--
-- Table structure for table `course_video`
--

CREATE TABLE `course_video` (
  `id` int NOT NULL,
  `gambarProduk` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `harga` int NOT NULL,
  `namaProduk` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `tanggal` date NOT NULL,
  `deskripsi` varchar(500) COLLATE utf8mb4_general_ci NOT NULL,
  `materi` varchar(500) COLLATE utf8mb4_general_ci NOT NULL,
  `skill` varchar(500) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `course_video`
--

INSERT INTO `course_video` (`id`, `gambarProduk`, `harga`, `namaProduk`, `tanggal`, `deskripsi`, `materi`, `skill`) VALUES
(1, 'image/backupProxmox.avif', 50000, 'Backup data secara otomatis di proxmox (VM, files & database) untuk keamanan data', '2025-01-18', 'Kehilangan data server bisa sangat merugikan, baik untuk perusahaan maupun individu. Kelas ini membahas bagaimana membangun sistem backup otomatis di Proxmox, mulai dari VM, file, hingga database, dengan metode yang aman dan terstruktur. Dengan backup yang terjadwal, administrator bisa lebih tenang karena data penting selalu terlindungi dan dapat dipulihkan dengan cepat bila terjadi masalah.', 'Konfigurasi backup otomatis VM dan Container, Backup database dan file system, Jadwal Backup dan monitoring, Restore data dengan cepat ', 'Manajemen Proxmox, backup & restore VM, pengamanan database, monitoring sistem.'),
(2, 'image/konfigurasiMikrotik.png', 75000, 'Belajar Mikrotik untuk Pemula – Konfigurasi Dasar untuk Kebutuhan Jaringan Komputer', '2025-05-10', 'Mikrotik RouterOS adalah salah satu perangkat jaringan yang paling banyak digunakan di Indonesia. Kelas ini cocok bagi pemula yang ingin memahami dasar-dasar konfigurasi jaringan menggunakan Mikrotik. Dengan panduan step-by-step, peserta akan mampu melakukan konfigurasi IP, DHCP, NAT, hingga firewall dasar untuk kebutuhan rumah, kantor kecil, maupun usaha.', 'Pengenalan RouterOS, Setting IP address & gateway, Konfigurasi DHCP, NAT & firewall dasar, Monitoring jaringan', 'Networking dasar, konfigurasi RouterOS, manajemen IP, NAT & firewall dasar.'),
(3, 'image/belajarFreSBD.jpg', 50000, 'Download belajar freebsd dan security hardening', '2025-09-01', 'FreeBSD dikenal sebagai sistem operasi berbasis UNIX yang stabil dan aman. Kelas ini membahas instalasi, pengelolaan user, hingga hardening sistem untuk meningkatkan keamanan server. Peserta akan memahami praktik terbaik dalam menjaga server tetap aman dari serangan, termasuk konfigurasi firewall PF dan penggunaan tool keamanan lainnya.', 'Instalasi FreeBSD, Manajemen user & permission, Firewall PF dan security tools, Praktik hardening server', 'Administrasi sistem UNIX, FreeBSD hardening, firewall PF, keamanan server.'),
(5, 'image/cmshacking.webp', 50000, 'Essential Hacking Web CMS Hacking & Security (WordPress & Joomla)', '2024-10-05', 'CMS seperti WordPress dan Joomla sering menjadi target serangan hacker karena digunakan oleh jutaan website. Kelas ini mengajarkan bagaimana mengenali celah keamanan pada CMS populer, mengeksploitasi kerentanannya secara etis, dan mengamankannya kembali. Peserta akan mempelajari kerentanan plugin, theme, serta praktik hardening CMS untuk mencegah serangan.', 'Struktur CMS WordPress & Joomla\r\n, Celah umum (SQLi, XSS, RCE), Plugin & theme security, Hardening & patching', 'Web security, exploit CMS, penetration testing dasar, hardening aplikasi web.'),
(6, 'image/ehticalexploitdev.jpg', 200000, 'Ethical Hacking & Exploit Development ', '2024-11-22', 'Kelas tingkat lanjut ini dirancang untuk peserta yang ingin memahami proses pembuatan exploit dari awal. Mulai dari pengenalan buffer overflow, analisis memory corruption, hingga reverse engineering sederhana, kelas ini membantu peserta memahami bagaimana celah keamanan dimanfaatkan dan bagaimana menutupnya. Cocok untuk praktisi keamanan yang ingin naik level.', 'Pengenalan exploit & payload, Buffer overflow & memory corruption, Reverse engineering dasar, Simulasi exploit di lab', 'Exploit development, reverse engineering, buffer overflow, penetration testing.'),
(7, 'image/kerentananowasp.png', 150000, 'Ethical Hacking dan Eksplorasi Kerentanan dalam OWASP Top 10 2021', '2024-12-27', 'OWASP Top 10 adalah standar global yang digunakan untuk mengidentifikasi kerentanan aplikasi web. Kelas ini membahas masing-masing kerentanan beserta contoh nyata dan simulasi serangan. Peserta akan belajar bagaimana menguji aplikasi, menemukan kelemahan, dan menerapkan patch keamanan sesuai rekomendasi OWASP.', 'Injeksi, XSS, CSRF, Authentication & session hijacking, Security misconfiguration, Testing & patching aplikasi web', 'Web app security, vulnerability testing, exploit OWASP Top 10, secure coding.'),
(8, 'image/webaplicationV2.webp', 100000, 'Ethical Web Application Hacking & Security V2 ', '2024-11-01', 'Kelas ini berfokus pada serangan web modern seperti IDOR, API exploitation, hingga advanced SQLi dan XSS. Peserta akan memahami cara kerja serangan, bagaimana mencegahnya, dan best practice dalam pengamanan aplikasi web. Sangat cocok untuk developer maupun security tester.', 'SQL Injection & XSS advanced, Insecure Direct Object Reference (IDOR), API security testing, Defense in depth', 'Advanced web hacking, API security, exploit analysis, secure coding.'),
(9, 'image/apache.svg', 75000, 'Membangun Apache Web Server dengan keamanan yang optimal V2', '2025-05-16', 'Apache adalah web server populer yang digunakan di banyak infrastruktur. Kelas ini membahas instalasi, konfigurasi, hingga penguatan keamanan Apache. Peserta akan belajar mengatur virtual host, menggunakan SSL/TLS, serta menambahkan modul keamanan seperti mod_security. Selain itu, dibahas juga tuning performa agar server lebih cepat dan stabil.\r\n', 'Instalasi & konfigurasi Apache, Virtual host & mod_security, SSL/TLS setup, Performance tuning', 'Apache administration, server hardening, SSL/TLS setup, performance tuning.'),
(10, 'image/httpsreverse.webp', 75000, 'Membangun Infrastruktur Modern Berbasis HTTPS Reverse Proxy dengan Proxmox', '2025-05-01', 'Reverse proxy berbasis HTTPS menjadi salah satu pondasi keamanan dalam arsitektur server modern. Kelas ini mengajarkan bagaimana membangun reverse proxy di atas Proxmox, lengkap dengan sertifikat SSL Let’s Encrypt, load balancing, dan integrasi dengan VM maupun container.', 'Instalasi & konfigurasi reverse proxy, Load balancing, HTTPS & Let’s Encrypt, Integrasi dengan VM & container', 'Reverse proxy setup, SSL management, load balancing, Proxmox integration.'),
(11, 'image/docker.png', 75000, 'Membangun Server Monolith dengan Docker dengan cepat dan mudah Panduan dari Instalasi hingga Deploy v2', '2025-08-13', 'Docker adalah teknologi container yang banyak digunakan dalam pengembangan modern. Kelas ini membahas bagaimana membangun server monolith menggunakan Docker, mulai dari instalasi, membuat container, hingga deployment aplikasi. Peserta juga akan belajar praktik terbaik dalam manajemen Docker agar server tetap efisien.', 'Instalasi Docker, Membuat container custom, Deployment monolith apps, Best practice manajemen Docker', 'Docker containerization, deployment monolith, image building, container management.'),
(12, 'image/frankenPHP.png', 75000, 'Membangun layanan server dengan platform PHP modern menggunakan FrankenPHP v2', '2025-04-19', 'FrankenPHP adalah server PHP modern yang dirancang untuk performa tinggi. Kelas ini membahas cara instalasi, konfigurasi, dan optimasi FrankenPHP agar aplikasi PHP berjalan lebih cepat dan aman. Peserta juga akan belajar praktik deployment aplikasi modern berbasis PHP.', 'Instalasi FrankenPHP, Konfigurasi server modern, Benchmarking & tuning performa, Deploy aplikasi PHP', 'PHP server modern, FrankenPHP, web hosting, performance optimization.'),
(13, 'image/nesus.webp', 75000, 'Nessus & Eksploitasi Kerentanan di Sistem & Aplikasi', '2025-05-14', 'Nessus adalah salah satu tool scanning kerentanan paling populer. Kelas ini mengajarkan cara menggunakan Nessus untuk menemukan celah pada sistem dan aplikasi, serta bagaimana memanfaatkan hasil scan untuk pengujian penetrasi. Peserta akan memahami langkah demi langkah mulai dari instalasi, scanning, hingga eksploitasi.', 'Instalasi & konfigurasi Nessus, Scan sistem & aplikasi, Analisis laporan kerentanan, Eksploitasi hasil scan', 'Vulnerability scanning, Nessus usage, penetration testing, exploit analysis.'),
(14, 'image/proxmoxVE.webp', 150000, 'Proxmox Virtual Environment (Proxmox VE) untuk kebutuhan server ', '2025-01-31', 'Proxmox VE adalah platform virtualisasi open-source yang kuat untuk membangun server enterprise. Kelas ini membahas instalasi, pembuatan VM & container, manajemen backup, serta cluster dan high availability. Peserta akan memahami cara membangun infrastruktur virtual yang stabil dan aman.', 'Instalasi Proxmox, Manajemen VM & container, Backup & restore, Cluster & high availability', 'Virtualization, Proxmox management, backup & restore, HA cluster.'),
(15, 'image/officenetwork.jpg', 35000, 'Webinar Membangun Layanan Internet Kantor dengan Keamanan Maksimal dengan menggunakan Mikrotik RouterOS v7 ', '2024-08-29', 'Webinar ini membahas bagaimana membangun jaringan internet kantor yang aman dan stabil menggunakan Mikrotik RouterOS v7. Peserta akan mempelajari konfigurasi routing, firewall, VPN, dan manajemen bandwidth, sehingga dapat mengoptimalkan layanan internet di lingkungan kantor.', 'Routing & NAT, Firewall & filtering, VPN di RouterOS v7, Bandwidth management', 'Advanced Mikrotik, firewall, VPN setup, bandwidth management.'),
(16, 'image/hackingandsecurity.jpg', 75000, 'Webinar X-code – Ethical network hacking & Security V2', '2024-09-10', 'Webinar ini fokus pada keamanan jaringan dengan pendekatan ethical hacking. Peserta akan mempelajari teknik sniffing, spoofing, hingga serangan jaringan wireless, serta strategi pertahanan yang dapat diterapkan untuk mengamankan infrastruktur jaringan.', 'Sniffing & spoofing, Network attacks, Wireless security, Defense strategies', 'Network hacking, wireless security, sniffing & spoofing, defense strategies.'),
(17, 'image/windowshacking.webp', 50000, 'Windows Hacking & Security', '2025-09-02', 'Windows sering menjadi target serangan karena digunakan secara luas. Kelas ini membahas celah keamanan pada Windows, teknik privilege escalation, serta cara melakukan hardening agar sistem lebih aman. Selain itu, peserta akan mempelajari analisis malware dasar untuk memahami ancaman di Windows.', 'Windows user management, Local & remote exploits, Malware & defense, Hardening Windows Server & Desktop', 'Windows security, privilege escalation, malware analysis, system hardening.');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int NOT NULL,
  `user_first_name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `user_last_name` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `user_email` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `user_password` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `user_phone` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `user_image` varchar(255) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `user_first_name`, `user_last_name`, `user_email`, `user_password`, `user_phone`, `user_image`) VALUES
(6, 'Bobi', 'Nasution', 'dia22@gmail.com', '$2b$10$iYshqp5bd7gO.dNsUPfVx.IX5Exjso7Qc9uTONQ4iWrFVidcKHXZ.', '', ''),
(8, 'Viki', 'Yohanes', 'vikiyh12@gmail.com', '$2b$10$k.5y7FOsa2ttw6lbuVxFJetBuBGmQzhTKRzOEpE27KQ6iHh4h6.Du', '', ''),
(9, 'Kevin', 'Glory Prasetyo', 'kevinprasetyo817@gmail.com', '$2b$10$cpBGtP6gnD2pKnpRiLoex.vKIJbZD8dX3pYSMZSB9MlpDYEZIdCFS', '', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `course_video`
--
ALTER TABLE `course_video`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `course_video`
--
ALTER TABLE `course_video`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-03-2022 a las 00:04:08
-- Versión del servidor: 10.4.22-MariaDB
-- Versión de PHP: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bobdega`
--
DROP DATABASE IF EXISTS bobdega;
CREATE DATABASE bobdega;
USE bobdega;
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cart`
--

CREATE TABLE `cart` (
  `id` int(10) NOT NULL,
  `userId` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productcart`
--

CREATE TABLE `productcart` (
  `id` int(10) NOT NULL,
  `productId` int(10) NOT NULL,
  `cartId` int(10) NOT NULL,
  `productPrice` decimal(10,2) NOT NULL,
  `quantity` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id` int(10) NOT NULL,
  `name` varchar(50) NOT NULL,
  `typeId` int(10) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `alcohol` int(3) NOT NULL,
  `description` varchar(500) NOT NULL,
  `image` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id`, `name`, `typeId`, `price`, `alcohol`, `description`, `image`) VALUES
(1, 'Nicola Catena Bonarda', 2, '5000.00', 17, 'Origen: Argentina\r\nRegiones: Mendoza\r\nUsos recomendados: Bebidas\r\nEs orgánico: No\r\nTiempo en barrica: 18 meses\r\nMaterial del estuche: Cartón\r\nGraduación alcohólica: 17 %\r\nTemperatura ideal de consumo: 14 °C', '1647209560574-288622609imageProduct.jpg'),
(2, 'Rutini Antologia Xxxviii (38) 750cc', 2, '5496.00', 13, 'Origen: Argentina\r\nRegiones: Mendoza\r\nAroma: Frutales y florales\r\nEs orgánico: No\r\nTiempo en barrica: 12 meses\r\nGraduación alcohólica: 13.2 %\r\nTemperatura ideal de consumo: 14 °C', '1647209820782-768001581image.jpg'),
(3, 'Barda Patagonia 750ml', 2, '6.69', 14, 'Origen: Argentina\r\nRegiones: Rio Negro\r\nUsos recomendados: Asado,Carnes Rojas,Quesos\r\nAroma: Frutos rojos\r\nEs orgánico: No\r\nTiempo en barrica: 11 meses\r\nGraduación alcohólica: 14 %\r\nTemperatura ideal de consumo: 14 °C', '1647209950737-223414215imageProduct.jpg'),
(4, 'Achaval Ferrer', 2, '18.63', 14, 'Origen: Argentina\r\nRegiones: Mendoza\r\nAroma: Flores Frescas y Ciruela\r\nEs orgánico: No\r\nTiempo en barrica: 15 meses\r\nGraduación alcohólica: 14 %\r\nTemperatura ideal de consumo: 16 °C', '1647210066954-554644160imageProduct.jpg'),
(5, 'Novecento bodega D. Robino 750 ml', 2, '330.00', 12, 'alto vino ', '1647211444231-22904448image.jpg'),
(6, 'Torrontés Capriccio Dolcezza', 3, '750.00', 16, 'Bodega: Dante Robino\r\nTipo de producto: Vino espumante\r\nAño: 2019\r\nVariedad de espumante: Dulce\r\nGraduación alcohólica: 16 %\r\nVolumen de la unidad: 750 mL\r\nFormato de venta: Pack\r\nUnidades por pack: 6\r\nIncluye estuche: No\r\nRegión de origen: Luján de Cuyo\r\nPaís de origen: Argentina\r\nTiempo en barrica: 36 meses\r\nUsos recomendados: postres,dulces\r\nEs orgánico: No\r\nTemperatura ideal de consumo: 16 °C\r\nProhibida su venta a menores de 18 años: Si', '1647210607249-598732110imageProduct');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `types`
--

CREATE TABLE `types` (
  `id` int(10) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `types`
--

INSERT INTO `types` (`id`, `name`) VALUES
(1, 'Espumantes'),
(2, 'Tintos'),
(3, 'Blancos'),
(4, 'Rosados'),
(5, 'Regalos');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(20) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `category` varchar(10) NOT NULL,
  `image` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indices de la tabla `productcart`
--
ALTER TABLE `productcart`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cartId` (`cartId`),
  ADD KEY `productId` (`productId`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `typeId` (`typeId`);

--
-- Indices de la tabla `types`
--
ALTER TABLE `types`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `productcart`
--
ALTER TABLE `productcart`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `types`
--
ALTER TABLE `types`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `productcart`
--
ALTER TABLE `productcart`
  ADD CONSTRAINT `productcart_ibfk_1` FOREIGN KEY (`cartId`) REFERENCES `cart` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `productcart_ibfk_2` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON UPDATE CASCADE;

--
-- Filtros para la tabla `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`typeId`) REFERENCES `types` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 18-04-2022 a las 02:16:22
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
(2, 'Rutini Antologia Xxxviii (38) 750cc', 2, '5496.00', 13, '- Graduación Alcohólica: 13.9%\r\n- Temperatura Ideal de Consumo: 12°C\r\n- Presenta un color Rojo muy intenso, con matiz azulado .\r\n- Potencial de Guarda: 8 años.\r\n- Maduración en barricas: 12 meses. Roble francés (50% nuevo, 50% de 2o uso).\r\n- Presencia de aromas florales de violeta, combinados con otros -frutales- de cereza y guinda.', '1650235477209-240062465imageProduct.jpg'),
(3, 'Barda Patagonia 750ml', 2, '6.69', 14, 'Origen: Argentina\r\nRegiones: Rio Negro\r\nUsos recomendados: Asado,Carnes Rojas,Quesos\r\nAroma: Frutos rojos\r\nEs orgánico: No\r\nTiempo en barrica: 11 meses\r\nGraduación alcohólica: 14 %\r\nTemperatura ideal de consumo: 14 °C', '1647209950737-223414215imageProduct.jpg'),
(4, 'Achaval Ferrer', 2, '18.63', 14, 'Origen: Argentina\r\nRegiones: Mendoza\r\nAroma: Flores Frescas y Ciruela\r\nEs orgánico: No\r\nTiempo en barrica: 15 meses\r\nGraduación alcohólica: 14 %\r\nTemperatura ideal de consumo: 16 °C', '1647210066954-554644160imageProduct.jpg'),
(5, 'Novecento bodega D. Robino 750 ml', 2, '330.00', 12, 'Bodega    Dante Robino\r\nMarca    Novecento\r\nVariedad    Tinto\r\nVarietal    Malbec\r\nVolumen de la unidad    750 mL\r\nTipo de envase    Botella\r\nFormato de venta    Unidad\r\nUnidades por pack', '1650235714789-732759118imageProduct.jpg'),
(6, 'Torrontés Capriccio Dolcezza', 3, '750.00', 16, 'Bodega: Dante Robino\r\nTipo de producto: Vino espumante\r\nAño: 2019\r\nVariedad de espumante: Dulce\r\nGraduación alcohólica: 16 %\r\nVolumen de la unidad: 750 mL\r\nFormato de venta: Pack\r\nUnidades por pack: 6\r\nIncluye estuche: No\r\nRegión de origen: Luján de Cuyo\r\nPaís de origen: Argentina\r\nTiempo en barrica: 36 meses\r\nUsos recomendados: postres,dulces\r\nEs orgánico: No\r\nTemperatura ideal de consumo: 16 °C\r\nProhibida su venta a menores de 18 años: Si', '1647210607249-598732110imageProduct'),
(7, 'Vino Santa Julia Rose 750 Ml Rosado Botella', 4, '556.00', 13, 'Bodega    Santa Julia\r\nMarca    Santa Julia\r\nLínea    Rose\r\nVariedad    Rosado\r\nVarietal    Syrah\r\nVolumen de la unidad    750 mL\r\nTipo de envase    Botella\r\nFormato de venta    Unidad\r\nUnidades por pack    1', '1650236178575-426141578imageProduct.jpg'),
(8, 'Vino Saint Felicien Rose', 4, '5500.00', 13, 'Es un vino fresco, color rosa pálido con reflejos cobrizos.\r\nEn nariz presenta dejos a hierbas mediterráneas, con notas de tomillo, azahar y pimienta rosa junto a frutilla y pomelo rosado.\r\nEn boca es fresco, elegante y ligero. Las notas florales y frutales dejan un largo y grato recuerdo', '1650236327492-527779498imageProduct.png'),
(9, 'Torrontés Cafayate Reserve bodega Etchart 750', 3, '641.00', 14, ' Vino blanco Torrontés Cafayate Reserve bodega Etchart 750 ml\r\n', '1650236642125-468524291imageProduct.jpg'),
(10, 'Rutini Vin Doux Naturel.', 3, '2856.00', 12, 'Es un vino naturalmente dulce que se obtiene a partir de la sobremaduración de las uvas (cosecha tardía) que junto a una Botrytis noble resulta en un vino de intenso aroma y una complejidad excepcional.\r\nLa Botritys afecta el racimo deshidratando al extremo cada grano permitiendo en simultáneo el máximo incremento del nivel de azúcar de las uvas. El resultado es un vino de aroma singular manzana verde, membrillos horneados, miel, almendras tostadas.', '1650236728672-490347570imageProduct.png'),
(11, 'Blasfemia Blanco en lata 269ml', 3, '715.00', 16, 'Bodega    Origin Wines\r\nMarca    Blasfemia\r\nVariedad    Blanco\r\nVarietal    Chenin blanc/Torrontés\r\nVolumen de la unidad    269 mL\r\nTipo de envase    Lata\r\nFormato de venta    Unidad\r\nUnidades por pack    1', '1650236854977-108883628imageProduct.jpg'),
(12, 'Lagarde Dolce Espumante', 1, '7000.00', 7, 'Bodega: Lagarde\r\nTipo de producto: Vino espumante\r\nAño: 2019\r\nVariedad de espumante: Moscato Bianco\r\nVarietal: Moscato Bianco\r\nGraduación alcohólica: 7.2 %\r\nVolumen de la unidad: 750 mL\r\nFormato de venta: Unidad\r\nUnidades por pack: 6\r\nIncluye estuche: No\r\nRegión de origen: Luján de Cuyo\r\nPaís de origen: Argentina\r\nTiempo en barrica: 0 años\r\nUsos recomendados: Postres\r\nEs orgánico: No\r\nTemperatura ideal de consumo: 7 °C\r\nProhibida su venta a menores de 18 años: Sí', '1650236958339-897086417imageProduct.png'),
(13, 'Frizee Blue 1000 ml', 1, '289.00', 10, 'Bodega: Frizze\r\nTipo de producto: Vino espumante\r\nVariedad de espumante: Dulce\r\nVolumen de la unidad: 1000 mL\r\nFormato de venta: Unidad\r\nIncluye estuche: No\r\nRegión de origen: Argentina\r\nPaís de origen: Argentina\r\nUsos recomendados: Carnes\r\nEs orgánico: No\r\nTemperatura ideal de consumo: 8 °C\r\nProhibida su venta a menores de 18 años: Sí', '1650237090727-47251513imageProduct.jpg'),
(14, 'Martini Vino Espumante', 1, '2190.00', 11, 'Bodega: Martini\r\nTipo de producto: Vino espumante\r\nAño: 2020\r\nVariedad de espumante: Moscato Bianco\r\nVolumen de la unidad: 750 mL\r\nFormato de venta: Unidad\r\nIncluye estuche: No\r\nRegión de origen: Piamonte\r\nPaís de origen: Italia\r\nTiempo en barrica: 7 meses\r\nUsos recomendados: celebraciones\r\nEs orgánico: No\r\nTemperatura ideal de consumo: 16 °C\r\nProhibida su venta a menores de 18 años: Sí', '1650237218668-696239514imageProduct.jpg'),
(15, 'Set De Vino Destapador 4 Piezas Regalo Empresarial', 5, '1199.00', 0, 'SET PARA VINO 4 PIEZAS\r\nEn Caja de Carton Rígido\r\n\r\n\r\nSi necesita hacer un regalo original y práctico a un amigo o familiar,\r\nte proponemos el set de accesorios para vino de 4 Piezas.\r\nEs una Elegante caja de Negra de Carton Rigido con set 4 piezas para vino.\r\nLa Parte superior de la caja es transparente.\r\nEl Set de Vino incluye Destapador, Anillo Antigoteo, Tapón dosificador y tapon.', '1650237274494-701610691imageProduct.jpg'),
(16, 'Botella Con Destapador 5 Acc Regalo Empresarial', 5, '2175.00', 0, 'Práctico y original estuche con forma de Botella de Vino Tamaño Real 3/4.\r\n- Con los 5 accesorios Necesarios para servir el Vino.\r\n- Para los verdaderos amantes del Vino.\r\n- El Regalo perfecto para inauguración de Viviendas, Cumpleaños, etc.\r\n- Ideal para Regalo Empresarial.\r\n- Imantado para un correcto cierre.\r\n- Piezas de Acero.\r\n- Color Negro.\r\n- Incluye 5 accesorios:\r\n. SACACORCHOS:\r\n. ANILLO ANTIGOTEO\r\n. TAPON\r\n. AIREADOR\r\n. VERTEDOR', '1650237930773-672711572imageProduct.jpg'),
(17, 'Regalo Caja Con Vino Copas Negras - Rutini', 5, '5200.00', 0, 'EL KIT INCLUYE\r\n-VINO RUTINI – CABERNET MALBEC\r\n-COPA DE DISEÑO NEGRA X 2\r\n-TARJETA CON DEDICATORIA\r\n-CAJA LACRADA CON CINTA Y MOÑO', '1650238207318-216895840imageProduct.jpg');

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
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `firstName`, `lastName`, `email`, `password`, `category`, `image`) VALUES
(1, 'alejo', 'aliberti', 'alibertialejo56@gmail.com', '$2a$10$tUrCQyLWCkNJgEQ3onm1guDOOZx8KsrVG6lwYTLuOr6.HMQwCCOkW', 'Admin', '1650224420756-501654895image.jpg'),
(2, 'juan', 'cabona', 'jdcabona@gmail.com', '$2a$10$q4LUE56/aQE9SZWJhjA1G.AacnOW8fu/9OlfV37D5y6DQQgXMU/7C', 'Admin', '1650235037565-310377093image.jpg'),
(3, 'pedro', 'flores', 'florespedromartin@gmail.com', '$2a$10$7TmeEUELQlp7srK22vUpFOA8Vp5vlmb7wnbgUWNqPhw05d.fJU/by', 'Admin', '1650235167901-299235586image.jpg');

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
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `types`
--
ALTER TABLE `types`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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

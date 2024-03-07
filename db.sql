-- SQL para generar todas las tablas necesarias en la base de datos.

-- inv.areas definition

CREATE TABLE `areas` (
  `idArea` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text DEFAULT NULL,
  PRIMARY KEY (`idArea`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- inv.usuarios definition

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `password` varchar(512) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- inv.categorias definition

CREATE TABLE `categorias` (
  `idCategoria` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(256) NOT NULL,
  PRIMARY KEY (`idCategoria`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- inv.sectores definition

CREATE TABLE `sectores` (
  `idSector` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `idArea` int(11) NOT NULL,
  PRIMARY KEY (`idSector`),
  KEY `sectores_FK` (`idArea`),
  CONSTRAINT `sectores_FK` FOREIGN KEY (`idArea`) REFERENCES `areas` (`idArea`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- inv.items definition

CREATE TABLE `items` (
  `idItem` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(256) NOT NULL,
  `sector` int(11) NOT NULL,
  `categoria` int(11) NOT NULL,
  `fechaAdquisicion` date DEFAULT NULL,
  `imagen` text DEFAULT NULL,
  PRIMARY KEY (`idItem`),
  KEY `items_FK` (`sector`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- inv.mantenimientos definition

CREATE TABLE `mantenimientos` (
  `idMantenimiento` int(11) NOT NULL AUTO_INCREMENT,
  `idItem` int(11) NOT NULL,
  `fecha` datetime NOT NULL DEFAULT current_timestamp(),
  `responsable` varchar(256) NOT NULL,
  `realizadoPor` varchar(256) NOT NULL,
  `descripcion` text NOT NULL,
  `observaciones` text NOT NULL,
  PRIMARY KEY (`idMantenimiento`),
  KEY `mantenimientos_FK` (`idItem`),
  CONSTRAINT `mantenimientos_FK` FOREIGN KEY (`idItem`) REFERENCES `items` (`idItem`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- inv.sessions definition

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) unsigned NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- POSTGRESQL VERSION
-- PostgreSQL 11.2 - 64-bits
--
-- POSTGIS VERSION
-- PostGIS 2.5
-- ***********************************************************************************

DROP VIEW  IF EXISTS Facturas;

DROP TABLE IF EXISTS Pedido_contiene_producto;
DROP TABLE IF EXISTS Pedido;
DROP TABLE IF EXISTS Producto;
DROP TABLE IF EXISTS Categoria;
DROP TABLE IF EXISTS Trabajador;
DROP TABLE IF EXISTS Tarjeta;
DROP TABLE IF EXISTS Cliente;
DROP TABLE IF EXISTS Sede;




DROP SEQUENCE IF EXISTS secuencia_sede;
DROP SEQUENCE IF EXISTS secuencia_producto;
DROP SEQUENCE IF EXISTS secuencia_pedido;
DROP SEQUENCE IF EXISTS secuencia_categoria;



DROP TRIGGER IF EXISTS tr_codificar_producto ON Producto;
DROP TRIGGER IF EXISTS tr_codificar_sede ON Sede;
DROP TRIGGER IF EXISTS tr_codificar_pedido ON Pedido;
DROP TRIGGER IF EXISTS tr_codificar_categoria ON Categoria;
DROP TRIGGER IF EXISTS tr_ingreso_trabajador ON Trabajador;

DROP FUNCTION IF EXISTS codificar_categoria;
DROP FUNCTION IF EXISTS codificar_pedido;
DROP FUNCTION IF EXISTS codificar_producto;
DROP FUNCTION IF EXISTS codificar_sede;
DROP FUNCTION IF EXISTS insertar_trabajador;


CREATE SEQUENCE secuencia_producto;
CREATE SEQUENCE secuencia_sede;
CREATE SEQUENCE secuencia_pedido;
CREATE SEQUENCE secuencia_categoria;


CREATE TABLE Cliente(
	cliente_celular   		   VARCHAR(20) NOT NULL,
	cliente_nombre   		   VARCHAR(20) NOT NULL,
	cliente_apellido   		   VARCHAR(20) NOT NULL,
	cliente_documento          VARCHAR(20) NOT NULL,
	cliente_direccion   	   VARCHAR(20) NOT NULL,
	cliente_fecha_nacimiento   DATE,
	cliente_password  		   VARCHAR(256) NOT NULL,
	
	CONSTRAINT pk_cliente PRIMARY KEY(cliente_celular)
);

CREATE TABLE Tarjeta(
	tarjeta_numero			   VARCHAR(30),
	tarjeta_cvc				   VARCHAR(3),
	tarjeta_vencimiento		   DATE,
	tarjeta_tipo			   INT,
	cliente_celular			   VARCHAR(20),
	
	CONSTRAINT pk_tarjeta PRIMARY KEY (tarjeta_numero),
	CONSTRAINT fk_tarjeta FOREIGN KEY (cliente_celular)
		REFERENCES Cliente(cliente_celular) ON UPDATE CASCADE ON DELETE RESTRICT
);
CREATE TABLE Sede(
	sede_id				   	   INT,
	sede_nombre   		       VARCHAR(20) NOT NULL,
	sede_direccion   	       VARCHAR(20) NOT NULL,
	sede_ciudad				   VARCHAR(20) NOT NULL,
	
	CONSTRAINT pk_sede PRIMARY KEY(sede_id)
);

CREATE TABLE Trabajador(
	trabajador_documento 	   VARCHAR(20) NOT NULL,
	trabajador_nombre   	   VARCHAR(20) NOT NULL,
	trabajador_apellido   	   VARCHAR(20) NOT NULL,
	trabajador_celular		   VARCHAR(20) NOT NULL,
	trabajador_foto			   VARCHAR(20) NOT NULL,
	trabajador_contratacion    DATE,
	trabajador_cargo		   VARCHAR(30) NOT NULL,
	trabajador_direccion       VARCHAR(20) NOT NULL,
	trabajador_password 	   VARCHAR(256) NOT NULL,
	sede_id					   INT,
	
	CONSTRAINT pk_trabajador PRIMARY KEY(trabajador_documento),
	CONSTRAINT fk_trabajador FOREIGN KEY(sede_id)
		REFERENCES Sede(sede_id) ON UPDATE CASCADE ON DELETE SET NULL
);

CREATE TABLE Categoria(
	categoria_id 			   INT,
	categoria_nombre 		   VARCHAR(20) NOT NULL,
	categoria_descripcion      VARCHAR(200) NOT NULL,
	
	CONSTRAINT pk_categoria PRIMARY KEY(categoria_id)
);

CREATE TABLE Producto(
	producto_codigo			   INT,
	producto_nombre			   VARCHAR(20) NOT NULL,
	producto_descripcion	   VARCHAR(200) NOT NULL,
	producto_imagen			   VARCHAR(200) NOT NULL,
	producto_existencias       INT,
	producto_precio			   INT,
	producto_descuento         INT,
	producto_iva			   INT,
	categoria_id			   INT,
	
	CONSTRAINT pk_producto PRIMARY KEY (producto_codigo),
	CONSTRAINT fk_producto FOREIGN KEY (categoria_id)
		REFERENCES Categoria(categoria_id) ON UPDATE CASCADE ON DELETE SET NULL
);

CREATE TABLE Pedido(
	pedido_id				   INT,
	sede_id					   INT,
	cliente_celular            VARCHAR(20),
	
	
	CONSTRAINT pk_pedido PRIMARY KEY(pedido_id),
	CONSTRAINT fk_pedido_sede FOREIGN KEY(sede_id)
		REFERENCES Sede(sede_id) ON UPDATE CASCADE ON DELETE RESTRICT,
	CONSTRAINT fk_pedido_cliente FOREIGN KEY(cliente_celular)
		REFERENCES Cliente(cliente_celular) ON UPDATE CASCADE ON DELETE NO ACTION
	
);

CREATE TABLE Pedido_contiene_producto(
	pedido_cp_cantidad		   INT,
	pedido_cp_precio	       INT,
	pedido_id				   INT,
	producto_codigo			   INT,
	
	CONSTRAINT pk_pedido_cp PRIMARY KEY(pedido_id,producto_codigo),
	
	CONSTRAINT fk_pedido_cp_pedido FOREIGN KEY(pedido_id)
		REFERENCES Pedido(pedido_id) ON UPDATE CASCADE ON DELETE RESTRICT,
		
	CONSTRAINT fk_pedido_cop_producto FOREIGN KEY(producto_codigo)
		REFERENCES Producto(producto_codigo) ON UPDATE CASCADE ON DELETE NO ACTION
);

-- ************************************************************************************

-- ************************PROCEDIMIENTOS ALMACENADOS**********************************



CREATE FUNCTION codificar_producto() RETURNS TRIGGER AS $$
DECLARE
BEGIN
	NEW.producto_codigo := NEXTVAL('secuencia_producto');
	RETURN NEW;
END
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_codificar_producto BEFORE INSERT 
ON Producto FOR EACH ROW 
EXECUTE PROCEDURE codificar_producto();

-- ************************************************************************************

CREATE FUNCTION codificar_sede() RETURNS TRIGGER AS $$
DECLARE
BEGIN
	NEW.sede_id := NEXTVAL('secuencia_sede');
	RETURN NEW;
END
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_codificar_sede BEFORE INSERT 
ON Sede FOR EACH ROW 
EXECUTE PROCEDURE codificar_sede();

-- ************************************************************************************

CREATE FUNCTION codificar_pedido() RETURNS TRIGGER AS $$
DECLARE
BEGIN
	NEW.pedido_id := NEXTVAL('secuencia_pedido');
	RETURN NEW;
END
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_codificar_pedido BEFORE INSERT 
ON Pedido FOR EACH ROW 
EXECUTE PROCEDURE codificar_pedido();



-- ************************************************************************************
CREATE FUNCTION codificar_categoria() RETURNS TRIGGER AS $$
DECLARE
BEGIN
	NEW.categoria_id := NEXTVAL('secuencia_categoria');
	RETURN NEW;
END
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_codificar_categoria BEFORE INSERT
ON Categoria FOR EACH ROW
EXECUTE PROCEDURE codificar_categoria();



-- ************************************************************************************
CREATE FUNCTION insertar_trabajador() RETURNS TRIGGER AS $$
DECLARE
BEGIN
	NEW.trabajador_contratacion :=  current_date;
	RETURN NEW;
END
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_insertar_trabajador BEFORE INSERT
ON Trabajador FOR EACH ROW
EXECUTE PROCEDURE insertar_trabajador();
-- ************************************************************************************


INSERT INTO Sede(sede_nombre,sede_direccion,sede_ciudad) VALUES('Sede Costa','Carrera 1 # 5-30','Cali');

INSERT INTO Cliente(cliente_celular,cliente_nombre,cliente_apellido,cliente_documento,cliente_direccion,cliente_fecha_nacimiento,cliente_password)
VALUES('3166891624','Cristian','Pascumal','1113696488','Carrera 4 # 7-10','30-03-1999','3031999c');

INSERT INTO Categoria(categoria_nombre,categoria_descripcion) VALUES ('Pizzas','Las pizzas de la sede costa');

INSERT INTO Categoria(categoria_nombre,categoria_descripcion) VALUES ('Hamburguesas','Las hamburguesas de la sede costa');

INSERT INTO Pedido(sede_id,cliente_celular) VALUES (1,'3166891624');

INSERT INTO Producto(producto_nombre,producto_descripcion,producto_imagen,producto_existencias,producto_precio,producto_descuento,producto_iva,categoria_id)
 VALUES ('Pizza','Deliciosa pizza de champiñones','pizza.jpg',10,50,5,16,1);

INSERT INTO Producto(producto_nombre,producto_descripcion,producto_imagen,producto_existencias,producto_precio,producto_descuento,producto_iva,categoria_id)
 VALUES ('Hamburguesa','Deliciosa hamburguesa americana','burguer.jpg',10,100,5,16,2);

INSERT INTO Pedido_contiene_producto (pedido_cp_cantidad,pedido_cp_precio,pedido_id,producto_codigo) VALUES (2,500,1,1);

INSERT INTO Pedido_contiene_producto (pedido_cp_cantidad,pedido_cp_precio,pedido_id,producto_codigo) VALUES (1,100,1,2);

INSERT INTO Trabajador(trabajador_documento,sede_id,trabajador_nombre,trabajador_apellido,trabajador_celular,trabajador_foto,trabajador_cargo,trabajador_direccion,trabajador_password)
 VALUES('13063664','1','Luis','Pascumal','3178145209','trabajador.jpg','ADMIN','Calle 7','3031999');


--FACTURAS:

CREATE VIEW FACTURAS AS (SELECT DISTINCT sede_id,sede_nombre,sede_direccion,pedido_id,cliente_celular,cliente_nombre,cliente_direccion, SUM(pedido_cp_precio) AS costo_pedido FROM pedido NATURAL JOIN pedido_contiene_producto NATURAL JOIN Cliente NATURAL JOIN Sede GROUP BY sede_id,sede_nombre,sede_direccion,cliente_celular,pedido_id,cliente_nombre,cliente_direccion);




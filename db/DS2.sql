DROP VIEW IF EXISTS Facturas;
DROP VIEW IF EXISTS Pago_Facturas;

DROP TABLE IF EXISTS Pedido_contiene_productos;
DROP TABLE IF EXISTS Pedidos;
DROP TABLE IF EXISTS Productos;
DROP TABLE IF EXISTS Categorias;
DROP TABLE IF EXISTS Trabajadores;
DROP TABLE IF EXISTS Tarjetas;
DROP TABLE IF EXISTS Pagos;
DROP TABLE IF EXISTS Clientes;
DROP TABLE IF EXISTS Sedes;




DROP SEQUENCE IF EXISTS secuencia_sedes;
DROP SEQUENCE IF EXISTS secuencia_productos;
DROP SEQUENCE IF EXISTS secuencia_pedidos;
DROP SEQUENCE IF EXISTS secuencia_categorias;
DROP SEQUENCE IF EXISTS secuencia_clientes;
DROP SEQUENCE IF EXISTS secuencia_trabajadores;
DROP SEQUENCE IF EXISTS secuencia_pagos;


DROP TRIGGER IF EXISTS tr_codificar_producto ON Productos;
DROP TRIGGER IF EXISTS tr_codificar_sede ON Sedes;
DROP TRIGGER IF EXISTS tr_codificar_pedido ON Pedidos;
DROP TRIGGER IF EXISTS tr_codificar_categoria ON Categorias;
DROP TRIGGER IF EXISTS tr_ingreso_trabajador ON Trabajadores;
DROP TRIGGER IF EXISTS tr_codificar_trabajador ON Trabajadores;
DROP TRIGGER IF EXISTS tr_codificar_cliente ON Clientes;
DROP TRIGGER IF EXISTS tr_codificar_pago ON Pagos;


DROP FUNCTION IF EXISTS codificar_categoria;
DROP FUNCTION IF EXISTS codificar_pedido;
DROP FUNCTION IF EXISTS codificar_producto;
DROP FUNCTION IF EXISTS codificar_cliente;
DROP FUNCTION IF EXISTS codificar_sede;
DROP FUNCTION IF EXISTS codificar_pago;
DROP FUNCTION IF EXISTS insertar_trabajador;



CREATE SEQUENCE secuencia_productos;
CREATE SEQUENCE secuencia_sedes;
CREATE SEQUENCE secuencia_pedidos;
CREATE SEQUENCE secuencia_categorias;
CREATE SEQUENCE secuencia_trabajadores;
CREATE SEQUENCE secuencia_clientes;
CREATE SEQUENCE secuencia_pagos;


CREATE TABLE Clientes(
	cliente_id				   INT,
	cliente_celular   		   VARCHAR(20) NOT NULL UNIQUE,
	cliente_nombre   		   VARCHAR(20) NOT NULL,
	cliente_apellido   		   VARCHAR(20) NOT NULL,
	cliente_documento          VARCHAR(20) NOT NULL,
	cliente_direccion   	   VARCHAR(20) NOT NULL,
	cliente_fecha_nacimiento   DATE,
	cliente_password  		   VARCHAR(256) NOT NULL,
	cliente_estado			   INT DEFAULT 1,
	cliente_foto			   VARCHAR(200),
	
	CONSTRAINT pk_cliente PRIMARY KEY(cliente_id)
);

CREATE TABLE Tarjetas(
	tarjeta_numero			   VARCHAR(30),
	tarjeta_cvc				   VARCHAR(3),
	tarjeta_vencimiento		   DATE,
	tarjeta_tipo			   INT,
	cliente_id			       INT,
	
	CONSTRAINT pk_tarjeta PRIMARY KEY (tarjeta_numero),
	CONSTRAINT fk_tarjeta FOREIGN KEY (cliente_id)
		REFERENCES Clientes(cliente_id) ON UPDATE CASCADE ON DELETE CASCADE
);
CREATE TABLE Sedes(
	sede_id				   	   INT,
	sede_nombre   		       VARCHAR(20) NOT NULL,
	sede_direccion   	       VARCHAR(20) NOT NULL,
	sede_ciudad				   VARCHAR(20) NOT NULL,
	sede_horario_apertura      TIME,
    sede_horario_cierre        TIME,
    sede_estado				   INT DEFAULT 1,
    
	
	CONSTRAINT pk_sede PRIMARY KEY(sede_id)
);

CREATE TABLE Trabajadores(
	trabajador_id 			   INT,
	trabajador_documento 	   VARCHAR(20) NOT NULL UNIQUE,
	trabajador_nombre   	   VARCHAR(20) NOT NULL,
	trabajador_apellido   	   VARCHAR(20) NOT NULL,
	trabajador_celular		   VARCHAR(20) NOT NULL,
	trabajador_foto			   VARCHAR(200) NOT NULL,
	trabajador_contratacion    DATE,
	trabajador_cargo		   VARCHAR(30) NOT NULL,
	trabajador_direccion       VARCHAR(20) NOT NULL,
	trabajador_password 	   VARCHAR(256) NOT NULL,
	trabajador_estado		   INT DEFAULT 1,
	sede_id					   INT,
	
	CONSTRAINT pk_trabajador PRIMARY KEY(trabajador_id),
	CONSTRAINT fk_trabajador FOREIGN KEY(sede_id)
		REFERENCES Sedes(sede_id) ON UPDATE CASCADE ON DELETE SET NULL
);

CREATE TABLE Categorias(
	categoria_id 			   INT,
	categoria_nombre 		   VARCHAR(20) NOT NULL,
	categoria_descripcion      VARCHAR(200) NOT NULL,
	categoria_estado		   INT DEFAULT 1,
	
	CONSTRAINT pk_categoria PRIMARY KEY(categoria_id)
);

CREATE TABLE Productos(
	producto_codigo			   INT,
	producto_nombre			   VARCHAR(20) NOT NULL,
	producto_descripcion	   VARCHAR(200) NOT NULL,
	producto_imagen			   VARCHAR(200) NOT NULL,
	producto_existencias       INT,
	producto_precio			   INT,
	producto_descuento         INT,
	producto_iva			   INT,
	producto_estado			   INT DEFAULT 1,
	categoria_id			   INT DEFAULT 1,
	
	CONSTRAINT pk_producto PRIMARY KEY (producto_codigo),
	CONSTRAINT fk_producto FOREIGN KEY (categoria_id)
		REFERENCES Categorias(categoria_id) ON UPDATE CASCADE ON DELETE SET DEFAULT
);

CREATE TABLE Pedidos(
	pedido_id				   INT,
	pedido_estado			   INT DEFAULT 1,
	sede_id					   INT,
	cliente_id            	   INT,
	
	
	CONSTRAINT pk_pedido PRIMARY KEY(pedido_id),
	CONSTRAINT fk_pedido_sede FOREIGN KEY(sede_id)
		REFERENCES Sedes(sede_id) ON UPDATE CASCADE ON DELETE RESTRICT,
	CONSTRAINT fk_pedido_cliente FOREIGN KEY(cliente_id)
		REFERENCES Clientes(cliente_id) ON UPDATE CASCADE ON DELETE SET NULL 
	
);

CREATE TABLE Pedido_contiene_productos(
	pedido_cp_cantidad		   INT,
	pedido_cp_precio	       INT,
	pedido_id				   INT,
	producto_codigo			   INT,
	
	CONSTRAINT pk_pedido_cp PRIMARY KEY(pedido_id,producto_codigo),
	
	CONSTRAINT fk_pedido_cp_pedido FOREIGN KEY(pedido_id)
		REFERENCES Pedidos(pedido_id) ON UPDATE CASCADE ON DELETE RESTRICT,
		
	CONSTRAINT fk_pedido_cp_producto FOREIGN KEY(producto_codigo)
		REFERENCES Productos(producto_codigo) ON UPDATE CASCADE ON DELETE RESTRICT
);

CREATE TABLE Pagos(
	pago_numero_transaccion	   INT,
	pago_fecha				   DATE,
	pago_valor				   INT,
	pago_cuotas				   INT,
	pedido_id				   INT,
	tarjeta_numero			   VARCHAR(20),               
	
	CONSTRAINT pk_pago	PRIMARY KEY(pago_numero_transaccion),
	
	CONSTRAINT fk_pago_pedido FOREIGN KEY(pedido_id)
		REFERENCES Pedidos(pedido_id) ON UPDATE CASCADE ON DELETE RESTRICT,
		
	CONSTRAINT fk_pago_tarjeta FOREIGN KEY(tarjeta_numero)
		REFERENCES Tarjetas(tarjeta_numero) ON UPDATE CASCADE ON DELETE RESTRICT
);


-- ************************************************************************************

-- ************************PROCEDIMIENTOS ALMACENADOS**********************************


-- ************************************************************************************




CREATE FUNCTION codificar_pago() RETURNS TRIGGER AS $$
DECLARE
BEGIN
	NEW.pago_numero_transaccion := NEXTVAL('secuencia_pagos');
	NEW.pago_fecha := current_date ;
	RETURN NEW;
END
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_codificar_pago BEFORE INSERT 
ON Pagos FOR EACH ROW 
EXECUTE PROCEDURE codificar_pago();



-- ************************************************************************************




CREATE FUNCTION codificar_cliente() RETURNS TRIGGER AS $$
DECLARE
BEGIN
	NEW.cliente_id := NEXTVAL('secuencia_clientes');
	RETURN NEW;
END
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_codificar_cliente BEFORE INSERT 
ON Clientes FOR EACH ROW 
EXECUTE PROCEDURE codificar_cliente();

-- ************************************************************************************




CREATE FUNCTION codificar_producto() RETURNS TRIGGER AS $$
DECLARE
BEGIN
	NEW.producto_codigo := NEXTVAL('secuencia_productos');
	RETURN NEW;
END
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_codificar_producto BEFORE INSERT 
ON Productos FOR EACH ROW 
EXECUTE PROCEDURE codificar_producto();

-- ************************************************************************************

CREATE FUNCTION codificar_sede() RETURNS TRIGGER AS $$
DECLARE
BEGIN
	NEW.sede_id := NEXTVAL('secuencia_sedes');
	RETURN NEW;
END
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_codificar_sede BEFORE INSERT 
ON Sedes FOR EACH ROW 
EXECUTE PROCEDURE codificar_sede();

-- ************************************************************************************

CREATE FUNCTION codificar_pedido() RETURNS TRIGGER AS $$
DECLARE
BEGIN
	NEW.pedido_id := NEXTVAL('secuencia_pedidos');
	RETURN NEW;
END
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_codificar_pedido BEFORE INSERT 
ON Pedidos FOR EACH ROW 
EXECUTE PROCEDURE codificar_pedido();



-- ************************************************************************************
CREATE FUNCTION codificar_categoria() RETURNS TRIGGER AS $$
DECLARE
BEGIN
	NEW.categoria_id := NEXTVAL('secuencia_categorias');
	RETURN NEW;
END
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_codificar_categoria BEFORE INSERT
ON Categorias FOR EACH ROW
EXECUTE PROCEDURE codificar_categoria();



-- ************************************************************************************
CREATE FUNCTION insertar_trabajador() RETURNS TRIGGER AS $$
DECLARE
BEGIN
	NEW.trabajador_contratacion :=  current_date;
	NEW.trabajador_id := NEXTVAL('secuencia_trabajadores');
	RETURN NEW;
END
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_insertar_trabajador BEFORE INSERT
ON Trabajadores FOR EACH ROW
EXECUTE PROCEDURE insertar_trabajador();
-- ************************************************************************************


INSERT INTO Sedes(sede_nombre,sede_direccion,sede_ciudad, sede_horario_apertura, sede_horario_cierre) VALUES('Sede Costa','Carrera 1 # 5-30','Cali','07:00 AM', '08:00 PM');

INSERT INTO Clientes(cliente_celular,cliente_nombre,cliente_apellido,cliente_documento,cliente_direccion,cliente_fecha_nacimiento,cliente_password,cliente_foto)
VALUES('3166891624','Humberto','Mora','1113696488','Carrera 4 # 7-10','30-03-1999','$2b$10$h71Ta5uixXRBIMcxMFacUe2lCPgS3yFYfKdIXlQewZVWRqjiU57Fi','http://ciencias.univalle.edu.co/images/imagenes/profesores/matematicas/humbertoMora.gif');

INSERT INTO Categorias(categoria_nombre,categoria_descripcion) VALUES ('Pizzas','Las pizzas de la sede costa');

INSERT INTO Categorias(categoria_nombre,categoria_descripcion) VALUES ('Hamburguesas','Las hamburguesas de la sede costa');

INSERT INTO Pedidos(sede_id,cliente_id) VALUES (1,1);

INSERT INTO Productos(producto_nombre,producto_descripcion,producto_imagen,producto_existencias,producto_precio,producto_descuento,producto_iva,categoria_id)
 VALUES ('Pizza','Deliciosa pizza de champiñones','pizza.jpg',10,50,5,16,1);

INSERT INTO Productos(producto_nombre,producto_descripcion,producto_imagen,producto_existencias,producto_precio,producto_descuento,producto_iva,categoria_id)
 VALUES ('Hamburguesa','Deliciosa hamburguesa americana','burguer.jpg',10,100,5,16,2);

INSERT INTO Pedido_contiene_productos (pedido_cp_cantidad,pedido_cp_precio,pedido_id,producto_codigo) VALUES (2,500,1,1);

INSERT INTO Pedido_contiene_productos (pedido_cp_cantidad,pedido_cp_precio,pedido_id,producto_codigo) VALUES (1,100,1,2);

INSERT INTO Trabajadores(trabajador_documento,sede_id,trabajador_nombre,trabajador_apellido,trabajador_celular,trabajador_foto,trabajador_cargo,trabajador_direccion,trabajador_password)
 VALUES('13063664','1','Manuel','Chacon','3178145209','http://ciencias.univalle.edu.co/images/imagenes/profesores/fisica/Chacon.jpg','Admin','Calle 7','$2b$10$h71Ta5uixXRBIMcxMFacUe2lCPgS3yFYfKdIXlQewZVWRqjiU57Fi');

INSERT INTO Tarjetas (tarjeta_numero,tarjeta_cvc,tarjeta_vencimiento,tarjeta_tipo,cliente_id) VALUES (1111111111,456,'20-06-2021',0,1);

INSERT INTO Tarjetas (tarjeta_numero,tarjeta_cvc,tarjeta_vencimiento,tarjeta_tipo,cliente_id) VALUES (2222222222,482,'20-06-2022',0,1);


INSERT INTO Pagos (pago_valor,pago_cuotas,pedido_id,tarjeta_numero) VALUES (300,5,1,1111111111);
INSERT INTO Pagos (pago_valor,pago_cuotas,pedido_id,tarjeta_numero) VALUES (300,1,1,2222222222);



--FACTURAS:

CREATE VIEW FACTURAS AS (SELECT DISTINCT sede_id,sede_nombre,sede_direccion,pedido_id,cliente_celular,cliente_nombre,cliente_direccion, SUM(pedido_cp_precio) AS costo_pedido FROM pedidos NATURAL JOIN pedido_contiene_productos NATURAL JOIN Clientes NATURAL JOIN Sedes GROUP BY sede_id,sede_nombre,sede_direccion,cliente_celular,pedido_id,cliente_nombre,cliente_direccion);
CREATE VIEW PAGO_FACTURAS AS (SELECT pedido_id,pago_numero_transaccion,tarjeta_numero,pago_fecha,pago_valor FROM Pagos GROUP BY pedido_id,pago_numero_transaccion);

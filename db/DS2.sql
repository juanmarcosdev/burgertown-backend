DROP VIEW IF EXISTS Facturas;
DROP VIEW IF EXISTS Pago_Facturas;

DROP TABLE IF EXISTS Pagos;
DROP TABLE IF EXISTS Pedido_contiene_productos;
DROP TABLE IF EXISTS Pedidos;
DROP TABLE IF EXISTS Productos;
DROP TABLE IF EXISTS Categorias;
DROP TABLE IF EXISTS Trabajadores;
DROP TABLE IF EXISTS Tarjetas;
DROP TABLE IF EXISTS Clientes;
DROP TABLE IF EXISTS Sedes;




DROP SEQUENCE IF EXISTS secuencia_sedes;
DROP SEQUENCE IF EXISTS secuencia_productos;
DROP SEQUENCE IF EXISTS secuencia_pedidos;
DROP SEQUENCE IF EXISTS secuencia_categorias;
DROP SEQUENCE IF EXISTS secuencia_clientes;
DROP SEQUENCE IF EXISTS secuencia_trabajadores;
DROP SEQUENCE IF EXISTS secuencia_pagos;
DROP SEQUENCE IF EXISTS secuencia_tarjetas;


DROP TRIGGER IF EXISTS tr_codificar_producto ON Productos;
DROP TRIGGER IF EXISTS tr_codificar_sede ON Sedes;
DROP TRIGGER IF EXISTS tr_codificar_pedido ON Pedidos;
DROP TRIGGER IF EXISTS tr_codificar_categoria ON Categorias;
DROP TRIGGER IF EXISTS tr_ingreso_trabajador ON Trabajadores;
DROP TRIGGER IF EXISTS tr_codificar_trabajador ON Trabajadores;
DROP TRIGGER IF EXISTS tr_codificar_cliente ON Clientes;
DROP TRIGGER IF EXISTS tr_codificar_pago ON Pagos;
DROP TRIGGER IF EXISTS tr_codificar_tarjeta ON Tarjetas;
DROP TRIGGER IF EXISTS tr_agregar_productos_pedido ON pedido_contiene_productos;


DROP FUNCTION IF EXISTS codificar_categoria;
DROP FUNCTION IF EXISTS codificar_pedido;
DROP FUNCTION IF EXISTS codificar_producto;
DROP FUNCTION IF EXISTS codificar_cliente;
DROP FUNCTION IF EXISTS codificar_sede;
DROP FUNCTION IF EXISTS codificar_pago;
DROP FUNCTION IF EXISTS codificar_tarjeta;
DROP FUNCTION IF EXISTS insertar_trabajador;
DROP FUNCTION IF EXISTS agregar_productos_pedido;

CREATE SEQUENCE secuencia_productos;
CREATE SEQUENCE secuencia_sedes;
CREATE SEQUENCE secuencia_pedidos;
CREATE SEQUENCE secuencia_categorias;
CREATE SEQUENCE secuencia_trabajadores;
CREATE SEQUENCE secuencia_clientes;
CREATE SEQUENCE secuencia_pagos;
CREATE SEQUENCE secuencia_tarjetas;


CREATE TABLE Clientes(
	cliente_id				   INT,
	cliente_celular   		   VARCHAR(20) NOT NULL UNIQUE,
	cliente_nombre   		   VARCHAR(20) NOT NULL,
	cliente_apellido   		   VARCHAR(20) NOT NULL,
	cliente_documento          VARCHAR(20) NOT NULL,
	cliente_direccion   	   VARCHAR(255) NOT NULL,
	cliente_fecha_nacimiento   DATE,
	cliente_password  		   VARCHAR(256) NOT NULL,
	cliente_estado			   INT DEFAULT 1,
	cliente_foto			   VARCHAR(300),
	
	CONSTRAINT pk_cliente PRIMARY KEY(cliente_id)
);

CREATE TABLE Tarjetas(
	tarjeta_id 				   INT,
	tarjeta_numero			   VARCHAR(30),
	tarjeta_cvc				   VARCHAR(3),
	tarjeta_vencimiento		   DATE,
	tarjeta_tipo			   INT,
	cliente_id			       INT,
	
	CONSTRAINT pk_tarjeta PRIMARY KEY (tarjeta_id),
	CONSTRAINT fk_tarjeta FOREIGN KEY (cliente_id)
		REFERENCES Clientes(cliente_id) ON UPDATE CASCADE ON DELETE CASCADE
);
CREATE TABLE Sedes(
	sede_id				   	   INT,
	sede_nombre   		       VARCHAR(20) NOT NULL,
	sede_direccion   	       VARCHAR(255) NOT NULL,
	sede_ciudad				   VARCHAR(30) NOT NULL,
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
	producto_nombre			   VARCHAR(255) NOT NULL,
	producto_descripcion	   VARCHAR(255) NOT NULL,
	producto_imagen			   VARCHAR(255) NOT NULL,
	producto_existencias       INT,
	producto_precio			   FLOAT,
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
	pedido_costo			   FLOAT DEFAULT 0,
	sede_id					   INT,
	cliente_id            	   INT,
	
	
	
	CONSTRAINT pk_pedido PRIMARY KEY(pedido_id),
	CONSTRAINT fk_pedido_sede FOREIGN KEY(sede_id)
		REFERENCES Sedes(sede_id) ON UPDATE CASCADE ON DELETE RESTRICT,
	CONSTRAINT fk_pedido_cliente FOREIGN KEY(cliente_id)
		REFERENCES Clientes(cliente_id) ON UPDATE CASCADE ON DELETE SET NULL 
	
);

CREATE TABLE Pedido_contiene_productos(
	pedido_id				   INT,
	producto_codigo			   INT,
	pedido_cp_cantidad		   INT,
	pedido_cp_precio	       FLOAT,
	
	CONSTRAINT pk_pedido_cp PRIMARY KEY(pedido_id,producto_codigo),
	
	CONSTRAINT fk_pedido_cp_pedido FOREIGN KEY(pedido_id)
		REFERENCES Pedidos(pedido_id) ON UPDATE CASCADE ON DELETE RESTRICT,
		
	CONSTRAINT fk_pedido_cp_producto FOREIGN KEY(producto_codigo)
		REFERENCES Productos(producto_codigo) ON UPDATE CASCADE ON DELETE RESTRICT
);

CREATE TABLE Pagos(
	pago_numero_transaccion	   INT,
	pago_valor 				   FLOAT,
	pago_metodo	               INT,
	pago_porcentaje_pedido	   INT,
	pago_cuotas				   INT DEFAULT 1,
	pago_fecha                 DATE,
	tarjeta_id				   INT,
	pedido_id				   INT,
	             
	
	CONSTRAINT pk_pago	PRIMARY KEY(pago_numero_transaccion),
		
	CONSTRAINT fk_pago_tarjeta FOREIGN KEY(tarjeta_id)
		REFERENCES Tarjetas(tarjeta_id) ON UPDATE CASCADE ON DELETE RESTRICT,

	CONSTRAINT fk_pago_pedido FOREIGN KEY(pedido_id)
		REFERENCES Pedidos(pedido_id) ON UPDATE CASCADE ON DELETE RESTRICT
);
-- ************************************************************************************

-- ************************PROCEDIMIENTOS ALMACENADOS**********************************

-- ************************************************************************************




CREATE FUNCTION codificar_pago() RETURNS TRIGGER AS $$
DECLARE
	valor_pedido FLOAT;
BEGIN
	SELECT pedido_costo INTO valor_pedido
	FROM Pedidos
	WHERE pedido_id = NEW.pedido_id;

	NEW.pago_numero_transaccion := NEXTVAL('secuencia_pagos');
	NEW.pago_fecha := current_date ;
	NEW.pago_valor := (NEW.pago_porcentaje_pedido*valor_pedido)/100;




	RETURN NEW;
END
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_codificar_pago BEFORE INSERT 
ON Pagos FOR EACH ROW 
EXECUTE PROCEDURE codificar_pago();


-- ************************************************************************************

CREATE FUNCTION agregar_productos_pedido() RETURNS TRIGGER AS $$
	DECLARE
	old_total FLOAT;
	new_total FLOAT;
	p_precio FLOAT;
	p_descuento INT;
	p_iva INT;
BEGIN
	SELECT producto_precio,producto_iva,producto_descuento INTO p_precio,p_iva,p_descuento
	FROM Productos
	WHERE producto_codigo = NEW.producto_codigo;

	p_precio := p_precio- ((p_descuento*p_precio)/100) ;--APLICANDO DESCUENTO 
	NEW.pedido_cp_precio := p_precio + ((p_precio*p_iva)/100);


	SELECT pedido_costo INTO old_total 
	FROM Pedidos 
	WHERE pedido_id = NEW.pedido_id;

	new_total := old_total + (NEW.pedido_cp_cantidad * NEW.pedido_cp_precio);

	UPDATE Pedidos SET pedido_costo = new_total
	WHERE pedido_id = NEW.pedido_id;


	RETURN NEW;
END
$$LANGUAGE plpgsql;


CREATE TRIGGER tr_agregar_productos_pedido BEFORE INSERT
ON Pedido_contiene_productos FOR EACH ROW
EXECUTE PROCEDURE agregar_productos_pedido();

--******************************************************************************************************

CREATE FUNCTION codificar_tarjeta() RETURNS TRIGGER AS $$
DECLARE
BEGIN
	NEW.tarjeta_id := NEXTVAL('secuencia_tarjetas');

	RETURN NEW;
END
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_codificar_tarjeta BEFORE INSERT 
ON Tarjetas FOR EACH ROW 
EXECUTE PROCEDURE codificar_tarjeta();






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







-- ************************************************************************************


INSERT INTO Sedes(sede_nombre,sede_direccion,sede_ciudad, sede_horario_apertura, sede_horario_cierre) VALUES('Sede Costa','Carrera 1 # 5-30','Cali','07:00 AM', '08:00 PM');

INSERT INTO Clientes(cliente_celular,cliente_nombre,cliente_apellido,cliente_documento,cliente_direccion,cliente_fecha_nacimiento,cliente_password,cliente_foto)
VALUES('3166891624','Humberto','Mora','1113696488','Carrera 4 # 7-10','30-03-1999','$2b$10$h71Ta5uixXRBIMcxMFacUe2lCPgS3yFYfKdIXlQewZVWRqjiU57Fi','http://ciencias.univalle.edu.co/images/imagenes/profesores/matematicas/humbertoMora.gif');

-- INICIO CATEGORIAS

INSERT INTO Categorias(categoria_nombre,categoria_descripcion) VALUES ('Hamburguesas','Deliciosas hamburguesas con Carne Angus');

INSERT INTO Categorias(categoria_nombre,categoria_descripcion) VALUES ('Salchipapas','Las mejores salchipapas de Cali');

INSERT INTO Categorias(categoria_nombre,categoria_descripcion) VALUES ('Pizzas','Pizzas tradicionales de gran sabor');

INSERT INTO Categorias(categoria_nombre,categoria_descripcion) VALUES ('Perros calientes','Perros calientes de excelente calidad');

INSERT INTO Categorias(categoria_nombre,categoria_descripcion) VALUES ('Sandwiches','Sandwiches deliciosos con salsa de ajo');

-- FIN CATEGORIAS

-- INICIO PRODUCTOS

-- INICIO HAMBURGUESAS
INSERT INTO Productos(producto_nombre,producto_descripcion,producto_imagen,producto_existencias,producto_precio,producto_descuento,producto_iva,categoria_id) VALUES ('Hamburguesa sencilla','Deliciosa hamburguesa americana con carne Angus certificada 1/4 LIBRA, cebolla, lechuga, tomate y queso y papas a la francesa','https://cdn.pixabay.com/photo/2017/10/03/02/18/burger-2811118_960_720.jpg',100,6900,0,16,1);
INSERT INTO Productos(producto_nombre,producto_descripcion,producto_imagen,producto_existencias,producto_precio,producto_descuento,producto_iva,categoria_id) VALUES ('Hamburguesa Fin del Mundo','Deliciosa hamburguesa americana con carne Angus certificada 500 GR, cebolla, lechuga, tomate, queso, tocineta, pepinillos y papas a la francesa','https://cdn.pixabay.com/photo/2017/04/23/09/02/hamburger-2253344_960_720.jpg',100,26900,0,16,1);
INSERT INTO Productos(producto_nombre,producto_descripcion,producto_imagen,producto_existencias,producto_precio,producto_descuento,producto_iva,categoria_id) VALUES ('MayoBurguer','Deliciosa hamburguesa americana con carne Angus certificada 200 GR, lechuga, tomate, queso, cebolla, con salsa Mayonesa de la casa','https://cdn.pixabay.com/photo/2016/03/05/19/02/hamburger-1238246_960_720.jpg',100,9900,0,16,1);
INSERT INTO Productos(producto_nombre,producto_descripcion,producto_imagen,producto_existencias,producto_precio,producto_descuento,producto_iva,categoria_id) VALUES ('Hamburguesa Vegana','Deliciosa hamburguesa con carne de lentejas, lechuga, tomate, queso, pepinillos','https://cdn.pixabay.com/photo/2014/10/19/20/59/hamburger-494706_960_720.jpg',100,7900,0,16,1);
INSERT INTO Productos(producto_nombre,producto_descripcion,producto_imagen,producto_existencias,producto_precio,producto_descuento,producto_iva,categoria_id) VALUES ('MiniBurguer','Deliciosa hamburguesa americana con carne Angus certificada 150 GR, lechuga, tomate, queso, papas a la francesa y miniensalada','https://cdn.pixabay.com/photo/2015/12/08/00/26/food-1081707_960_720.jpg',100,5900,0,16,1);
INSERT INTO Productos(producto_nombre,producto_descripcion,producto_imagen,producto_existencias,producto_precio,producto_descuento,producto_iva,categoria_id) VALUES ('Hamburguesa TociPepinillo','Deliciosa hamburguesa americana con carne Angus certificada 250 GR, lechuga, tomate, queso, abundante cebolla, abundantes pepinillos y 100 GR de tocineta','https://cdn.pixabay.com/photo/2014/10/23/18/05/burger-500054_960_720.jpg',100,13900,0,16,1);
-- FIN HAMBURGUESAS

-- INICIO SALCHIPAPAS
INSERT INTO Productos(producto_nombre,producto_descripcion,producto_imagen,producto_existencias,producto_precio,producto_descuento,producto_iva,categoria_id) VALUES ('Mega Salchipapa','La más ambiciosa, para 4 personas, salchicha, papas a la francesa, ripio de papa, maíz tierno, pollo desmechado, carne desmechada, queso derretido','https://i.ibb.co/3rwyphL/delicious-giant-salchipapa.jpg',100,25900,0,16,2);
INSERT INTO Productos(producto_nombre,producto_descripcion,producto_imagen,producto_existencias,producto_precio,producto_descuento,producto_iva,categoria_id) VALUES ('SalchiChorizo con Huevo','Salchicha, papas a la francesa, Chorizo, y Huevo','https://i.ibb.co/Jxm81tD/Salchipapa-roasted-and-sliced-fresh-Peruvian-pork-sausage-fried-potato-on-wooden-background.jpg',100,9900,0,16,2);
INSERT INTO Productos(producto_nombre,producto_descripcion,producto_imagen,producto_existencias,producto_precio,producto_descuento,producto_iva,categoria_id) VALUES ('SalchiChorizo con Papa Amarilla y Lechuga','Salchicha, Papa amarilla, Chorizo y Lechuga','https://i.ibb.co/D7LTGp6/Salchipapa-fresh-grilled-and-sliced-Peruvian-pork-sausage-fried-potato-on-wooden-table.jpg',100,8900,0,16,2);
INSERT INTO Productos(producto_nombre,producto_descripcion,producto_imagen,producto_existencias,producto_precio,producto_descuento,producto_iva,categoria_id) VALUES ('Salchimayonesa','Salchicha, Papas a la francesa, Salsa mayonesa de la casa y hierbas finas','https://i.ibb.co/QcS8wCs/Homemade-Peruvian-Salchipapa-Fries-with-Sausage-Slices-Ketchup-and-Mayonnaise-Traditional-Food.jpg',100,7900,0,16,2);
INSERT INTO Productos(producto_nombre,producto_descripcion,producto_imagen,producto_existencias,producto_precio,producto_descuento,producto_iva,categoria_id) VALUES ('Salchipapa Grande','Salchichas y Papas acompañadas de Mostaza y Mayonesa al gusto','https://i.ibb.co/34fcLBZ/Traditional-homemade-Peruvian-Salchipapa-Fries-with-mayo-ketchup-and-mustard-sauces-French-fries-wit.jpg',100,6900,0,16,2);
INSERT INTO Productos(producto_nombre,producto_descripcion,producto_imagen,producto_existencias,producto_precio,producto_descuento,producto_iva,categoria_id) VALUES ('Salchipapa Kid','Salchipapas y Papas acompañadas de Mayonesa y Salsa de Tomate en el tamaño adecuado para tu campeón o campeona','https://i.ibb.co/R6NKb5P/Typical-Latin-America-Salchipapa-Sausages-with-fries-ketchup-mustard-and-mayo-in-iron-pan-on-yellow.jpg',100,5900,0,16,2);
-- FIN SALCHIPAPAS

-- INICIO PIZZAS
INSERT INTO Productos(producto_nombre,producto_descripcion,producto_imagen,producto_existencias,producto_precio,producto_descuento,producto_iva,categoria_id) VALUES ('Pizza de Pollo con Champiñones','Tradicional Pizza con Pollo y Champiñones frescos','https://cdn.pixabay.com/photo/2014/04/22/02/56/pizza-329523_960_720.jpg',100,16900,0,16,3);
INSERT INTO Productos(producto_nombre,producto_descripcion,producto_imagen,producto_existencias,producto_precio,producto_descuento,producto_iva,categoria_id) VALUES ('Pizza de Res con Albahaca','Pizza con trozos de res asados cubierto por hojas frescas de Albahaca','https://cdn.pixabay.com/photo/2017/09/30/15/10/pizza-2802332_960_720.jpg',100,17900,0,16,3);
INSERT INTO Productos(producto_nombre,producto_descripcion,producto_imagen,producto_existencias,producto_precio,producto_descuento,producto_iva,categoria_id) VALUES ('Pizza Vegetariana','Pizza con vegetales frescos: Tomate, Brócoli, Pepinillos, Cebolla, Japaleños','https://cdn.pixabay.com/photo/2014/05/18/11/25/pizza-346985_960_720.jpg',100,18900,0,16,3);
INSERT INTO Productos(producto_nombre,producto_descripcion,producto_imagen,producto_existencias,producto_precio,producto_descuento,producto_iva,categoria_id) VALUES ('Pizza Napolitana','La clásica Pizza Napolitana, con tomate, ajo, orégano y aceite de oliva','https://cdn.pixabay.com/photo/2017/02/15/10/57/pizza-2068272_960_720.jpg',100,14900,0,16,3);
INSERT INTO Productos(producto_nombre,producto_descripcion,producto_imagen,producto_existencias,producto_precio,producto_descuento,producto_iva,categoria_id) VALUES ('Pizza de la Casa','Horneada con mucho amor, con Albahaca, Orégano, Ajo y Salsa de Tomate','https://cdn.pixabay.com/photo/2016/02/19/11/30/pizza-1209748_960_720.jpg',100,19900,0,16,3);
INSERT INTO Productos(producto_nombre,producto_descripcion,producto_imagen,producto_existencias,producto_precio,producto_descuento,producto_iva,categoria_id) VALUES ('Pizza de Pepperoni','La clásica y más vendida, con Pepperoni Fresco, queso y salsa de tomate','https://cdn.pixabay.com/photo/2016/03/05/21/45/pizza-1239077_960_720.jpg',100,20900,0,16,3);
-- FIN PIZZAS

-- INICIO PERROS
INSERT INTO Productos(producto_nombre,producto_descripcion,producto_imagen,producto_existencias,producto_precio,producto_descuento,producto_iva,categoria_id) VALUES ('Bacon HotDog','Un clásico perro caliente con mayonesa, salsa de tomate, mayonesa, cebolla y deliciosos trozos de tocineta','https://cdn.pixabay.com/photo/2020/06/24/22/45/hot-dog-5337929_960_720.jpg',100,9900,0,16,4);
INSERT INTO Productos(producto_nombre,producto_descripcion,producto_imagen,producto_existencias,producto_precio,producto_descuento,producto_iva,categoria_id) VALUES ('Hot Dog Gourmet','El concepto de HotDog llevado a un siguiente nivel en la escala culinaria, con lechuga fresca, tomate, tocineta, salchicha premium y finas hierbas','https://cdn.pixabay.com/photo/2017/03/10/13/49/fast-food-2132863_960_720.jpg',100,17900,0,16,4);
INSERT INTO Productos(producto_nombre,producto_descripcion,producto_imagen,producto_existencias,producto_precio,producto_descuento,producto_iva,categoria_id) VALUES ('Banana HotDog','La deconstrucción más bizarra del famoso platillo americano','https://cdn.pixabay.com/photo/2016/09/13/20/15/hot-dog-1668141_960_720.jpg',100,5900,0,16,4);
INSERT INTO Productos(producto_nombre,producto_descripcion,producto_imagen,producto_existencias,producto_precio,producto_descuento,producto_iva,categoria_id) VALUES ('Cheese HotDog','El clásico HotDog, pero con queso derretido y un par de cebollas caramelizadas','https://cdn.pixabay.com/photo/2017/06/24/05/26/hot-dog-2436748_960_720.jpg',100,13900,0,16,4);
INSERT INTO Productos(producto_nombre,producto_descripcion,producto_imagen,producto_existencias,producto_precio,producto_descuento,producto_iva,categoria_id) VALUES ('HotDog sencillo','El tradicional acompañado de pan fino, salchicha seleccionada y salsa de tomate con mostaza','https://cdn.pixabay.com/photo/2012/03/02/11/00/hot-dog-21074_960_720.jpg',100,7900,0,16,4);
INSERT INTO Productos(producto_nombre,producto_descripcion,producto_imagen,producto_existencias,producto_precio,producto_descuento,producto_iva,categoria_id) VALUES ('HotDog Mega','Un HotDog clásico, pero con salchicha tamaño XXL, y acompañado de deliciosas papas a la francesa','https://cdn.pixabay.com/photo/2016/03/05/21/45/pizza-1239077_960_720.jpg',100,15900,0,16,4);
-- FIN PERROS

-- INICIO SANDWICHES
INSERT INTO Productos(producto_nombre,producto_descripcion,producto_imagen,producto_existencias,producto_precio,producto_descuento,producto_iva,categoria_id) VALUES ('Sandwich Tradicional','El clásico, el que hacia mamá en sanduchera, pero llevado a un nivel de alta culinaria, sencillo con lechuga, jamón y queso','https://cdn.pixabay.com/photo/2016/11/29/04/00/bread-1867208_960_720.jpg',100,5900,0,16,5);
INSERT INTO Productos(producto_nombre,producto_descripcion,producto_imagen,producto_existencias,producto_precio,producto_descuento,producto_iva,categoria_id) VALUES ('Sandwich Ensalada','¿Quien dijo que no podiamos comer sano en la clasica presentacion de Sandwich? Este ejemplar tiene tomate, lechuga fresca, queso, fresa y pan integral','https://cdn.pixabay.com/photo/2019/04/08/18/35/sandwich-4112566_960_720.jpg',100,7900,0,16,5);
INSERT INTO Productos(producto_nombre,producto_descripcion,producto_imagen,producto_existencias,producto_precio,producto_descuento,producto_iva,categoria_id) VALUES ('Sandwich Desayuno','Un clásico emparedado para comenzar el día con abundante cebolla larga, huevo cocido en trozos, tomate, hierbas y pepinillos','https://cdn.pixabay.com/photo/2018/06/21/15/07/bread-3488727_960_720.jpg',100,8900,0,16,5);
INSERT INTO Productos(producto_nombre,producto_descripcion,producto_imagen,producto_existencias,producto_precio,producto_descuento,producto_iva,categoria_id) VALUES ('Sandwich 4 pisos','El Concepto tradicional deconstruido junto con un concepto que viene de su hermana la Hamburguesa, 4 pisos de pan separados por abundante queso, jamón, lechuga, tomate y pepinillos','https://cdn.pixabay.com/photo/2017/05/10/17/27/sandwich-2301387_960_720.jpg',100,12900,0,16,5);
INSERT INTO Productos(producto_nombre,producto_descripcion,producto_imagen,producto_existencias,producto_precio,producto_descuento,producto_iva,categoria_id) VALUES ('Mini Sandwich','El clásico Sandwichito que le empacarías a tu hijo para ir al colegio, pero mucho más gourmet y adecuado para el consumo de menores','https://cdn.pixabay.com/photo/2014/09/18/21/17/sandwich-451403_960_720.jpg',100,3900,0,16,5);
INSERT INTO Productos(producto_nombre,producto_descripcion,producto_imagen,producto_existencias,producto_precio,producto_descuento,producto_iva,categoria_id) VALUES ('Sandwich de Huevo','Un delicioso Sandwich que te dejará sin hambre, con tomate, tocineta, aguacate, huevo revuelto y pan fresco','https://cdn.pixabay.com/photo/2016/08/23/23/11/egg-1615790_960_720.jpg',100,13900,0,16,5);
-- FIN SANDWICHES

-- FIN PRODUCTOS

INSERT INTO Pedidos(sede_id,cliente_id) VALUES (1,1);

INSERT INTO Pedido_contiene_productos (pedido_cp_cantidad,pedido_id,producto_codigo) VALUES (2,1,1);

INSERT INTO Pedido_contiene_productos (pedido_cp_cantidad,pedido_id,producto_codigo) VALUES (1,1,2);

INSERT INTO Trabajadores(trabajador_documento,sede_id,trabajador_nombre,trabajador_apellido,trabajador_celular,trabajador_foto,trabajador_cargo,trabajador_direccion,trabajador_password)
 VALUES('13063664','1','Manuel','Chacon','3178145209','http://ciencias.univalle.edu.co/images/imagenes/profesores/fisica/Chacon.jpg','Admin','Calle 7','$2b$10$h71Ta5uixXRBIMcxMFacUe2lCPgS3yFYfKdIXlQewZVWRqjiU57Fi');

INSERT INTO Tarjetas (tarjeta_numero,tarjeta_cvc,tarjeta_vencimiento,tarjeta_tipo,cliente_id) VALUES (1111111111,456,'20-06-2021',0,1);

INSERT INTO Tarjetas (tarjeta_numero,tarjeta_cvc,tarjeta_vencimiento,tarjeta_tipo,cliente_id) VALUES (2222222222,482,'20-06-2022',0,1);


INSERT INTO Pagos (tarjeta_id,pago_porcentaje_pedido,pago_metodo,pago_cuotas,pago_fecha,pedido_id) VALUES (1,50,0,1,'20-03-2020',1);
INSERT INTO Pagos (tarjeta_id,pago_porcentaje_pedido,pago_metodo,pago_cuotas,pago_fecha,pedido_id) VALUES (1,50,0,1,'20-03-2020',1);



--FACTURAS:

CREATE VIEW FACTURAS AS (SELECT DISTINCT sede_id,sede_nombre,sede_direccion,pedido_id,cliente_celular,cliente_nombre,cliente_direccion, pedido_costo FROM pedidos NATURAL JOIN pedido_contiene_productos NATURAL JOIN Clientes NATURAL JOIN Sedes GROUP BY sede_id,sede_nombre,sede_direccion,cliente_celular,pedido_id,cliente_nombre,cliente_direccion);
--CREATE VIEW PAGO_FACTURAS AS (SELECT DISTINCT pagos.pedido_id,cliente_nombre,cliente_apellido,tarjeta_id,tarjeta_numero,SUM(pago_valor) AS pago_valor,pago_cuotas,pago_fecha FROM pagos NATURAL JOIN tarjetas NATURAL JOIN clientes ORDER BY pedido_id);

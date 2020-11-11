## Valores para un cliente:

<code>
{
    "cliente_celular":"3166891630",
    "cliente_nombre":"Carlos",
    "cliente_apellido":"Delgado",
    "cliente_documento":"1113696488",
    "cliente_direccion":"Carrera 4 # 7a-10",
    "cliente_fecha_nacimiento":"2019-10-02",
    "cliente_password":"3031999c"
    }

</code>

## Valores para un trabajador:

<code> 
{
     "trabajador_documento": "59650873",
     "trabajador_nombre": "Maria",
     "trabajador_apellido": "Dorado",
     "trabajador_celular": "3134688553",
     "trabajador_foto": "trabajador.jpg",
     "trabajador_contratacion": "2020-10-19",
     "trabajador_cargo": "ADMIN",
     "trabajador_direccion": "Calle 7",
     "trabajador_password": "3031999"
     }
</code>

## Valores para un producto:

<code>
{
     
     "producto_nombre": "Pizza vegetariana",
     "producto_descripcion": "Variedad de vegetales",
     "producto_imagen": "pizza.jpg",
     "producto_existencias": 10,
     "producto_precio"  : 15000,
     "producto_descuento" : 10,
     "producto_iva": 7,
     "categoria_id": 1
    }  
 </code>
 
 <code>   
{
     "producto_nombre": "pizza vikinga",
     "producto_descripcion": "variedad de carnes",
     "producto_imagen": "vikinga.jpg",
     "producto_existencias": 10,
     "producto_precio"  : 20000,
     "producto_descuento" : 10,
     "producto_iva": 8,
     "categoria_id": 1
    }

</code>

## Valores para una sede:

<code> 
{
 "sede_nombre": "Sede Norte",
 "sede_direccion": "Chiminangos ",
 "sede_ciudad": "Cali",
 "sede_horario_apertura": "09:00 AM",
 "sede_horario_cierre": "05:00 PM"
}
</code>

## Valores para una categoria:

<code>
{
	
	"categoria_nombre"		:   "Jugos",
	"categoria_descripcion" : "variedad de jugos naturales"
	
 
    }  
</code>

## Valores para una tarjeta

<code>
{"tarjeta_numero": "6666666666",
"tarjeta_cvc": "123",
"tarjeta_vencimiento":"2023-01-20",
"tarjeta_tipo":0,
"cliente_id": 1}
</code>

## Estructuras para los endpoints:

### Crear(POST):

-/(Trabajador-Cliente-Producto-Sede-Categoria)/Create

### Obtener un registro en especifico(GET):

-/(Trabajador-Cliente-Producto-Sede-Categoria)/:registro_id

### Obtener todos los registros de una tabla(GET):

-/(Trabajador-Cliente-Producto-Sede-Categoria)/Get

### Editar un registro de una tabla(PUT):

-/(Trabajador-Cliente-Producto-Sede-Categoria)/Edit/:registro_id

### Cambiar estado de un registro de una tabla(PUT):

-/(Trabajador-Cliente-Producto-Sede-Categoria)/:registro_id

### Login para Cliente (PUT):

-/Cliente/Login/:cliente_celular

### Login para Trabajador (PUT):

-/Trabajador/Login/:trabajador_documento

### Obtener los id y nombres de las categorias existentes(GET):

-/Categoria/Get/Cliente

### Obtener menu de productos(GET):

-/Producto/Menu/GEt

### Agregar una tarjeta a un cliente(POST):

-/Cliente/Tarjeta/Add

###### Comandos para reestablecer DB en Heroku

<code>
	heroku pg:psql -a burgertown-backend
	DROP SCHEMA public CASCADE;
	CREATE SCHEMA public;
	cat DS2.sql | heroku pg:psql -a burgertown-backend
</code>


##Valores para un cliente

<code>
{
    "cliente_celular":"3166891624",
    "cliente_nombre":"Carlos",
    "cliente_apellido":"Delgado",
    "cliente_documento":"1113696488",
    "cliente_direccion":"Carrera 4 # 7a-10",
    "cliente_fecha_nacimiento":"2019-10-02",
    "cliente_password":"3031999c"
    }  

</code>



##Valores para un trabajador
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

##Estructuras para los endpoints:

###Crear(POST):
-/(Trabajador-Cliente-Producto-Sede-Categoria)/Create

###Obtener un registro en especifico(GET):
-/(Trabajador-Cliente-Producto-Sede-Categoria)/:registro_id

###Obtener todos los registros de una tabla(GET):
-/(Trabajador-Cliente-Producto-Sede-Categoria)/Get

###Editar un registro de una tabla(PUT)
-/(Trabajador-Cliente-Producto-Sede-Categoria)/Edit/:registro_id

###Cambiar estado de un registro de una tabla(PUT)
-/(Trabajador-Cliente-Producto-Sede-Categoria)/:registro_id
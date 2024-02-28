# DevsuTechnicalTest

Este proyecto fue generado con [Angular CLI](https://github.com/angular/angular-cli) version 17.1.1.

## Servidor de desarrollo en vivo

Una vez descargado el repositorio desde  [GitHub] (https://github.com/mauripunzueta/devsu-techical-test), se debe instalar los paquetes y módulos necesarios.
Desde la terminal, ingrese a la carpeta del proyecto y ejecute el siguiente comando: `npm install`.
Una vez que todos los paquetes estén descargados, para iniciar el servidor de desarrollo ejecute el siguiente comando `ng serve`. 
Desde un navegador, de preferencia Google Chrome, ingrese a la dirección `http://localhost:4200/`. 
La aplicación se actualizará automaticamente cada vez que se guarden cambios en el código.

## Acerca del proyecto

El proyecto consta de dos componentes principales: `app-home` (inicio) y `app-register`. `app-home` (inicio) es una página reactiva donde se ve una lista de productos, esos mencionan una variedad de propiedades determinadas por el banco. 

Donde de `app-home` se hace uso de un componente `app-table` el cual es el encargado de mostrar los productos. Esto se lleva a cabo través de un servicio solicitamos la información y un listado de todos los productos para luego ser mostrados en una tabla la cual tiene paginación al igual que uno puede modificar la canditad de filas que uno desea ver. Las opciones son 5, 10 y 20.

Al final de cada fila podemos encontrar un botón de opciones, Editar y Eliminar. Estos mismos cumplen la función de editar el producto o eliminar el mismo de forma respectiva. Una vez apretado el botón de Elimnar este salta un modal de alerta para confirmar si deseamos eliminar un producto, esto se lleva a cabo a través de un servicio.

En la parte superior derecha podemos acceder a un botón el cual nos lleva a `app-register`. En esta página, de igual manera reactiva, podemos crear nuevos productos a través del uso de ReactiveForms. Cada input tiene es un campo obligatorio y cuentan con especificaciones máximas y mínimas de caracteres, al igual que una restricción de no duplicidad de IDs de cada producto verificada por una api constantemente. Se generan alertas visuales abajo de cada campo para el usuario.

## Desarrollo pendiente

Por falta de tiempo se tienen los siguientes trabajos pendientes para desarrollo:

*Editar productos: Esta funcionalidad se tiene planificada realizar a través de un nuevo componente EditComponent. Al apretar el botón de editar de un producto, este mismo se dirigiría a esta ruta mostrando una interfaz gráfica similar a `app-register` pero con los campos ya llenados con los datos del producto selecionado para su edición. Se aprovecharía el uso de ReactiveForms para poder modificar y mantener mismas las restriciones utilizadas para `app-register`. Una vez editado el producto podemos volver a la página `app-home` (inicio).
*Uso de smart compnoents en `app-register`: Dado el código repetitivo en el componente sobre todo .html, se tiene planificado poder distribuir el código en un componente el cuáal tiene dos label y dos inputs. De esta forma poder evitar el código repetitivo y poder tener un código más limpio al igual que el buen manejo de buenas prácticas SOLID. Este mismo componente puede ser utilizado aprovechado para el componete aún por desarrollar `app-edit`.
*Pruebas unitarias: Se tiene planificado realizar las pruebas unitarias para poder confirmar la funcionalidad del código y de esta manera evitar que haya código roto.

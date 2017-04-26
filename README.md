Introducción

Se desea realizar un desarrollo basado en tecnologías web que permita solventar el acceso, consulta y compra para un catálogo de productos disponible para distribuidores. Este catálogo cuenta con 3 áreas principales:
LIBROS
LIBROS DIGITALES
CURSOS
Dado que es un sistema de venta al por mayor, el acceso a su contenido tiene carácter de intranet, y por tanto está protegido con login mediante usuario y contraseña.
Herramientas, lenguajes y tecnologías a emplear
Se debe realizar un desarrollo basado en AngularJS, empleando herramientas y lenguajes de desarrollo moderno que den como resultado una aplicación basada en tecnologías web.
El desarrollo realizado ha de emplear la siguiente combinación o stack de tecnologías / sistemas:
Uso de un servidor local para desarrollo.
Uso de un repositorio basado en Git para el control de versiones (se tendrá que compartir el código resultante con el consultor y dicho repositorio no debe tener ficheros modificados con fechas posteriores a la de entrega).
Uso de HTML5 compatible con navegadores IE9+, Chrome, Firefox y Safari.
Uso de un preprocesador CSS.
Uso de un build system para la generación de los ficheros optimizados para producción, así como para llevar a cabo de forma óptima las tareas automatizadas. Este build system debe contemplar al menos:
Minificación de ficheros JS y CSS.
Optimización de imágenes.
Uso de AngularJS 1.5 como base del desarrollo frontend con JavaScript.
Pantallas y funcionalidades a implementar
Se deben desarrollar para esta PRÁCTICA el siguiente listado de pantallas con el flujo de navegación completo que se muestra en la imagen adjunta.
Pantalla LOGIN.
Pantalla MENÚ PRINCIPAL.
Pantalla LISTADO DE LIBROS.
Pantalla DETALLE DE LIBRO.
Pantalla DETALLE DE PEDIDO.
A continuación se indican los requerimientos mínimos para cada una de estas pantallas:
Aspectos / elementos generales
La aplicación ha de tener una cabecera con acceso directo al menú principal y al pedido en curso.
La cabecera ha de actuar como mecanismo de navegación complementario con lo que por ejemplo cuando accedemos a un detalle a partir de un listado, el icono de menú principal cambiará por un icono de volver atrás que tendrá precisamente esa funcionalidad, volver al listado.
Se valorará como un extra adicional que el elemento que da acceso al pedido en curso, muestre algún tipo de información sobre la cantidad de productos añadidos y que si no hay productos no permita interactuar y lo muestre visualmente de alguna manera (atenuado por ejemplo).
Pantalla. LOGIN
Esta pantalla mostrará un logotipo central y solicitará un email y contraseña que enviará a un servicio web simulado, de manera que se pueda comprobar un login incorrecto y un login correcto.
 
Servicio de LOGIN
URL del servicio login
http://multimedia.uoc.edu/frontend/auth.php
Campos a enviar por POST
user, passwd
Respuesta login OK
{ "status": "OK" }
Respuesta login KO
{ "status": "KO", "message": "Usuario o contraseña no válidos." }
Login válido user/passwd
demo/demo
 
Pantalla. MENÚ PRINCIPAL
Esta pantalla mostrará un menú principal compuesto por las 3 áreas principales citadas en la introducción. La opción de “Objetos físicos” es la que tendrá la interactividad para mostrar el listado de libros.
El contenido de esta sección es estático, por lo tanto las opciones del menú no se cargan desde el servidor, sino que pueden ir incluidas en la propia pantalla.
El menú principal contará con una opción final que es desconectar, que sacará al usuario de “sesión” y lo llevará a la pantalla de LOGIN.
Pantalla. LISTADO DE LIBROS
Esta pantalla muestra un listado de 20 libros cargados a partir del siguiente servicio web simulado:
Servicio de LISTADO de LIBROS
URL del servicio de libros
http://multimedia.uoc.edu/frontend/getbooks.php
Campos a enviar por POST
page (si no se envía, por defecto 1)
Respuesta OK getbooks
// ver en la url del servicio
http://multimedia.uoc.edu/frontend/getbooks.php
Respuesta KO getbooks
{ "status": "KO", "message": "Error en la petición" }
El listado al final del mismo debe disponer de un mecanismo para cargar bloques adicionales de libros, repitiendo la llamada a dicho servicio web, y lógicamente llevando el control del número de página que se solicita.
La respuesta recibida no sustituye el contenido existente, sino que se añade al final del mismo.  El formato de la respuesta se puede ver si se accede en un navegador con la URL del servicio de libros, sin paso de parámetros.
Cada elemento del listado ha de contar con una imagen, el título y el precio.
Pantalla. DETALLE DE LIBRO
Esta pantalla mostrará la ficha de detalle de un libro, que estará compuesta por la siguiente información y elementos interactivos:
Portada o imagen del libro
Título del libro
Autor
ISBN
Reseña
Selector de cantidad
Botón añadir al pedido
Para obtener estos datos de un libro, se dispone del siguiente servicio web:
Servicio de DETALLE de LIBRO
URL del servicio de libros
http://multimedia.uoc.edu/frontend/bookdetail.php
Campos a enviar por POST
id
Respuesta OK para id=0
{
id: "0",
ISBN: "1387718772",
title: "Overblame Toise Subconscious Continuousness Wanderlustful Trochleary Irene",
price: "5",
cover: "http://lorempixel.com/480/640/abstract/0/Overblame Toise Subconscious Continuousness Wanderlustful Trochleary Irene",
author: "Jacqueline Foster",
review: "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Erit enim mecum, si tecum erit. Qui-vere falsone, quaerere mittimus-dicitur oculis se privasse; Multoque hoc melius nos veriusque quam Stoici. At eum nihili facit; Beatus sibi videtur esse moriens. </p> <p>Duo Reges: constructio interrete. Placet igitur tibi, Cato, cum res sumpseris non concessas, ex illis efficere, quod velis? Quo studio Aristophanem putamus aetatem in litteris duxisse? Et harum quidem rerum facilis est et expedita distinctio. Nummus in Croesi divitiis obscuratur, pars est tamen divitiarum. Quid vero? Quis animo aequo videt eum, quem inpure ac flagitiose putet vivere? Quod iam a me expectare noli. </p>"
}
Respuesta KO
{ "status": "KO", "message": "Error en la petición" }
Al pulsar al botón se añadirán al pedido tantas unidades de ese libro cmo se hayan indicado en el selector de cantidad (por defecto 1). Si ese libro ya estuviera en el pedido, no se creará uno nuevo, sino que se añadirán a las ya existentes.
Pantalla. DETALLE DE PEDIDO
Esta pantalla mostrará el listado de todos los libros solicitados junto a su cantidad, precio unitario y subtotal, ofreciendo al final del mismo información del total como suma de todos los libros solicitados.
Por cada libro se podrá editar su cantidad o eliminar del pedido por completo.
Esta pantalla ha de contemplar el caso de que el pedido esté vacío, mostrando el correspondiente mensaje al acceder al mismo.
Otras funcionalidades
A continuación se indican otras funcionalidades que se requieren para la aplicación:
Cuando un usuario va configurando su pedido, éste se ha de guardar de forma persistente en el equipo del usuario mediante una cookie o mecanismos como la API de WebStorage, de manera que si un usuario tiene un pedido comenzado, y vuelve a acceder, no parta de cero sino que continúe el pedido donde lo había dejado.
El indicador de la cabecera que da acceso al detalle del pedido, ha de mostrar la cantidad de libros que hay en cada momento en el pedido (valorado como extra adicional).
Todos los procesos de peticiones al servidor han de contar con un sistema de preloader que informe al usuario de ese proceso, desde que se lanza hasta que se recibe la respuesta.
Personalización Postgrado
Para los alumnos del Posgrado de Desarrollo de Aplicaciones Web se puede desarrollar la práctica cumpliendo cualquier de los siguientes escenarios:
Crear una webapp de escritorio que con las pantallas indicadas y mecanismos de navegación indicados y combinarla con la práctica de backend para que obtenga los ficheros JSON comentados antes en vez del servicio descrito en esta práctica, de la práctica de backend desarrollada (que se ubicará en el dominio correspondiente de http://eimtcms.uoc.edu).
Hacer la práctica con el enfoque del Máster que se describe en el siguiente punto, en cuyo caso NO es necesario combinarlo con la comunicación con la práctica de backend.
Hacer el enfoque del Máster y además combinarla con la práctica de backend, en vez de usar el servicio web definido en este enunciado.
Personalización Máster
Para los alumnos del Máster Universitario de Desarrollo de Aplicaciones para Dispositivos Móviles,, se pide de forma específica y como definición adicional a la base anteriormente descrita:
Crear una app híbrida para smartphone con Ionic y Phonegap.
Hacer que en la propia app se pueda identificar en la pantalla de login claramente al alumno, mediante un texto o similar que lo refleje visualmente.
Modificar/personalizar al menos 3 estilos visuales de los componentes empleados por defecto a través del framework empleado: Ionic.
Dar acceso como colaborador a la misma mediante Ionic View (http://view.ionic.io) al usuario “uocmarcos” (mgonzalezsancho@uoc.edu)  para que pueda probarla en su dispositivo.
Formato de la entrega
Independientemente del formato y archivo necesario para la entrega de la PRACTICA, ésta se ha de entregar internamente con la mecánica descrita a continuación, teniendo en cuenta que en cada pregunta se indica su tipología.
Si en la PRÁCTICA a dichas preguntas prácticas se han usado librerías de terceros, build-systems, etc. se ha de enviar todo lo necesario para poder reproducir el entorno para su corrección, SIN incluir en este criterio la carpeta node_modules, para la cual se ha de facilitar un fichero package.json que permita la instalación directa de la misma mediante npm install tal y como se ha comentado en el aula en varias ocasiones.
Adicionalmente el proyecto se entregará compartiéndolo con el profesor en un repositorio de tipo Git (Gitlab, Github, Bitbucket...) de manera que se pueda evaluar también el uso del mismo como un elemento más a tener en cuenta en la nota final de la actividad.
El usuario con el que compartir las preguntas prácticas existentes en el repositorio es qmarcos (disponible en los tres repositorios citados).
Consideraciones adicionales
Se tendrá en cuenta la organización y estructura de carpetas empleadas para el proyecto, ya sea totalmente personal o aprovechando la que marca por ejemplo Ionic en el caso de realizar la PRACTICA para móvil.
Si bien no se impone ninguna metodología, se valorará positivamente la limpieza, claridad y organización de código.
No se limita el uso de librerías de terceros siempre que la funcionalidad de la librería no solvente directamente el desarrollo solicitado en la pregunta, a excepción lógicamente de Ionic para aspectos como navegación, componentes, etc.
Se tendrá en cuenta la calidad de la presentación visual, con un mínimo cuidado en ella a través del uso de una hoja de estilos en cascada o de un framework visual front end que simplifique esta tarea (en el caso de Ionic, como se ha solicitado, se tienen que cambiar estilos de elementos por defecto, ya que sino este apartado estaría cubierto de antemano).
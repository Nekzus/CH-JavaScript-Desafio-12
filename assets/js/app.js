
//**** DESAFIO #12 - INCORPORAR JQUERY AL PROYECTO ****//


//**** DECLARACION DE VARIABLES GLOBALES ****//
let total= 0; //Variable para el monto total del carrito.
let cantidad= 0; // Variable para contabilizar la cantidad del mismo item en el carrito .
let carritoProductos = JSON.parse(localStorage.getItem('carritoProductos')) || []; // Array que almacena los items ingresados por el usuario a modo de objetos. Se realiza lectura del array almacenado en localStorage.
let itemBorrar; // Variable que contendra el numero de item a borrar.

$(() =>{ // Evento Ready, se ejecutara una vez que el DOM este listo.

//**** FUNCION DE IMPRESIÓN ITEMS EN HTML ****//
const imprimirCarritoEnHtml = () => {
    $('#printHtml').empty(); // Se limpia el contenido del DOM.
    $('#montoTotal').empty(); // Se limpia el contenido del DOM.
    carritoProductos.forEach((item) => {
        precioCantidad = item.precio * item.cantidad;
        $('#printHtml').prepend(`<tr><th scope="row"><img src=${item.portada} width="70rem"></th>
                                <td>${item.titulo}</td>
                                <td>${item.codigo}</td>
                                <td>${item.cantidad}</td>
                                <td>$${precioCantidad}</td>
                                <td><button id="${item.codigo}" type="button" class="borrar btn btn-danger">X</button></td></tr>`);
        });
        borrarItem(); 
        $('#montoTotal').append(` $${montoTotalProductos()}`); // Se muestra el monto total de los productos en el DOM.

        if(carritoProductos.length === 0) { // Se muestra un alerta si el carrito esta vacio.
            $('#carro-vacio').show();
        }else {
            $('#carro-vacio').hide(); // Se oculta el alerta si el carrito no esta vacio.
        }
};

//**** FUNCION MONTO TOTAL PRODUCTOS ****//
const montoTotalProductos = () => {
    total = 0;
    for(item of carritoProductos) {
        total += item.precio * item.cantidad; //  Se suman los montos en cada iteracion en el carrito.
    }
    return total;
}

//**** FUNCION BORRADO DE ITEM POR BOTON ****//
const borrarItem = ()=> {
    const btnBorrarItem = document.querySelectorAll('tr button'); // Se seleccionan todos los botones de borrado sobre la el carrito.
    btnBorrarItem.forEach(btn => {   // Se recorren y se escucha si alguno fue pulsado
        btn.addEventListener("click", (e) => { 
            e.preventDefault(); // Se evita que se ejecute el evento nativo del boton. 
            itemBorrar = parseInt(btn.id) // Se reconoce el boton pulsado por su numero de id. Coincidente con el código de producto.
                carritoProductos = JSON.parse(localStorage.getItem('carritoProductos')); // Se lee el array almacenado en el localStorage.
                const indexItemBorrar = carritoProductos.findIndex(item => item.codigo === itemBorrar)
                carritoProductos.splice(indexItemBorrar, 1); // Se ejecuta el borrado.
                localStorage.setItem('carritoProductos', JSON.stringify(carritoProductos)); // Se almacena el array con el item borrado. 
                imprimirCarritoEnHtml(); // Se recarga la pagina.
        });    
    });
};

//**** FUNCION DE FILTRADO TITULO ITEMS ****//
const filtroPorTitulo = (titulo )=> carritoProductos.filter(producto => producto.titulo === titulo); //Filtro de titulo para contabilizar cuantas veces el producto se ingreso al carrito.

imprimirCarritoEnHtml(carritoProductos); // Se imprime en el cuerpo de la tabla HTML los datos guardados en el localStorage.

$('#btnCarro1').click((e) => { // Llamado ingreso de items mediante click del boton en el HTML (agregar a carrito).
    e.preventDefault(); // Se evita que se ejecute el evento nativo del boton.
    cantidad = ((filtroPorTitulo('Battlefield 2042')).length) + 1; // Se obtiene la cantidad del producto en el carrito.
    const item1 = new Carrito('Battlefield 2042', 1, 2800, cantidad, "/assets/img/battlefield-2042.jpg"); // Nuevo objeto creado.
    ingresoCarrito(item1); // Se ingresa el item al carrito.            
}); // Cierre alcance ejecución boton de ingreso de item en el HTML.

$('#btnCarro2').click((e) => { // Llamado ingreso de items mediante click del boton en el HTML (agregar a carrito).
    e.preventDefault(); // Se evita que se ejecute el evento nativo del boton.
    cantidad = ((filtroPorTitulo('Blue Protocol')).length) + 1; // Se obtiene la cantidad del producto en el carrito.
    const item2 = new Carrito('Blue Protocol', 2, 2000, cantidad, "/assets/img/blue-protocol.jpg"); // Nuevo objeto creado.
    ingresoCarrito(item2); // Se ingresa el item al carrito.
}); // Cierre alcance ejecución boton de ingreso de item en el HTML.

$('#btnCarro3').click((e) => { // Llamado ingreso de items mediante click del boton en el HTML (agregar a carrito).
    e.preventDefault(); // Se evita que se ejecute el evento nativo del boton.
    cantidad = ((filtroPorTitulo('Halo Infinite')).length) + 1; // Se obtiene la cantidad del producto en el carrito.
    const item3 = new Carrito('Halo Infinite', 3, 2500, cantidad,"/assets/img/halo-infinite.jpg"); // Nuevo objeto creado.
    ingresoCarrito(item3); // Se ingresa el item al carrito.
}); // Cierre alcance ejecución boton de ingreso de item en el HTML.

$('#btnCarro4').click((e) => { // Llamado ingreso de items mediante click del boton en el HTML (agregar a carrito).
    e.preventDefault(); // Se evita que se ejecute el evento nativo del boton.
    cantidad = ((filtroPorTitulo('Elden Ring')).length) + 1; // Se obtiene la cantidad del producto en el carrito.
    const item4 = new Carrito('Elden Ring', 4, 2800, cantidad, "/assets/img/elden-ring.jpg"); // Nuevo objeto creado.
    ingresoCarrito(item4); // Se ingresa el item al carrito
}); // Cierre alcance ejecución boton de ingreso de item en el HTML.


const ingresoCarrito = (item) => {
    const existeItem = carritoProductos.some(producto => producto.codigo === item.codigo); // Revisar si el item ya fue agregado al carrito.
    if(existeItem){
        const productos = carritoProductos.map(producto => { // Se recorre el array de productos para actualizar la cantidad.
            if(producto.codigo === item.codigo){
                producto.cantidad++;
                return producto; // Devuelve el item duplicado
            } else {
                return producto; // Devuelve le item sin duplicación.
            }
        })
        carritoProductos = [...productos]; // Se actualiza el array de productos.
    }else{
        carritoProductos= [...carritoProductos, item]; // Se agrega el item al array de carrito.
    } 
  localStorage.setItem('carritoProductos', JSON.stringify(carritoProductos)); // Se almacena en el localStorage el nuevo objeto-item creado.
  imprimirCarritoEnHtml(); // Se refresca el navegador para que se muestren los cambios.

}

//**** OBJECT CONSTRUCTOR ****//
class Carrito {
    constructor(titulo, codigo, precio, cantidad, portada) { // Recibe los datos.
        this.titulo = titulo;
        this.codigo = codigo;
        this.precio = precio;
        this.cantidad = cantidad;
        this.portada = portada;
    }  
}

//**** MODO MODIFICACIÓN: BORRADO DE TODOS LOS ITEMS ****/
$('#btnDeletAll').dblclick((e) => { // Llamado borrado de todos los items mediante doble click del boton en el HTML.
    e.preventDefault(); // Se evita que se ejecute el evento nativo del boton.
    if(carritoProductos.length >0) {
            carritoProductos = [];
            localStorage.clear();
            imprimirCarritoEnHtml(); // Se recarga la pagina.
        }
    
}); // Cierre alcance ejecución boton de borrado de todos los items en el HTML.

});

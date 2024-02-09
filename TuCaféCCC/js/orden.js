const productos = document.querySelectorAll('.producto');
const initialPrice = document.querySelector('.initialPrice');
const pricePage = document.querySelector('.pricePage');
let totalPrice = 0

const checkoutButton = document.createElement('button');
checkoutButton.innerText = 'Checkout';
checkoutButton.classList.add('volverButton')
checkoutButton.addEventListener('click', () => {
    window.location.href = 'checkout.html'
});

function checkoutButtonVisibility() {
    if (totalPrice >  0) {
        pricePage.appendChild(checkoutButton);
    } else {
        checkoutButton.remove();
    }
}

productos.forEach((producto) => {
    const minusbutton = producto.querySelector('.minusbutton');
    const plusbutton = producto.querySelector('.plusbutton');
    const quantity = producto.querySelector('.quantity');
    const price = producto.querySelector('.productoPrecio');

    minusbutton.addEventListener('click', () => {
        if (parseInt(quantity.textContent) >  0) {
            cambiarPrecio(initialPrice, price, '-');
        }
        cambiarCantidad(quantity, -1, price);
    });
    
    plusbutton.addEventListener('click', () => {
        cambiarPrecio(initialPrice, price, '+');
        cambiarCantidad(quantity,  1, price);
    });

    function cambiarCantidad(quantity, change, price) {
        let cantidadActual = parseInt(quantity.textContent);
        let cantidadNueva = cantidadActual + change;
        if (cantidadNueva >=  0 && cantidadNueva <=  99) {
            quantity.textContent = cantidadNueva;
            totalPrice += change;
            checkoutButtonVisibility();
        }
    }

    function cambiarPrecio(price, change, operation) {
        let precioActual = parseFloat(price.textContent);
        let precioProducto = parseFloat(change.textContent);
        let nuevoPrecio = operation === '+' ? precioActual + precioProducto : precioActual - precioProducto;
        if (nuevoPrecio >=  0) {
            price.textContent = nuevoPrecio.toFixed(2)
        };
    }
});
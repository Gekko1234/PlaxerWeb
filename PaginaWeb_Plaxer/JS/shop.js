// In this File I will access an API and will load the games in the html, and put some filter such as sort by price, name category... 
const form = document.querySelector('#form');
const tiendasInput = document.querySelector('#tiendas');
const row = document.querySelector('#filaJuegos');
const urlTiendas = "https://www.cheapshark.com/api/1.0/stores";



let boton = document.querySelector('#botonComprar');


function getTienda(){

    fetch(urlTiendas)
    .then(res => res.json())
    .then( tiendas => {
    
        console.log(tiendas);
    
        tiendas.forEach(tienda => {
        if(tienda.isActive == "1"){
            tiendasInput.innerHTML +=
            `
        <option value="${tienda.storeID}">${tienda.storeName}</option>
        `
        }
    
        })
    
    
        })
    
    }
    
    
getTienda();

function mostrarJuegos(tienda, precioMinimo, precioMaximo, nombreBuscado,sortPrice){

fetch(`https://www.cheapshark.com/api/1.0/deals?${tienda}${precioMinimo}${precioMaximo}${nombreBuscado}${sortPrice}`)
.then(res => res.json())
.then(juegos =>{
    console.log(juegos);

    

    let cantidad = 0;

    juegos.forEach(juego => {
        let porcentajeAhorro = (juego.normalPrice - juego.salePrice) / juego.normalPrice; //form to calculate de % that you save
        porcentajeAhorro = Number.parseFloat(porcentajeAhorro).toFixed(2);

        

            if(cantidad < 15){
                row.innerHTML +=
            `
            <div class="col-lg-6 col-md-12 col-sm-12">
                <div class="card-img">
                    <a href="https://store.steampowered.com/app/${juego.steamAppID}"><img height="200px" class="card-img-top" src="${juego.thumb}"  class="card-logo"></a>
                </div>

                <div class="card-info-container">
                    <div class="info-row">

                        <p class="card-description">${juego.title}</p>

                        <p class="price"><span id="precioAntiguo">${juego.normalPrice}€</span>  ${juego.salePrice}€</p>
                        <p class = price>Ahorras un ${porcentajeAhorro * 100}%</p>
                    </div>

                    <div class="row">
                        <p class="price">Calification: ${juego.steamRatingPercent}/100</p>
                    </div>

                    <div class="row">
                        <button class="btn btn-primary" id="botonComprar">Comprar</button>
                    </div>
                </div>
            </div>
            
            `
            
        }
        cantidad++;
    });

})

}

mostrarJuegos();



form.addEventListener('submit', (e) => {
    
    e.preventDefault();
    row.innerHTML = "";

    // STORE ID 
    let tienda = `&storeID=${tiendasInput.value}`;

    let precioMinimo = document.querySelector('#minPrice').value.trim();

    if(precioMinimo != ""){
        precioMinimo = `&lowerPrice=${precioMinimo}`;
    }else{
        precioMinimo="";
    }

    let precioMaximo = document.querySelector('#maxPrice').value.trim();
    if(precioMaximo != ""){
        precioMaximo = `&upperPrice=${precioMaximo}`;
    }else{
        precioMaximo = "";
    }

    let nombreBuscado = document.querySelector('#buscarNombre').value.trim();
    if(nombreBuscado != ""){
        nombreBuscado = `&title=` + nombreBuscado;
    }else{
        nombreBuscado = `&title=`;
    }

    let sortPrice = document.querySelector('#sortPrice').checked;
    if(sortPrice){
        sortPrice = `&sortBy=Price`;
    }else{
        sortPrice = `&sortBy=`;
    }


    console.log(precioMaximo);
    console.log(precioMinimo);
    mostrarJuegos(tienda, precioMinimo, precioMaximo, nombreBuscado, sortPrice);

})








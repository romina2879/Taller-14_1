document.addEventListener("DOMContentLoaded", (event) => {
  const botonBuscar = document.getElementById("btnBuscar");
  const buscador = document.getElementById("inputBuscar");
  const contenedor = document.getElementById("contenedor");

  function mostrarImágenes(imgs) {
    contenedor.innerHTML = "";
    for (let img of imgs) {
      if (img.links && img.links.length > 0 && img.data && img.data.length > 0){//Soluciono manejo de errores
      const div = document.createElement("div");
      div.className = "card";
      div.style.width = "18rem"; 
      div.innerHTML = `
        <img src="${img.links[0].href}" class="card-img-top">
        <div class="card-body">
          <h5 class="card-title">${img.data[0].title}</h5>
          <p class="card-text">${img.data[0].description}</p>
          <p>${img.data[0].date_created}</p>
        </div>
      `;
      contenedor.appendChild(div); 
    } else {
      console.error("Estructura de imagen no válida", img);
    }
  }
  }

  botonBuscar.addEventListener("click", function() {
    if (buscador.value === "") {
      contenedor.innerHTML= "";
      return;
    }
    const url_nasa = "https://images-api.nasa.gov/search?q=" + buscador.value; 

    fetch(url_nasa)
      .then((response) => response.json())
      .then((imágenes) => {
        console.log(imágenes);
        const imgs = imágenes.collection.items; 
        mostrarImágenes(imgs);
      })
      .catch((error) => alert("Error al obtener los datos: " + error));
  });
});

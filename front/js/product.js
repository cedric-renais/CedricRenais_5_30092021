//-------------------------------------//
// retrieves the product id to display //
//-------------------------------------//
const newID = new URLSearchParams(location.search);
const dataID = newID.get('_id');
//--------------------------------------------------------------//
// if localStorage is empty display null                        //
// if localStorage is not empty display the content             //
//--------------------------------------------------------------//
function localStorageProductsCheck() {
  let localStorageProducts = JSON.parse(
    localStorage.getItem('localStorageProducts')
  );
  console.log('Content of localStorage', localStorageProducts);
}
localStorageProductsCheck();
//-------------------------------------------------------------------------------//
// call the product by is id in the API                                          //
// receives in response the product data in json format                          //
//-------------------------------------------------------------------------------//
function apiCallById() {
  fetch(`http://localhost:3000/api/products/${dataID}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log('ID data sent by the API', data);
      //-------------------------------------------------------------------------------//
      // declaration of variables to retrieve locations to display elements in the DOM //
      // get the elements by their id in the DOM                                       //
      // inject the html code                                                          //
      //-------------------------------------------------------------------------------//
      function addToDOM() {
        const image = document.querySelector(
          'body > main > div > section > article > div.item__img'
        );
        const description = document.getElementById('description');
        const price = document.getElementById('price');
        const name = document.getElementById('title');
        const colors = document.getElementById('colors');
        image.innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
        name.innerHTML = `<h1>${data.name}</h1>`;
        price.innerText = `${data.price}`;
        description.innerText = `${data.description}`;
        //----------------------------------------//
        // get each color options to display them //
        //----------------------------------------//
        function colorsOptions() {
          for (let index in data.colors) {
            colors.options[colors.options.length] = new Option(
              data.colors[index],
              data.colors[index]
            );
          }
        }
        colorsOptions();
      }
      addToDOM();
      //-------------------------------------------------------------------------------------//
      // get the element by his id in the DOM                                                //
      // add an event when clicking on the addToCart id                                      //
      // create an object containing the data of the product                                 //
      // check if localStorageProducts is already in localStorage                            //
      // if localStorageProducts is null create an Array                                     //
      // check if an identical element exists (id + color)                                   //
      // if an identical element already exists update the quantity only                     //
      // otherwise add StorageArray the the localStorage                                     //
      //-------------------------------------------------------------------------------------//
      function addToCart() {
        const addToCartDOM = document.getElementById('addToCart');
        addToCartDOM.addEventListener('click', (event) => {
          event.preventDefault();
          let dataQuantity = document.getElementById('quantity');
          const dataColor = document.getElementById('colors');
          const StorageArray = {
            id: dataID,
            name: data.name,
            price: data.price,
            color: dataColor.value,
            quantity: dataQuantity.value,
            image: data.imageUrl,
            alt: data.altTxt,
          };
          let localStorageProducts = JSON.parse(
            localStorage.getItem('localStorageProducts')
          );
          if (localStorageProducts === null) {
            localStorageProducts = [];
          }
          let isHere = false;
          localStorageProducts.forEach((element) => {
            if (element.id === dataID && element.color === dataColor.value) {
              element.quantity = quantity.value;
              isHere = true;
              alert(`Le nombre de vos articles a été mis à jour !`);
            }
          });
          if (!isHere) {
            localStorageProducts.push(StorageArray);
            alert('Votre article a bien été ajouté au panier !');
          }
          localStorage.setItem(
            'localStorageProducts',
            JSON.stringify(localStorageProducts)
          );
          console.log('localStorage update', localStorageProducts);
        });
      }
      addToCart();
    })
    //-----------------------------------------------------------------//
    // if the API does not respond, then an error message is displayed //
    //-----------------------------------------------------------------//
    .catch((error) => {
      alert('Notre serveur de répond pas, veuillez revenir ultérieurement.');
    });
}
apiCallById();

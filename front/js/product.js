//-------------------------------------//
// retrieves the product ID to display //
//-------------------------------------//

const newID = new URLSearchParams(location.search);
const dataID = newID.get('_id');

//-------------------------------------------------------------------------------//
// call the product ID in the API                                                //
// transform data into json format                                               //
// declaration of variables to retrieve locations to display elements in the DOM //
// display elements in the DOM                                                   //
// for loop of which look in the array for the color options then display it     //
//-------------------------------------------------------------------------------//

fetch(`http://localhost:3000/api/products/${dataID}`)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
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
    for (index in data.colors) {
      colors.options[colors.options.length] = new Option(
        data.colors[index],
        data.colors[index]
      );
    }

    //-------------------------------------------------------------------------------------//
    // add an event when clicking on the addToCart ID                                      //
    // create an array containing the data of the product                                  //
    // if the localStorage is not empty                                                    //
    // look for the product in the array                                                   //
    // if the product is not in the array then its value is -1                             //
    // if the product is in the array then add 1 to the quantity                           //
    // if localStorage is empty then create an array                                       //
    //-------------------------------------------------------------------------------------//

    const addToCart = document.getElementById('addToCart');
    addToCart.addEventListener('click', (event) => {
      event.preventDefault();
      const dataQuantity = document.getElementById('quantity');
      const dataColor = document.getElementById('colors');

      const dataArray = {
        id: dataID,
        name: data.name,
        price: data.price,
        color: dataColor.value,
        quantity: dataQuantity.value,
        image: data.imageUrl,
        alt: data.altTxt,
      };

      if (
        localStorage.getItem('localStorageProducts') &&
        localStorage.getItem('localStorageProducts').length > 0
      ) {
        const localStorageProducts = JSON.parse(
          localStorage.getItem('localStorageProducts')
        );
        const data = localStorageProducts.findIndex(
          (data) => data.id === dataArray.id && data.color === dataArray.color
        );
        if (data === -1) {
          localStorageProducts.push(dataArray);
          localStorage.setItem(
            'localStorageProducts',
            JSON.stringify(localStorageProducts)
          );
        } else {
          localStorageProducts[data].quantity =
            parseInt(localStorageProducts[data].quantity) +
            parseInt(dataArray.quantity);
          localStorage.setItem(
            'localStorageProducts',
            JSON.stringify(localStorageProducts)
          );
        }
      } else {
        localStorageProducts = [];
        localStorageProducts.push(dataArray);
        localStorage.setItem(
          'localStorageProducts',
          JSON.stringify(localStorageProducts)
        );
      }
    });
  })

  //-----------------------------------------------------------------//
  // if the API does not respond, then an error message is displayed //
  //-----------------------------------------------------------------//

  .catch((error) => {
    alert('Notre serveur de répond pas, veuillez revenir ultérieurement.');
  });

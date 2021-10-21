//-------------------------------------//
// retrieves the product ID to display //
//-------------------------------------//

const newID = new URLSearchParams(location.search);
const productID = newID.get('_id');

//-----------------------------------------------------------------//
// call the product ID in the API                                  //
// transform data into json format                                 //
// if the API does not respond, then an error message is displayed //
//-----------------------------------------------------------------//

fetch(`http://localhost:3000/api/products/${productID}`)
  .then((response) => response.json())
  .then((data) => {
    addProducts(data);
    console.log(data);
  })
  .catch((error) => {
    alert('Notre serveur de répond pas, veuillez revenir ultérieurement.');
  });

//-------------------------------------------------------------------------------------------------------------//
// creation of a function to display the product                                                               //
// declaration of variables to retrieve locations to display elements in the DOM                               //
// display elements in the DOM                                                                                 //
// for loop of which look in the array for the color options then display it                                   //
//-------------------------------------------------------------------------------------------------------------//

function addProducts(product) {
  const productImg = document.querySelector(
    'body > main > div > section > article > div.item__img'
  );
  const productDescription = document.getElementById('description');
  const productPrice = document.getElementById('price');
  const productName = document.getElementById('title');
  const productColors = document.getElementById('colors');
  productImg.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
  productName.innerHTML = `<h1>${product.name}</h1>`;
  productPrice.innerText = `${product.price}`;
  productDescription.innerText = `${product.description}`;
  for (index in product.colors) {
    productColors.options[productColors.options.length] = new Option(
      product.colors[index],
      product.colors[index]
    );
  }
}

//-------------------------------------------------------------------------------------//
// add an event when clicking on the addToCart ID                                      //
// declaration of variables to retrieve locations in the DOM                           //
// create an array containing the ID, the color option and the quantity of the product //
// if the localStorage is not empty                                                    //
// look for the product in the array                                                   //
// if the product is not in the array then its value is -1                             //
// if the product is in the array then add 1 to the quantity                           //
// if localStorage is empty then create an array                                       //
//-------------------------------------------------------------------------------------//

document.getElementById('addToCart').addEventListener('click', (event) => {
  event.defaultPrevented;
  const productColor = document.getElementById('colors');
  const productQuantity = document.getElementById('quantity');
  const productArray = {
    id: productID,
    color: productColor.value,
    quantity: productQuantity.value,
  };
  if (
    localStorage.getItem('localStorageProducts') &&
    localStorage.getItem('localStorageProducts').length > 0
  ) {
    const localStorageProducts = JSON.parse(
      localStorage.getItem('localStorageProducts')
    );
    const product = localStorageProducts.findIndex(
      (product) =>
        product.id === productArray.id && product.color === productArray.color
    );
    if (product === -1) {
      localStorageProducts.push(productArray);
      localStorage.setItem(
        'localStorageProducts',
        JSON.stringify(localStorageProducts)
      );
    } else {
      localStorageProducts[product].quantity =
        parseInt(localStorageProducts[product].quantity) +
        parseInt(productArray.quantity);
      localStorage.setItem(
        'localStorageProducts',
        JSON.stringify(localStorageProducts)
      );
    }
  } else {
    localStorageProducts = [];
    localStorageProducts.push(productArray);
    localStorage.setItem(
      'localStorageProducts',
      JSON.stringify(localStorageProducts)
    );
  }
});

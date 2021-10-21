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
    addProduct(data);
  })
  .catch((error) => {
    alert('Notre serveur de répond pas, veuillez revenir ultérieurement.');
  });

//-------------------------------------------------------------------------------------------------------------//
// creation of a function to display the article                                                               //
// declaration of variables to retrieve locations to display elements in the DOM                               //
// display elements in the DOM                                                                                 //
// for loop of which look in the array for the color options then display it                                   //
//-------------------------------------------------------------------------------------------------------------//

function addProduct(product) {
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

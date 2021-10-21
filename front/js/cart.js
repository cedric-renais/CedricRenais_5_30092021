//-----------------------------------------------//
// retrieves the products in the localStorage    //
//-----------------------------------------------//
const localStorageProducts = JSON.parse(
  localStorage.getItem('localStorageProducts')
);

//-------------------------------------------------------------------------------------------------------------//
// creation of a function to display the products found in the localStorage                                    //
// declaration of variables for each product element                                                           //
// call the product ID in the API and transform data into json format                                          //
// parses the specified text as HTML and inserts the resulting nodes into the DOM tree at a specified position //
// avoids the extra step of serialization, making it much faster than direct innerHTML manipulation            //
// if the API does not respond, then an error message is displayed                                             //
//-------------------------------------------------------------------------------------------------------------//

function displayCart() {
  for (const product of localStorageProducts) {
    const productQuantity = product.quantity;
    const productColor = product.color;
    const productID = product.id;
    console.log(product);
    fetch(`http://localhost:3000/api/products/${productID}`)
      .then((response) => response.json())
      .then((product) => {
        const productImage = product.imageUrl;
        const productAlt = product.altTxt;
        const productName = product.name;
        const productPrice = product.price;
        const total = productPrice * productQuantity;
        const cart = `<article class="cart__item item_${productID}" data-id="${productID}">
      <div class="cart__item__img">
      <img src="${productImage}" alt="${productAlt}">
      </div>
      <div class="cart__item__content">
      <div class="cart__item__content__titlePrice">
      <h2>${productName}</h2>
      <p>${productColor}</p>
      <p data-name="prix" id="prix">${total} €</p>
    </div>
    <div class="cart__item__content__settings">
      <div class="cart__item__content__settings__quantity">
        <p id="quantite">Qté : ${productQuantity} </p>
        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productQuantity}">
      </div>
      <div class="cart__item__content__settings__delete">
        <p class="deleteItem">Supprimer</p>
      </div>
    </div>
  </div>
  </article>`;
        document
          .getElementById('cart__items')
          .insertAdjacentHTML('beforeend', cart);
      })
      .catch((error) => {
        alert('Notre serveur de répond pas, veuillez revenir ultérieurement.');
      });
  }
}
displayCart();

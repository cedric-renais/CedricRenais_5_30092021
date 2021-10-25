//-----------------------------------------------//
// retrieves the products in the localStorage    //
//-----------------------------------------------//

const localStorageProducts = JSON.parse(
  localStorage.getItem('localStorageProducts')
);
console.log('Content of localStorage', localStorageProducts);

//-------------------------------------------------------------------------------------------------------------//
// if there is data in the localStorage                                                                        //
// then display the data for each registered products                                                          //
// parses the specified text as HTML and inserts the resulting nodes into the DOM tree at a specified position //
// avoids the extra step of serialization, making it much faster than direct innerHTML manipulation            //
// else display alert message and clicking on OK returns to the home page
//-------------------------------------------------------------------------------------------------------------//

if (localStorageProducts) {
  for (let index = 0; index < localStorageProducts.length; index++) {
    const productTotalPrice =
      localStorageProducts[index].price * localStorageProducts[index].quantity;
    const productCart = `<article class="cart__item" data-id="${localStorageProducts[index].id}" data-color="${localStorageProducts[index].color}">
    <div class="cart__item__img">
    <img src="${localStorageProducts[index].image}" alt="${localStorageProducts[index].alt}">
    </div>
    <div class="cart__item__content">
    <div class="cart__item__content__titlePrice">
    <h2>${localStorageProducts[index].name}</h2>
    <p >${localStorageProducts[index].color}</p>
    <p>${productTotalPrice}€</p>
  </div>
  <div class="cart__item__content__settings">
    <div class="cart__item__content__settings__quantity">
      <p>Qté : </p>
      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${localStorageProducts[index].quantity}">
    </div>
    <div class="cart__item__content__settings__delete">
    <p class="deleteItem">Supprimer</p>
    </div>
  </div>
</div>
</article>`;
    document
      .getElementById('cart__items')
      .insertAdjacentHTML('beforeend', productCart);
  }

  //--------------------------------------------------------//
  // declaration a function for the change of quantity      //
  // get the itemQuantity class in the DOM                  //
  // add an eventListener (change)                          //
  // get the new quantity                                   //
  // create a new storageArray with the new quantity        //
  // delete localStorageProducts                            //
  // and store newLocalStorageProducts                      //
  // reload the cart.html page to update quantity and price //
  //--------------------------------------------------------//

  function changeQuantity() {
    const itemQuantity = document.querySelectorAll('.itemQuantity');
    for (let index = 0; index < itemQuantity.length; index++) {
      itemQuantity[index].addEventListener('change', (event) => {
        event.preventDefault();
        const itemNewQuantity = event.target.value;
        const newLocalStorageProducts = localStorageProducts;
        const newStorageArray = {
          id: localStorageProducts[index].id,
          name: localStorageProducts[index].name,
          price: localStorageProducts[index].price,
          color: localStorageProducts[index].color,
          quantity: itemNewQuantity,
          image: localStorageProducts[index].image,
          alt: localStorageProducts[index].alt,
        };
        newLocalStorageProducts[index] = newStorageArray;
        console.table(newLocalStorageProducts);
        localStorage.clear();
        localStorage.setItem(
          'localStorageProducts',
          JSON.stringify(newLocalStorageProducts)
        );
        location.reload();
      });
    }
  }
  changeQuantity();

  //--------------------------------------------------------//
  // declaration a function for delete an article           //
  // get the deleteItem class in the DOM                    //
  // add an eventListener (click)                           //
  // get the object of the array and delete it              //
  // store newLocalStorageProducts in localStorage          //
  // reload the cart.html page to update quantity and price //
  //--------------------------------------------------------//

  function deleteArticle() {
    const deleteItem = document.querySelectorAll('.deleteItem');
    for (let index = 0; index < deleteItem.length; index++) {
      deleteItem[index].addEventListener('click', (event) => {
        event.preventDefault();
        const newLocalStorageProducts = localStorageProducts;
        newLocalStorageProducts.splice(index, 1);
        localStorage.setItem(
          'localStorageProducts',
          JSON.stringify(newLocalStorageProducts)
        );
        location.reload();
      });
    }
  }
  deleteArticle();

  //--------------------------------------------------------------------------------------//
  // declaration of the variable to be able to put the prices present in the localStorage //
  // fetch the prices in the localStorage                                                 //
  // put the localStorage prices in the variable                                          //
  // add up the prices in the variable                                                    //
  // display the total amount in the DOM                                                  //
  //--------------------------------------------------------------------------------------//

  const priceCalculation = [];
  for (let index = 0; index < localStorageProducts.length; index++) {
    const cartAmout =
      localStorageProducts[index].price * localStorageProducts[index].quantity;
    priceCalculation.push(cartAmout);
    const reduce = (previousValue, currentValue) =>
      previousValue + currentValue;
    total = priceCalculation.reduce(reduce);
  }
  const totalPrice = document.getElementById('totalPrice');
  totalPrice.textContent = total;

  //--------------------------------------------------------------------------------------------------//
  // declaration of the variable to be able to put the number of articles present in the localStorage //
  // fetch the prices in the localStorage                                                             //
  // put the localStorage prices in the variable                                                      //
  // add up the prices in the variable                                                                //
  // display the total amount in the DOM                                                              //
  //--------------------------------------------------------------------------------------------------//

  function totalArticles() {
    let total = 0;
    for (let index in localStorageProducts) {
      const quantity = parseInt(localStorageProducts[index].quantity, 10);
      total += quantity;
    }
    return total;
  }
  const totalQuantity = document.getElementById('totalQuantity');
  totalQuantity.textContent = totalArticles();

  //---------------------------------------------------------------//
  // get the id in the DOM                                         //
  // add an event to the click on the element                      //
  // clears the contents of localStorage                           //
  // alert that indicates that the requested action has been taken //
  // clicking on OK returns to the home page                       //
  //---------------------------------------------------------------//

  const deleteAll = document.getElementById('cart__delete');
  deleteAll.addEventListener('click', (event) => {
    event.preventDefault();
    localStorage.clear();
    alert(`
         Le panier a bien été supprimé,
         retour à la page d'accueil !`);
    location.href = 'index.html';
  });

  //-----------------------------------------------------------------------//
  // get the inputs id in the DOM                                          //
  // Create an array containing the id of the articles in the localStorage //
  // Create an array containing the values ​​entered in the form             //
  // Create an array containing the two previous arrays                    //
  //-----------------------------------------------------------------------//

  function orderArray() {
    const order = document.getElementById('order');
    order.addEventListener('click', (event) => {
      event.preventDefault();
      const firstName = document.getElementById('firstName');
      const lastName = document.getElementById('lastName');
      const address = document.getElementById('address');
      const city = document.getElementById('city');
      const email = document.getElementById('email');

      const products = [];
      for (let index = 0; index < localStorageProducts.length; index++) {
        products.push(localStorageProducts[index].id);
      }
      const contactProductsArray = {
        contact: {
          firstName: firstName.value,
          lastName: lastName.value,
          address: address.value,
          city: city.value,
          email: email.value,
        },
        products,
      };
      console.log('Data to be sent to the back', contactProductsArray);
      fetch('http://localhost:3000/api/products/order', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contactProductsArray),
      })
        .then((response) => response.json())
        .then((value) => {
          localStorage.clear();
          document.location.href = `confirmation.html?id=${value.orderId}`;
        })
        .catch((error) => {
          console.log('Error: ' + error);
        });
    });
  }
  orderArray();

  //-----------------------------------------------------------------------------------------//
  //-----------------------------------------------------------------------------------------//
  //-----------------------------------------------------------------------------------------//
} else {
  alert(`
  Le panier est vide,
  retour à la page d'accueil !`);
  location.href = 'index.html';
}

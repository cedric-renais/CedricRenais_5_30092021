//-----------------------------------------------//
// retrieves the products in the localStorage    //
//-----------------------------------------------//

const localStorageProducts = JSON.parse(
  localStorage.getItem('localStorageProducts')
);
console.table(localStorageProducts);

//-------------------------------------------------------------------------------------------------------------//
// if there is data in the localStorage                                                                        //
// then display the data for each registered products                                                          //
// parses the specified text as HTML and inserts the resulting nodes into the DOM tree at a specified position //
// avoids the extra step of serialization, making it much faster than direct innerHTML manipulation            //
//-------------------------------------------------------------------------------------------------------------//

if (localStorageProducts) {
  for (index = 0; index < localStorageProducts.length; index++) {
    const productTotalPrice =
      localStorageProducts[index].price * localStorageProducts[index].quantity;
    const productCart = `<article class="cart__item" data-id="${localStorageProducts[index].id}">
    <div class="cart__item__img">
    <img src="${localStorageProducts[index].image}" alt="${localStorageProducts[index].alt}">
    </div>
    <div class="cart__item__content">
    <div class="cart__item__content__titlePrice">
    <h2>${localStorageProducts[index].name}</h2>
    <p>${localStorageProducts[index].color}</p>
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

  //---------------------------------------------------//
  // creation of a function for the change of quantity //
  // recovery of ID, quantity and color data           //
  // if the cart already contains at least 1 article   //
  // recovery of the new quantity                      //
  // then update the localStorage (in progress)        //
  //---------------------------------------------------//

  function quantityChange() {
    const itemQuantity = document.getElementsByClassName('itemQuantity');
    itemQuantity.forEach((article) => {
      const articleID = localStorageProducts[index].id;
      article.dataset.id === articleID;
      const articleColor = localStorageProducts[index].color;
      const articleQuantity = localStorageProducts[index].quantity;
      const findArticle = localStorageProducts.find(
        (data) =>
          data.articleID === articleID && data.articleColor === articleColor
      );
      if (findArticle) {
        const newQuantity =
          document.getElementsByClassName('itemQuantity').value;
        parseInt(articleQuantity) + parseInt(findArticle.quantity);
        findArticle.quantity = newQuantity;
        // remains to make the modification in the localStorage
      }
    });
  }

  // code for deleting an item from the cart to do here

  //--------------------------------------------------------------------------------------//
  // declaration of the variable to be able to put the prices present in the localStorage //
  // fetch the prices in the localStorage                                                 //
  // put the localStorage prices in the variable                                          //
  // add up the prices in the variable                                                    //
  // display the total amount in the DOM                                                  //
  //--------------------------------------------------------------------------------------//

  const priceCalculation = [];
  for (index = 0; index < localStorageProducts.length; index++) {
    const cartAmout =
      localStorageProducts[index].price * localStorageProducts[index].quantity;
    priceCalculation.push(cartAmout);
    const reduce = (previousValue, currentValue) =>
      previousValue + currentValue;
    total = priceCalculation.reduce(reduce);
  }
  const totalPrice = document.getElementById('totalPrice');
  totalPrice.textContent = `${total} `;

  //--------------------------------------------------------------------------------------------------//
  // declaration of the variable to be able to put the number of articles present in the localStorage //
  // fetch the prices in the localStorage                                                             //
  // put the localStorage prices in the variable                                                      //
  // add up the prices in the variable                                                                //
  // display the total amount in the DOM                                                              //
  //--------------------------------------------------------------------------------------------------//

  const articleCalculation = [];
  for (index = 0; index < localStorageProducts.length; index++) {
    const numberOfArticles = localStorageProducts[index].quantity;
    articleCalculation.push(numberOfArticles);
    const reduce = (previousValue, currentValue) =>
      previousValue + currentValue;
    total = articleCalculation.reduce(reduce);
    console.log(total);
  }
  const totalArticles = document.getElementById('totalQuantity');
  totalArticles.textContent = `${total} `; // bad result, the code must be reviewed

  //---------------------------------------------------------------//
  // removal of products from the cart                             //
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

  //-------------------------------------------------------------------//
  // get the inputs from the DOM                                       //
  // array containing the data of the localStorage to send to the back //
  // array containing the data of the order form to send to the back   //
  //-------------------------------------------------------------------//

  const firstName = document.getElementById('firstName');
  const lastName = document.getElementById('lastName');
  const address = document.getElementById('address');
  const city = document.getElementById('city');
  const email = document.getElementById('email');

  const orderArray = [];
  for (let index = 0; index < localStorageProducts.length; index++) {
    orderArray.push(localStorageProducts[index].id);
    orderArray.push(localStorageProducts[index].name);
    orderArray.push(localStorageProducts[index].color);
    orderArray.push(localStorageProducts[index].quantity);
    orderArray.push(localStorageProducts[index].price);
  }
  console.log(orderArray);

  const formArray = {
    contact: {
      firstName: firstName.value,
      lastName: lastName.value,
      address: address.value,
      city: city.value,
      email: email.value,
    },
    order: [orderArray],
  };
  console.log(formArray);

  //-------//
  // regex //
  //-------//

  const regexfirstName = /^[a-zA-Z]+-[a-zA-Z]$/;
  const regexlastName = /^[a-zA-Z]+-[a-zA-Z]$/;
  const regexAddress = /^[a-zA-Z0-9\s,'-]$/;
  const regexCity = /^[a-zA-Z]+-[a-zA-Z]$/;
  const regexEmail =
    /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/;
}

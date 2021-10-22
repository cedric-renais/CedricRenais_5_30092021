//-----------------------------------------------//
// retrieves the products in the localStorage    //
//-----------------------------------------------//

const localStorageProducts = JSON.parse(
  localStorage.getItem('localStorageProducts')
);
console.log(localStorageProducts);

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
    <p class="modifyItem">Modifier</p> 
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
  // get the input in the DOM                          //
  // for the selected input                            //
  // add an eventListener (change)                     //
  // recovery of the new quantity                      //
  // then update the localStorage                      //
  //---------------------------------------------------//

  // to do ...

  //---------------------------------------------------------//
  // search for all deleteItem class in the DOM              //
  // add a different eventListener for each deleteItem class //
  // variable declaration containing id + color              //
  // look in the localStorage for the id + color             //
  // if id + color are equal then delete                     //
  //---------------------------------------------------------//

  // Not working yet ...

  deleteItem = document.querySelectorAll('.deleteItem');
  for (index = 0; index < deleteItem.length; index++) {
    deleteItem[index].addEventListener('click', (event) => {
      event.preventDefault();
      const deleteID =
        localStorageProducts[index].id + localStorageProducts[index].color;
      console.log(deleteID);
      localStorageProducts = localStorageProducts.filter(
        (element) => element.id == deleteID
      );
      console.log(deleteID);
    });
  }

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
    for (index in localStorageProducts) {
      const quantity = parseInt(localStorageProducts[index].quantity, 10);
      total += quantity;
    }
    return total;
  }
  const totalQuantity = document.getElementById('totalQuantity');
  totalQuantity.textContent = totalArticles();

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
  // if the values ​​of the form of are not correct                      //
  // display error message                                             //
  // otherwise send the order to the back in JSON format               //
  //-------------------------------------------------------------------//

  // Not working yet ...

  const firstName = document.getElementById('firstName');
  const lastName = document.getElementById('lastName');
  const address = document.getElementById('address');
  const city = document.getElementById('city');
  const email = document.getElementById('email');

  const orderArray = [];
  for (index = 0; index < localStorageProducts.length; index++) {
    orderArray.push(localStorageProducts[index].id);
    orderArray.push(localStorageProducts[index].color);
    orderArray.push(localStorageProducts[index].quantity);
  }

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
  const regexfirstName = /^[a-zA-Z]+-[a-zA-Z]$/;
  const regexlastName = /^[a-zA-Z]+-[a-zA-Z]$/;
  const regexAddress = /^[a-zA-Z0-9\s,'-]$/;
  const regexCity = /^[a-zA-Z]+-[a-zA-Z]$/;
  const regexEmail =
    /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/;

  if (
    !regexfirstName.test(firstName.value) ||
    !regexlastName.test(lastName.value) ||
    !regexAddress.test(address.value) ||
    !regexCity.test(city.value) ||
    !regexEmail.test(email.value)
  ) {
    //alert('Le formulaire de commande comporte des erreurs, veuillez vérifier.');
  } else {
    const orderPost = {
      method: 'POST',
      body: JSON.stringify(form),
      headers: { 'Content-Type': 'application/json' },
    };
    function order() {
      const order = document.getElementById('order');
      order.addEventListener('click', (event) => {
        event.preventDefault();
        location.href = 'confirmation.html';
        fetch('http://localhost:3000/api/products/order', orderPost)
          .then((response) => response.json())
          .then(() => {});
      });
    }
  }
}

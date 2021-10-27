//-----------------------------------------------//
// retrieves the products in the localStorage    //
//-----------------------------------------------//
function getLocalStorageProducts() {
  const localStorageProducts = JSON.parse(
    localStorage.getItem('localStorageProducts')
  );
  console.log('Content of localStorage', localStorageProducts);
  //-------------------------------------------------------------------------------------------------------------//
  // if there is data in the localStorage                                                                        //
  // then display the data for each registered products                                                          //
  // parses the specified text as HTML and inserts the resulting nodes into the DOM tree at a specified position //
  // avoids the extra step of serialization, making it much faster than direct innerHTML manipulation            //
  //-------------------------------------------------------------------------------------------------------------//
  function localStorageProductsDOM() {
    if (localStorageProducts) {
      for (let index = 0; index < localStorageProducts.length; index++) {
        const productTotalPrice =
          localStorageProducts[index].price *
          localStorageProducts[index].quantity;
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
      //----------------------------------------------------//
      // retrieves the prices in the localStorage           //
      // multiply the price by the quantity of each product //
      // adds the sum of the results obtained               //
      // display the total amount in the DOM                //
      //----------------------------------------------------//
      function priceCalculation() {
        const priceCalculation = [];
        for (let index = 0; index < localStorageProducts.length; index++) {
          const cartAmout =
            localStorageProducts[index].price *
            localStorageProducts[index].quantity;
          priceCalculation.push(cartAmout);
          const reduce = (previousValue, currentValue) =>
            previousValue + currentValue;
          total = priceCalculation.reduce(reduce);
        }
        const totalPrice = document.getElementById('totalPrice');
        totalPrice.textContent = total;
      }
      priceCalculation();
      //---------------------------------------------------------//
      // retrieves the articles in the localStorage              //
      // calculate the total number of items in the localStorage //
      // displays the total number of items in the DOM           //
      //---------------------------------------------------------//
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
      // get the element by is id in the DOM                           //
      // add an event to the click on the element                      //
      // clears the contents of localStorage                           //
      // alert that indicates that the requested action has been taken //
      // clicking on OK returns to the home page                       //
      //---------------------------------------------------------------//
      function deleteAll() {
        const deleteAll = document.getElementById('cart__delete');
        deleteAll.addEventListener('click', (event) => {
          event.preventDefault();
          localStorage.clear();
          alert(`
             Le panier a bien été supprimé,
             retour à la page d'accueil !`);
          location.href = 'index.html';
        });
      }
      deleteAll();
      //------------------------------------------------------------//
      // creates an array from the constructor containing form data //
      //------------------------------------------------------------//
      class Form {
        constructor() {
          this.firstName = document.getElementById('firstName').value;
          this.lastName = document.getElementById('lastName').value;
          this.address = document.getElementById('address').value;
          this.city = document.getElementById('city').value;
          this.email = document.getElementById('email').value;
        }
      }
      //--------------------------------------------------------//
      // retrieve the array created by the constructor          //
      // test the validity of the first name                    //
      // test the validity of the last name                     //
      // test the validity of the address                       //
      // test the validity of the city                          //
      // test the validity of the email                         //
      // if all the tests are true the form is validated        //
      //--------------------------------------------------------//
      function validation() {
        const contact = new Form();
        //------------------------------------------------//
        // retrieve the first name from the contact array //
        // test the validity of the first name            //
        // if the first name is valid, returns true       //
        // else display an error message in red           //
        //------------------------------------------------//
        function firstNameIsValid() {
          const firstNameRegex = contact.firstName;
          const firstNameErrorMsg =
            document.getElementById('firstNameErrorMsg');
          if (/^[-'a-zA-ZÀ-ÖØ-öø-ÿ\s]{3,}$/.test(firstNameRegex)) {
            firstNameErrorMsg.innerText = '';
            return true;
          } else {
            firstNameErrorMsg.innerText =
              'Ne peut contenir que des lettres et 3 caractères minimum';
            firstNameErrorMsg.style.color = 'red';
          }
        }
        //------------------------------------------------//
        // retrieve the last name from the contact array  //
        // test the validity of the last name             //
        // if the last name is valid, returns true        //
        // else display an error message in red           //
        //------------------------------------------------//
        function lastNameIsValid() {
          const lastNameRegex = contact.lastName;
          const lastNameErrorMsg = document.getElementById('lastNameErrorMsg');
          if (/^[-'a-zA-ZÀ-ÖØ-öø-ÿ\s]{3,}$/.test(lastNameRegex)) {
            lastNameErrorMsg.innerText = '';
            return true;
          } else {
            lastNameErrorMsg.innerText =
              'Ne peut contenir que des lettres et 3 caractères minimum';
            lastNameErrorMsg.style.color = 'red';
          }
        }
        //------------------------------------------------//
        // retrieve the address from the contact array    //
        // test the validity of the address               //
        // if the address is valid, returns true          //
        // else display an error message in red           //
        //------------------------------------------------//
        function addressIsValid() {
          const addressRegex = contact.address;
          const addressErrorMsg = document.getElementById('addressErrorMsg');
          if (/^[-'a-zA-Z0-9À-ÖØ-öø-ÿ\s]{3,}$/.test(addressRegex)) {
            addressErrorMsg.innerText = '';
            return true;
          } else {
            addressErrorMsg.innerText = 'Contient des caractères non valide';
            addressErrorMsg.style.color = 'red';
          }
        }
        //------------------------------------------------//
        // retrieve the city from the contact array       //
        // test the validity of the city                  //
        // if the city is valid, returns true             //
        // else display an error message in red           //
        //------------------------------------------------//
        function cityIsValid() {
          const cityRegex = contact.city;
          const cityErrorMsg = document.getElementById('cityErrorMsg');
          if (/^[-'a-zA-ZÀ-ÖØ-öø-ÿ\s]{3,}$/.test(cityRegex)) {
            cityErrorMsg.innerText = '';
            return true;
          } else {
            cityErrorMsg.innerText =
              'Ne peut contenir que des lettres et 3 caractères minimum';
            cityErrorMsg.style.color = 'red';
          }
        }
        //------------------------------------------------//
        // retrieve the email from the contact array      //
        // test the validity of the email                 //
        // if the email is valid, returns true            //
        // else display an error message in red           //
        //------------------------------------------------//
        function emailIsValid() {
          const emailRegex = contact.email;
          const emailErrorMsg = document.getElementById('emailErrorMsg');
          if (/^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/.test(emailRegex)) {
            emailErrorMsg.innerText = '';
            return true;
          } else {
            emailErrorMsg.innerText =
              'Email non valide. (exemple: text@text.com)';
            emailErrorMsg.style.color = 'red';
          }
        }
        if (
          firstNameIsValid() &&
          lastNameIsValid() &&
          addressIsValid() &&
          cityIsValid() &&
          emailIsValid()
        ) {
          return true;
        } else {
          alert('Le formulaire contient des erreurs.');
          return false;
        }
      }
      //-----------------------------------------------------------------------//
      // add an eventListener('click') on order with is id in the DOM          //
      // if the validation function is true                                    //
      // create an array containing the id of the articles in the localStorage //
      // create an array containing the values ​​entered in the form             //
      // and the array containing the id of the articles in the localStorage   //
      // send the data to the backend with the POST request                    //
      // transforms javascript array to JSON and retrieve the order id         //
      // clear the localStorage and go to confirmation.html page               //
      // if the API does not respond, then display an alert message            //
      //-----------------------------------------------------------------------//
      function sendOrder() {
        const order = document.getElementById('order');
        order.addEventListener('click', (event) => {
          event.preventDefault();
          if (validation()) {
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
            fetch('http://localhost:3000/api/products/order', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(contactProductsArray),
            })
              .then((response) => response.json())
              .then((id) => {
                localStorage.clear();
                document.location.href = `confirmation.html?id=${id.orderId}`;
              })
              .catch((error) => {
                alert(
                  'Notre serveur de répond pas, veuillez revenir ultérieurement.'
                );
                console.log(error);
              });
          }
        });
      }
      sendOrder();
    }
    //-------------------------------------------------------------------//
    // if localStorage is empty display alert message                    //
    // clicking on OK returns to the home page                           //
    //-------------------------------------------------------------------//
    else {
      alert(`
      Le panier est vide,
      retour à la page d'accueil !`);
      location.href = 'index.html';
    }
  }
  localStorageProductsDOM();
}
getLocalStorageProducts();

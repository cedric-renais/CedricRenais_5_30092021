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
    const productCart = `<article class="cart__item" data-id="${localStorageProducts[index].id}">
    <div class="cart__item__img">
    <img src="${localStorageProducts[index].image}" alt="${localStorageProducts[index].alt}">
    </div>
    <div class="cart__item__content">
    <div class="cart__item__content__titlePrice">
    <h2>${localStorageProducts[index].name}</h2>
    <p>${localStorageProducts[index].color}</p>
    <p>${localStorageProducts[index].price} €</p>
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
}

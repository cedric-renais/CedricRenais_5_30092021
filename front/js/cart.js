//-----------------------------------------------//
// retrieves the products in the localStorage    //
//-----------------------------------------------//
const localStorageProducts = JSON.parse(
  localStorage.getItem('localStorageProducts')
);
console.log(localStorageProducts);

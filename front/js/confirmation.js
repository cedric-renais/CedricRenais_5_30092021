//-----------------------------------------------------------//
// declare a function to get the order number                //
// if searchParams has an id, retrieve it                    //
// else display alert message                                //
// add a eventListener('load')                               //
// get the id in the DOM                                     //
// display the order number                                  //
//-----------------------------------------------------------//

function getOrderId() {
  const url = new URL(window.location.href);
  const searchParams = new URLSearchParams(url.search);
  if (searchParams.has('id')) {
    const id = searchParams.get('id');
    console.log('order number is:', id);
    return id;
  } else {
    console.log('Oops, i have a bad feeling about this...');
    alert('Notre serveur de répond pas, veuillez revenir ultérieurement.');
  }
}
window.addEventListener('load', () => {
  const orderId = document.getElementById('orderId');
  orderId.innerText = getOrderId();
});

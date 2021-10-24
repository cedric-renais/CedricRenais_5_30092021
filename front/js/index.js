//-----------------------------------------------------------------//
// API call                                                        //
// transform data into json format                                 //
// if the API does not respond, then an error message is displayed //
//-----------------------------------------------------------------//

fetch('http://localhost:3000/api/products')
  .then((response) => response.json())
  .then((data) => {
    addProducts(data);
    console.log('Data sent by the API', data);
  })
  .catch((error) => {
    alert('Notre serveur de répond pas, veuillez revenir ultérieurement.');
  });

//-------------------------------------------------------------------------------------------------------------//
// creation of a function for the display of articles                                                          //
// for of loop which iterates through the array and creates a variable for each element                        //
// parses the specified text as HTML and inserts the resulting nodes into the DOM tree at a specified position //
// avoids the extra step of serialization, making it much faster than direct innerHTML manipulation            //
//-------------------------------------------------------------------------------------------------------------//

function addProducts(data) {
  for (product of data) {
    const thumbnails = `
          <a href="./product.html?_id=${product._id}">
          <article>
              <img src="${product.imageUrl}" alt="${product.altTxt}">
             <h3 class="productName">${product.name}</h3>
             <p class="productDescription">${product.description}</p>
          </article>
          </a>
        `;
    document
      .getElementById('items')
      .insertAdjacentHTML('beforeend', thumbnails);
  }
}

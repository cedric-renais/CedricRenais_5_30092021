//------------------------------------------//
// declaration of the API url as a variable //
//------------------------------------------//

const url = 'http://localhost:3000/api/products';

//--------------------------------//
// retrieve the data from the API //
//--------------------------------//

// creation of the function
// API call
// transform data into json format
// display the list of data in the console
// loop which iterates through the array and creates a variable for each element
// declare a variable containing the HTML to display
// parses the specified text as HTML and inserts the resulting nodes into the DOM tree at a specified position
// avoids the extra step of serialization, making it much faster than direct innerHTML manipulation

function getProducts() {
  fetch(url).then((data) =>
    data.json().then((data) => {
      console.log(data);
      for (index = 0; index < data.length; index++) {
        const imageUrl = data[index].imageUrl;
        const altTxt = data[index].altTxt;
        const name = data[index].name;
        const id = data[index]._id;
        const description = data[index].description;
        const price = data[index].price;
        const thumbnails = `<a href="../html/product.html?id=${id}">
        <article>
        <img src="${imageUrl}" alt="${altTxt}">
        <h3 class="productName">${name}</h3>
        <p class="productDescription">${description}</p>
        <p>Prix : ${price} €</p>
        </article>
        </a> `;
        document
          .getElementById('items')
          .insertAdjacentHTML('beforeend', thumbnails);
      }
    })
  );
}

getProducts();

const baseUrl = 'https://platzi-avo.vercel.app';
const mountNode = document.getElementById('js-mount');

const formatPrice = (price) =>
  new Intl.NumberFormat('en-EN', {
    style: 'currency',
    currency: 'USD',
  }).format(price);

!(async function () {
  const response = await fetch(`${baseUrl}/api/avo`);
  // 💡 More about Spread: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
  const { data: allAvos } = await response.json();

  // Create the HTML Nodes for each avocado we receive from the API
  // 💡 More about Array.map: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
  const nodeArray = allAvos.map((avocado) => {
    // Create image node
    // <img class="h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-6" src="avatar.jpg">
    const image = document.createElement('img');
    image.className =
      'h-24 w-24 border border-green-200 md:h-32 md:w-32 rounded-full mx-auto md:mx-0 md:mr-6';
    image.src = `${baseUrl}${avocado.image}`;

    // Create heading
    // <h2 class="text-lg">Erin Lindford</h2>
    const title = document.createElement('h2');
    title.className = 'text-lg font-semibold';
    title.textContent = avocado.name;

    // Create Price
    // <div class="text-gray-600">(555) 765-4321</div>
    const price = document.createElement('div');
    price.className = 'text-gray-600 rounded-xl text-center m-1 bg-green-200';
    price.textContent = formatPrice(avocado.price);

    // Wrap price & title
    // <div class="text-center md:text-left"><price ><title ></div>
    const priceAndTitle = document.createElement('div');
    priceAndTitle.className = 'text-center md:text-left';
    priceAndTitle.appendChild(title);
    priceAndTitle.appendChild(price);

    // Wrap Img and priceAndTitle
    // <div class="md:flex bg-white rounded-lg p-6">
    const card = document.createElement('div');
    card.className =
      'md:flex bg-white shadow-lg rounded-lg p-6 m-4 hover:bg-green-100';
    card.appendChild(image);
    card.appendChild(priceAndTitle);

    return card;
  });

  // Trick: Apply an array as a list of arguments
  mountNode.append(...nodeArray);
})();

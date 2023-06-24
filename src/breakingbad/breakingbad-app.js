/**
 * !PETICIONES HTTP
 * !GET: Obtener datos de la API, no se envía información al servidor (solo se obtiene) (GET es el método por defecto)
 * !POST: Enviar información al servidor (crear informacion)
 * !PUT: Actualizar información en el servidor
 * !DELETE: Eliminar información en el servidor
 * !PATCH: Actualizar parte de la información en el servidor
 * !HEAD: Obtener encabezados de la información en el servidor
 * !OPTIONS: Obtener opciones de la información en el servidor
 * !TRACE: Obtener la ruta de la información en el servidor
 * !CONNECT: Conectar con el servidor
 */

/**
 * @returns {Promise<Object>} quote information
 */
const fetchQuote = async () => {
  const res = await fetch('https://api.breakingbadquotes.xyz/v1/quotes'); // Se hace la petición a la API, devuelve una promesa
  const data = await res.json(); // Se convierte la respuesta a JSON, con await se espera a que se resuelva la promesa

  return data;
}

/**
 *
 * @param {HTMLDivElement} element
 */
export const BreakingBadApp = async (element) => {
  // Se escribe con mayúscula la primera letra de cada palabra para indicar que es un componente

  document.querySelector('#app-title').innerHTML = 'Breaking Bad App';
  element.innerHTML = 'Loading...'

  const quoteLabel = document.createElement('blockquote');
  const nextQuoteButton = document.createElement('button');
  const authorLabel = document.createElement('h3');

  nextQuoteButton.innerText = 'Next quote';
  
  const renderQuote = (data) => {
    quoteLabel.innerHTML = data.quote;
    authorLabel.innerText = data.author;

    element.replaceChildren(quoteLabel, authorLabel, nextQuoteButton); // Reemplaza los hijos del elemento por los que se pasan como parámetro
  }

  nextQuoteButton.addEventListener('click', async () => {
    element.innerHTML = 'Loading...';
    
    const [quote] = await fetchQuote();
    renderQuote(quote);
  });

  fetchQuote()
    .then( data => renderQuote(data[0]) )
    .catch( err => console.error(err) );
};

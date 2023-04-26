//JSON불러와서 HTML에 적용시키기
const movieList = document.querySelector('.movie-list');
let html = '';
fetch('https://janghwanpark.github.io/ajax-data-storage/json-data/product-data/movie-data.json')
  .then(response => response.json())
  .then(data => {
    const movies = data.movies;
    movies.forEach(movie => {
      html += `
        <div>
          <h2>${movie.title}</h2>
          <p>장르: ${movie.genre}</p>
          <p>감독: ${movie.director}</p>
          <p>개봉년도: ${movie.year}</p>
          <p>평점: ${movie.rating}</p>
          <p>DVD 가격: ${movie.product.DVD.price}원, 재고: ${movie.product.DVD.stock}개</p>
          <p>Blu-ray 가격: ${movie.product['Blu-ray'].price}원, 재고: ${movie.product['Blu-ray'].stock}개</p>
          <span>
            <button class="add" onclick="add()">담기</button>
          </span>
        </div>
      `;
    });
    movieList.insertAdjacentHTML('afterend', html);
  })
  .catch(error => console.error(error));

//
function add() {
  fetch('https://janghwanpark.github.io/ajax-data-storage/json-data/product-data/movie-data.json')
    .then(response => response.json())
    .then(data => {
      const addmovieinfo = data.movies;
      let html = '';
      addmovieinfo.forEach(movie => {
        html += `
          <div>
            <h2>${movie.title}</h2>
            <p>장르: ${movie.genre}</p>
            <p>감독: ${movie.director}</p>
            <span>
              <b>수량</b>
              <b class="amount">1</b>
              <button class="amount-plus" onclick="amountIncrease()">+</button>
              <button class="amount-minus" onclick="amountDescrease()">-</button>
            </span>
          </div>
        `;
      });
      document.querySelector('.cart').insertAdjacentHTML('afterend', html);
    })
    .catch(error => console.error(error));
}
  

// 수량 증가,감소 
let amount = 1;

function amountDetect() {
  const amountdisplay = document.querySelector('.amount');
  amountdisplay.textContent = amount;
}
function amountDescrease() {
  amount--
  if (amount < 1) {
    amount = 1;
  }
  amountDetect();
}
function amountIncrease() {
  amount++
  amountDetect();
}
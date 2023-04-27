// JSON불러와서 HTML에 적용시키기
const movieList = document.querySelector('.movie-list');
function getMoviesData() {
  fetch('https://janghwanpark.github.io/ajax-data-storage/json-data/product-data/movie-data.json')
    .then(response => response.json())
    .then(data => {
      const movies = data.movies;
      movies.forEach((movie, index) => {
        movie.id = index;
        movieList.insertAdjacentHTML('beforeend', `
        <div class="movie-content">
          <h2>${movie.title}</h2>
          <p>장르: ${movie.genre}</p>
          <p>감독: ${movie.director}</p>
          <p>개봉년도: ${movie.year}</p>
          <p>평점: ${movie.rating}</p>
          <p>DVD 가격: ${movie.product.DVD.price}원 <br> 재고: ${movie.product.DVD.stock}개</p>
          <span>
            <button class="add">담기</button>
          </span>
        </div>
      `);

        movieList.insertAdjacentHTML('beforeend', `
        <div class="movie-content">
          <h2>${movie.title}</h2>
          <p>장르: ${movie.genre}</p>
          <p>감독: ${movie.director}</p>
          <p>개봉년도: ${movie.year}</p>
          <p>평점: ${movie.rating}</p>
          <p>DVD 가격: ${movie.product['Blu-ray'].price}원 <br> 재고: ${movie.product['Blu-ray'].stock}개</p>
          <span>
            <button class="add">담기</button>
          </span>
        </div>
      `);
      })
      const getBtns = document.querySelectorAll('.add');
      getBtns.forEach(getBtn => {
        getBtn.addEventListener('click', (e) =>
          add(e, movies)
        );
        return movies;
      });
    })
    .catch(error => console.error(error));
}

function init() {
  getMoviesData();
}

init();

function add(event, movies) {
  const movieContent = event.target.closest('.movie-content');
  const movieTitle = movieContent.querySelector('h2').textContent;
  const movieProduct = movieContent.querySelector('p').textContent.split(':')[0].trim();
  const moviePrice = event.target.closest('.movie-content').querySelector('p:last-child').textContent.split(':')[1].trim();
  const cart = document.querySelector('.cart');
  const html = `
      <div class="cart-item">
        <p>${movieTitle}</p>
        <p>${moviePrice}원</p>
        <p>${movieProduct}</p>
        <b>수량</b>
        <b class="amount">1</b>
        <button onclick="amountIncrease()">+</button>
        <button onclick="amountDescrease()">-</button>
      </div>
    `;
  cart.insertAdjacentHTML('beforeend', html);
}



// 수량 증가,감소
let amount = 1;
const amountdisplay = document.querySelector('.amount');
function amountDetect() {
  amountdisplay.innerHTML = amount;
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
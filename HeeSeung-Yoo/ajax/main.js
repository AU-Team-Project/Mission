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
          <p>Blu-ray 가격: ${movie.product['Blu-ray'].price}원 <br> 재고: ${movie.product['Blu-ray'].stock}개</p>
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

function add(e) {
  const movieContent = e.target.closest('.movie-content'); 
  const movieTitle = movieContent.querySelector('h2').textContent; 
  const movieProduct = movieContent.querySelector('p').textContent.product;
  const moviePrice = movieContent.querySelector('.add').textContent.price; 
  const cart = document.querySelector('.cart');
  
// (moviePrice와 movieProduct가 undefined로 출력됨, 1순위 수정) + 장바구니에 같은 아이템이 중복으로 담김 >> 중복된 요청시 수량증가로 수정
  cart.insertAdjacentHTML('beforeend', `
  <div class="cart-item">
    <p>${movieTitle}</p>
    <p>${moviePrice}원</p>
    <p>${movieProduct}</p>
    <p>수량</p>
    <p class="amount">1</p>
    <button class="plumi" onclick="amountIncrease()">+</button>
    <button class="plumi" onclick="amountDescrease()">-</button>
  </div>`
  );
}

// 수량 증가,감소 (쿼리셀렉터에서 .amount를 찾을 수 없음 2순위 수정)
let amount = 1;
const amountdisplay = document.querySelector('.amount');

function amountDetect() {
  amountdisplay.insertAdjacentText('beforeend', amount)
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
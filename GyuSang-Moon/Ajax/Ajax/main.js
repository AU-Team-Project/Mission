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
                    <h2 class="title">${movie.title}</h2>
                    <p>장르: ${movie.genre}</p>
                    <p>감독: ${movie.director}</p>
                    <p>개봉년도: ${movie.year}</p>
                    <p>평점: ${movie.rating}</p>
                    <p>DVD : ${movie.product.DVD.price}원</p>
                    <p>재고: ${movie.product.DVD.stock}개</p>
                    <button class="add-cart" data-id="${movie.id}">
                      <span>담기</span>
                    </button>
                  </div>`
              );

              movieList.insertAdjacentHTML('beforeend', `
                  <div class="movie-content">
                    <h2 class="title">${movie.title}</h2>
                    <p>장르: ${movie.genre}</p>
                    <p>감독: ${movie.director}</p>
                    <p>개봉년도: ${movie.year}</p>
                    <p>평점: ${movie.rating}</p>
                    <p class="pro-duct" data-id="${movie.Bluray}">Blu-ray 가격: ${movie.product['Blu-ray'].price}원</p>
                    <p>재고: ${movie.product['Blu-ray'].stock}개</p>
                    <button class="add-cart" data-id="${movie.id}" data-price="${movie.product['Blu-ray'].price}"> 
                      <span>담기</span> 
                    </button>
                  </div>`
              );
          })
          const getBtn = document.querySelectorAll('.add-cart');
          getBtn.forEach(getProduct => {
              getProduct.addEventListener('click', (e) => add(e, movies));
          });

          return movies;
      })

      .catch(error => {
          console.error(error)
      });
}

  function createElement(selectMovie) {
      return `
              <div class="cart-item">
                  <h3 class="title">${selectMovie.title}</h3>
                  <p>장르: ${selectMovie.genre}</p>
                  <p>감독: ${selectMovie.director}</p>
                  <p>개봉년도: ${selectMovie.year}</p>
                  <p>제품: Blu-ray</p>
                  <p>가격: ${selectMovie.product['Blu-ray'].price}</p>
                  <p>재고: ${selectMovie.product['Blu-ray'].stock}</p>
                  <b class="count">수량</b>
                  <b class="amount">1</b>
                  <button button class="plumi" onclick="amountIncrease()">
                    <span>+</span>
                  </button>
                  <button button class="plumi">
                    <span>-</span>
                  </button>
                  <button button class="delete" onclick="remove()">
                    <span>삭제</span>
                  </button>
              </div>`;
  }






const movieCart = document.querySelector('.cart');

function add(e, movies) {
  const movieID = e.target.closest('.add-cart').dataset.id;
  const productID = e.target.closest('.add-cart').dataset.price;
  const selectMovie = movies.find(movie => movie.id == movieID);
  const selectBlu = movies.find(movie => movie.product['Blu-ray'].price == productID);
  
  selectMovie && selectBlu ? movieCart.insertAdjacentHTML('beforeend', createElement(selectMovie)) : alert("장바구니가 비어있습니다.");
}

// 수량 증가,감소 (쿼리셀렉터에서 .amount를 찾을 수 없음 2순위 수정)
let amount = 1;
const amountdisplay = document.querySelector('.amount');

function amountDetect() {
   amountdisplay.textContent(amount)
   return amountdisplay;
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

// function add(e, movies) {
//   const movieContent = e.target.closest('.movie-content');
//   const movieTitle = movieContent.querySelector('h2').textContent;
//   const movieProduct = movieContent.querySelector('p').textContent.product;
//   const moviePrice = movieContent.querySelector('.add-cart').textContent.price;
//   const cart = document.querySelector('.cart');

//   // (moviePrice와 movieProduct가 undefined로 출력됨, 1순위 수정) + 장바구니에 같은 아이템이 중복으로 담김 >> 중복된 요청시 수량증가로 수정
//   cart.insertAdjacentHTML('beforeend', `
//   <div class="cart-item">
//     <p>${movieTitle}</p>
//     <p>${moviePrice}원</p>
//     <p>${movieProduct}</p>
//     <p>수량</p>
//     <p class="amount">1</p>
//     <button class="plumi" onclick="amountIncrease()">+</button>
//     <button class="plumi" onclick="amountDescrease()">-</button>
//   </div>`
//   );
// }

function init() {
  getMoviesData();
}
init();
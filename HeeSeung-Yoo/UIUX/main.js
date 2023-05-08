const movieList = document.querySelector('.movie-list');
const movieCart = document.querySelector('.cart');

//JSON불러와서 HTML에 적용시키기
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
                    <button class="add-cart" data-id="${movie.id}" data-price="${movie.product.DVD.price}">
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

            //장바구니에 담기
            movieList.addEventListener('click', (e) => {
                if (e.target.classList.contains('add-cart')) {
                  const movieID = e.target.dataset.id;
                  const productID = e.target.dataset.price;
                  const selectMovie = movies.find(movie => movie.id == movieID);
                  const selectProduct = selectMovie.product['DVD'].price == productID ? selectMovie.product.DVD : selectMovie.product['Blu-ray'];
                  const productType = selectProduct == selectMovie.product.DVD ? 'DVD' : 'Blu-ray';

                  //장바구니에 같은게 있으면
                  const AlreadyInCart = Array.from(movieCart.querySelectorAll('.cart-item')).find(cartItem => {
                    return cartItem.dataset.movieid == movieID && cartItem.dataset.productid == productID;
                  });
                  if (AlreadyInCart) {
                    const amountElement = AlreadyInCart.querySelector('.amount');
                    const amount = parseInt(amountElement.textContent);
                    amountElement.textContent = amount + 1;
                  } else {

                    //장바구니에 같은게 없으면
                    if (selectMovie && selectProduct) {
                      movieCart.insertAdjacentHTML('beforeend', `
                        <div class="cart-item" data-movieid="${movieID}" data-productid="${productID}">
                          <h3 class="title">${selectMovie.title}</h3>
                          <p>장르: ${selectMovie.genre}</p>
                          <p>감독: ${selectMovie.director}</p>
                          <p>개봉년도: ${selectMovie.year}</p>
                          <p>제품: ${productType}</p>
                          <p>가격: ${selectProduct.price}</p>
                          <p>재고: ${selectProduct.stock}</p>
                          <b class="count">수량</b>
                          <b class="amount">1</b>
                          <button class="plus">
                            <span>+</span>
                          </button>
                          <button class="minus">
                            <span>-</span>
                          </button>
                          <button class="delete">
                            <span>삭제</span>
                          </button>
                        </div>
                      `);
                    } else {
                      alert("장바구니가 비어있습니다.");
                    }
                  }
                }
              });
            }              
        )}

//장바구니에 담은 거 삭제하기
movieCart.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
        const cartItem = e.target.closest('.cart-item');
        cartItem.parentNode.removeChild(cartItem);
    }
})

//장바구니에 담긴거 수량 증가,감소
movieCart.addEventListener('click', (e) => {
    if (e.target.classList.contains('plus')) {
        const amountElement = e.target.closest('.cart-item').querySelector('.amount');
        const amount = parseInt(amountElement.textContent);
        amountElement.textContent = amount + 1;
    }
})

movieCart.addEventListener('click', (e) => {
    if (e.target.classList.contains('minus')) {
        const amountElement = e.target.closest('.cart-item').querySelector('.amount');
        const amount = parseInt(amountElement.textContent);
        Number(amount);
        if (amount > 1) {
            amountElement.textContent = amount - 1;
        }
    }
})

//JSON파일 불러오기
function init() {
  getMoviesData();
}
init();
console.log (getMoviesData);

const movieList = document.querySelector('.movie-list');
// JSON불러와서 HTML에 적용시키기
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

function createElement(selectMovieBlu, selectMovieDVD) {
  
  if(selectMovieDVD) {
    movieCart.insertAdjacentHTML('beforeend', `
    <div class="cart-item">
        <h3 class="title">${selectMovieDVD.title}</h3>
        <p>장르: ${selectMovieDVD.genre}</p>
        <p>감독: ${selectMovieDVD.director}</p>
        <p>개봉년도: ${selectMovieDVD.year}</p>
        <p>제품: ${Object.keys(selectMovieDVD.product)[0]}</p>
        <p>가격: ${selectMovieDVD.product.DVD.price}</p>
        <p>재고: ${selectMovieDVD.product.DVD.stock}</p>
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
    </div>`);
  }else if(selectMovieBlu) {
    movieCart.insertAdjacentHTML('beforeend', `
    <div class="cart-item">
        <h3 class="title">${selectMovieBlu.title}</h3>
        <p>장르: ${selectMovieBlu.genre}</p>
        <p>감독: ${selectMovieBlu.director}</p>
        <p>개봉년도: ${selectMovieBlu.year}</p>
        <p>제품: ${Object.keys(selectMovieBlu.product)[1]}</p>
        <p>가격: ${selectMovieBlu.product['Blu-ray'].price}</p>
        <p>재고: ${selectMovieBlu.product['Blu-ray'].stock}</p>
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
    </div>`);
  }else
  alert("장바구니가 비어있습니다.");
    
  calldeleteBtn()
  callamountIncrease();
  callamountDecrease();
}

const movieCart = document.querySelector('.cart');
/**
 * @param e = Event
 * @param movies = Products Data
 **/
function add(e, movies) {
  const movieID = e.target.closest('.add-cart').dataset.id;
  const productID = e.target.closest('.add-cart').dataset.price;
  const selectMovieBlu = movies.find(movie => movie.id == movieID && movie.product['Blu-ray'].price == productID);
  const selectMovieDVD = movies.find(movie => movie.id == movieID && movie.product['DVD'].price == productID);
 
  localStorage.setItem("BluRay", JSON.stringify(selectMovieBlu));
  localStorage.setItem("DVD", JSON.stringify(selectMovieDVD));
  sessionStorage.setItem("all", JSON.stringify(movies));
  
  
  createElement(selectMovieBlu, selectMovieDVD);
}


//장바구니에 담은 거 삭제하기
function calldeleteBtn() {
  const delBtns = document.querySelectorAll('.delete');
  delBtns.forEach(delBtn => {
    delBtn.addEventListener('click', deleteElement);
  });
}

function deleteElement(e) {
  const cartItem = e.target.closest('.cart-item');
  cartItem.parentNode.removeChild(cartItem);
  localStorage.removeItem(1)
  localStorage.removeItem(2)
  sessionStorage.removeItem(1)
  
}

//장바구니에 담긴거 수량 증가,감소
let amountValue = 1;

function callamountIncrease() {
  const plusBtns = document.querySelectorAll('.plus');
  plusBtns.forEach(plusBtn => {
    plusBtn.addEventListener('click', amountIncrease);
  });
}

function amountIncrease(e) {
  const Amount = e.target.closest('.cart-item').querySelector('.amount');
  amountValue = parseInt(Amount.textContent);
  amountValue++;
  Amount.textContent = amountValue;
  
}

function callamountDecrease() {
  const minusBtns = document.querySelectorAll('.minus');
  minusBtns.forEach(minusBtn => {
    minusBtn.addEventListener('click', amountDecrease);
  });
}

function amountDecrease(e) {
  const Amount = e.target.closest('.cart-item').querySelector('.amount');
  amountValue = parseInt(Amount.textContent);
  if (amountValue > 1) {
    amountValue--;
    Amount.textContent = amountValue;
    
  }
}

//JSON파일 불러오기
function init() {
  getMoviesData();
}
init();

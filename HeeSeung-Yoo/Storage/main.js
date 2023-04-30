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

function createElement(selectMovie, selectDVD, selectBlu) {
  
  if(selectMovie && selectBlu) {
    movieCart.insertAdjacentHTML('beforeend', `
    <div class="cart-item">
        <h3 class="title">${selectMovie.title}</h3>
        <p>장르: ${selectMovie.genre}</p>
        <p>감독: ${selectMovie.director}</p>
        <p>개봉년도: ${selectMovie.year}</p>
        <p>제품: DVD</p>
        <p>가격: ${selectMovie.product.DVD.price}</p>
        <p>재고: ${selectMovie.product.DVD.stock}</p>
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
  }else if(selectMovie && selectDVD) {
    movieCart.insertAdjacentHTML('beforeend', `
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
  callamountIncrease()
  callamountDecrease()
  // LocalStorage Data Set
    if(selectMovie && selectBlu) {
      localStorage.setItem(1, JSON.stringify(selectMovie.product['Blu-ray']));
    }else if(selectMovie && selectDVD){
      localStorage.setItem(1, JSON.stringify(selectMovie.product.DVD));
    }
    
    // SessionStorage Data Set
    sessionStorage.setItem(1, JSON.stringify(selectMovie.id));
}

const movieCart = document.querySelector('.cart');
/**
 * @param e = Event
 * @param movies = Products Data
 **/
function add(e, movies) {
  const movieID = e.target.closest('.add-cart').dataset.id;
  const productID = e.target.closest('.add-cart').dataset.price;
  const selectMovie = movies.find(movie => movie.id == movieID);
  const selectBlu = movies.find(movie => movie.product['Blu-ray'].price == productID);
  const selectDVD = movies.find(movie => movie.product['DVD'].price == productID);
 
  
  
  createElement(selectMovie, selectBlu, selectDVD);
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
  sessionStorage.clear();
}
init();

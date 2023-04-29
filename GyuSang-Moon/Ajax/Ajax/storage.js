const movieList = document.querySelector('.movie-list');
// Ajax로 데이터 불러오기
function getProductData() {
  fetch('https://janghwanpark.github.io/ajax-data-storage/json-data/product-data/movie-data.json')
    .then(response => response.json())
    .then(data => {
      const movies = data.movies;
      movies.forEach((movie, index) => {
        movie.id = index;
        // 장바구니에 영화 추가 버튼 클릭 시
        const addToCartBtn = movieList.querySelector(`[data-movie-id="${movie.id}"] .add-to-cart`);
        addToCartBtn.addEventListener('click', () => {
          const cartItem = {
            id: movie.id,
            title: movie.title,
            price: movie.price,
            quantity: 1,
          };
          // 로컬 스토리지에 장바구니 데이터 저장
          let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
          const existingCartItemIndex = cartItems.findIndex(item => item.id === cartItem.id);
          if (existingCartItemIndex !== -1) {
            // 이미 장바구니에 있는 경우 수량 증가
            cartItems[existingCartItemIndex].quantity += 1;
          } else {
            // 장바구니에 추가
            cartItems.push(cartItem);
          }
          localStorage.setItem('cartItems', JSON.stringify(cartItems));
          // 세션 스토리지에 마지막으로 추가한 영화 정보 저장
          const lastAddedMovie = {
            id: movie.id,
            title: movie.title,
            price: movie.price,
          };
          sessionStorage.setItem('lastAddedMovie', JSON.stringify(lastAddedMovie));
        });
      });
    });
}
// 로컬스토리지에 데이터 저장
cartData.local.push(productData);
localStorage.setItem('cartData', JSON.stringify(cartData));
  // 세션스토리지에 데이터 저장
  cartData.session.push(productData);
  sessionStorage.setItem('cartData', JSON.stringify(cartData));
// 장바구니 데이터 삭제
function clearCart() {
    localStorage.removeItem('cartItems');
}
// 로컬 스토리지와 세션 스토리지에 저장된 데이터 유효성 검사
function validateStorageData() {
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  const lastAddedMovie = JSON.parse(sessionStorage.getItem('lastAddedMovie'));
  let isValid = true;
  // 로컬 스토리지에 저장된 장바구니 데이터 유효성 검사
  for (let i = 0; i < cartItems.length; i++) {
    const item = cartItems[i];
    if (!item.id || !item.title || !item.price || !item.quantity) {
      isValid = false;
      break;
    }
  }
  // 세션 스토리지에 저장된 마지막 추가 영화 정보 유효성 검사
  if (!lastAddedMovie || !lastAddedMovie.id || !lastAddedMovie.title || !lastAddedMovie.price) {
    isValid = false;
  }
  return isValid;
}
// 페이지 로드 시 실행
getProductData();
// 삭제 버튼 클릭 시 장바구니 데이터 삭제
const clearCartBtn = document.querySelector('.clear-cart');
clearCartBtn.addEventListener('click', () => {
  clearCart();
});
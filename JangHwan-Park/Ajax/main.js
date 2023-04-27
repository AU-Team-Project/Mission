//JSON불러와서 HTML에 적용시키기
const movieList = document.querySelector('.movie-list');

// Create Data
function getProductData() {
    fetch('https://janghwanpark.github.io/ajax-data-storage/json-data/product-data/movie-data.json')
        .then(response => response.json())
        .then(data => {
            const movies = data.movies;
            movies.forEach((movie, index) => {
                movie.id = index;

                // Btn -> 이벤트 버블링으로 디버깅 예정
                movieList.insertAdjacentHTML('beforeend', `
                    <div class="pt-data">
                      <h2 class="title">${movie.title}</h2>
                      <p>장르: ${movie.genre}</p>
                      <p>감독: ${movie.director}</p>
                      <p>개봉년도: ${movie.year}</p>
                      <p>평점: ${movie.rating}</p>
                      <p>DVD : ${movie.product.DVD.price}원</p>
                      <p>재고: ${movie.product.DVD.stock}개</p>
                      <button class="getItem" data-id="${movie.id}">
                        <span>담기</span>
                      </button>
                    </div>`
                );

                movieList.insertAdjacentHTML('beforeend', `
                    <div class="pt-data">
                      <h2 class="title">${movie.title}</h2>
                      <p>장르: ${movie.genre}</p>
                      <p>감독: ${movie.director}</p>
                      <p>개봉년도: ${movie.year}</p>
                      <p>평점: ${movie.rating}</p>
                      <p>Blu-ray 가격: ${movie.product['Blu-ray'].price}원</p>
                      <p>재고: ${movie.product['Blu-ray'].stock}개</p>
                      <button class="getItem" data-id="${movie.id}"> 
                        <span>담기</span> 
                      </button>
                    </div>`
                );
            })
            const getBtn = document.querySelectorAll('.getItem');
            getBtn.forEach(getProduct => {
                getProduct.addEventListener('click', (e) => getItemBasket(e, movies));
            });

            return movies;
        })

        // 에러처리
        .catch(error => {
            console.error(error)
        });
}

// 요소 반환 (응용하셈)
function createElement(selectMovie) {
    return `
            <div class="cart-item">
                <h3 class="title">${selectMovie.title}</h3>
                <p>장르: ${selectMovie.genre}</p>
                <p>감독: ${selectMovie.director}</p>
                <p>개봉년도: ${selectMovie.year}</p>
                <p>평점: ${selectMovie.rating}</p>
            </div>`;
}


// get Item
function getItemBasket(e, movies) {
    const movieID = e.target.closest('.getItem').dataset.id;
    const selectMovie = movies.find(movie => movie.id = movieID);
    const movieCart = document.querySelector('.cart');

    selectMovie ? movieCart.insertAdjacentHTML('beforeend', createElement(selectMovie)) : alert("장바구니가 비어있습니다.");
}


function init() {
    getProductData();
}

init();
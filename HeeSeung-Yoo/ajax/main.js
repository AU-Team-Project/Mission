$(document).ready(function () {

    $.ajax({
        url: "https://janghwanpark.github.io/ajax-data-storage/json-data/product-data/movie-data.json",
        type: "GET",
        dataType: "json",
        success: function(res) {
            let parsedData = JSON.parse(data);
        },
        error : function(request, status, error) {
            console.log(request.responseText);
        }
    })
});

let movieList = document.getElementById('movie-list');

fetch('./movie-data.json')
  .then(response => response.json())
  .then(data => {
    const movies = data.movies;
    let html = '';
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
        </div>
      `;
    });
    movieList.textContent = html;
  })
  .catch(error => console.error(error));
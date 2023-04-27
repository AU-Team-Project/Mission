function getJsonData() {
    fetch('https://janghwanpark.github.io/ajax-data-storage/json-data/product-data/movie-data.json')
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
        .catch(err => {
            console.log('Fetch Error', err);
        });
}

getJsonData();
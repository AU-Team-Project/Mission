function getJsonData() {
    fetch('https://janghwanpark.github.io/ajax-data-storage/json-data/product-data/movie-data.json')
        .then(res => { 
            return res.json();
        })
        .then(data => { 
            const info = document.createElement("div"); 
            info.textContent = data.map((item) => item.name + item.email);
            userBox.appendChild(info);
        })
        .catch(err => {
            console.log('Fetch Error', err);
        });
    }
        
let searchResults = document.getElementById('searchResults');
let buttonSubmitt = document.getElementById('submit-button');
let genreInput = document.getElementsByName('genreDropdown');
let authorInput = document.getElementsByName('author');
let bookTitleInput = document.getElementsByName('bookTitle');
let minPriceInput = document.getElementsByName('minPrice');
let maxPriceInput = document.getElementsByName('maxPrice');
let newBooksInput = document.getElementsByName('newBooks');
let maxPagesInput = document.getElementsByName('maxPages');


const searcher = () => {
    let tmp = new Array();      // два вспомагательных
    let tmp2 = new Array();     // массива
    let param = new Array();

    var get = location.search;  // строка GET запроса, то есть все данные после ?
    if (get != '') {
        tmp = (get.substr(1)).split('&');   // разделяем переменные
        for (var i = 0; i < tmp.length; i++) {
            tmp2 = tmp[i].split('=');       // массив param будет содержать
            param[tmp2[0]] = tmp2[1];       // пары ключ(имя переменной)->значение
        }
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:4001/appi/app/search');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function () {
            if (xhr.status !== 201) {
                alert("Error");
            } else {
                try {
                    const toBeFilled = JSON.parse(xhr.response);

                    let divs = toBeFilled.map(elem => {
                        let str;
                        if (isNaN(elem.summary_rating / elem.amOfReviews)) {
                            str = 'Книгу еще никто не оценил';
                        } else {
                            str = elem.summary_rating / elem.amOfReviews;
                        }

                        return `
    <div class="properties">
    <a href="catalog_item.html" class="img img-2 d-flex justify-content-center align-items-center" style="background-image: url(${elem.photo});">
    <div class="icon d-flex justify-content-center align-items-center">
   <span class="icon-search2"></span>
    </div>
    </a>
    <div class="text p-3">
    <span class="status genre">${elem.genre}</span>
   <div class="d-flex">
    <div class="one">
    <h3><a href="catalog_item.html"></a></h3>
   <p>${elem.author}</p>
    </div>
    <div class="two">
    <span class="price">${elem.price}</span>
    </div>
    </div>
    <p>${elem.description.substring(0, 100)}...</p>
   <hr>
    <p class="bottom-area d-flex">
    <span><img src="images/rating.png"/> ${str}</span>
    </p>
    </div>
    </div>
     
    `;
                    });
                    divs.forEach(elem => {
                        // alert("Message sent "+ elem+" end");
                        let newDiv = document.createElement('div');
                        newDiv.className +="col-sm col-md-3 mr-0";// "col-sm col-md-6 col-lg ftco-animate";
                        newDiv.innerHTML = `${elem}`;
                        searchResults.append(newDiv);
                    });
                }
                catch (e) {
                    throw new Error(e.message);
                }
                }

        }
        xhr.send(param);
    }
}

const btnClick = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:4001/appi/app/search');
    xhr.setRequestHeader('Content-Type', 'application/json');
    const data = {
        author: authorInput.value,
        bookTitle: bookTitleInput.value,
        minPrice:minPriceInput.value,
        maxPrice: maxPriceInput.value,
        maxPages: maxPagesInput.value,
        genre: genreInput.value,
        newBooks:newBooksInput.value
    };

    xhr.onload = function () {
        if (xhr.status !== 201) {
            alert("Error");
        } else {

            try {
                const toBeFilled = JSON.parse(xhr.response);

                let divs = toBeFilled.map(elem => {
                    let str;
                    if (isNaN(elem.summary_rating / elem.amOfReviews)) {
                        str = 'Книгу еще никто не оценил';
                    } else {
                        str = elem.summary_rating / elem.amOfReviews;
                    }

                    return `
    <div class="properties">
    <a href="catalog_item.html" class="img img-2 d-flex justify-content-center align-items-center" style="background-image: url(${elem.photo});">
    <div class="icon d-flex justify-content-center align-items-center">
   <span class="icon-search2"></span>
    </div>
    </a>
    <div class="text p-3">
    <span class="status genre">${elem.genre}</span>
   <div class="d-flex">
    <div class="one">
    <h3><a href="catalog_item.html"></a></h3>
   <p>${elem.author}</p>
    </div>
    <div class="two">
    <span class="price">${elem.price}</span>
    </div>
    </div>
    <p>${elem.description.substring(0, 100)}...</p>
   <hr>
    <p class="bottom-area d-flex">
    <span><img src="images/rating.png"/> ${str}</span>
    </p>
    </div>
    </div>
     
    `;
                });
                divs.forEach(elem => {
                    // alert("Message sent "+ elem+" end");
                    let newDiv = document.createElement('div');
                    newDiv.className +="col-sm col-md-3 mr-0";// "col-sm col-md-6 col-lg ftco-animate";
                    newDiv.innerHTML = `${elem}`;
                    searchResults.append(newDiv);
                });
            }
            catch (e) {
                throw new Error(e.message);
            }
        }

    }
    xhr.send(data);
}

document.addEventListener('DOMContentLoaded', searcher);
buttonSubmitt.addEventListener('click', btnClick);




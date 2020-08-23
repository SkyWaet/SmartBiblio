//const loader = require('./mainpageContentLoader');

let newBooksPlace = document.getElementById('newBooksPlace');
let bestsellers = document.getElementById('bestsellers-section');
//

let bestsellerImage_1= document.getElementById('bestsellerImage-1');
let bestsellerImage_2= document.getElementById('bestsellerImage-2');
let bestsellerImage_3= document.getElementById('bestsellerImage-3');
let bestsellerImage_4= document.getElementById('bestsellerImage-4');
let bestsellerTitle_1= document.getElementById('bestsellerTitle-1');
let bestsellerTitle_2= document.getElementById('bestsellerTitle-2');
let bestsellerTitle_3= document.getElementById('bestsellerTitle-3');
let bestsellerTitle_4= document.getElementById('bestsellerTitle-4');
let bestsellerAuthor_1 = document.getElementById('bestsellerAuthor-1');
let bestsellerAuthor_2 = document.getElementById('bestsellerAuthor-2');
let bestsellerAuthor_3 = document.getElementById('bestsellerAuthor-3');
let bestsellerAuthor_4 = document.getElementById('bestsellerAuthor-4');
let bestsellerPrice_1 = document.getElementById('bestsellerPrice-1');
let bestsellerPrice_2 = document.getElementById('bestsellerPrice-2');
let bestsellerPrice_3 = document.getElementById('bestsellerPrice-3');
let bestsellerPrice_4 = document.getElementById('bestsellerPrice-4');
let bestsellerDesc_1 = document.getElementById('bestsellerDesc-1');
let bestsellerDesc_2 = document.getElementById('bestsellerDesc-2');
let bestsellerDesc_3 = document.getElementById('bestsellerDesc-3');
let bestsellerDesc_4 = document.getElementById('bestsellerDesc-4');
let bestsellerRating_1 = document.getElementById('bestsellerRating-1');
let bestsellerRating_2 = document.getElementById('bestsellerRating-2');
let bestsellerRating_3 = document.getElementById('bestsellerRating-3');
let bestsellerRating_4 = document.getElementById('bestsellerRating-4');


let genreInput = document.getElementsByName('genreDropdown');
let authorInput= document.getElementsByName('author');
let bookTitleInput= document.getElementsByName('bookTitle');
let minPriceInput= document.getElementsByName('minPrice');
let maxPriceInput= document.getElementsByName('maxPrice');
let newBooksInput= document.getElementsByName('newBooks');
let maxPagesInput= document.getElementsByName('maxPages');


const bestsellerLoader = function () {
    const xhr = new XMLHttpRequest();
    xhr.open('GET','http://localhost:4001/appi/app/mainpage/bestsellers');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function()
    {if (xhr.status !== 200) { // анализируем HTTP-статус ответа, если статус не 200, то произошла ошибка
        // console.log("Error",xhr.status);
        alert('Error');
    } else { // если всё прошло гладко, выводим результат
        const toBeFilled = JSON.parse(xhr.response);

        bestsellerImage_1.style = `background-image: url(${(toBeFilled[0]).photo});`;
        bestsellerTitle_1.innerHTML = `<p>${(toBeFilled[0]).title}</p>`;
        bestsellerAuthor_1.innerHTML = `<p>${(toBeFilled[0]).author}</p>`;
        bestsellerPrice_1.innerHTML=`<p>${(toBeFilled[0]).price}</p>`
        bestsellerDesc_1.innerHTML = `<p>${(toBeFilled[0]).description.substring(0,100)}...</p>`;
        bestsellerRating_1.innerHTML = `<p>${(toBeFilled[0]).summary_rating/(toBeFilled[0]).amOfReviews}</p>`;

        bestsellerImage_2.style = `background-image: url(${(toBeFilled[1]).photo})`
        bestsellerTitle_2.innerHTML = `<p>${(toBeFilled[1]).title}</p>`;
        bestsellerAuthor_2.innerHTML = `<p>${(toBeFilled[1]).author}</p>`;
        bestsellerDesc_2.innerHTML = `<p>${(toBeFilled[1]).description.substring(0,100)}...</p>`;
        bestsellerPrice_2.innerHTML=`<p>${(toBeFilled[1]).price}</p>`
        bestsellerRating_2.innerHTML = `<p>${(toBeFilled[1]).summary_rating/(toBeFilled[1]).amOfReviews}</p>`;

        bestsellerImage_3.style = `background-image: url(${(toBeFilled[2]).photo})`
        bestsellerTitle_3.innerHTML = `<p>${(toBeFilled[2]).title}</p>`;
        bestsellerAuthor_3.innerHTML = `<p>${(toBeFilled[2]).author}</p>`;
        bestsellerDesc_3.innerHTML = `<p>${(toBeFilled[2]).description.substring(0,100)}...</p>`;
        bestsellerPrice_3.innerHTML=`<p>${(toBeFilled[2]).price}</p>`;
        bestsellerRating_3.innerHTML = `<p>${(toBeFilled[2]).summary_rating/(toBeFilled[2]).amOfReviews}</p>`;

        bestsellerImage_4.style = `background-image: url(${(toBeFilled[3]).photo})`
        bestsellerTitle_4.innerHTML = `<p>${(toBeFilled[3]).title}</p>`;
        bestsellerAuthor_4.innerHTML = `<p>${(toBeFilled[3]).author}</p>`;
        bestsellerDesc_4.innerHTML = `<p>${(toBeFilled[3]).description.substring(0,100)}...</p>`;
        bestsellerPrice_4.innerHTML=`<p>${(toBeFilled[3]).price}</p>`;
        bestsellerRating_4.innerHTML = `<p>${(toBeFilled[3]).summary_rating/(toBeFilled[3]).amOfReviews}</p>`;
    }
    };
    xhr.send();
}

const loader = function(){
     bestsellerLoader();
   // recomendationsLoading();
    newBooksLoading();
};


const recomendationsLoading = async()=>{
    const xhr = new XMLHttpRequest();
    xhr.open('GET','http://localhost:5000/user-recommendation?user_id=' + '1' + '&count=6');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function()
    {
        if (xhr.status !== 200){
            alert("Error");
        }
        else {

            let template = document.querySelector('#newBooksTemplate')
            const books_id = JSON.parse(xhr.response);
            for (let i in books_id) {
                xhr.open('GET', '//localhost:4001/appi/app/mainpage/bestsellers?book_id=' + books_id);
                xhr.setRequestHeader('Content-Type', 'application/json');

                let divs = toBeFilled.map(elem => {
                    let str;
                    if (isNaN(elem.summary_rating / elem.amOfReviews)) {
                        str = 'Книгу еще никто не оценил';
                    } else {
                        str = elem.summary_rating / elem.amOfReviews;
                    }

                    return `
<div class="properties">
<a href="#" class="img d-flex justify-content-center align-items-center" style="background-image: url(${elem.photo});">
<div class="icon d-flex justify-content-center align-items-center">
<span class="icon-search2"></span>
</div>
</a>
<div class="text p-3">
<span class="status sale">${elem.genre}</span>
<div class="d-flex">
<div class="one">
<h3><a href="#">${elem.title}</a></h3>
<p>${elem.description}</p>
</div>
<div class="two">
<span class="price">${elem.price}</span>
</div>
</div>
<div class="rate">
<span><img src="images/rating.png"/></span>
</div>
<span class="rating_pred">${str}</span>
</div>
</div>
 `;
                });
                divs.forEach(elem => {
                    // alert("Message sent "+ elem+" end");
                    let newDiv = document.createElement('div');
                    newDiv.className += "item";
                    newDiv.innerHTML = `${elem}`;
                    newBooksPlace.append(newDiv);
                });
                xhr.send();}
        }
    }
    xhr.send();
};

const newBooksLoading = function() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET','http://localhost:4001/appi/app/mainpage/newBooks');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function()
    {
        if (xhr.status !== 200){
        alert("Error"+xhr.status);
         }
    else{
           // let divs =[];
           // alert("response " + xhr.response);
          //  let template = document.querySelector('#newBooksTemplate')
            const toBeFilled = JSON.parse(xhr.response);

            divs = toBeFilled.map(elem=>{
                let str;
                if(isNaN(elem.summary_rating/elem.amOfReviews)){
                    str = 'Книгу еще никто не оценил';
                }
                else{
                    str = elem.summary_rating/elem.amOfReviews;
                }

               return  `
    <div class="properties">
    <a href="catalog_item.html" class="img img-2 d-flex justify-content-center align-items-center" style="background-image: url(${elem.photo});">
    <div class="icon d-flex justify-content-center align-items-center">
   <span class="icon-search2"></span>
    </div>
    </a>
    <div class="text p-3">
    <span class="status new">Новинка</span>
    <div class="d-flex">
    <div class="one">
    <h3><a href="catalog_item.html">${elem.title}</a></h3>
    <p>${elem.author}</p>
    </div>
    <div class="two">
    <span class="price">${elem.price}</span>
    </div>
    </div>
    <p>${elem.description.substring(0,100)}...</p>
    <hr>
   <p class="bottom-area d-flex">
    <span><img src="images/rating.png"/>${str}</span>
    </p>
    </div>
    </div>
    `;
            });
            divs.forEach(elem => {
                 // alert("Message sent "+ elem+" end");
                   let newDiv = document.createElement('div');
                  newDiv.className +="col-sm col-md-3 mr-0";
                  newDiv.innerHTML = `${elem}`;
                  newBooksPlace.append(newDiv);
            });

        }
    }
    xhr.send();
};
/*const searchManager = ()=>{

    location.replace("content.html");
};*/



document.addEventListener('DOMContentLoaded', loader);
//buttonSubmitt.addEventListener('click',searchManager);
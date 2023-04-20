//varibales
const generalBtn = document.getElementById("general");
const guatemalaBtn = document.getElementById("guatemala");
const indonesiaBtn = document.getElementById("indonesia");
const entertainmentlBtn = document.getElementById("entertainment");
const southafricaBtn = document.getElementById("southafrica");
const searchBtn = document.getElementById("searchBtn");

const newsQuery = document.getElementById("newsQuery");
const newsType = document.getElementById("newsType");
const newsdetails = document.getElementById("newsdetails");

//Array
var newsDataArr = [];

//apis
const API_KEY = "38df21214f7440a1b9ceda851c958ce8";
const HEADLINES_NEWS = "https://newsapi.org/v2/top-headlines?country=tw&apiKey=";
const GENERAL_NEWS = "https://newsapi.org/v2/top-headlines?country=us&category=general&apiKey=";
const GUATEMALA_NEWS = "https://newsapi.org/v2/top-headlines?country=mx&apiKey=";
const INDONESIA_NEWS = "https://newsapi.org/v2/top-headlines?country=id&apiKey=";
const ENTERTAINMENT_NEWS = "https://newsapi.org/v2/top-headlines?country=us&category=entertainment&apiKey=";
const SOUTHAFRICA_NEWS = "https://newsapi.org/v2/top-headlines?country=za&apiKey=";
const SEARCH_NEWS = "https://newsapi.org/v2/everything?q=";

window.onload = function(){
    newsType.innerHTML = "<h4>Headlines</h4>";
    fetchHeadlines();
};


generalBtn.addEventListener("click", function(){
    newsType.innerHTML = "<h4>General news</h4>";
    fetchGeneralNews();
});

guatemalaBtn.addEventListener("click",function(){
    newsType.innerHTML = "<h4>Guatemala</h4>";
    fetchGuatemalaNews();
});

indonesiaBtn.addEventListener("click",function(){
    newsType.innerHTML = "<h4>Indonesia</h4>";
    fetchIndonesiaNews();
});

entertainmentlBtn.addEventListener("click",function(){
    newsType.innerHTML = "<h4>Entertainment</h4>";
    fetchEntertainmentNews();
});

southafricaBtn.addEventListener("click",function(){
    newsType.innerHTML = "<h4>South Africa</h4>";
    fetchSouthAfricaNews();
});

searchBtn.addEventListener("click",function(){
    newsType.innerHTML = "<h4>Search : "+newsQuery.value+"</h4>";
    fetchQueryNews();
});

const fetchHeadlines = async () => {
    const response = await fetch(HEADLINES_NEWS+API_KEY);
    newsDataArr = [];
    if(response.status >= 200 && response.status < 300){
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        //handle errors;
        console.log(response.status, response.statusText);
    }
    
    displayNews(); 
}

const fetchGeneralNews = async () => {
    const response = await fetch(GENERAL_NEWS+API_KEY);
    newsDataArr = [];
    if(response.status >= 200 && response.status < 300){
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        //handle errors;
        console.log(response.status, response.statusText);
    }
    
    displayNews(); 
}

const fetchGuatemalaNews = async () => {
    const response = await fetch(GUATEMALA_NEWS+API_KEY);
    newsDataArr = [];
    if(response.status >= 200 && response.status < 300){
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        //handle errors;
        console.log(response.status, response.statusText);
    }
    
    displayNews(); 
}

const fetchIndonesiaNews = async () => {
    const response = await fetch(INDONESIA_NEWS+API_KEY);
    newsDataArr = [];
    if(response.status >= 200 && response.status < 300){
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        //handle errors;
        console.log(response.status, response.statusText);
    }
    
    displayNews(); 
}

const fetchEntertainmentNews = async () => {
    const response = await fetch(ENTERTAINMENT_NEWS+API_KEY);
    newsDataArr = [];
    if(response.status >= 200 && response.status < 300){
        const myJson = await response.json();
        console.log(myJson);
        newsDataArr = myJson.articles;
    } else {
        //handle errors;
        console.log(response.status, response.statusText);
    }
    
    displayNews(); 
}

const fetchSouthAfricaNews = async () => {
    const response = await fetch(SOUTHAFRICA_NEWS+API_KEY);
    newsDataArr = [];
    if(response.status >= 200 && response.status < 300){
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        //handle errors;
        console.log(response.status, response.statusText);
    }

    displayNews(); 
}

const fetchQueryNews = async () => {

    if(newsQuery.value == null)
    return;

    const response = await fetch(SEARCH_NEWS+encodeURIComponent(newsQuery.value)+"&apiKey="+API_KEY);
    newsDataArr = [];
    if(response.status >= 200 && response.status < 300){
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        //handle errors;
        console.log(response.status, response.statusText);
    }
    
    displayNews(); 
}

function displayNews(){

    newsdetails.innerHTML = "";

    if(newsDataArr.length == 0){
        newsdetails.innerHTML = "<h5>No data found.</h5>"
        return; 
    }

    newsDataArr.forEach(news => {

        var date = news.publishedAt.split("T");

        var col = document.createElement('div');
        col.className = "col-sm-12 col-md-4 col-lg-3 p-2 card";

        var card = document.createElement('div');
        card.className = "p-2";

        var image = document.createElement('img');
        image.setAttribute("height", "matchparnt");
        image.setAttribute("width", "100%");
        image.src = news.urlToImage;

        var cardBody = document.createElement('div');

        var newsHeading = document.createElement('h5');
        newsHeading.className = "card-title";
        newsHeading.innerHTML = news.title;

        var dateHeading = document.createElement('h6');
        dateHeading.className = "text-primary";
        dateHeading.innerHTML = date[0];

        var description = document.createElement('p');
        description.className = "test-muted";
        description.innerHTML = news.description;

        var link  = document.createElement('a');
        link.className = "btn btn-dark";
        link.setAttribute("target", "-blank");
        link.href = news.url;
        link.innerHTML = "Read more";

        cardBody.appendChild(newsHeading);
        cardBody.appendChild(dateHeading);
        cardBody.appendChild(description);
        cardBody.appendChild(link);

        card.appendChild(image);
        card.appendChild(cardBody);

        col.appendChild(card);

        newsdetails.appendChild(col);
    });

}
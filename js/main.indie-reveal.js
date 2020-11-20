var request1 = new XMLHttpRequest();
var request2 = new XMLHttpRequest();
var gameTemplateData=null;
//first request
request1.open('GET', 'https://api.jsonbin.io/b/5f9c77559291173cbca6065d/3');
request1.setRequestHeader("Content-Type", "application/json");
request1.setRequestHeader("secret-key", '$2b$10$aW/Se.zAPErVkDeOY1RXBuvJpK/vqamzcPFrryVvhyT6CzGGnpMk2');
request1.onload = function () {
    if (request1.status >= 200 && request1.status < 400) {
        gameTemplateData = JSON.parse(request1.responseText);
        createHTMLGameTemplate(gameTemplateData,i)
    } else {
        console.log("The server returned an error.");
    }
};

request1.onerror = function () {
    console.log("connection error");
};
request1.send();

//second request
request2.open('GET','https://api.jsonbin.io/b/5f9f37c6ce4aa228955443ee/1');
request2.setRequestHeader("Content-Type","application/json");
request2.setRequestHeader("secret-key",'$2b$10$aW/Se.zAPErVkDeOY1RXBuvJpK/vqamzcPFrryVvhyT6CzGGnpMk2');
request2.onload = function () {
    if (request2.status >= 200 && request2.status < 400) {
        var recommendData = JSON.parse(request2.responseText);
        createHTMLRecommend(recommendData)
    } else {
        console.log("The server returned an error.");
    }
};
request2.onerror = function () {
    console.log("connection error");
};
request2.send();

function createHTMLGameTemplate(gameData,i) {
    var rawTemplate = document.getElementById("gameTemplate").innerHTML;
    var compiledTemplate = Handlebars.compile(rawTemplate);


    var generatedHTML = compiledTemplate(gameData.games[i]);

    var gameContainer = document.getElementById("game-container");
    gameContainer.innerHTML = generatedHTML;

}

function createHTMLRecommend(recommendImgData) {
    var rawRecommendTemplate = document.getElementById("recommendTemplate").innerHTML;
    var compiledRecommendTemplate = Handlebars.compile(rawRecommendTemplate);
    var recommendGenteratedHTML = compiledRecommendTemplate(recommendImgData);
    var recommendContainer = document.getElementById("recommend-container");
    recommendContainer.innerHTML = recommendGenteratedHTML;
}


function loadGamePage() {
    window.location.href = "game-page-template.html";

}
/*
document.getElementsByClassName("carousel-item").addEventListener("click",j=>{
    if(j.target instanceof "h1"){
        window.location.href = "game-page-template.html";
        const i=j.target.parentElement.getAttribute("href").substring(1);
        createHTMLGameTemplate(gameTemplateData,i);
    }
})
*/


window.addEventListener("click",e=>{
    if(e.target instanceof Image){
        const i=e.target.parentElement.getAttribute("href").substring(1);
        createHTMLGameTemplate(gameTemplateData,i);
    }
})


//this is the carousel control
$('.carousel').carousel( {
    interval: 4000,
    pause: "hover"
});

//this is to stop video in modal and reload url on opening
$(document).ready(function(){
    /* Get iframe src attribute value i.e. YouTube video url
    and store it in a variable */
    var urlTrailerModal = $("#templateTrailer").attr('src');

    /* Assign empty url value to the iframe src attribute when
    modal hide, which stop the video playing */
    $("#trailerModal").on('hide.bs.modal', function(){
        $("#templateTrailer").attr('src', '');
    });

    /* Assign the initially stored url back to the iframe src
    attribute when modal is displayed again */
    $("#trailerModal").on('show.bs.modal', function(){
        $("#templateTrailer").attr('src', urlTrailerModal);
    });
});


//for the find a game search box
$(document).ready(function () {
    $("#searchInput").on("keyup", function (){
       var value = $(this).val().toLowerCase();
       $("#listTable tr").filter(function (){
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
       });
    });
});


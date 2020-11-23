var request1 = new XMLHttpRequest();
var request2 = new XMLHttpRequest();
/*
var gameTemplateData=null;
*/
//first request
request1.open('GET', 'https://api.jsonbin.io/b/5f9c77559291173cbca6065d/3');
request1.setRequestHeader("Content-Type", "application/json");
request1.setRequestHeader("secret-key", '$2b$10$aW/Se.zAPErVkDeOY1RXBuvJpK/vqamzcPFrryVvhyT6CzGGnpMk2');
request1.onload = function () {
    if (request1.status >= 200 && request1.status < 400) {
        gameTemplateData = JSON.parse(request1.responseText);
        createHTMLGameTemplate(gameTemplateData,0);

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
        createHTMLRecommend(recommendData);


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
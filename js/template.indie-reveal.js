var request1 = new XMLHttpRequest();
var request2 = new XMLHttpRequest();
/*
var gameTemplateData=null;
*/
//first request
request1.open('GET', 'https://api.jsonbin.io/b/5f9c77559291173cbca6065d/9');
request1.setRequestHeader("Content-Type", "application/json");
request1.setRequestHeader("secret-key", '$2b$10$aW/Se.zAPErVkDeOY1RXBuvJpK/vqamzcPFrryVvhyT6CzGGnpMk2');
request1.onload = function () {
    if (request1.status >= 200 && request1.status < 400) {
        gameTemplateData = JSON.parse(request1.responseText);
        let index=0;
        for(let i=0;i<gameTemplateData.games.length;i++){
            const gameName=gameTemplateData.games[i].name;
            if(localStorage["game-name"]===gameName){
                console.log("Match Found");
                index=i;
                break;
            }
        }
        createHTMLGameTemplate(gameTemplateData,index);
        $(document).ready(function () {
           lightboxFunction();
           videoTrailerReset();
        });


    } else {
        console.log("The server returned an error.");
    }
};

request1.onerror = function () {
    console.log("connection error");
};
request1.send();

//second request
request2.open('GET','https://api.jsonbin.io/b/5f9f37c6ce4aa228955443ee/3');
request2.setRequestHeader("Content-Type","application/json");
request2.setRequestHeader("secret-key",'$2b$10$aW/Se.zAPErVkDeOY1RXBuvJpK/vqamzcPFrryVvhyT6CzGGnpMk2');
request2.onload = function () {
    if (request2.status >= 200 && request2.status < 400) {
        var recommendData = JSON.parse(request2.responseText);
        createHTMLRecommend(recommendData);
        $('.carousel').carousel( {
            interval: 4000,
            pause: "hover"
        });
        /*
        $('.randomGames').each(function (){
            var random = Math.floor(Math.random() * $('.recFigure',this).length);
            $('.recFigure',this).hide().eq(random).show();
        })
        */

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



//function for lightbox
//this called right after the createHTML function
function lightboxFunction() {
    const lightbox = document.createElement('div');
    const images = document.querySelectorAll('.game-temp-screen-shots img');
    lightbox.id = 'lightbox';
    document.body.appendChild(lightbox);
    images.forEach(image => {
        image.addEventListener('click', e => {
            lightbox.classList.add('active')
            const img = document.createElement('img')
            img.src = image.src
            while (lightbox.firstChild) {
                lightbox.removeChild(lightbox.firstChild)
            }
            lightbox.appendChild(img)
        })
    })
    lightbox.addEventListener('click', e => {
        if (e.target !== e.currentTarget) return
        lightbox.classList.remove('active')
    });
}


//this is to stop video in modal and reload url on opening
function videoTrailerReset() {
    var urlTrailerModal = $("#templateTrailer").attr('src');//gets the iframe src
    $("#trailerModal").on('hide.bs.modal', function () {
        $("#templateTrailer").attr('src', '');//on modal hide it clears the src
    });
    $("#trailerModal").on('show.bs.modal', function () {
        $("#templateTrailer").attr('src', urlTrailerModal);//puts in the src on show
    });
}




function loadGamePage(e) {
    localStorage["game-name"]=e.target.innerText;
    window.location.href = "game-page-template.html";

}

/*
window.addEventListener("click",e=>{
    if(e.target instanceof Image){
        const i=e.target.parentElement.getAttribute("href").substring(1);
        createHTMLGameTemplate(gameTemplateData,i);
    }
})
*/

//this is the carousel control
$('.carousel').carousel( {
    interval: 4000,
    pause: "hover"
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


//lightbox
$(document).ready(function () {
    const lightbox = document.createElement('div');
    const images = document.querySelectorAll('.screen-shots img');
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
});

$('#mobileHamburger').on('click',function (){
    $('#mobile-links').toggle();
});


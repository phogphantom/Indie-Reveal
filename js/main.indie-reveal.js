

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
    interval: 4000,//displays each slide for 4 seconds
    pause: "hover"//pauses when mouse hovers over slide
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
    const lightbox = document.createElement('div');//creates a new div elment
    const images = document.querySelectorAll('.screen-shots img');//selects all img elements in screen-shots class
    lightbox.id = 'lightbox'; //adds the lightbox id to the created div
    document.body.appendChild(lightbox);//adds the element to the DOM
    
    //adds a click listener for all images in screen-shots class and appends div and img to dom
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
    //adds event listener to close the lightbox if anything other then the light box is clicked
    lightbox.addEventListener('click', e => {
        if (e.target !== e.currentTarget) return
        lightbox.classList.remove('active')
    });
});

//mobile nav hide/show
$('#mobileHamburger').on('click',function (){
    $('#mobile-links').toggle();
});


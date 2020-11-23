function loadGamePage() {
    window.location.href = "game-page-template.html";

}

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


//lightbox
const lightbox = document.createElement('div');
lightbox.id = 'lightbox';
document.body.appendChild(lightbox);

const images = document.querySelectorAll('.screen-shots img');
images.forEach(image => {
    image.addEventListener('click', e =>{
        lightbox.classList.add('active')
        const img = document.createElement('img')
        img.src = image.src
        while (lightbox.firstChild){
            lightbox.removeChild(lightbox.firstChild)
        }
        lightbox.appendChild(img)
    })
})

lightbox.addEventListener('click', e =>{
    if (e.target !== e.currentTarget) return
    lightbox.classList.remove('active')
})
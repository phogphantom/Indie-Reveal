$('.carousel').carousel( {
    interval: 4000,
    pause: "hover"
});
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
$(document).ready(function () {
    $('select').niceSelect();
});

var pictureList = [
    "img/Pictures/back&forth-museum.jpg",
    "img/Pictures/back&forth-conference.jpg",
    "img/Pictures/back&forth-team-building.jpg",
    "img/Pictures/back&forth-classroom.jpg",
    "img/Pictures/back&forth-neighborhood.jpg"
]

window.onload = function () {
    //Smooth Scrolling
    $('a').on('click', function (e) {
        if (this.hash !== '') {
            e.preventDefault();
            const hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800);
        }
    })

    //Select location
    $('#selectpic').change(function () {
        var val = parseInt($('#selectpic').val());
        $('#elderimg').attr("src", pictureList[val]);
    })
}
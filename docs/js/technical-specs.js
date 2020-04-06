//Responsive index
var matches = document.querySelectorAll("div > h3");

for (var i = 0; i < matches.length; i++) {
    matches[i].setAttribute('id', 'sec' + [i + 1]);

    var ulist = document.getElementById("sidenav");
    var indexlink = document.createElement("a");
    var newItem = document.createElement("li");

    newItem.classList.add("nav-item");
    indexlink.setAttribute('href', '#sec' + [i + 1])
    indexlink.classList.add("nav-link", "pl-0");

    indexlink.textContent = matches[i].textContent;

    newItem.appendChild(indexlink);
    ulist.appendChild(newItem);
}

//Smooth Scrolling
window.onload = function () {
    $('#sidenav a').on('click', function (e) {
        if (this.hash !== '') {
            e.preventDefault();
            const hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800);
        }
    })
}


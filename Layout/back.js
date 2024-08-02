window.onload = function() {
    var elem = document.querySelector('.gallery');
    var msnry = new Masonry(elem, {
        // Opciones
        itemSelector: '.gallery-item',
        columnWidth: '.gallery-item',
        percentPosition: true
    });
};
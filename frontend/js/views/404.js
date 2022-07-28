var content = document.querySelector('#section__right__bottom')
const error = {
    render: function() {
        var html =
            `<div id="content_404">
                <h1 id="title" style="text-align: center; margin-top:160px; color: brown">ERROR: PAGE NOT FOUND</h1>
            </div>`
        content.innerHTML = html
    },
    init: function() {
        console.log('app init');
    },
    start: function() {
        this.init();
        this.render();
    }
}

export default error
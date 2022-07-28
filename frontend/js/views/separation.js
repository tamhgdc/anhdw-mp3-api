import { separationContent } from "../variable/constant.js"

const data = await fetch(`/song`).then(res => res.json())

const separation = {
    data: data,
    handle: function() {
        document.querySelector(".separation").onclick = async e => {
            var song = e.target.closest(".separation__song")
            var songs = e.target.closest(".separation__songs")
            if (songs && song) {
                var dataSong = await fetch(`/song/${song.dataset.id}`).then(res => res.json())
                console.log(songs.dataset.listid, song.dataset.id)
            }
        }
    },
    render: function() {
        console.log(this.data.data)
        separationContent.innerHTML = `<div class="separation">
            <div class="separation__songs" data-listid="${this.data.data.map(data =>data._id).join(' ')}">
            </div>
        </div>`

        var separationSongs = document.querySelector('.separation__songs')
        this.data.data.map(async item => {
            var artist = await fetch(`/artist/${item.artist}`).then(res => res.json())
            separationSongs.innerHTML += `
                <div class='separation__song' data-id='${item._id}'>
                    <div class='song__image' style='background-image: url(${item.thumbnail})'></div>
                    <div class='song__info'>
                        <h4>${item.title}</h4>
                        <p>${artist.data.name}</p>
                    </div>
                    <div class='song__control'>
                    <i class="fas fa-heart"></i>
                    </div>
                </div>
                `
        }).join('')
    },
    init: function() {

    },
    start: function() {
        this.init()
        this.render()
        this.handle()
    }
}

export default separation
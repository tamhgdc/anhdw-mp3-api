import { playlistContent, domain } from '../variable/constant.js'
import { route, pathName } from '../index.js';

const playlist = {

        render: function(data) {
                console.log(data)
                var dataSong = data.data.song.items
                var dataArtist = data.data.artists
                playlistContent.innerHTML =
                    `<div class="playlist__page">                        
                        <div class="playlist__info">
                            <div class="playlist__img">
                                <img src="${data.data.thumbnailM}" alt="">
                            </div>
                            <div class="playlist__content">
                                <h3>${data.data.title}</h3>
                                <p>${data.data.artistsNames}</p>
                            </div>
                        </div>
                        <div class="songs" data-songs="${dataSong.map(item => item.encodeId).join(' ')}">
                            ${dataSong.map(song => {
                                return `<div class="song" data-id="${song.encodeId}">
                                    <div class="song__image" style="background-image: url(${song.thumbnailM})"></div>
                                    <div class="song__info">
                                        <h4>${song.title}</h4>
                                        <p>${song.artistsNames}</p>
                                    </div>
                                    <div class="song__control">
                                    <i class="fas fa-heart"></i>
                                    </div>
                                </div>`
                            }).join('')}
                        </div>
                    </div>
                    <div class="artists">
                        <h3>Nghệ sĩ tham gia</h3>
                        <div class="artist">
                            ${dataArtist.map(artist => {
                                return `<div class='artist__item' data-name='${artist.alias}'>
                                <img src='${artist.thumbnailM}'>
                                <h4>${artist.name}</h4>
                            </div>`
                            }).join('')}
                        </div>
                    </div>
                    `

                    document.querySelectorAll('.artist__item').forEach(artistElement => {
                        artistElement.onclick = () => {
                            window.history.pushState({}, '', '/artist?a=' + artistElement.dataset.name)
                            pathName()
                        }
                    })
    },
    start: async function(params) {
        var data = await fetch(`${domain}/api/playlist/${params}`).then(res => res.json())
        this.render(data)
    }
}

export default playlist
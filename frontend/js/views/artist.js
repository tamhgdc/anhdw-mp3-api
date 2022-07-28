import { artistContent, domain } from "../variable/constant.js"
import { route, pathName } from '../index.js';
const artist = {
        render: function(data) {

                artistContent.innerHTML = `
                <div class="artist__info"></div>
                <div class="sections"></div>`
                var artistInfo = document.querySelector('.artist__info')
                var sections = document.querySelector('.sections')

                //phần thông tin nghệ sĩ
                artistInfo.innerHTML = `
        <div class='artist__content'>
            <h1>${data.data.name}</h1>
            <div class='artist__biography' style="text-align: justify;">
                <p>${data.data.biography}</p>
            </div>
            
        </div>
        <div class="artist__image">
            <img src="${data.data.thumbnailM}" alt="">
        </div>
        `
                    //phần sectoions
                data.data.sections.map((section, index) => {
                            sections.innerHTML += `
            <div class="section__${section.sectionType}">
                <h3>${section.title}</h3>
                <div class="${section.sectionType==='song'?'songs':section.sectionType}" 
                data-songs='${section.sectionType==='song'?section.items.map(item=> item.encodeId).join(' '):''}'>
                    ${section.sectionType==='song'?
                    section.items.map(song =>{
                        return`
                        <div class='song' data-id='${song.encodeId}'>
                            <div class='song__image' style='background-image: url(${song.thumbnailM})'></div>
                            <div class='song__info'>
                                <h4>${song.title}</h4>
                                <p>${song.artistsNames}</p>
                            </div>
                            <div class='song__control'>
                            <i class="fas fa-heart"></i>
                            </div>
                        </div>`
                    }).join('')
                    :''}
                    ${section.sectionType==='video'?
                    section.items.map(video =>{
                        return`
                        <div class="video__item" data-id='${video.encodeId}'>
                            <img src="${video.thumbnailM}" alt="">
                            <div class="info">
                                <img src="${video.artist.thumbnail}" alt="">
                                <div class="info__title">
                                    <h4>${video.title}</h4>
                                    <p>${video.artists.map((artist) => artist.name)}</p>
                                </div>
                            </div>
                        </div>`
                    }).join('')
                    :''}
                    ${section.sectionType==='playlist'? 
                    section.items.map(playlist=>{
                        return`
                        <div class='playlist__item'data-id='${playlist.encodeId}'>
                            <img src='${playlist.thumbnailM}'>
                            <h4>${playlist.title}</h4>
                            <p>${playlist.artistsNames}</p>
                        </div>`
                    }).join('')
                    :''}
                    ${section.sectionType==='artist'?
                    section.items.map(artist=>{
                        return`
                        <div class='artist__item' data-name='${artist.alias}'>
                            <img src='${artist.thumbnailM}'>
                            <h4>${artist.name}</h4>
                        </div>`
                    }).join('')
                    :''}

                </div>
            </div>`
        })

        document.querySelectorAll('.playlist__item').forEach(playlistElement => {
            playlistElement.onclick = () => {
                window.history.pushState({}, '', '/playlist?p=' + playlistElement.dataset.id)
                pathName()
            }
        })
        document.querySelectorAll('.artist__item').forEach(artistElement => {
            artistElement.onclick = () => {
                window.history.pushState({}, '', '/artist?a=' + artistElement.dataset.name)
                pathName()
            }
        })
        document.querySelectorAll('.video__item').forEach(artistElement => {
            artistElement.onclick = () => {
                window.history.pushState({}, '', '/video?v=' + artistElement.dataset.id)
                pathName()
            }
        })
    },
    start: async function(params) {
        var data = await fetch(`${domain}/api/artist/${params}`).then(res => res.json())
        this.render(data)
    }
}

export default artist
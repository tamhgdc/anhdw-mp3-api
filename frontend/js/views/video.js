import { videoContent, domain, audio } from '../variable/constant.js'
import { pathName } from '../index.js';

const video = {
        data: {},
        render: function() {
                console.log(this.data)
                videoContent.innerHTML = `
        <div class='video__page'>
            <div class='main__video'>
                <video id='video' controls>
                    <source src="${this.data.streaming.mp4['720p']}" type="video/mp4">
                </video>
                <div class='main__video__info'>
                    <h2>${this.data.title}</h2>
                    <p>${this.data.artistsNames}</p>
                </div>
                <div class='main__video__comment'>
                    <h3>Bình Luận</h3>
                    <textarea placeholder='Nhập bình luận...'></textarea>
                    <div class='list__comment'>
                    
                    </div>
                </div>
            </div>
            <div class='video__recommends'>
                <h3>Video Đề Cử</h3>
                <div class='list__video'>
                    ${this.data.recommends.map(video => {
                        return`<div class="video__item" data-id='${video.encodeId}'>
                            <img src="${video.thumbnailM}" alt="">
                            <div class="info">
                                <img src="${video.artist.thumbnail}" alt="">
                                <div class="info__title">
                                    <h4>${video.title}</h4>
                                    <p>${video.artists.map((artist) => artist.name)}</p>
                                </div>
                            </div>
                        </div>`
                    }).join('')}
                </div>
            </div>
        </div>`
        
        document.querySelectorAll('.video__item').forEach(artistElement => {
            artistElement.onclick = () => {
                window.history.pushState({}, '', '/video?v=' + artistElement.dataset.id)
                pathName()
            }
        })
        
    },
    start: async function(params) {
        var data = await fetch(`/api/video/${params}`).then(res => res.json())
        this.data = data.data
        this.render()
        audio.pause()
        document.getElementById('video').play()
    }
}

export default video
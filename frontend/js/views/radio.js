import { radioContent, sectionRight } from '../variable/constant.js';
import { pathName } from '../index.js';

const radio = {
        data: [],
        render: function() {
                console.log(this.data)
                radioContent.innerHTML = `
                <div class='video'>
                    ${this.data.map(video => {
                        return `
                        <div class="video__item" data-id='${video.encodeId}'>
                            <img src="${video.thumbnailM}" alt="">
                            <div class="info">
                                <img src="${video.artist.thumbnail}" alt="">
                                <div class="info__title">
                                    <h4>${video.title}</h4>
                                    <p>${video.artists.map((artist) => artist.name)}</p>
                                </div>
                            </div>
                        </div>
                        `
                    }).join('')}
                </div>`
                document.querySelectorAll('.video__item').forEach(artistElement => {
                    artistElement.onclick = () => {
                        window.history.pushState({}, '', '/video?v=' + artistElement.dataset.id)
                        pathName()
                    }
                })
                sectionRight.addEventListener('scroll', () => {
                    if(sectionRight.scrollTop>=sectionRight.scrollHeight*85/100) {
                        this.start(2)
                    }
                })
    },
    start: async function(page) {
        var data = await fetch( '/api/listmv/IWZ9Z089/' + page + '/15').then(res => res.json())
        this.data = data.data.items
        this.render()
    }
}
export default radio
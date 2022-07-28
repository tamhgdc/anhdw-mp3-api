import { homeContent, container, domain } from '../variable/constant.js';
import { route, pathName } from '../index.js';

const home = {
    data: fetch(domain + '/api/home/1').then(res => res.json()),
    render: async function() {
        var data = await this.data
        console.log(data.data.items)
        homeContent.innerHTML = `
        <div class="banner"></div>
        <div class="${data.data.items[3].sectionId}">
            <h2>${data.data.items[3].title}</h2>
            <div class='playlist'></div>
        </div>
        <div class="${data.data.items[4].sectionId}">
            <h2>${data.data.items[4].title}</h2>
            <div class='playlist'></div>
        </div>`

        data.data.items[0].items.map(item => {
            document.querySelector('.banner').innerHTML += `
            <div 
                style="background-image: url(${item.banner});"
                data-id='${item.encodeId}'
                class="banner__item">
            </div>`
        })

        data.data.items[3].items.map(item => {
            document.querySelector('.hSuggestPl .playlist').innerHTML += `
            <div class='playlist__item' data-id='${item.encodeId}'>
                <img src='${item.thumbnailM}'>
                <h4>${item.title}</h4>
                <p>${item.sortDescription}</p>
            </div>`
        })
        data.data.items[4].items.map(item => {
            document.querySelector('.hAutoTheme1 .playlist').innerHTML += `
            <div 
                class='playlist__item'data-id='${item.encodeId}'   
            >
                <img src='${item.thumbnailM}'>
                <h4>${item.title}</h4>
                <p>${item.sortDescription}</p>
            </div>`
        })
        document.querySelectorAll('.playlist__item').forEach(playlistElement => {
            playlistElement.onclick = () => {
                console.log(playlistElement.dataset.id)
                window.history.pushState({}, '', '/playlist?p=' + playlistElement.dataset.id)
                pathName()
            }
        })

        document.querySelectorAll('.banner .banner__item').forEach(playlistElement => {
            playlistElement.onclick = () => {
                console.log(playlistElement.dataset.id)
                window.history.pushState({}, '', '/playlist?p=' + playlistElement.dataset.id)
                pathName()
            }
        })

    },
    init: function() {
        console.log('init')
    },
    start: function() {
        this.init();
        this.render();
    }
}
export default home
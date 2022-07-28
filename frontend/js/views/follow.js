import { followContent, domain } from '../variable/constant.js';
import { route, pathName } from '../index.js';
const follow = {
        render: function(data) {
                var html = data.data.map(item => {
                            return `
            <div class="follow__item">
                <h2>${item.title}</h2>
                <div class='playlist'>
                    ${item.items.map(item =>{
                        return `
                        <div 
                            class='playlist__item' data-id='${item.encodeId}'
                        >
                            <img src='${item.thumbnailM}'>
                            <h4>${item.title}</h4>
                            <p>${item.artistsNames}</p>
                        </div>`
                    }).join('')}
                </div>
            </div>`
        })
        followContent.innerHTML = html
        document.querySelectorAll('.playlist__item').forEach(playlistElement => {
            playlistElement.onclick = () => {
                console.log(playlistElement.dataset.id)
                window.history.pushState({}, '', '/playlist?p=' + playlistElement.dataset.id)
                pathName()
            }
        })
    },
    init: function() {
        console.log('app init');
    },
    start: async function() {
        var data = await fetch(domain+'/api/top100').then(res => res.json())
        this.init();
        this.render(data);
    }
}
export default follow
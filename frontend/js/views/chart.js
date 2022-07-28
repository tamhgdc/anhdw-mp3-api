import {
    domain,
    aElements,
    iElements,
    content,
    keyword,
    songImg,
    songTitle,
    songAuthor,
    audio,
    playBtn,
    pauseBtn,
    togglePlay,
    prevBtn,
    nextBtn,
    randomBtn,
    repeatBtn,
    progress,
    container,
    chartContent,
} from '../variable/constant.js';

const chart = {
    data: fetch(domain + '/api/chart').then(res => res.json()),
    render: async function() {
        var data = await this.data
        var top100 = data.data.RTChart.items
        var weeklyChart = data.data.weekChart
        console.log(weeklyChart)
        chartContent.innerHTML = `
        <div class="chart__top100 listSong" data-songs='${top100.map(item => item.encodeId).join(' ')}'></div>
        <div class="chart__weekly">
            <div class="chart__vn listSong" data-songs='${weeklyChart.vn.items.map(item => item.encodeId).join(' ')}'>
                <h2>BXH Hàng Tuần</h2>
            </div>
        </div>`
        var chartTop100 = document.querySelector('.chart__top100')
        var chartVN = document.querySelector('.chart__vn')

        if (top100 !== undefined) {
            top100.map((song, index) => {
                chartTop100.innerHTML += `
                <div class='song' data-id='${song.encodeId}'>
                    <div class="song__index">${index+1}</div>
                    <div class='song__image' style='background-image: url(${song.thumbnail})'></div>
                    <div class='song__info'>
                        <h4>${song.title}</h4>
                        <p>${song.artists.map(artist => artist.name)}</p>
                    </div>
                    <div class='song__control'>
                    <i class="fas fa-heart"></i>
                    </div>
                </div>`
            })
        }

        if (weeklyChart !== undefined) {
            weeklyChart.vn.items.map((song, index) => {
                chartVN.innerHTML += `
                <div class='song' data-id='${song.encodeId}'>
                    <div class="song__index">${index+1}</div>
                    <div class='song__image' style='background-image: url(${song.thumbnail})'></div>
                    <div class='song__info'>
                        <h4>${song.title}</h4>
                        <p>${song.artists.map(artist => artist.name)}</p>
                    </div>
                    <div class='song__control'>
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                </div>`
            })
        }
    },
    start: function() {
        this.render()
    }
}
export default chart
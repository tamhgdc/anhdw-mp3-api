import {
    domain,
    container,
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
    sectionRight,
    sectionRightTop,
    btnDownload,
} from '../variable/constant.js'
import MyMusic from '../views/my_music.js'
const control = {
    favoriteSong: [],
    currentUrl: '',
    currentId: '',
    currentIndex: 0,
    data: [],
    next: function() {
        this.currentIndex++
            if (this.currentIndex > this.data.length - 1) {
                this.currentIndex = 0
            }

        this.currentId = this.data[this.currentIndex]
        this.init()
    },
    prev: function() {
        this.currentIndex--
            if (this.currentIndex < 0) {
                this.currentIndex = this.data.length - 1
            }

        this.currentId = this.data[this.currentIndex]
        this.init()
    },
    random: function() {
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * this.data.length)
        } while (newIndex === this.currentIndex)
        this.currentIndex = newIndex
        this.currentId = this.data[this.currentIndex]
        this.init()
    },
    time: function(time) {
        var mind = time % (60 * 60)
        var min = Math.floor(mind / 60) < 10 ? '0' + Math.floor(mind / 60) : Math.floor(mind / 60)
        var secd = mind % 60
        var sec = secd < 10 ? '0' + Math.ceil(secd) : Math.ceil(secd)
        return min + ':' + sec
    },
    playSong: function() {
        audio.play()
        container.classList.add('playing')
    },
    pauseSong: function() {
        audio.pause()
        container.classList.remove('playing')
    },
    download: function(url) {
        var filename = url.substring(url.lastIndexOf("/") + 1).split("?")[0]
        var xhr = new XMLHttpRequest()
        xhr.responseType = 'blob'
        xhr.onload = function() {
            var a = document.createElement('a')
            a.href = window.URL.createObjectURL(xhr.response)
            a.download = filename
            a.style.display = 'none'
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
        }
        xhr.open('GET', url)
        xhr.send()
    },
    handle: async function() {
        togglePlay.onclick = () => {
            if (audio.paused) {
                this.playSong()
            } else {
                this.pauseSong()
            }
        }
        nextBtn.onclick = () => {
            if (randomBtn.classList.contains('active')) {
                this.random()
            } else {
                this.next()
            }
            this.getData()
        }
        prevBtn.onclick = () => {
            if (randomBtn.classList.contains('active')) {
                this.random()
            } else {
                this.prev()
            }
        }
        randomBtn.onclick = () => {
            if (randomBtn.classList.contains('active')) {
                randomBtn.classList.remove('active')
            } else {
                randomBtn.classList.add('active')
            }
        }
        repeatBtn.onclick = () => {
            if (repeatBtn.classList.contains('active')) {
                repeatBtn.classList.remove('active')
            } else {
                repeatBtn.classList.add('active')
            }
        }
        audio.ontimeupdate = () => {
            if (audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100) //thời gian hiện tại chia cho thời lượng bài hát ra phần trăm
                progress.value = progressPercent
                document.querySelector('.current-time').innerText = this.time(audio.currentTime)
                document.querySelector('.duration-time').innerText = this.time(audio.duration)
            }
        }
        progress.onchange = function(e) {
            audio.currentTime = e.target.value / 100 * audio.duration
        }
        audio.onended = function() {
            if (repeatBtn.classList.contains('active') == false) {
                nextBtn.click()
            } else {
                audio.play()
            }
        }
        sectionRight.onscroll = function() {
            const scrollTop = sectionRight.scrollTop
            sectionRightTop.style.backgroundColor = `rgba(251,211,210,${scrollTop / 100})`
        }
        btnDownload.onclick = () => {
            console.log(this.currentUrl)
            this.download(this.currentUrl)
        }

    },
    getData: function() {
        container.onclick = e => {
            var songs = e.target.closest('.songs') || e.target.closest('.listSong') || e.target.closest('.favorite__song')
            var song = e.target.closest('.song:not(.active)')
            var heart = e.target.closest('.fa-heart')
            var favorites = []
            if (heart) {
                if (MyMusic.data.isLogin) {
                    heart.classList.toggle('active')
                    MyMusic.start()
                } else {
                    location.href = '/auth/google'
                }
            } else if (songs && song) {
                this.data = songs.dataset.songs.split(' ')
                this.currentIndex = this.data.findIndex(item => item === song.dataset.id)
                this.currentId = song.dataset.id
                this.init()
            }
            // đưa bài hát vào mảng
            document.querySelectorAll('.fa-heart').forEach(async(item) => {
                var heartActive = item.classList.contains('active')
                var favoriteSong = item.parentNode.parentNode
                if (heartActive) {
                    favorites.push(favoriteSong.dataset.id)
                    this.favoriteSong = favorites
                }
            })

            console.log(this.favoriteSong)

            //lưu mảng vào data
            if (MyMusic.data.isLogin) {
                fetch(`/favorite/${MyMusic.data.user.id}`, {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        songList: this.favoriteSong
                    })
                })
            }
        }
    },
    init: async function() {
        var infoSong = await fetch('/api/infosong/' + this.data[this.currentIndex]).then(res => res.json())
        var audioSong = await fetch('/api/song/' + this.data[this.currentIndex]).then(res => res.json())
        songImg.src = infoSong.data.thumbnail
        songTitle.innerText = infoSong.data.title
        songAuthor.innerText = infoSong.data.artistsNames
        audio.src = audioSong.data['128']
        this.currentUrl = audioSong.data['128']
        this.playSong()
        this.songActive()
    },
    songActive: function() {
        var song = document.querySelectorAll('.song')
        song.forEach(item => {
            if (item.dataset.id === this.currentId) {
                item.classList.add('active')
            } else {
                item.classList.remove('active')
            }
        })
    },
    start: function() {
        this.getData()
        this.handle()
    }
}

export default control
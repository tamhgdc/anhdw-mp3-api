import Control from './dashboard/control.js'
import HomeView from "./views/home.js"
import MyMusicView from "./views/my_music.js"
import ChartView from "./views/chart.js"
import RadioView from "./views/radio.js"
import FollowView from "./views/follow.js"
import Separation from "./views/separation.js"
import Search from "./views/search.js"
import Artist from "./views/artist.js"
import Playlist from "./views/playlist.js"
import Video from "./views/video.js"



import Error from "./views/404.js"


import { domain, aElements, iElements, keyword, contentItem, btnBack, btnNext, container } from './variable/constant.js';

function getUrlParameter(name, urlweb) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(urlweb);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

const load = () => {
    HomeView.start()
    MyMusicView.start()
    ChartView.start()
    RadioView.start(1)
    FollowView.start()
    Separation.start()
}

const routes = {
    '/': 'Home',
    '/my-music': 'My Music',
    '/chart': 'Chart',
    '/radio': 'Radio',
    '/follow': 'Follow',
    '/search': 'Search',
    '/artist': 'Artist',
    '/playlist': 'Playlist',
    '/video': 'Video',
    '/separation': 'Separation',
    '/404': 'Error'
}

export const route = e => {
    e.preventDefault()
    if (e.target.href !== domain + window.location.pathname) {
        window.history.pushState({}, '', e.target.href)
    }
    pathName()
    container.scrollTo({ top: 0, behavior: 'smooth' })
        //console.log(domain + window.location.pathname, e.target.href)
}

export const pathName = () => {
    var path = window.location.pathname
    var routeTitle = routes[path] || routes['/404']
    document.title = 'MP3 | ' + routeTitle
    if (routeTitle === 'Error') {
        contentItem.forEach((item) => {
            item.classList.remove('active')
        })
        document.querySelector('#content_404').classList.add('active')
    }
    aElements.forEach((a, index) => {
        if (a.href === (domain + path)) {
            a.classList.add('active')
            contentItem[index].classList.add('active')
            document.querySelector('#content_404').classList.remove('active')
        } else {
            a.classList.remove('active')
            contentItem[index].classList.remove('active')
            document.querySelector('.search__content').classList.remove('active')
            document.querySelector('.playlist__content').classList.remove('active')
            document.querySelector('.video__content').classList.remove('active')
            document.querySelector('.artist__content').classList.remove('active')
        }
    })

    pathSearch()
    pathArtist()
    pathPlaylist()
    pathVideo()
}

const pathSearch = () => {
    var path = window.location.pathname
    var param = getUrlParameter('q', domain + location.pathname + location.search)
    if (path === '/search') {
        keyword.value = param
        Search.start()

        contentItem.forEach((item) => {
            item.classList.remove('active')
        })
        document.querySelector('.search__content').classList.add('active')
    }
}
const pathArtist = () => {
    var path = window.location.pathname
    var param = getUrlParameter('a', domain + location.pathname + location.search)
    if (path === '/artist') {
        Artist.start(param)
        contentItem.forEach((item) => {
            item.classList.remove('active')
        })
        document.querySelector('.artist__content').classList.add('active')
    }
}
const pathPlaylist = () => {
    var path = window.location.pathname
    var param = getUrlParameter('p', domain + location.pathname + location.search)
    if (path === '/playlist') {
        Playlist.start(param)
        contentItem.forEach((item) => {
            item.classList.remove('active')
        })
        document.querySelector('.playlist__content').classList.add('active')
    }
}
const pathVideo = () => {
    var path = window.location.pathname
    var param = getUrlParameter('v', domain + location.pathname + location.search)
    if (path === '/video') {
        Video.start(param)
        contentItem.forEach((item) => {
            item.classList.remove('active')
        })
        document.querySelector('.video__content').classList.add('active')
    }
}
const handleSearch = () => {

    document.querySelector('#search__button').children[0].onclick = (e) => {
        document.querySelector('#search__button').click()
    }
    document.querySelector('#search__button').onclick = (e) => {
        if (keyword.value !== '') {
            document.querySelector('#search__button').href = '/search?q=' + keyword.value
            e.preventDefault()
            window.history.pushState({}, '', e.target.href)
            pathName()
        }
    }

    keyword.addEventListener('keyup', (e) => {
        if (e.keyCode === 13 && keyword.value !== '') {
            document.querySelector('#search__button').click();
        }
    })
}

aElements.forEach((aElement) => {

    aElement.children[0].onclick = (e) => {
        aElement.click()
    }
    aElement.onclick = route
})

btnBack.onclick = () => {
    window.history.back()
}
btnNext.onclick = () => {
    window.history.forward()
}

window.onpopstate = pathName

load()
Control.start()
pathName()
handleSearch()
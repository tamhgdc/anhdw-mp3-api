import { myMusicContent, domain, container, btnLogin, btnUser } from '../variable/constant.js';
import { pathName } from '../index.js';

const myMusic = {
        removeId: '',
        favoriteSong: [],
        data: {},
        handle: function() {
            console.log(this.data)

            if (this.data.isLogin) {
                container.classList.add('login')
                fetch('/favorite', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id: this.data.user.id
                    })
                })

            } else {
                container.classList.remove('login')
            }

            btnUser.onclick = () => {
                window.history.pushState({}, '', '/my-music')
                pathName()
            }
        },
        render: async function() {
                if (this.data.isLogin) {
                    myMusicContent.innerHTML =
                        `<div class="user">
                    <div class="user__avatar">
                        <img src="${this.data.user.picture}" alt=""/>
                    </div>
                    <div class="user__info">
                        <h3>${this.data.user.displayName}</h3>
                        <p>Email:${this.data.user.email}</p>
                        <p>Id:${this.data.user.id}</p>
                    </div>
                </div>
                <div id="favorite__song" class="favorite__song" data-songs='${this.favoriteSong.map(item=>item).join(' ')}'>
                    <h3>Favorite Song</h3>
                    ${this.favoriteSong.map( item => {
                        fetch('/api/infosong/' + item)
                        .then(res => res.json()) 
                        .then(data => {
                            document.querySelector('.favorite__song').innerHTML +=
                             `<div class='song' data-id='${data.data.encodeId}'>
                             <div class='song__image' style='background-image: url(${data.data.thumbnail})'></div>
                             <div class='song__info'>
                                 <h4>${data.data.title}</h4>
                                 <p>${data.data.artists.map(artist => artist.name)}</p>
                             </div>
                             <div class='song__control'>
                             <i class="fa-solid fa-xmark"></i>
                             </div>
                         </div>`
                        })
                    }).join(' ')}
                </div>`

                document.querySelector('.favorite__song').onclick = (e) => {
                    var btnDelete = e.target.classList.contains('fa-xmark')
                    if (btnDelete) {
                        var newFavoriteSong = this.favoriteSong.filter(item => item !== e.target.parentNode.parentNode.dataset.id)
                        this.favoriteSong = newFavoriteSong
                        this.removeId = e.target.parentNode.parentNode.dataset.id
                        
                        e.target.parentNode.parentNode.remove()
                    }
                    console.log(this.removeId)
                    document.querySelectorAll('.fa-heart').forEach(item => {
                        var favoriteSong = item.parentNode.parentNode
                        if (favoriteSong.dataset.id === this.removeId) {
                            item.classList.remove('active')
                        }
                    })
                }

                document.querySelectorAll('.fa-heart').forEach(item => {
                    var favoriteSong = item.parentNode.parentNode
                    this.favoriteSong.forEach(idFavorite => {
                        if (favoriteSong.dataset.id === idFavorite) {
                            item.classList.add('active')
                        }
                    })
                })
            btnUser.src = this.data.user.picture
        } else {
            myMusicContent.innerHTML =
                `<div class="user">
                    <div class="user__avatar">
                        <img src="./img/Users-User-Male-icon.png" alt=""/>
                    </div>
                    <div class="user__info">
                        <h3>Ẩn Danh</h3>
                        <p>Email:</p>
                        <p>Id:</p>
                    </div>
                </div>
                <div class="favorite__song">
                    <h3>Favorite Song</h3>
                    <p>Bạn chưa đăng nhập</p>
                </div>`
            btnUser.src = './img/Users-User-Male-icon.png'
        }
        btnLogin.onclick = () => {
            window.history.pushState({}, '', this.data.link)
            window.location.reload()
        }

    },
    start: async function() {
        var data = await fetch('/auth/profile').then(res => res.json())
        this.data = data
        if (data.isLogin) {
            const favorite = await fetch(`/favorite/${data.user.id}`, { method: 'GET', }).then(res => res.json())
            this.favoriteSong = favorite.songList
        }
        this.render()
        this.handle()
    }
}
export default myMusic
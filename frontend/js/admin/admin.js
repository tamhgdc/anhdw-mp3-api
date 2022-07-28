const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const data = await fetch('/auth/profile').then(res => res.json())
const isAdmin = await fetch('/favorite/admin/' + data.user.id).then(res => res.json())
console.log(isAdmin)
if (isAdmin.message === 'Không phải admin') {
    $('.user').innerHTML = `<h1>${isAdmin.message}</h1>`
} else {
    $('.tabs').classList.add('active')
    $('.user').innerHTML = `
        <h1>${isAdmin.message}</h1>
        ${isAdmin.data.map(item => {
            return `<div class="user_item">
                        <h3>User ID:${item.id}</h3>
                        <p>SongList:${item.songList.map(item => item)}</p>
                    </div>`
        }).join('')}
    `
}
//xử lý tab
$$('.tab_title_item').forEach((item,index) => {
    item.onclick = () =>{
        $('.tab_title_item.active').classList.remove('active')
        $('.tab_content_item.active').classList.remove('active')
        item.classList.add('active')
        $$('.tab_content_item')[index].classList.add('active')
    }
})

//quản lý thể loại nhạc
const showGenre = async () => {
    var getGenre = await fetch('/genre').then(res => res.json())

    $('.list_genre').innerHTML = getGenre.data.map(item => {
        return`<div class="genre" data-id="${item._id}">
            <div class="genre_name" >
                <h4>${item.genre}</h4>
            </div>

            <div class="genre_action">
                <button class="btn_edit_genre">Sửa</button>
                <button class="btn_delete_genre">Xóa</button>
            </div>
        </div>`
    }).join('')

    $('.genre_song').innerHTML = getGenre.data.map(item => {
        return`<option value="${item._id}">${item.genre}</option>`
    })

    $('.list_genre').onclick = async (e) => {
        var btnDelete = e.target.closest('.btn_delete_genre')
        var btnEdit = e.target.closest('.btn_edit_genre')
        if (btnDelete) {
            var id = btnDelete.parentNode.parentNode.dataset.id
            console.log(id)
            await fetch('/genre/' + id, {
                method: 'DELETE',
            }).then(res => res.json())
            showGenre()
        }
        if (btnEdit) {
            var id = btnEdit.parentNode.parentNode.dataset.id
            var txtGende = $('.txt_genre').value 
            if (txtGende === '') {
                alert('Nhập thể loại nhạc')
            } else {
                await fetch('/genre/' + id, {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        genre: txtGende,
                    })
                }).then(res => res.json())
                showGenre()
            }
        }
    }
}
showGenre()
$('.btn_add_genre').onclick = async () => {
    var txtGende = $('.txt_genre').value
    if (txtGende === '') {
        alert('Nhập thể loại nhạc')
    } else {
        await fetch('/genre', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                genre: txtGende,
            })
        }).then(res => res.json())
        showGenre()
    }
}

//quản lý nghệ sĩ

const artist = {
    showArtist: async function () {
        var getArtist = await fetch('/artist').then(res => res.json())
        console.log(getArtist.data)
        $('.list_artist').innerHTML = getArtist.data.map(item => {
            return`
            <div class="artist" data-id="${item._id}">
                <div class="artist_avatar">
                    <img src="${item.image}" alt="">
                </div>
                <div class="artist_name">
                    <h4>${item.name}</h4>
                </div>
                <div class="artist_action">
                    <button class="btn_edit_artist">Sửa</button>
                    <button class="btn_delete_artist">Xóa</button>
                </div>
            </div>
            `
        }).join('')

        $('.artist_song').innerHTML = getArtist.data.map(item => {
            return`<option value="${item._id}">${item.name}</option>`
        })

        $('.list_artist').onclick = async (e) => {
            var btnDelete = e.target.closest('.btn_delete_artist')
            if (btnDelete) {
                var id = btnDelete.parentNode.parentNode.dataset.id
                console.log(id)
                await fetch('/artist/' + id, {
                    method: 'DELETE',
                }).then(res => res.json())
                this.showArtist()
            }
        }
    },
    handleImageUpload:function(e){
        const files = e.target.files
        const formData = new FormData()
        formData.append('myFile',files[0])
        $('.btn_add_artist').onclick = async () => {
            var saveImg = await fetch('/upload/image/',{method: 'POST',body: formData}).then(res => res.json())
            var nameArtist = $('.txt_artist').value
            await fetch('/artist', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: nameArtist,
                    image: saveImg.path,
                })
            })
            .then(res => res.json())
            artist.showArtist()
            console.log('show')
        }
        $$('.btn_edit_artist').forEach(item => {
            item.onclick = async ()=>{
                var saveImg = await fetch('/upload/image/',{method: 'POST',body: formData}).then(res => res.json())
                var id = item.parentNode.parentNode.dataset.id
                var txtName = $('.txt_artist').value
                await fetch('/artist/' + id, {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: txtName,
                        image: saveImg.path,
                    })
                }).then(res => res.json())
                artist.showArtist()
            }
        })
    },
    start:function(){
        this.showArtist()
        $('.avatar_artist').onchange = this.handleImageUpload
    }
}
artist.start()


//quản lý bài hát
const showSong = async ()=>{
    var getSong = await fetch('/song').then(res => res.json())
    console.log(getSong.data)
    $('.list_song').innerHTML = ''
    getSong.data.map(async item => {
        var genre = await fetch('/genre/' + item.genre).then(res => res.json())
        var artist = await fetch('/artist/' + item.artist).then(res => res.json())
        console.log(artist)
        $('.list_song').innerHTML += `
        <div class="song" data-id="${item._id}">
            <div class="song_thumbnail">
                <img src="${item.thumbnail}" alt="">
            </div>
            <div class="song_title">
                <h4>${item.title}</h4>
                <p>${artist.data.name}</p>
                <p>${genre.data.genre}</p>
            </div>
            <div class="song_src">
                <a href="${item.src}">Nghe thử</a>
            </div>
            <div class="song_action">
                <button class="btn_edit_song">Sửa</button>
                <button class="btn_delete_song">Xóa</button>
            </div>
        </div>`
    })

    $('.songs').innerHTML = getSong.data.map(item => {
        return`<option value="${item._id}">${item.title}</option>`
    }).join('')

    $('.list_song').onclick = async (e) => {
        var btnDelete = e.target.closest('.btn_delete_song')
        var btnEdit = e.target.closest('.btn_edit_song')
        if (btnDelete) {
            var id = btnDelete.parentNode.parentNode.dataset.id
            console.log(id)
            await fetch('/song/' + id, {
                method: 'DELETE',
            }).then(res => res.json())
            showSong()
        }
        if (btnEdit) {
            var id = btnEdit.parentNode.parentNode.dataset.id
            var titleSong = $('.txt_song').value
            var artistSong = $('.artist_song').value
            var genreSong = $('.genre_song').value
            var avatarSong = $('.avatar_song').files
            var audio = $('.audio').files
            var dataImg = new FormData()
            var dataAudio = new FormData()
            dataImg.append('myFile',avatarSong[0])
            dataAudio.append('myFile',audio[0])

            var saveImg = await fetch('/upload/image/',{method: 'POST',body: dataImg}).then(res => res.json())
            var saveAudio = await fetch('/upload/audio/',{method: 'POST',body: dataAudio}).then(res => res.json()) 

            await fetch('/song/'+ id, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: titleSong,
                    artist: artistSong,
                    genre: genreSong,
                    thumbnail: saveImg.path,
                    src: saveAudio.path,
                })
            }).then(res => res.json())
            showSong()
        }
    }
}
showSong()
$('.btn_add_song').onclick = async () => {
    var titleSong = $('.txt_song').value
    var artistSong = $('.artist_song').value
    var genreSong = $('.genre_song').value
    var avatarSong = $('.avatar_song').files
    var audio = $('.audio').files
    var dataImg = new FormData()
    var dataAudio = new FormData()
    dataImg.append('myFile',avatarSong[0])
    dataAudio.append('myFile',audio[0])

    var saveImg = await fetch('/upload/image/',{method: 'POST',body: dataImg}).then(res => res.json())
    var saveAudio = await fetch('/upload/audio/',{method: 'POST',body: dataAudio}).then(res => res.json())
    
    await fetch('/song', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: titleSong,
            artist: artistSong,
            genre: genreSong,
            thumbnail: saveImg.path,
            src: saveAudio.path,
        })
    }).then(res => res.json())
    showSong()
}
//Tạo album
const showAlbum = async ()=>{
    var getAlbum = await fetch('/album').then(res => res.json())
    console.log(getAlbum.data)

    $('.list_album').innerHTML = getAlbum.data.map(item => {
        return `
        <div class="album" data-id="${item._id}">
            <div class="album_avatar">
                <img src="${item.avata}" alt="">
            </div>
            <div class="album_name">
                <h4>${item.title}</h4>
            </div>
            <div class="album_action">
                <button class="btn_edit_album">Sửa</button>
                <button class="btn_delete_album">Xóa</button>
            </div>
        </div>
        `
    }).join('')
    $('.list_album').onclick = async (e) => {
        var btnDelete = e.target.closest('.btn_delete_album')
        var btnEdit = e.target.closest('.btn_edit_album')
        var album = e.target.closest('.album')
        if(btnDelete){
            var id = btnDelete.parentNode.parentNode.dataset.id
            await fetch('/album/' + id, {
                method: 'DELETE',
            }).then(res => res.json())
            showAlbum()
        } else if(btnEdit){
            var id = btnEdit.parentNode.parentNode.dataset.id
            var titleAlbum = $('.txt_album').value
            var avatarAlbum = $('.avatar_album').files
            var dataImg = new FormData()
            dataImg.append('myFile',avatarAlbum[0])
            var saveImg = await fetch('/upload/image/',{method: 'POST',body: dataImg}).then(res => res.json())

            var arr = []
            $$('.minus_song').forEach(item => {
                arr.push(item.parentNode.dataset.id)
            })

            await fetch('/album/'+ id, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: titleAlbum,
                    avata: saveImg.path,
                    listSong: arr,
                })
            }).then(res => res.json())
            showAlbum()
        }else if(album){
            var id = album.dataset.id
            var getAlbum = await fetch('/album/' + id).then(res => res.json())
            console.log(getAlbum.data.listSong)
            $('.txt_album').value = getAlbum.data.title
            $('.list_add_song').innerHTML = ''
            getAlbum.data.listSong.map(async item => {
                var song = await fetch('/song/'+ item).then(res => res.json())
                console.log(song)
                $('.list_add_song').innerHTML += `
                <div class="song_in_album" data-id="${item}">
                    <h4>${song.data.title}</h4>
                    <div class="minus_song">
                        <i class="fa-solid fa-minus"></i>
                    </div>
                </div>`

            })
        }
    }
}

showAlbum()

$('.plus_song').onclick = async (e) => {
    var song = await fetch('/song/'+$('.songs').value).then(res => res.json())
    console.log(song)
    $('.list_add_song').innerHTML += `
    <div class="song_in_album" data-id="${$('.songs').value}">
        <h4>${song.data.title}</h4>
        <div class="minus_song">
            <i class="fa-solid fa-minus"></i>
        </div>
    </div>`
}

$('.list_add_song').onclick = (e) => {
    var removeSong = e.target.closest('.minus_song')
    if(removeSong){
        removeSong.parentNode.remove()
    }
}

$('.btn_add_album').onclick =async () => {
    var title = $('.txt_album').value
    var avatarAlbum = $('.avatar_album').files
    var dataImg = new FormData()
    dataImg.append('myFile',avatarAlbum[0])
    var saveImg = await fetch('/upload/image/',{method: 'POST',body: dataImg}).then(res => res.json())
    var arr = []
    $$('.minus_song').forEach(item => {
        arr.push(item.parentNode.dataset.id)
    })

    await fetch('/album', {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title: title,
            avata: saveImg.path,
            listSong: arr
        })
    })
    .then(res => res.json())
    showAlbum()
}
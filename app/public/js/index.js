function timeStamp(x) {
    var d = new Date(x * 1000);
    return d
}

$(document).ready(() => {
    document.querySelector('.grid').innerHTML +=
        `
        <div class="uk-card uk-card-default uk-grid-collapse uk-child-width-1-2@s uk-margin" uk-grid>
            <div class="uk-card-media-left uk-cover-container">
                <img src="assets/img/cartoon_login.jpg" alt="" uk-cover>
                <canvas width="600" height="400"></canvas>
            </div>
            <div>
                <div class="uk-card-body">
                <a href='/login'><h3 class="uk-card-title">Create Account 🚗</h3></a>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
                </div>
            </div>
        </div>
    
        <div class="uk-card uk-card-default uk-grid-collapse uk-child-width-1-2@s uk-margin" uk-grid>
            <div class="uk-flex-last@s uk-card-media-right uk-cover-container">
                <img src="assets/img/create_account.jpg" alt="" uk-cover>
                <canvas width="600" height="400"></canvas>
            </div>
            <div>
                <div class="uk-card-body">
                    <a href='/login'><h3 class="uk-card-title">Login 🚪</h3></a>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.</p>
                </div>
            </div>
        </div>

       
    

    `
})

$(`#home`).click(() => {
    $.get('/api/all', response => {

        console.log(response)
        response.map(rant => {
            var bin = Math.round(Math.random())
            var ran = Math.floor(Math.random() * 100)
            document.querySelector('.grid').innerHTML +=
                `
                    <div class="uk-card uk-card-default uk-width-1-2@m">
                    <div class="uk-card-header">
                        <div class="uk-grid-small uk-flex-middle" uk-grid>
                            <div class="uk-width-auto">
                                <img class="uk-border-circle" width="40"
                                    height="40" src="${rant.img}">
                            </div>
                            <div class="uk-width-expand">
                                <h3 class="uk-card-title
                                    uk-margin-remove-bottom">${rant.name} - <b>${rant.title}</b></h3>
                                <p class="uk-text-meta uk-margin-remove-top"><time
                                        datetime="${Date.now()}">${timeStamp(rant.created)}</time></p>
                            </div>
                        </div>
                    </div>
                    <div class="uk-card-body">
                        <p>${rant.rant}</p>
                    </div>
                    <div class="uk-card-footer">
                        <button class="uk-button uk-button-default uk-button-small" id="${rant._id}" onClick="favorite_rant()"><i class="fas fa-star star"></i></button>
                        <button class="uk-button uk-button-default uk-button-small"><i class="fas fa-comments comments"></i></button>
                        <button class="uk-button uk-button-default uk-button-small" id="${rant._id}" uk-toggle="target: #my-id" onClick="popup_edit()"><i class="fa fa-pencil-square-o edit" aria-hidden="true"></i></button>
                        <button class="uk-button uk-button-default uk-button-small" id="${rant._id}" onClick="delete_rant()"><i class="fas fa-trash delete"></i></button>
                    </div>
                </div>
            `
        })
    })
})

$('.submit').click(() => {
    var bin = Math.round(Math.random())
    var ran = Math.floor(Math.random() * 100)
    if (bin === 0) {
        let f_array = ["Michelle", "Latisha", "Samantha", "Kerri", "Susan"]
        var _name = f_array[Math.floor(Math.random() * f_array.length)]
        var _img = `https://randomuser.me/api/portraits/women/${ran}.jpg`
        var _title = $('.title').val()
        var _rant = $('.rant').val()
        fetch("/api/submit", {
            method: "POST",
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: _name,
                img: _img,
                title: _title,
                rant: _rant,
                created: Date.now()
            })
        }).then(res => res.json())
    } else {
        let m_array = ["Michael", "Josh", "David", "Kevin", "Dominique"]
        var _name = m_array[Math.floor(Math.random() * m_array.length)]
        var _img = `https://randomuser.me/api/portraits/men/${ran}.jpg`
        var _title = $('.title').val()
        var _rant = $('.rant').val()
        fetch("/api/submit", {
            method: "POST",
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: _name,
                img: _img,
                title: _title,
                rant: _rant,
                created: Date.now()
            })
        }).then(res => res.json())
    }
})

//FAVORITES
function favorite_rant() {
    var _name = "Adam"
    var _rant_id = event.target.parentNode.id
    event.target.classList.add('favorite')
    fetch("/api/set_favorite/", {
        method: "POST",
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: _name,
            rant_id: _rant_id,
            favorite: true
        })
    }).then(res => res.json())
}
//Get all "favorites" and updates DOM to add favorite class to corresponding rants
$(document).ready(() => {
    setTimeout(() => {
        $.get("/api/get_favorites", response => {
            console.log(response)
            let i = 0;
            while (i < response.length) {
                document.getElementById(`${response[i].rant_id}`).firstChild.classList.add('favorite')
                i++
            }
            // response.map(item => {
            //     document.getElementById(`${item.rant_id}`).firstChild.classList.add('favorite')
            //     console.log(document.getElementById(`${item.rant_id}`).firstChild.classList)
            //     // console.log(document.getElementById(`${item.rant_id}`))
            // })
        })
    }, 100)
})
$('.favorite').click(() => {
    console.log('yes')
    event.target.classList.remove('favorite');
    _rant_id = event.target.parentNode.id;
    fetch("/api/delete_favorite/" + _rant_id, {
        method: "DELETE",
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            rant_id: _rant_id,
        })
    }).then(res => res.json())
})
//DELETE
function delete_rant() {
    var prelim_id = event.target.id
    if (prelim_id.length === 0) {
        var _id = event.target.parentNode.id
        $.ajax({
            type: 'DELETE',
            url: "/api/delete_rant/" + _id,
            success: function (result) {
                console.log(result)
                window.location.reload()
            }
        });
    } else {
        $.ajax({
            type: 'DELETE',
            url: "/api/delete_rant/" + prelim_id,
            success: function (result) {
                console.log(result)
                window.location.reload()
            }
        });
    }
}
//EDIT
function popup_edit() {
    var prelim_id = event.target.id;
    if (prelim_id.length === 0) {
        var _id = event.target.parentNode.id;
        $.ajax({
            type: 'GET',
            url: "/api/get_rant/" + _id,
            success: function (result) {
                console.log(result)
                document.querySelector('.edit-name').innerHTML += `  ${result.name}'s rant!`
                document.querySelector('.edit-title').innerHTML += `${result.title}`
                document.querySelector('.edit-rant').innerHTML += `${result.rant}`
                document.querySelector('.update-rant').setAttribute('id', result._id)
            }
        });
    } else {
        $.ajax({
            type: 'POST',
            url: "/api/get_rant/" + prelim_id,
            success: function (result) {
                console.log(result)
                document.querySelector('.edit-name').innerHTML += `  ${result.name}'s rant!`
                document.querySelector('.edit-title').innerHTML += `${result.title}`
                document.querySelector('.edit-rant').innerHTML += `${result.rant}`
                document.querySelector('.update-rant').setAttribute('id', result._id)
            }
        })
    };
}

function edit_rant() {
    var prelim_id = event.target.id;
    var _title = document.querySelector('.edit-title').innerHTML
    var _rant = document.querySelector('.edit-rant').innerHTML
    var _object =
    {
        title: _title,
        rant: _rant
    }
    if (prelim_id.length === 0) {
        var _id = event.target;
        fetch("/api/update_rant/" + _id, {
            method: "POST",
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                _object
            })
        }).then((response) => {
            console.log(response)
            window.location.reload()
        })
    } else {
        fetch("/api/update_rant/" + prelim_id, {
            method: "POST",
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                _object
            })
        }).then((response) => {
            console.log(response)
            window.location.reload()
        })
    }
}

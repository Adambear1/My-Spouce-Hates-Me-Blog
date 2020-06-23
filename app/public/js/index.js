function timeStamp(x) {
    var d = new Date(x * 1000);


    return d

}

$(document).ready(() => {
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
                                    height="40" src="https://randomuser.me/api/portraits/${bin == 0 ? "women" : "men"}/${ran}.jpg">
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
                        <button class="uk-button uk-button-default uk-button-small"><i class="fas fa-star star"></i></button>
                        <button class="uk-button uk-button-default uk-button-small"><i class="fas fa-comments comments"></i></button>
                        <button class="uk-button uk-button-default uk-button-small"><i class="fa fa-pencil-square-o edit" aria-hidden="true"></i></button>
                        <button class="uk-button uk-button-default uk-button-small"><i class="fas fa-trash delete"></i></button>
                    </div>
                </div>
            `
        })
    })
})

$('.submit').click(() => {
    var _name = "Adam"
    var _img = "imgurl"
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
})


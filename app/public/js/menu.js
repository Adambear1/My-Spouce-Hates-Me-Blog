// MENU
//TOGGLE NAV OPTIONS
document.querySelector('#toggle').addEventListener('click', () => {
    let i = 0;
    while (i < document.querySelectorAll('.menu-items').length) {
        (document.querySelectorAll('.menu-items')[i]).classList.toggle('show')
        i++
    }
});
// Redirect
$("#home").click(() => {
    window.location.replace('/')
})
$("#favorites").click(() => {
    document.querySelector('.grid').innerHTML = ''
    $.get("/api/get_favorites", response => {
        response.map(favorite => {
            document.querySelector('.grid').innerHTML +=
                `
            <div class="uk-card uk-card-default uk-width-1-2@m">
            <div class="uk-card-header">
                <div class="uk-grid-small uk-flex-middle" uk-grid>
                    <div class="uk-width-auto">
                        <img class="uk-border-circle" width="40"
                            height="40" src="${favorite.img}">
                    </div>
                    <div class="uk-width-expand">
                        <h3 class="uk-card-title
                            uk-margin-remove-bottom">${favorite.name} - <b>${favorite.title}</b></h3>
                        <p class="uk-text-meta uk-margin-remove-top"><time
                                datetime="${Date.now()}">${timeStamp(favorite.created)}</time></p>
                    </div>
                </div>
            </div>
            <div class="uk-card-body">
                <p>${favorite.rant}</p>
            </div>
            <div class="uk-card-footer">
                <button class="uk-button uk-button-default uk-button-small" id="${favorite._id}" onClick="favorite_rant()"><i class="fas fa-star star"></i></button>
                <button class="uk-button uk-button-default uk-button-small"><i class="fas fa-comments comments"></i></button>
                <button class="uk-button uk-button-default uk-button-small" id=${favorite._id} uk-toggle="target: #my-id" onClick="popup_edit()"><i class="fa fa-pencil-square-o edit" aria-hidden="true"></i></button>
                <button class="uk-button uk-button-default uk-button-small" id="${favorite._id}" onClick="delete_rant()"><i class="fas fa-trash delete"></i></button>
            </div>
        </div>
    `
        })
    })
})


export default class Section {
    constructor( {renderer}, containerSelector) {
        //this._itemsToRender = items;
        this._renderer = renderer;

        this._container = document.querySelector(containerSelector);
    }

    renderItem(){
        fetch('https://mesto.nomoreparties.co/v1/cohort-42/cards', {
            method: 'GET',
            headers: {
                authorization: '34cb6bbb-dff7-49e7-b585-4fe4d4886a94'
            }
        })
        .then(res => res.json())
        .then((items) => {
            items.forEach(item => this._renderer(item));
            return
        })
        .catch((err) => {
            console.log('Ошибка. Запрос не выполнен');
        });
    }

    //renderItem(){
    //    this._itemsToRender.forEach(item => this._renderer(item))
    //}

    addItem(element){
        this._container.prepend(element);
    }
}

export default class UserInfo {
    constructor ( {profileNameSelector, profileDescriptionSelector, profileAvatarSelector} ) {
        this._profileName = document.querySelector(profileNameSelector);
        this._profileDescription = document.querySelector(profileDescriptionSelector);
        this._profileAvatar = document.querySelector(profileAvatarSelector)
    }

    getUserInfo() {
        return {
            profileName: this._profileName.textContent,
            profileDescription: this._profileDescription.textContent
        };
    }

    setUserInfo() {
        fetch('https://nomoreparties.co/v1/cohort-42/users/me', {
            method: 'GET',
            headers: {
                authorization: '34cb6bbb-dff7-49e7-b585-4fe4d4886a94'
            }
        })
            .then(res => res.json())
            .then((result) => {
                //const profileName = result.name;
                //const profileDescription = result.about;
                this._profileName.textContent = result.name;
                this._profileDescription.textContent = result.about;
                this._profileAvatar.src = result.avatar;

                return
                //{profileName,
                //    profileDescription};
            })
            .catch((err) => {
                console.log('Ошибка. Запрос не выполнен');
            });



        //this._profileName.textContent = data['profile-name'];
        //this._profileDescription.textContent = data['profile-description'];
    }

    patchUserInfo(data){
        fetch('https://mesto.nomoreparties.co/v1/cohort-42/users/me', {
            method: 'PATCH',
            headers: {
                authorization: '34cb6bbb-dff7-49e7-b585-4fe4d4886a94',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data['profile-name'],
                about: data['profile-description']
            })
        })
            .catch((err) => {
                console.log(err, 'Ошибка. Запрос не выполнен');
            });
    }
}

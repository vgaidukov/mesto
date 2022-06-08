export default class UserInfo {
    constructor (data) {
        this._profileName = data.profileName;
        this._profileDescription = data.profileDescription;
    }

    getUserInfo() {
        return {
            profileName: this._profileName.textContent,
            profileDescription: this._profileDescription.textContent
        };
    }

    setUserInfo(data) {
        const profileName = document.querySelector('.profile__name');
        const profileDescription = document.querySelector('.profile__description');
        profileName.textContent = data['profile-name'];
        profileDescription.textContent = data['profile-description'];
    }
}

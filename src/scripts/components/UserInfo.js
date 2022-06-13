export default class UserInfo {
    constructor ( {profileNameSelector, profileDescriptionSelector} ) {
        this._profileName = document.querySelector(profileNameSelector);
        this._profileDescription = document.querySelector(profileDescriptionSelector);
    }

    getUserInfo() {
        return {
            profileName: this._profileName.textContent,
            profileDescription: this._profileDescription.textContent
        };
    }

    setUserInfo(data) {
        this._profileName.textContent = data['profile-name'];
        this._profileDescription.textContent = data['profile-description'];
    }
}

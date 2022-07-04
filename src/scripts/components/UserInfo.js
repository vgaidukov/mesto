export default class UserInfo {
    constructor ( {profileNameSelector, profileDescriptionSelector, profileAvatarSelector}) {
        this._profileName = document.querySelector(profileNameSelector);
        this._profileDescription = document.querySelector(profileDescriptionSelector);
        this._profileAvatar = document.querySelector(profileAvatarSelector);
    }

    getUserInfo() {
        return {
            profileName: this._profileName.textContent,
            profileDescription: this._profileDescription.textContent
        };
    }

    setUserInfo(data) {
        this._profileName.textContent = data.name;
        this._profileDescription.textContent = data.about;
        this._profileAvatar.src = data.avatar;

        this._profileAvatar.onload = () => {this._profileAvatar.style.visibility = 'visible'}
    }
}

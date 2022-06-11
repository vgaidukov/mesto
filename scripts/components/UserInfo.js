import { profileName, profileDescription } from '../utils/constants.js';

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
        profileName.textContent = data['profile-name'];
        profileDescription.textContent = data['profile-description'];
    }
}

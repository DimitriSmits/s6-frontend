import FetchUtil from "fetchutil/dist/index.js";

const API_PROFILE_URL = process.env.VUE_APP_API_PROFILE_URL;

class APIProfile extends FetchUtil {
    refreshTokenTimeout = null;

    constructor(){
        super(API_PROFILE_URL, () => window.localStorage.getItem("token"));

        this.on(401, () => {
            localStorage.removeItem("token");
        });
    }
    
    profiles() {
        const thisObject = this;
        return {
            save: (JSON) => {
                return thisObject.put("/profile/updateProfile" , JSON);
            },

        };
    }
}

export default new APIProfile();

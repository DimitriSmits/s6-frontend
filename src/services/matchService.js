import FetchUtil from "fetchutil/dist/index.js";

const API_MATCHES_URL = process.env.VUE_APP_API_MATCHES_URL;

class APIMatches extends FetchUtil {
    refreshTokenTimeout = null;

    constructor(){
        super(API_MATCHES_URL, () => window.localStorage.getItem("token"));

        this.on(401, () => {
            localStorage.removeItem("token");
        });
    }
    
    matches() {
        const thisObject = this;
        return {
            getprefprofiles: () => {
                return thisObject.get("/match/getPrefProfiles");
            },

        };
    }
    getmatches() {
        const thisObject = this;
        return {
            get: () => {
                return thisObject.get("/match/getMatches");
            },

        };
    }
    savematch(){
        const thisObject = this;
        return {
            save: (JSON) => {
      
                thisObject.post("/match/saveMatch",JSON).then(() => {
                    location.reload();
                }, (error) => {
                    console.error(error);
                });
                

                return thisObject;
                
            },

        };
    }
}

export default new APIMatches();

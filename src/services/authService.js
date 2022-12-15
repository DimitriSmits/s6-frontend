import FetchUtil from "fetchutil/dist/index.js";
import jwtService from "./jwtService";

const API_AUTH_URL = process.env.VUE_APP_API_AUTH_URL;

class APIAuth extends FetchUtil {
    refreshTokenTimeout = null;

    constructor(){
        super(API_AUTH_URL, () => window.localStorage.getItem("token"));

        this.on(401, () => {
            localStorage.removeItem("token");
        });
    }
    
    auth() {
        const thisObject = this;
        return {
            login: (credentials) => {
                return thisObject.post("/auth/login/gamer/" + credentials);
            },
            // login: (user) => {
            //     return thisObject.post("/auth/login/gamer/" + user);
            // },
            register: (credentials) => {
                return thisObject.post("/auth/register/gamer/"+credentials)
            },
            refresh(){
                return thisObject.post("/auth/login/refresh", {});
            },
            getPreConnectUrl: () => {
                return thisObject.post("/auth/login/google", {});
            },
            getPostConnectUrl: (code, state, scope) => {
                return thisObject.post("/auth/login/google/code", {
                    code,
                    state,
                    scope
                });
            },
            revoke(){
                return thisObject.post("/auth/revoke", {});
            },
        };
    }
    startTokenRefreshTimer(){
        let token = window.localStorage.getItem("token");

        if(token === null){
            this.refreshTokenTimeout = setTimeout(() => {
                this.startTokenRefreshTimer.call(this, window.localStorage.getItem("token"));
            }, import.meta.env.VITE_TOKEN_REFRESH_MINUTES * 60 * 1000);
            return;
        }
        let maxTimeLeft = (import.meta.env.VITE_TOKEN_EXPIRES_MINUTES - import.meta.env.VITE_TOKEN_REFRESH_MINUTES) * 60;

        let jwt = jwtService.parseJwt(token);

        let now = Math.floor(new Date().getTime() / 1000.0);
        let expiresAt = jwt.exp;

        let timeLeft = expiresAt - now;

        if(timeLeft < maxTimeLeft){
            timeLeft = maxTimeLeft;
        }

        this.refreshTokenTimeout = setTimeout(() => this.refreshToken.call(this), (timeLeft - maxTimeLeft) * 1000);
    }
    refreshToken(){
        this.auth().refresh().then((response) => {
            let token = response.token;
            
            window.localStorage.setItem("token", token);

            this.startTokenRefreshTimer();
        }, (error) => {
            console.error(error);
        });
    }
    stopTokenRefreshTimer(){
        if(this.refreshTokenTimeout !== null){
            clearTimeout(this.refreshTokenTimeout);
        }
    }
}

export default new APIAuth();

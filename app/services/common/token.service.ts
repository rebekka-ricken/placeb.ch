import {Injectable} from 'angular2/core';

@Injectable()
export class Token {

    constructor() {
    }

    getToken() {
        return localStorage.getItem('token')
            ? JSON.parse(localStorage.getItem('token')).access_token
            : null;
    }

    getExpiryDate() {
        return JSON.parse(localStorage.getItem('token')).expires;
    }

    isUser() {
        if (this.getToken()) {
            return this.getUserType() === 'user';
        }

    }

    getUserType() {
        return  localStorage.getItem('token')
            ? JSON.parse(localStorage.getItem('token')).user_type
            : 'guest';
    }

    getRefreshToken() {
        return JSON.parse(localStorage.getItem('token')).refresh_token;
    }

    setToken(accessToken:string, expiresIn:number, type:string, refreshToken:string) {
        let now = Date.now();
        //let expires = new Date(now + 2.6e9);
        let expires = new Date((~~(now / 1000) + expiresIn) * 1000);
        let token = {
            access_token: accessToken,
            refresh_token: refreshToken ? refreshToken : null,
            expires: expires,
            user_type: type
        }
        localStorage.setItem('token', JSON.stringify(token));
    }

    removeToken() {
        localStorage.removeItem('token');
    }

    isValid() {
        let now = new Date();
        // console.log(now);
        // console.log(new Date(this.getExpiryDate()));
        return now < new Date(this.getExpiryDate());
    }

}

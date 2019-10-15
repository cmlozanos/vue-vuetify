export default class Authorization {
    token: string;
    access_token: string;
    expires: Date;
    refresh_token: string;

    constructor(token: string, access_token: string, expires: Date, refresh_token: string){
        this.token = token;
        this.access_token = access_token;
        this.expires = expires;
        this.refresh_token = refresh_token;
    }
}
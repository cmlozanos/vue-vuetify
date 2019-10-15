import { timingSafeEqual } from 'crypto';

export default class User {
    site: string;
    siteType: string;
    siteName: string;
    sitePartyNumber: number;
    isHQUser: boolean;

    constructor(site: string, siteType: string, siteName: string, sitePartyNumber: number, isHQUser: boolean){
        this.site = site;
        this.siteType = siteType;
        this.siteName = siteName;
        this.sitePartyNumber = sitePartyNumber;
        this.isHQUser = isHQUser;
    }
}
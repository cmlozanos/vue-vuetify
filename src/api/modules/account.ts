import axios from 'axios';
import routerHelper from '../../routerHelper';
const qs = require('qs');

const grantAccess = function(code : string, cb : Function){
    if (code == null || code == ''){
        console.error('Invalid Request: code null or empty')
        return 
    }
    const data = {
        grant_type: process.env.VUE_APP_TOKEN_GRANT_TYPE,
        code: code,
        redirect_uri: process.env.VUE_APP_TOKEN_REDIRECT_URI,
        client_id: process.env.VUE_APP_TOKEN_CLIENT_ID
    }
    const config = {
        headers: {
            Authorization: process.env.VUE_APP_TOKEN_AUTHORIZATION,
        }
    }
    
    const params = qs.stringify(data)
    const url = process.env.VUE_APP_TOKEN_GRANT_URL || ''
    axios
    .post(url, params, config)
    .then((response  : any) => cb(response)).catch((error : any) => {
        console.error('Ha habido un error: ' + JSON.stringify(error.response))
        routerHelper.redirectToLoginPage()
    })
}
const refreshAccess = function(refreshToken : string, cb : Function){
    if (refreshToken == null || refreshToken == ''){
        console.error('Invalid Request: refreshToken null or empty')
        return 
    }
    const data = {
        grant_type: process.env.VUE_APP_TOKEN_REFRESH_GRANT_TYPE,
        refresh_token: refreshToken
    }
    const config = {
        headers: {
            Authorization: process.env.VUE_APP_TOKEN_AUTHORIZATION,
        }
    }
    const params = qs.stringify(data)
    const url = process.env.VUE_APP_TOKEN_REFRESH_URL || ''
    axios
    .post(url, params, config)
    .then(function(response : any){
        cb(response)
    }).catch((error : any) => {
        console.error('Ha habido un error: ' + JSON.stringify(error.response))
        routerHelper.redirectToLoginPage()
    })
}

const userInfo = function(token : string, cb : Function){
    if (token == null || token == ''){
        console.error('Invalid Request: token null or empty')
        routerHelper.redirectToLoginPage()
        return 
    }
    
    const config = {
        headers: {
            Authorization: token,
        }
    }
    
    const url = process.env.VUE_APP_USER_INFO_URL || ''
    axios
    .post(url, null, config)
    .then((response  : any) => cb(response)).catch((error : any) => {
        console.error('Ha habido un error: ' + JSON.stringify(error.response))
        routerHelper.redirectToLoginPage()
    })
}

export default {
    grantAccess: grantAccess,
    refreshAccess: refreshAccess,
    userInfo: userInfo
}
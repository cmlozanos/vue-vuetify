import axios from 'axios';
import routerHelper from '../../routerHelper';

const list = function(token : string, cb : Function){
    if (token == null || token == ''){
        console.error('Invalid Request: token null or empty')
        routerHelper.redirectToLoginPage()
        return 
    }

    const config = {
        headers: {
            Authorization: token,
            'x-api-key': process.env.VUE_APP_MASTERDATA_API_KEY
        }
    }

    const url = process.env.VUE_APP_MASTERDATA_URL || ''
    axios
    .get(url, config)
    .then(response => cb(response)).catch((error : any ) => {
        console.error('Ha habido un error: ' + JSON.stringify(error))
        routerHelper.redirectToLoginPage()
    })
}

export default {
    list: list,
}
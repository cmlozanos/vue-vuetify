import axios from 'axios';
import routerHelper from '../../routerHelper';

const list = function(inputData : any, cb : Function){
    if (inputData.token == null || inputData.token == ''){
        console.error('Invalid Request: token null or empty')
        routerHelper.redirectToLoginPage()
        return 
    }

    if (inputData.magasinId == null || inputData.magasinId == ''){
        console.error('Invalid Request: magasinId null or empty')
        return 
    }

    const data = {  
        criteria:{  
            statuses:['CAN_PICKUP'],
           pickupStoreIds:[inputData.magasinId]
        },
        pagination: {
            pageSize: 1000,
            pageNum: 0
        },
        sorts:[  
            {  
                sortField:'CREATION_DATE',
                sortType:'DESC'
            }
        ]
    }
    
    const config = {
        headers: {
            Authorization: inputData.token,
            'x-api-key': process.env.VUE_APP_ORDERS_API_KEY,
            'target-country': 'ES'
        }
    }
    
    const url = process.env.VUE_APP_ORDERS_URL || ''
    axios
    .post(url, data, config)
    .then(response => cb(response)).catch((error : any ) => {
        console.error('Ha habido un error: ' + JSON.stringify(error))
        routerHelper.redirectToLoginPage()
    })
}

const detail = function(inputData : any, cb : Function, cbSE :Function){
    if (inputData.token == null || inputData.token == ''){
        console.error('Invalid Request: token null or empty')
        routerHelper.redirectToLoginPage()
        return 
    }
    if (inputData.orderId == null || inputData.orderId == ''){
        console.error('Invalid Request: orderId null or empty')
        return 
    }

    const config = {
        params: {
            orderId: inputData.orderId
        },
        headers: {
            Authorization: inputData.token,
            'x-api-key': process.env.VUE_APP_ORDER_DETAIL_API_KEY
        }
    }
    
    const url = process.env.VUE_APP_ORDER_DETAIL_URL || ''
    axios
    .get(url, config)
    .then(response => cb(response)).catch((error : any ) => {
        console.error('Ha habido un error: ' + JSON.stringify(error))
        if (error.response.status >= 400 && error.response.status < 600){
            cbSE(error)
        }else{
            routerHelper.redirectToLoginPage()
        }
    })
}

const confirm = function(inputData : any, cb : Function, cbSE : Function){
    if (inputData.token == null || inputData.token == ''){
        console.error('Invalid Request: token null or empty')
        routerHelper.redirectToLoginPage()
        return 
    }
    if (inputData.groupId == null || inputData.groupId == ''){
        console.error('Invalid Request: groupId null or empty')
        return 
    }
    const data = {  
        shippingGroupId: inputData.groupId
    }
    const config = {
        headers: {
            Authorization: inputData.token,
            'x-api-key': process.env.VUE_APP_CONFIRM_ORDER_API_KEY
        }
    }

    const url = process.env.VUE_APP_CONFIRM_ORDER_URL || ''
    axios
    .post(url, data, config)
    .then((response  : any) => cb(response)).catch((error : any ) => {
        console.error('Ha habido un error: ' + JSON.stringify(error))
        if (error.response.status >= 400 && error.response.status < 600){
            cbSE(error)
            
        }else{
            routerHelper.redirectToLoginPage()
        }
    })
}

export default {
    list: list,
    detail: detail,
    confirm: confirm,
}
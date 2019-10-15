import routerHelper from '../../routerHelper';

const validator = {
    array: {
        isFilled: function (array : any){
            return Array.isArray(array) && array.length > 0
        }
    },
    string: {
        isFilled: function (string : string){
            return (string != null && string != undefined && string != '')
        }
    },
    token: {
        expired: function(rootState : any){
            return new Date() > rootState.account.auth.expires
        }
    }
}

const get = {
    token: function (rootState : any) {
        if (!validator.string.isFilled(rootState.account.auth.token)){
            console.error('Token empty')
            routerHelper.redirectToLoginPage()
        }
        return rootState.account.auth.token
    },
    refreshToken: function (rootState : any) {
        if (!validator.string.isFilled(rootState.account.auth.refresh_token)){
            console.error('refresh_token empty')
            routerHelper.redirectToLoginPage()
        }
        return rootState.account.auth.refresh_token
    },
    magasinId: function (rootState : any) {
        const magasinId = rootState.account.magasin.id
        if (magasinId == null || magasinId == undefined){
            console.error('MagasinId empty')
            routerHelper.redirectToLoginPage()
        }
        return magasinId
    },
    orderId: function (rootState : any) {
        if (rootState.order.order == null || rootState.order.order == undefined || rootState.order.order.id == null || rootState.order.order.id == undefined){
            console.error('OrderId empty')
            routerHelper.routeToOrders()
        }
        return rootState.order.order.id
    },
    groupId: function (rootState : any) {
        if (rootState.order == null || rootState.order == undefined 
            || rootState.order.order == null || rootState.order.order == undefined
            || rootState.order.order.groupId == null || rootState.order.order.groupId == undefined
            ){
            console.error('groupId empty')
            routerHelper.redirectToLoginPage()
        }
        return rootState.order.order.groupId
    },
    profile: {
        fullName: function (rootState : any) {
            if (rootState.order == null || rootState.order == undefined 
                || rootState.order.order == null || rootState.order.order == undefined
                || rootState.order.order.groupId == null || rootState.order.order.groupId == undefined
                ){
                console.error('groupId empty')
                routerHelper.redirectToLoginPage()
            }
            const groupId = rootState.order.order.groupId
            return groupId
        }
    }
}

export default {
    validator: validator,
    get: get
}
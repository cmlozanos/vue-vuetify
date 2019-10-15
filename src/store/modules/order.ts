import constants from '../../constants';
import helper from './helper';
import routerHelper from '../../routerHelper';
import api from '../../api';

import Order from '@/models/Order';
import ETPDate from '@/models/ETPDate';
import Person from '@/models/Person';
import OrderDetail from '@/models/OrderDetail';
import Article from '@/models/Article';
import Alert from '@/models/Alert';

const state = {
    order: Order,
    orders: Array<Order>(),
    orderDetail: OrderDetail,
    isLoading: {
        type: Boolean,
        default: true
    }
}

const actions = {
    getOrders ({dispatch, commit, rootState} : any) {
        const isExpired = helper.validator.token.expired(rootState)
        if (isExpired){
            dispatch('account/refreshAccess', {action: 'order/getOrders'}, { root: true })
            return
        }
        
        commit('INITIALIZE_ORDERS')
        commit('SHOW_LOADING')
        
        const token = helper.get.token(rootState)
        const magasinId = helper.get.magasinId(rootState)
        
        api.order.list({token:token, magasinId: magasinId}, function (response : any) {
            commit('SET_ORDERS', response.data.content)
        })
    },
    getOrderDetail ({dispatch, commit, rootState} : any) {
        const isExpired = helper.validator.token.expired(rootState)
        if (isExpired){
            dispatch('account/refreshAccess', {action: 'order/getOrderDetail'}, { root: true })
            return
        }
        
        const token = helper.get.token(rootState)
        const orderId = helper.get.orderId(rootState)
        
        commit('INITIALIZE_ORDER_DETAIL')
            
        api.order.detail({token:token, orderId: orderId}, function (response : any) {
            if (response.status == 200){
                commit('SET_ORDER_DETAIL', response.data)
            }else{
                const errors = response.data.responseTO.errors;
                if (errors.length > 0){
                    // const text = ('response.' + errors[0].message);
                    const text = 'Error';
                    const alert = new Alert(text, 'error')
                    dispatch('alert/show', alert , { root: true })
                    routerHelper.routeToOrders()
                }
            }
        },function (error : any) {
            // const text = (error.response.status + ' ' + error.response.statusText);
            const text = 'Error';
            const alert = new Alert(text, 'error')
            dispatch('alert/show', alert , { root: true })
            routerHelper.routeToOrders()
        })
    },
    confirmOrder ({dispatch, rootState} : any) {
        const isExpired = helper.validator.token.expired(rootState)
        if (isExpired){
            dispatch('account/refreshAccess', {action: 'order/confirmOrder'}, { root: true })
            return
        }        

        const token = helper.get.token(rootState)
        const orderId = helper.get.orderId(rootState)
        const groupId = helper.get.groupId(rootState)
        
        api.order.confirm({token:token, groupId: groupId}, function (response : any) {

            const text = 'Entregado'
            // const alert = new Alert(orderId.toUpperCase(), 'success')
            const alert = new Alert(text, 'success')
            dispatch('alert/show', alert , { root: true })
            routerHelper.routeToOrders()
        },function (error : any) {
            const text = 'Error';
            //const text = (error.response.status + ' ' + error.response.statusText);
            const alert = new Alert(text, 'error')
            dispatch('alert/show', alert , { root: true })
            routerHelper.routeToOrders()
        })
    },
    setOrder ({commit} : any, order : Order) {
        commit('SET_ORDER', order)
    }
}
const mutations = {
    INITIALIZE_ORDERS (state : any) {
        state.orders = new Array<Order>()
    },
    SHOW_LOADING (state : any) {
        state.isLoading = true;
    },
    SET_ORDER (state : any, order : Order) {
        state.order = order
    },
    SET_ORDERS (state : any, data : any) {
        state.orders = new Array<Order>()
        for(let i in data){
            const dataOrder = data[i]
            const shippingMethod = dataOrder.shippingGroups[0].shippingMethod
            if (shippingMethod != constants.PICKUP_IN_STORE && shippingMethod != constants.IN_STORE_PREPARE_AND_PICKUP){
                console.error('Invalid dataOrder ' + dataOrder.id +' with shipping method: ' + shippingMethod)
            }else{
                
                const date  = new Date(dataOrder.creationDate)
                const creationDate = new ETPDate(date.getDate(), constants.MONTHS[date.getMonth()], date.getFullYear())
                
                const firstName = dataOrder.profile.firstName != undefined ? dataOrder.profile.firstName[0] : ''
                const lastName = dataOrder.profile.lastName != undefined ? dataOrder.profile.lastName[0] : ''
                const fullName = firstName + (lastName.length > 0 ? ' ' + lastName : '')
                const letterIdentifiers = (lastName.length > 0 ? lastName.substring(0,3) : '')
                const person = new Person(fullName, letterIdentifiers)
                
                const type = shippingMethod == constants.PICKUP_IN_STORE ? constants.CYC : constants.CYR1H
                const isCYC = (type == constants.CYC)
                const order = new Order(dataOrder.id, creationDate, dataOrder.shippingGroups[0].id, type, isCYC, person)
                
                state.orders.push(order)
            }
        }
        state.isLoading = false;
    }, 
    INITIALIZE_ORDER_DETAIL (state : any) {
        const articles = new Array<Article>();
        state.orderDetail = new OrderDetail(articles, 0);
    },
    SET_ORDER_DETAIL (state : any, data : any) {
        const articles = new Array<Article>()

        const groupDetails = data.responseTO.data.orderDeliverySummary.shippingGroupDetails
        for(let i in groupDetails){
            const items = groupDetails[i].detailedCommerceItem
            for(let j in items){
                const producTo = items[j].productTo;
                const price = items[j].saleTotalPriceAmount;
                const quantity = items[j].quantity;
                const article = new Article(producTo.modelId, producTo.name, producTo.brandName, producTo.category, producTo.image, price, quantity);
                articles.push(article);
            }
        }

        const total = data.responseTO.data.totalAmount
        state.orderDetail = new OrderDetail(articles, total);
    }

}

const namespaced: boolean = true;

export default {
    namespaced,
    state,
    actions,
    mutations
}
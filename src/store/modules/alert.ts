import Alert from '@/models/Alert';

const state = {
    display: false,
    alert: new Alert('', 'error')
}
const actions = {
    hide ({commit} : any) {
        commit('HIDE')
    },
    show ({commit} : any, alert : Alert) {
        commit('SHOW', alert)
    },
}
const mutations = {
    HIDE (state : any) {
        state.display = false
    },
    SHOW (state : any, alert: Alert) {
        state.display = true
        state.alert = alert
    }
}

const namespaced: boolean = true;

export default {
    namespaced,
    state,
    actions,
    mutations
}
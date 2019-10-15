/*
import api from '../../api';
import helper from './helper';
*/

const state = {
    magasins: [],
    isLoading: true
}

const actions = {
    getMagasins ({commit}) {
        /*
        const isFilledMagasinsBefore = helper.validator.array.isFilled(rootState.magasin.magasins)
        if (isFilledMagasinsBefore){
            return
        }
        
        const isExpired = helper.validator.token.expired(rootState)
        if (isExpired){
            dispatch('account/refreshAccess', {action: 'magasin/getMagasins'}, { root: true })
            return
        }
        */
        commit('INITIALIZE_MAGASINS')
        commit('SHOW_LOADING')

        /*
        const token = helper.get.token(rootState)
        api.magasin.list(token , function (response) {
            commit('SET_MAGASINS', response.data)
        })
        */
       commit('SET_MAGASINS');
    }
}
const mutations = {
    INITIALIZE_MAGASINS (state) {
        state.magasins = []
    },
    SET_MAGASINS (state) {
        state.magasins = [];
        state.magasins.push({id: 1, name: 'Juan1', validated: false, added: false});
        state.magasins.push({id: 2, name: 'Juan2', validated: false, added: false});
        state.magasins.push({id: 3, name: 'Juan3', validated: false, added: false});
        state.magasins.push({id: 4, name: 'Juan4', validated: false, added: false});
        state.magasins.push({id: 5, name: 'Juan5', validated: false, added: false});
        state.magasins.push({id: 6, name: 'Juan6', validated: false, added: false});
        state.magasins.push({id: 7, name: 'Juan7', validated: false, added: false});
        state.magasins.push({id: 8, name: 'Juan8', validated: false, added: false});
        state.magasins.push({id: 9, name: 'Juan9', validated: false, added: false});
        state.magasins.push({id: 10, name: 'Juan10', validated: false, added: false});
        state.magasins.push({id: 11, name: 'Juan11', validated: false, added: false});
        state.magasins.push({id: 12, name: 'Juan12', validated: false, added: false});
        state.magasins.push({id: 13, name: 'Juan13', validated: false, added: false});
        state.magasins.push({id: 14, name: 'Juan14', validated: false, added: false});
        state.magasins.push({id: 15, name: 'Juan15', validated: false, added: false});
        state.magasins.push({id: 16, name: 'Juan16', validated: false, added: false});
        state.magasins.push({id: 17, name: 'Juan17', validated: false, added: false});
        state.magasins.push({id: 18, name: 'Juan18', validated: false, added: false});
        state.magasins.push({id: 19, name: 'Juan19', validated: false, added: false});
        state.magasins.push({id: 20, name: 'Juan20', validated: false, added: false});
        state.magasins.push({id: 21, name: 'Juan21', validated: false, added: false});
        state.magasins.push({id: 22, name: 'Juan22', validated: false, added: false});
        state.magasins.push({id: 23, name: 'Juan23', validated: false, added: false});
        state.magasins.push({id: 24, name: 'Juan24', validated: false, added: false});
        state.magasins.push({id: 25, name: 'Juan25', validated: false, added: false});
        state.magasins.push({id: 26, name: 'Juan26', validated: false, added: false});
        state.magasins.push({id: 27, name: 'Juan27', validated: false, added: false});
        state.magasins.push({id: 28, name: 'Juan28', validated: false, added: false});
        state.magasins.push({id: 29, name: 'Juan29', validated: false, added: false});
        state.magasins.push({id: 30, name: 'Juan30', validated: false, added: false});
        state.magasins.push({id: 31, name: 'Juan31', validated: false, added: false});
        state.magasins.push({id: 32, name: 'Juan32', validated: false, added: false});
        state.magasins.push({id: 33, name: 'Juan33', validated: false, added: false});
        state.magasins.push({id: 34, name: 'Juan34', validated: false, added: false});
        state.magasins.push({id: 35, name: 'Juan35', validated: false, added: false});
        state.magasins.push({id: 36, name: 'Juan36', validated: false, added: false});
        state.magasins.push({id: 37, name: 'Juan37', validated: false, added: false});
        state.magasins.push({id: 38, name: 'Juan38', validated: false, added: false});
        state.magasins.push({id: 39, name: 'Juan39', validated: false, added: false});
        state.magasins.push({id: 40, name: 'Juan40', validated: false, added: false});
        /*
        for(let i in data){
            const dataMagasin = data[i]
            const status = dataMagasin.status.toString().toLowerCase()
            if ('open' == status){
                const magasin = { id: dataMagasin.id, name: dataMagasin.name}
                state.magasins.push(magasin)
            }
        }
        */
        state.isLoading = false;
    }, 
    SHOW_LOADING (state) {
        state.isLoading = true;
    },
}

const namespaced = true;

export default {
    namespaced,
    state,
    actions,
    mutations
}
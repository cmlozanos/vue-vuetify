import router from '../../router';
import constants from '../../constants';
import routerHelper from '../../routerHelper';
import api from '../../api';
import helper from './helper';
import Magasin from '@/models/Magasin'
import Authorization from '@/models/Authorization'
import User from '@/models/User';

const state = {
    user: User,
    auth: Authorization,
    magasin: Magasin,
    isNeededQueryMagasins: false
}

const getters = {
    isHQUser: (state : any) => {
        return state.user != null && state.user.isHQUser
    }
}

const actions = {
    launchLogin ({state} : any) {
        const isTokenEmpty = (state.auth.token == '' || state.auth.token == null)
        if (isTokenEmpty){
            routerHelper.redirectToLoginPage()
        }
    },
    grantAccess ({state, commit} : any, code : string) {
        commit('INITIALIZE_TOKEN')
        api.account.grantAccess(code, function(response : any){
            commit('SET_REFRESH_ACCESS', response.data)
            
            commit('INITIALIZE_USER')
            const token = state.auth.token
            api.account.userInfo(token, function(response : any) {
                commit('SET_USER', response.data)
                if (state.isNeededQueryMagasins){

                    api.magasin.list(token , function (response : any) {
                        commit('SET_USER_MAGASIN_NAME', response.data)
                    })
                }
            })

        })
    },
    refreshAccess ({dispatch, commit, rootState} : any, data : any) {
        const refreshToken = helper.get.refreshToken(rootState)
        api.account.refreshAccess(refreshToken, function(response : any){
            commit('SET_REFRESH_ACCESS', response.data)
            dispatch(data.action, null, { root: true })
        })
    },
    setUserMagasin ({commit} : any, magasin : Magasin) {
        commit('SET_USER_MAGASIN', magasin)
    }
}
const mutations = {
    SET_REFRESH_ACCESS (state : any, data : any) {
        
        var expirationDate = new Date()
        expirationDate.setSeconds(expirationDate.getSeconds() + data.expires_in)
        
        const token = data.token_type + ' ' + data.access_token
        const access_token = data.access_token
        const refresh_token = data.refresh_token

        state.auth = new Authorization(token, access_token, expirationDate, refresh_token)
    },
    SET_USER_MAGASIN (state : any, magasin : Magasin) {
        state.magasin = magasin
    },
    INITIALIZE_TOKEN (state : any) {
        state.auth = new Authorization('', '', new Date(), '')
    },
    INITIALIZE_USER (state : any) {
        state.user = new User('', '', '', 0, false);
    },
    SET_USER_MAGASIN_NAME (state : any, data : any) {
        let selectedMagasin = data.filter((magasin : any) => {
            return (magasin.id.toString().toLowerCase() == state.magasin.site)
        })
        if (selectedMagasin.length > 0){
            const name = selectedMagasin[0].name.toLowerCase()
            state.magasin = new Magasin(state.magasin.id, name, state.magasin.site)
        }
        router.push({name:'home'})
    },
    SET_USER (state : any, data : any) {
        const partyNumber = data.sitepartynumber;
        const site = data.site;
        const siteName = data.sitename;
        const siteType = data.sitetype;

        const isFilledUser = (partyNumber > 0)
        if (isFilledUser){
            const startsWith007 = partyNumber.toString().startsWith('007')
            if (startsWith007){
                const startsWithE = site.toLowerCase().startsWith('e')
                const id = startsWithE ? site.substring(1) : site
                const formatedId = '00000'.substr(0, ('00000'.length - id.toString().length ) ) +id
                const sitePartyNumber = '007' + formatedId + formatedId
                
                state.magasin = new Magasin(sitePartyNumber, siteName, site);
                state.user = new User(site, siteType, siteName, partyNumber, false)
                state.isNeededQueryMagasins = true
            }else{
                state.user = new User(site, siteType, siteName, partyNumber, true)
                router.push({name: 'magasin'})
            }
        }else{
            state.user = new User(site, siteType, siteName, partyNumber, false)
            router.push({name:'home'})
        }
    }
}

const namespaced: boolean = true;

export default {
    namespaced,
    state,
    getters,
    actions,
    mutations
}
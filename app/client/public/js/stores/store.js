import Vuex from 'vuex'
import MapStore from './MapStore'
import UserStore from './UserStore'

const store = new Vuex.Store({
    modules: {
        map: MapStore,
        user: UserStore
    }
})

export default store
import DataModule from "../libraries/DataModule"

let state = {
    login: "",
    connected: false,
    ttl: -1,
    role: "",
    status: "",
    trophies: [],
    gameJoined: false,
    gameStarted: false
}

let getters = {
    login: state => state.login,
    connected: state => state.connected,
    ttl: state => state.ttl,
    role: state => state.role,
    status: state => state.status,
    trophies: state => state.trophies,
    gameJoined: state => state.gameJoined,
    gameStarted: state => state.gameStarted
}

let mutations = {
    CHANGE_LOGIN: (state, newLogin) => {
        state.login = newLogin
    },
    CHANGE_CONNECTED: (state, newConnected) => {
        state.connected = newConnected
    },
    CHANGE_STATS: (state, {ttl, role, status, trophies, updateServer}) => {
        ttl ? state.ttl = ttl : ""
        role ? state.role = role : ""
        status ? state.status = status : ""
        trophies ? state.trophies = trophies : ""

        if(updateServer) {
            DataModule.changeStats(state.login, state.ttl, state.role, state.status, state.trophies)
        }
    },
    GET_STATS: (state) => {
        DataModule.stats(state.login).then((json) => {
            console.log("je prend ces stats : ", json)
            state.ttl = json.ttl
            state.role = json.role
            state.status = json.status
            state.trophies = json.trophies
        })
    },
    JOIN_GAME: (state) => {
        state.gameJoined = true
    },
    LEAVE_GAME: (state) => {
        state.gameJoined = false
    },
    CHANGE_GAME: (state, status) => {
        state.gameStarted = status
    },
    RESET_STATS: (state) => {
        state.login = ""
        state.connected = false
        state.ttl = -1
        state.role = ""
        state.status = ""
        state.trophies = []
        state.gameJoined = false
        state.gameStarted = false
    }
}

let actions = {
    changeLogin: (store, newLogin) => {
        store.commit('CHANGE_LOGIN', newLogin)
    },
    changeConnected: (store, newConnected) => {
        store.commit('CHANGE_CONNECTED', newConnected)
    },
    changeStats: (store, {ttl, role, status, trophies, updateServer}) => {
        store.commit('CHANGE_STATS', {ttl, role, status, trophies, updateServer})
    },
    getStats: (store) => {
        store.commit('GET_STATS')
    },
    join: (store) => {
        store.commit('JOIN_GAME')
    },
    left: (store) => {
        store.commit('LEAVE_GAME')
    },
    changeGame: (store, status) => {
        store.commit('CHANGE_GAME', status)
    },
    resetStats: (store) => {
        store.commit('RESET_STATS')
    }
}

const moduleUser = {
    state,
    mutations,
    getters,
    actions
}


export default moduleUser
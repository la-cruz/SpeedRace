import DataModule from "../libraries/DataModule"
import L from "leaflet"

let state = {
    login: "",
    connected: false,
    ttl: -1,
    role: "",
    status: "",
    trophies: [],
    winner: "none",
    gameJoined: false,
    gameStarted: false,
    gameEnded: false,
    loop: null
}

let getters = {
    login: state => state.login,
    connected: state => state.connected,
    ttl: state => state.ttl,
    role: state => state.role,
    status: state => state.status,
    trophies: state => state.trophies,
    winner : state => state.winner,
    gameJoined: state => state.gameJoined,
    gameStarted: state => state.gameStarted,
    gameEnded: state => state.gameEnded,
    loop: state => state.loop
}

let mutations = {
    CHANGE_LOGIN: (state, newLogin) => {
        state.login = newLogin
    },
    CHANGE_CONNECTED: (state, newConnected) => {
        state.connected = newConnected
    },
    CHANGE_WINNER: (state, newWinner) => {
        state.winner = newWinner
    },
    CHANGE_STATS: (state, {ttl, role, status, trophies, updateServer}) => {
        ttl !== undefined ? state.ttl = ttl : ""
        role ? state.role = role : ""
        status ? state.status = status : ""
        trophies ? state.trophies = trophies : ""

        if(updateServer) {
            DataModule.changeStats(state.login, state.ttl, state.role, state.status, state.trophies)
        }
    },
    GET_STATS: (state) => {
        DataModule.stats(state.login).then((json) => {
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
    END_GAME: (state) => {
        state.gameEnded = true
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
    },
    SET_LOOP: (state, loop) => {
        state.loop = loop
    },
    STOP_LOOP: (state) => {
        clearInterval(state.loop)
    }
}

let actions = {
    changeLogin: (store, newLogin) => {
        store.commit('CHANGE_LOGIN', newLogin)
    },
    changeConnected: (store, newConnected) => {
        store.commit('CHANGE_CONNECTED', newConnected)
    },
    changeWinner: (store, newWinner) => {
        store.commit('CHANGE_WINNER', newWinner)
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
    endGame: (store) => {
        store.commit('END_GAME')
    },
    resetStats: (store) => {
        store.commit('RESET_STATS')
    },
    setLoop: (store, loop) => {
        store.commit('SET_LOOP', loop)
    },
    stopLoop: (store) => {
        store.commit('STOP_LOOP')
    }
}

const moduleUser = {
    state,
    mutations,
    getters,
    actions
}


export default moduleUser
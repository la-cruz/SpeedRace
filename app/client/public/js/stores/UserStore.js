let state = {
    login: "",
    connected: false,
    gameJoined: false,
    gameStarted: false
}

let getters = {
    login: state => state.login,
    connected: state => state.connected,
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
    JOIN_GAME: (state) => {
        state.gameJoined = true
    },
    LEAVE_GAME: (state) => {
        state.gameJoined = false
    },
    CHANGE_GAME: (state, status) => {
        state.gameStarted = status
    } 
}

let actions = {
    changeLogin: (state, newLogin) => {
        state.commit('CHANGE_LOGIN', newLogin)
    },
    changeConnected: (state, newConnected) => {
        state.commit('CHANGE_CONNECTED', newConnected)
    },
    join: (state) => {
        state.commit('JOIN_GAME')
    },
    left: (state) => {
        state.commit('LEAVE_GAME')
    },
    changeGame: (state, status) => {
        state.commit('CHANGE_GAME', status)
    }
}

const moduleUser = {
    state,
    mutations,
    getters,
    actions
}


export default moduleUser
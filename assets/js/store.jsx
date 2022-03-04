import React, { createContext, useReducer, useContext } from 'react'
import merge from 'lodash.merge'

const initState = {
  server: '',
  account: {
    servers: [],
    evmKeys: [],
    username: 'UniPass BOT',
    email: 'hi@mail.unipass.me',
    photoURL: '/avatar.jpg',
    accessToken: '',
    refreshToken: '',
    discordUuid: '',
    timestamp: 0,
  },
}

const reducer = (state, data) => {
  return { ...merge(state, data) }
}

const Context = createContext()

const useStore = () => {
  return useContext(Context)
}

const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState)
  return <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
}

export { useStore, StoreProvider }

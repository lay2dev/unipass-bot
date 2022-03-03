import React, { createContext, useReducer, useContext } from 'react'
import merge from 'lodash.merge'

const initState = {
  count: 0,
  account: {
    evmKeys: [],
    username: 'UniPass BOT',
    email: 'hi@mail.unipass.me',
    photoURL: '/avatar.jpg',
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

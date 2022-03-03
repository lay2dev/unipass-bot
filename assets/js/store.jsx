import React, { createContext, useReducer, useContext } from 'react'

const initialState = { count: 0 }

const reducer = (state, action) => {
  switch (action.type) {
    case '+':
      return { count: state.count + 1 }
    case '-':
      return { count: state.count - 1 }
    default:
      throw new Error()
  }
}

const Context = createContext()

const useStore = () => {
  return useContext(Context)
}

const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
}

export { useStore, StoreProvider }

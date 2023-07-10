import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext()

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL

export const GithubProvider = ({children}) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  }

  const [state, dispatch] = useReducer(githubReducer, initialState)


  //removed fetch users
 

  const getUser = async (login) => {
    setLoading()

    //get single user
    const response = await fetch(`${GITHUB_URL}/users/${login}`)

    if(response.statusText === 404) {
      window.location = '/notfound'
      return
    }

    //single user
    const data = await response.json()

    dispatch({
      type: 'GET_USER',
      payload: data,
    })
    // the reducer automatically sets loading to false
  }

  //get repos
  const getUserRepos = async (login) => {
    setLoading()

    //add some search params to only get the 10 most recent repos
    const params = new URLSearchParams({
      sort: 'created',
      per_page: 10
    })

    const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`)

    const data = await response.json()

    dispatch({
      type: 'GET_USER_REPOS',
      payload: data,
    })
    // the reducer automatically sets loading to false
  }

  const setLoading = () => dispatch({type: 'SET_LOADING'})

  const clearUsers = () => dispatch({type: 'CLEAR_USERS'})

  return <GithubContext.Provider value={{
    ...state,
    dispatch,
    clearUsers,
    getUser,
    getUserRepos
  }}>
    {children}
  </GithubContext.Provider>
}

export default GithubContext

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL

export const searchUsers = async (text) => {

  const params = new URLSearchParams({
    q: text
  })

  const response = await fetch(`${GITHUB_URL}/search/users?${params}`)

  const {items} = await response.json()

  return items

  // the reducer automatically sets loading to false
}

export const getUser = async (login) => {

  //get single user
  const response = await fetch(`${GITHUB_URL}/users/${login}`)

  if(response.statusText === 404) {
    window.location = '/notfound'
    return
  }

  //single user
  const data = await response.json()

  return data

  // dispatch({
  //   type: 'GET_USER',
  //   payload: data,
  // })
  // the reducer automatically sets loading to false
}

//get repos
export const getUserRepos = async (login) => {

  //add some search params to only get the 10 most recent repos
  const params = new URLSearchParams({
    sort: 'created',
    per_page: 10
  })
  
  const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`)

  const data = await response.json()

  return data

  // dispatch({
  //   type: 'GET_USER_REPOS',
  //   payload: data,
  // })
  // the reducer automatically sets loading to false
}
export const setLang = (locale) => {
  localStorage.setItem('locale', locale)
}
export const getLang = () => {
  return localStorage.getItem('locale')
}

//getUserInfo
export const getUsrtInfo = () => {
  return JSON.parse(localStorage.getItem('user')) || []
}

export const setToken = (token) => {
  localStorage.setItem('Chiu-Token', token)
}
export const getToken = () => {
  return localStorage.getItem('Chiu-Token')
}
export const removeToken = () => {
  return localStorage.removeItem('Chiu-Token')
}

export const setHistoryList = (arr) => {
  localStorage.setItem('History', JSON.stringify(arr))
}
export const getHistoryList = () => {
  return JSON.parse(localStorage.getItem('History')) || []
}

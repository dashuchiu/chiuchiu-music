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

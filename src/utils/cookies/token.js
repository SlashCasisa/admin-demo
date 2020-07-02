import Cookies from 'js-cookie'
// Toknkey
const TokenKey = 'T-ADMIN'

export function getToken() {
  return Cookies.get(TokenKey)
}
export function setinfo(menu) {
  return Cookies.set('asd', menu)
}
export function setToken(Token) {
  return Cookies.set(TokenKey, Token)
}
export function setuser_id(user_id) {
  return Cookies.set('user_id', user_id)
}

export function getuser_id() {
  return Cookies.get('user_id')
}
export function removeToken() {
  return Cookies.remove(TokenKey)
}
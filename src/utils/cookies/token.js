import Cookies from 'js-cookie'
// Toknkey
const TokenKey = 'T-ADMIN'

export function getToken() {
  return Cookies.get(TokenKey)
}
export function setMenu(menu) {
  return Cookies.set('menu', menu)
}
export function getMenu() {
  return Cookies.get('menu')
}
export function setToken(Token) {
  return Cookies.set(TokenKey, Token)
}
export function set_user_id(user_id) {
  return Cookies.set('user_id', user_id)
}

export function get_user_id() {
  return Cookies.get('user_id')
}
export function removeToken() {
  return Cookies.remove(TokenKey)
}
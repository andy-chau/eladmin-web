// import Cookies from 'js-cookie'
import ZCookies from './cookieHelper'
import Config from '@/settings'

const TokenKey = Config.TokenKey

export function getToken() {
  return ZCookies.get(TokenKey)
}

export function setToken(token, rememberMe) {
  if (rememberMe) {
    return ZCookies.set(TokenKey, token, { expires: Config.tokenCookieExpires })
  } else return ZCookies.set(TokenKey, token)
}

export function removeToken() {
  return ZCookies.remove(TokenKey)
}

import Cookies from 'js-cookie'

const key = 'jwt'

export default {
  IsLogin() {
    return Cookies.get(key) ? true : false
  },
  Remove() {
    return Cookies.remove(key)
  },
  Set(v) {
    Cookies.set(key, v)
  }
}

import { cacheUtils } from './cacheUtils'

const ZCookies = (function() {
  function get(name) {
    const value = cacheUtils.getLStorageInfo(name)
    return value
  }

  function set(name, value) {
    cacheUtils.setLStorageInfo(name, value)
  }
  function remove(name) {
    cacheUtils.clearLStorage(name)
  }
  return {
    get: get,
    set: set,
    remove: remove
  }
})()

export default ZCookies

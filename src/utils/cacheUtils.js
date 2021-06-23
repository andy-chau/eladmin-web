var cacheConfig = {
  'isDebug': false,
  'islocal': true,
  'localTimeOut': 30
}

export const cacheUtils = (function() {
  /**
   * 获取时间戳
   * @returns {string}
   */
  function getTimeStamp() {
    var timeStr = new Date().getTime()
    // 一定要转换字符串
    var timestamp = timeStr.toString()
    return timestamp
  }

  /**
   * JSON转成字符串
   * @param jsonData
   * @returns {string}
   */
  function jsonToString(jsonData) {
    if (isNotEmpty(jsonData)) {
      return JSON.stringify(jsonData)
    }
    return ''
  }

  /**
   * 字符串转成JSON
   * @param strData
   * @returns {*}
   */
  function stringToJson(strData) {
    if (isNotEmpty(strData)) {
      var str = '(' + strData + ')' // json字符串
      // eslint-disable-next-line no-eval
      return eval(str)
    }
    return ''
  }

  /**
   * 判断参数是否不为空
   * @param param
   * @returns {boolean}
   */
  function isNotEmpty(param) {
    // eslint-disable-next-line eqeqeq
    if (param == null || param == undefined || typeof (param) == 'undefined' || param == '' || param == 'undefined' || param == 'null') {
      return false
    } else {
      return true
    }
  }

  /**
   * 判断参数是否为空
   * @param param
   * @returns {boolean}
   */
  function isEmpty(param) {
    // eslint-disable-next-line eqeqeq
    if (param == null || param == undefined || typeof (param) == 'undefined' || param == '' || param == 'undefined' || param == 'null') {
      return true
    } else {
      return false
    }
  }

  /**
   * 保存数据到本地缓存
   * @param key
   * @param value
   */
  function setLStorageInfo(key, value) {
    if (cacheConfig.islocal) {
      var timestamp = cacheUtils.getTimeStamp() // 存储的时间戳
      var storageinfo = {
        'timestamp': timestamp,
        key: value
      }
      var infotxt = cacheUtils.jsonToString(storageinfo)
      try {
        localStorage.setItem(key, infotxt)
      } catch (e) {
        alert('您的浏览器版本太低，或者您开启了隐身/无痕浏览模式，或者WebView组件不支持localStorage！')
      }
    } else {
      if (cacheConfig.isDebug) {
        alert('未开启离线缓存模式，不支持localStorage缓存！')
      }
    }
  }

  /**
   * 获取本地缓存，如果缓存超时，清除本地缓存
   * @param key
   * @returns {*}
   */
  function getLStorageInfo(key) {
    if (cacheConfig.islocal) {
      var timestamp1 = cacheUtils.getTimeStamp() // 存储的时间戳
      var timeout = cacheConfig.localTimeOut // 离线缓存数据超时时间(分钟为单位)
      var value = null
      try {
        value = localStorage.getItem(key)
      } catch (e) {
        alert('您的浏览器版本太低，或者您开启了隐身/无痕浏览模式，或者WebView组件不支持localStorage！')
      }
      var storageinfo = cacheUtils.stringToJson(value)// 转换成json对象
      var timestamp2 = storageinfo.timestamp// 获取时间戳
      var time = (timestamp1 - timestamp2) / 1000 / 60
      var keyValue = storageinfo.key// 获取数据
      if (time > timeout) {
        cacheUtils.clearLStorage(key)// 清理本地离线缓存数据
        if (cacheConfig.isDebug) {
          alert(key + '【离线缓存已经超时' + Math.round(time - timeout) + '分钟,已经被清理！】')
        }
        return null
      } else {
        keyValue = keyValue || null
        if (cacheConfig.isDebug && cacheUtils.isNotEmpty(keyValue)) {
          alert('获得离线缓存数据' + key + '=' + keyValue + '【数据将在' + Math.round(timeout - time) + '分钟后失效！】')
        }
        return keyValue
      }
    } else {
      if (cacheConfig.isDebug) {
        alert('未开启离线缓存模式，不支持localStorage缓存！')
      }
    }
  }

  /**
   * 清除本地缓存
   * @param key
   */
  function clearLStorage(key) {
    try {
      if (cacheConfig.islocal) {
        if (key === true) {
          localStorage.clear()
        } else {
          if (key) {
            localStorage.removeItem(key)
          } else {
            for (var pkey in localStorage) {
              localStorage.removeItem(pkey)
            }
          }
        }
      } else {
        if (cacheConfig.isDebug) {
          alert('未开启离线缓存模式，不支持localStorage缓存！')
        }
      }
    } catch (e) {
      alert('您的浏览器版本太低，或者您开启了隐身/无痕浏览模式，或者WebView组件不支持localStorage！')
    }
  }

  return {
    version: '1.0',
    getTimeStamp: getTimeStamp,
    isNotEmpty: isNotEmpty,
    isEmpty: isEmpty,
    jsonToString: jsonToString,
    stringToJson: stringToJson,
    setLStorageInfo: setLStorageInfo,
    getLStorageInfo: getLStorageInfo,
    clearLStorage: clearLStorage
  }
})()

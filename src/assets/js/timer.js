class timer {
  time = null;
  constructor(t) {
    if (t == undefined) {
      this.time = new Date()
    } else {
      this.time = t;
    }
  }
  AddDay(add) {
    this.time = new Date(this.time.getTime() + add * 24 * 3600 * 1000)
    return this
  }
  
  GetDate() {
    return this.Format('Y-m-d')
  }
  GetDatetime() {
    return this.Format('Y-m-d H:i:s')
  }
  Format(format) {
    let s = ''
    for (let i = 0; i < format.length; i++) {
      switch (format[i]) {
        case 'Y':
          s +=  this.time.getFullYear()
          break
        case 'm':
          s += ( this.time.getMonth() + 1).toString().padStart(2, '0')
          break
        case 'd':
          s += ( this.time.getDate() + 1).toString().padStart(2, '0')
          break
        case 'H':
          s +=  this.time.getHours()
          break
        case 'i':
          s +=  this.time.getMinutes()
          break
        case 's':
          s +=  this.time.getSeconds()
          break
        default:
          s += format[i]
          break
      }
    }
    return s;
  }
}

export default timer;

export const env = {
  bool (val) {
    var bool
    switch (val) {
      case '1':
        bool = true
        break
      case 'true':
        bool = true
        break
      default:
        bool = false
    }
    return bool
  }
}

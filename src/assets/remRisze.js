function htmlFontSize () {
  var windowWidth
  if (document.documentElement.clientWidth) {
    windowWidth = document.documentElement.clientWidth
  } else if ((document.body) && (document.body.clientWidth)) {
    windowWidth = document.body.clientWidth
  }
  document.getElementById('app').style.fontSize = windowWidth * 0.1 + 'px'
}
htmlFontSize()
window.onresize = function () {
  htmlFontSize()
}

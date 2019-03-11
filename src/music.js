import config from './config'
import kamel from 'Assets/music/my_dirty_old_kamel.xm'

require('jsxm/xmeffects.js')
require('jsxm/xm.js')

const { XMPlayer, fetch } = window

function trapLogging (fn) {
  const old = console.log
  console.log = () => {}
  fn()
  console.log = old
}

fetch(kamel)
  .then(resp => resp.arrayBuffer())
  .then(data => {
    trapLogging(() => {
      XMPlayer.init()
      XMPlayer.load(data)
    })
  })

window.addEventListener('click', () => {
  if (config.enableMusic) XMPlayer.play()
})

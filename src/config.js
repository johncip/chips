const config = {
  bgColor: 0x333344,
  debug: false,
  enableMusic: true,
  floorDelay: 1000 / 10,
  fontFamily: 'inconsolata',
  height: 576,
  moveDelay: 1000 / 3,
  musicVolume: 0.25,
  smoothMoves: true,
  startLevel: 0,
  startState: 'Playing',
  tsize: 64,
  width: 896
}

try {
  const devConfig = require('./config.dev.js').default
  Object.assign(config, devConfig)
} catch (e) {
}

export default config

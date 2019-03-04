import jsfx from 'loov-jsfx'

export default jsfx.Sounds({
  collect: {
    Frequency: {
      Start: 494,
      Slide: 0.45,
      RepeatSpeed: 0.8,
      DeltaSlide: 0.09,
      ChangeAmount: 0
    },
    Generator: {
      Func: 'square'
    },
    Volume: {
      Master: 0.12,
      Sustain: 0.03,
      Decay: 0.21,
      Attack: 0,
      Punch: 0.68
    },
    Vibrato: {
      Depth: 0.34,
      Frequency: 0.01,
      FrequencySlide: -1
    },
    Filter: {
      LP: 1,
      HP: 0
    }
  },

  bump: {
    Frequency: {
      Start: 436,
      Slide: -0.435,
      ChangeAmount: -2
    },
    Generator: {
      Func: 'synth',
      A: 0.88,
      ASlide: 0.08,
      B: 0.03
    },
    Filter: {
      HP: 0.091
    },
    Volume: {
      Master: 0.5,
      Sustain: 0.12,
      Decay: 0.15,
      Punch: 0.93
    },
    Phaser: {
      Offset: 0.08
    }
  },

  open: {
    Frequency: {
      Start: 459,
      Slide: -0.06,
      Min: 497,
      DeltaSlide: -0.23,
      Max: 431,
      RepeatSpeed: 3,
      ChangeAmount: -7,
      ChangeSpeed: 0.06
    },
    Generator: {
      Func: 'string',
      A: 0.76,
      B: 0.08,
      ASlide: 0.51,
      BSlide: 0.15
    },
    Filter: {
      HP: 0.04,
      LP: 1,
      LPResonance: 0,
      HPSlide: -0.65,
      LPSlide: 0.83
    },
    Volume: {
      Sustain: 0.28,
      Decay: 0.151,
      Master: 1
    },
    Vibrato: {
      Frequency: 2.01,
      FrequencySlide: 1,
      Depth: 0.1,
      DepthSlide: -0.01
    },
    Phaser: {
      Sweep: 0.32
    }
  },

  exit: {
    Frequency: {
      Start: 612.224,
      Slide: 0.32,
      Min: 504
    },
    Vibrato: {
      Depth: 0.610,
      Frequency: 21.01
    },
    Generator: {
      Func: 'sine'
    },
    Volume: {
      Sustain: 0.52,
      Decay: 0.206
    },
    Filter: {
      LP: 1,
      LPSlide: 0.17
    }
  },

  splash: {
    Frequency: {
      Start: 950.141,
      Slide: -0.251
    },
    Generator: {
      Func: 'noise'
    },
    Volume: {
      Sustain: 0.387,
      Decay: 0.133,
      Punch: 0.363
    }
  },

  press: {
    Frequency: {
      Start: 520,
      Slide: -0.95,
      Min: 909,
      Max: 1202
    },
    Generator: {
      Func: 'string',
      A: 0.39,
      ASlide: -0.317,
      BSlide: 0.58
    },
    Filter: {
      HP: 0.0784,
      LP: 1
    },
    Volume: {
      Sustain: 0,
      Decay: 0.1,
      Attack: 0.02,
      Punch: 0,
      Master: 0.7
    },
    Phaser: {
      Offset: 0
    },
    Vibrato: {
      Depth: 0
    }
  },

  lose: {
    Frequency: {
      Start: 578,
      Slide: -0.51,
      ChangeAmount: 3,
      Min: 78,
      Max: 1415
    },
    Generator: {
      Func: 'saw',
      A: 0.03467,
      ASlide: 0.45993
    },
    Filter: {
      HP: 0.29826,
      LP: 1
    },
    Volume: {
      Sustain: 0.01040,
      Decay: 0.29212,
      Master: 0.15,
      Attack: 0.22
    },
    Vibrato: {
      DepthSlide: -0.01
    }
  },

  explode: {
    Frequency: {
      Start: 251.31000625900924,
      Slide: 0,
      RepeatSpeed: 0.38534330886323004,
      ChangeSpeed: 0.6709645881084725,
      ChangeAmount: 9.885300697758794
    },
    Generator: {
      Func: 'noise'
    },
    Phaser: {
      Offset: -0.13690635238308457,
      Sweep: -0.09704250530339777
    },
    Volume: {
      Sustain: 0.2539373656967655,
      Decay: 0.32334498269483447,
      Punch: 0.6985737494193017
    }
  }
})

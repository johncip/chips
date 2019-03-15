const keys = [
  'bgLayer',
  'lowerLayer',
  'upperLayer',
  'displayPanelBack',
  'inventoryBack',
  'inventoryFront',
  'lcdBack',
  'lcdFront',
  'modalBack',
  'modalFront',
  'chip'
]

export default keys.reduce(
  (acc, key, idx) => {
    acc[key] = idx
    return acc
  },
  {}
)

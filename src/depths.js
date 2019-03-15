const keys = [
  'bgLayer',
  'lowerLayer',
  'upperLayer',
  'chip',
  'displayPanelBack',
  'inventoryBack',
  'inventoryFront',
  'lcdBack',
  'lcdFront',
  'modalBack',
  'modalFront'
]

export default keys.reduce(
  (acc, key, idx) => {
    acc[key] = idx
    return acc
  },
  {}
)

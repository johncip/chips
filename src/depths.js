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
  'hintBack',
  'hintFront',
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

config = require '../config'

e = document.getElementsByTagName('canvas')[0]
e.width = config.width
e.height = config.height

# e.width  = window.innerWidth
# e.height = window.innerHeight

module.exports = e.getContext '2d'
config = require '../config'

generatePlayerPosition = (players) ->
  if players.length is 0
    return {
      x: config.width / 8 * 3 # 384
      y: config.height / 2 # 384
    }

  if players[0].x is 384
    return {
      x: config.width / 8 * 5 # 640
      y: config.height / 2 # 384
    }
  else
    return {
      x: config.width / 8 * 3 # 384
      y: config.height / 2 # 384
    }

  # b = 400 # buffer between circle and border (2 sides)

  # if players.length is 0
  #   return {
  #     x: Math.round((config.width - b) * Math.random())
  #     y: Math.round((config.height - b) * Math.random())
  #   }
  # else
  #   p = players[Math.round(Math.random() * players.length)]

  #   return {
  #     x: Math.round((config.width - b) * Math.random())
  #     y: Math.round((config.height - b) * Math.random())
  #   }

module.exports = generatePlayerPosition
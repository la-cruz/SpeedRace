const listTrophies = require('./listTrophies')
const Trophy = require('./trophy')

var baseListTrophies = new listTrophies()

baseListTrophies.push(new Trophy("first connection", 1))
baseListTrophies.push(new Trophy("Infected !", 5))
baseListTrophies.push(new Trophy("First infection", 10))
baseListTrophies.push(new Trophy("Ten infection", 10))
baseListTrophies.push(new Trophy("Curred !", 50))

module.exports = baseListTrophies
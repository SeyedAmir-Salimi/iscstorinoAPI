var express = require('express')
var router = express.Router()
const { getArrayofTable } = require('../utilities')

router.get('/', (req, res) => {
  const table = getArrayofTable('./assests/weather.dat')
  if (table.length === 0) {
    return res.status(500).json({ message: 'sorry there is no any data' })
  }
  const editTabel = table.filter(x => x.Dy !== undefined)
  return res.status(200).json(editTabel)
})


module.exports = router

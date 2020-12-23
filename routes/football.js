var express = require('express')
var router = express.Router()
const { getArrayofTable } = require('../utilities')

router.get('/', (req, res) => {
  const table = getArrayofTable('./assests/football.dat')
  if (table.length === 0) {
    return res.status(500).json({ message: 'sorry there is no any table' })
  }
  const editTabel = table.filter(x => x.N !== "-------------------------------------------------------")
  return res.status(200).send(editTabel)
})


module.exports = router

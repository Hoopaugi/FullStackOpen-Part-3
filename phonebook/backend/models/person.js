const mongoose = require('mongoose')

const url = process.env.DB_URL

if (!url) {
  console.error('Missing database configration')
  process.exit(1)
}

mongoose.set('strictQuery',false)

mongoose.connect(url).then(result => {
  console.log('Connected to database')
}).catch((error) => {
  console.log(`error connecting to database: ${error.message}`)
})

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Person = mongoose.model('Person', personSchema)

module.exports = Person
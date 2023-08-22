const mongoose = require('mongoose')

const url = process.env.DB_URL

if (!url) {
  console.error('Missing database configration')
  process.exit(1)
}

mongoose.set('strictQuery',false)

// eslint-disable-next-line no-unused-vars
mongoose.connect(url).then(result => {
  console.log('Connected to database')
}).catch((error) => {
  console.log(`error connecting to database: ${error.message}`)
})

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: [true, 'name required']
  },
  number: {
    type: String,
    minLength: 8,
    required: [true, 'phone number required'],
    validate: {
      validator: function(v) {
        return /^\d{2,3}-\d*$/.test(v)
      },
      message: props => `${props.value} is not a valid phone number!`
    },
  }
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
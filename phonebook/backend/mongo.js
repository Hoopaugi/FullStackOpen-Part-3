const mongoose = require('mongoose')

if (process.argv.length === 2 || process.argv.length > 7) {
  console.log('Usage:\nnode mongo.js <username> <password> <database> <name> <number>')
  process.exit(1)
}

const username = process.argv[2]
const password = process.argv[3]
const db = process.argv[4]

if (!username || !password || !db) {
  console.log('username, password and db required')
  process.exit(1)
}

const url = `mongodb+srv://${username}:${password}@${db}.lzvpzub.mongodb.net/?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 5) {
  console.log('phonebook:')
  Person.find({}).then(people => {
    people.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
    process.exit(1)
  })
} else {
  const name = process.argv[5]
  const number = process.argv[6]

  if (!name || !number) {
    console.log('Name and number required')
    process.exit(1)
  }

  const person = new Person({
    name: name,
    number: number,
  })

  // eslint-disable-next-line no-unused-vars
  person.save().then(result => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
}

const express = require('express')
const morgan = require('morgan')

const app = express()

morgan.token('body', function(req, res) {
  const body = JSON.stringify(req.body)

  return body
});

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  }, { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  }, { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  }, { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

const generateId = (collection) => {
  const maxId = collection.length > 0 ? Math.max(...collection.map(n => n.id)) : 0

  return maxId + 1
}

app.get('/info', (request, response) => {
  response.send(`<p>Phonebook has info for ${persons.length} people</P><p>${new Date()}</p>`)
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)

  const person = persons.find(p => p.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).json({ error: `No person with id ${id} found` })
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)

  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({ error: 'name missing' })
  }

  if (!body.number) {
    return response.status(400).json({ error: 'number missing' })
  }

  if (persons.find(x => x.name === body.name)) {
    return response.status(400).json({ error: 'Name must be unique' })
  }

  const person = {
    id: generateId(persons),
    name: body.name,
    number: body.number,
  }

  persons = persons.concat(person)

  response.json(person)
})

const PORT = 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
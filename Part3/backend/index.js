const express = require('express')
const path = require('path')
const app = express()
require('dotenv').config()
const Person = require('./models/person')
const { error } = require('console')


app.use(express.json())

// First acquire the data and send to the server
app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons)
    })
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } 
    else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}


// Then display a message at /info
app.get('/info', (req, res, next) => {
    Person.find({}).then(persons => {
        // First find out the size of the array and the current time
        const count = persons.length
        const currentTime = new Date()
        // Then send the data
        res.send(`
            <p>Phonebook has info of ${count} people</p>
            <p>${currentTime}</p>
        `)
    })
    // If met with a problem, send a message
    .catch(error => {
        next(error)
    })
})

// Display the info of the person with id of 5
app.get('/api/persons/:id', (req, res, next) => {
    Person.findById(req.params.id)
    .then(person => {
        res.send(person)
    })
    .catch(err => {
        next(err)
    })
})

// Now a function that makes it possible to delete a user
app.delete('/api/persons/:id', (req, res, next) => {
    // Use the database to delete the user with that id
    Person.findByIdAndDelete(req.params.id)
    .then(person => {
        if (person) {
        res.status(200).json(person)   // document was deleted
        } else {
            res.status(404).json({ error: 'User not found' }) // ID not found
        }
    })
})

app.put('/api/persons/:id', (request, response, next) => {
    // Deconstruct the name and number from the request body
    const { name, number } = request.body

    // find the user by their id
    Person.findById(request.params.id)
    .then(person => {
        // If the user was null, return an error
        if (!person) {
            return response.status(404).end()
        }
        // If the user was available
        else {
            // Update the person's data
            person.name = name
            person.number = number

            // Then return it
            return person.save().then(newPerson => {
                response.json(newPerson)
            })
        }
    })
    .catch(error => {
        next(error)
    })
})

// Allow users to add something to the datas
app.post('/api/persons', (req, res, next) => {
    const body = req.body
    // Check if the user added them
    if (body.name && body.number) {
        // Check for duplicate for name
        Person.findOne({ name: body.name })
        .then(existingUserName => {
            if (existingUserName) {
                return res.status(400).json(
                    {error: 'Name must be unique'}
                )
            }
            // If there is no duplicate
            else {
                // Create the new person
                const newPersonObject = new Person({
                    "name": body.name,
                    "number": body.number
                })
        
                // Add to the datas, return the new object and a 200 status response
                newPersonObject.save().then(newPerson => {
                    res.status(201).send(newPerson)
                })
                .catch(err => next(err))
            }
        })
    }
    // If they are null
    else return res.status(400).json(
        {error: 'Null is not an acceptable input'}
    )
})

// Serve frontend
app.use(express.static(path.join(__dirname, 'dist')))

app.use(errorHandler)

const PORT =  process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
    
})
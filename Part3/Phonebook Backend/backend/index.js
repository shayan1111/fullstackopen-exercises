const express = require('express')
const path = require('path')
const app = express()

app.use(express.json())


let datas = [
        { 
        "id": "1",
        "name": "Arto Hellas", 
        "number": "040-123456"
        },
        { 
        "id": "2",
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
        },
        { 
        "id": "3",
        "name": "Dan Abramov", 
        "number": "12-43-234345"
        },
        { 
        "id": "4",
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
        }
]

// First acquire the data and send to the server
app.get('/api/persons', (req, res) => {
    res.json(datas)
})

// Then display a message at /info
app.get('/info', (req, res) => {
    const count = datas.length
    const currentTime = new Date()
    res.send(`
        <p>Phonebook has info of ${count} people</p>
        <p>${currentTime}</p>
    `)
})

// Display the info of the person with id of 5
app.get('/api/persons/:id', (req, res) => {
    const personId = req.params.id
    const personObject = datas.find(n => n.id === personId)
    if (personObject) return res.json(personObject)
    else return res.status(404).end()
})

// Now a function that makes it possible to delete a user
app.delete('/api/persons/:id', (req, res) => {
    const idToDelete = req.params.id
    datas = datas.filter(n => n.id !== idToDelete)
    res.status(204).end()
})

// Allow users to add something to the datas
app.post('/api/persons', (req, res) => {
    const body = req.body
    
    // Check if the user added them
    if (body.name && body.number) {
        // Check for duplicate for name
        const existingUserName = datas.some(person => person.name === body.name)
        // If it is a duplicate
        if ((existingUserName)) {
            return res.status(400).json(
                {error: 'Name must be unique'}
            )
            
        }
        else {
            // If it isn't a duplicate, then create the object
            let newPersonObject = {
                "id": Math.floor(Math.random() * 100000).toString(),
                "name": body.name,
                "number": body.number
            }

            // Add to the datas, return the new object and a 200 status response
            datas.push(newPersonObject)
            return res.status(201).json(newPersonObject)
        } 
    }
    // If they are null
    else return res.status(400).json(
        {error: 'Null is not an acceptable input'}
    )
})

// Serve frontend
app.use(express.static(path.join(__dirname, 'dist')))


const PORT =  process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
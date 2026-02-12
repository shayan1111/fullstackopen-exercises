const mongoose = require('mongoose')


// Consider the url for the connection to the database
const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)

// Connect through IPv4
mongoose.connect(url, { family: 4 })
.then(() => {
    console.log('Connected to MongoDB')
})

// Define the structure of the schema
const personSchema = new mongoose.Schema({
    name: {
    type: String,
    minLength: 3,
    required: true
    },
    number: {
    type: String,
    validate: {
        validator: value => /^(\d{2}-\d{6,}|\d{3}-\d{5,})$/.test(value), // either 2 digits behind the dash, or 3 digits behind the dash,
        message: props => `${props.value} is not a valid phone number. Number must have at least 8 characters, and must be in the format of XX-XXXXXX(or more for the second half) or XXX-XXXXX(or more for the second half)`
    }
}
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

// Define it's model
module.exports = mongoose.model('Person', personSchema)
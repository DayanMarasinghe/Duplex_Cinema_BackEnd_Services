require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
var cors = require('cors')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection

db.on('error', (error) => console.error(error))
db.once('open', (error) => console.log("Connected to DB.."))

app.use(cors())
app.use(express.json())

//setting routers for Movie
const moviesRouter = require('./routes/movieroutes')
app.use('/movies', moviesRouter)

//setting routers for MovieShowtime
const customersRouter = require('./routes/customerroutes')
app.use('/customers', customersRouter)

//setting routers for MovieAdmin
const movieadminsRouter = require('./routes/movieadminroutes')
app.use('/movieadmins', movieadminsRouter)

//setting routers for SystemAdmin
const movieShowtimesRouter = require('./routes/movieshowtimeroutes')
app.use('/movieshowtimes', movieShowtimesRouter)

//setting routers for Customers
const systemadminsRouter = require('./routes/systemadminroutes')
app.use('/systemadmins', systemadminsRouter)

app.listen(4000, () => console.log('Server started on port 4000..'))
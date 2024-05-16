// import packages
import express from 'express'
import ViteExpress from 'vite-express'
import handlerFunctions from './controller.js'

// create Express instance
const app = express()

// set up middleware
app.use(express.json())

// endpoints
const {getInvoices, addInvoice, deleteInvoice, editInvoice} = handlerFunctions

app.get('/invoices', getInvoices)
app.post('/newInvoice', addInvoice)
app.delete('/deleteInvoice/:id', deleteInvoice)
app.put('/updateInvoice/:id', editInvoice)


// open door to server with .listen()
ViteExpress.listen(app, 9001, () => console.log(`It's OVER 9000! View at http://localhost:9001`))
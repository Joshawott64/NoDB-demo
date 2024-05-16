import { useState, useEffect } from 'react'
import ModeButtons from './ModeButtons'
import Description from './Description'
import Hours from './Hours'
import Rate from './Rate'
import TableHeader from './TableHeader'
import TableRow from './TableRow'
import AddButton from './AddButton'
import './InvoiceTable.css'
import axios from 'axios'

const InvoiceTable = () => {

    const [testData, setTestData] = useState([])

    useEffect(() => {
        console.log('Test Data Array', testData)

        axios.get('/invoices')
            .then((res) => {
                setTestData(res.data)
            })
    }, [])

    const addInvoiceRow = () => {
        const newRow = {
            description: 'New Job goes here',
            rate: 0,
            hours: 0,
            isEditing: true
        }

        axios.post('/newInvoice', newRow)
            .then((res) => {
                setTestData(res.data)
            })
    }

    const deleteInvoiceRow = async (id) => {
        console.log(`${id} was too pure for this sinful world...`)
        
        const newInvoiceArray = await axios.delete(`/deleteInvoice/${id}`)

        console.log('new invoice array:', newInvoiceArray)

        setTestData(newInvoiceArray.data)
    }

    const editInvoiceRow = (id, body) => {
        axios.put(`/updateInvoice/${id}`, body)
            .then((res) => {
                setTestData(res.data)
            })
    }

    const rows = testData.map((el) => <TableRow 
        initialIsEditing={el.isEditing}
        initialDescription={el.description}
        initialRate={el.rate}
        initialHours={el.hours}
        key={el.id}
        deleteInvoiceRow={() => deleteInvoiceRow(el.id)}
        editInvoiceRow={editInvoiceRow}
        id={el.id}
    />)

  return (
    <table>
        <thead>
            <TableHeader />
        </thead>
        <tbody>
            {rows}
        </tbody>
        <tfoot>
            <AddButton addInvoiceRow={addInvoiceRow}/>
        </tfoot>
    </table>
  )
}

export default InvoiceTable
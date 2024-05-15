import React from 'react'

const AddButton = ({addInvoiceRow}) => {
  return (
    <tr>
        <td></td>
        <td colSpan={4}>
            <button onClick={addInvoiceRow}>Add</button>
        </td>
    </tr>
  )
}

export default AddButton
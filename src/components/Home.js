import React, { useContext } from 'react'

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { AgGridReact } from 'ag-grid-react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { DataContext } from '../DataContext'


function Home({ customerInfomation }) {

    const [{ customerInfo }, dispatch] = useContext(DataContext)

    const updateCustomerInfo = (deleleElement) => {
        dispatch({
            type: "DELETE_CUSTOMER_INFO",
            href: deleleElement
        })
    }

    const deleteItem = (url) => {
        if (window.confirm('Are you sure?')) {
            fetch(url, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {
                        updateCustomerInfo(url)
                    }
                    else alert('Something went wrong!');
                })
                .catch(err => console.error(err))
        }
    }
console.log(customerInfomation)
    const columns = [
        {
            headerName: '',
            width: 100,
            field: 'links',
            cellRendererFramework: params =>
                <IconButton onClick={() => deleteItem(params.value[0].href)}>
                    <DeleteIcon fontSize="small" />
                </IconButton>
        },
        { field: 'firstname', sortable: true, headerName: "First Name" },
        { field: 'lastname', sortable: true, headerName: "Last Name" },
        { field: 'streetaddress', sortable: true, headerName: "Address" },
        { field: 'postcode', sortable: true, headerName: "Post code" },
        { field: 'city', sortable: true },
        { field: 'phone', sortable: true },

    ]

    // const handleEdit = () => {

    // }

    return customerInfo ? (
        <div className="ag-theme-material" style={{ height: 600, width: '90%', margin: 'auto' }}>
            <AgGridReact
                rowData={customerInfomation}
                columnDefs={columns}
                pagination={true}
                paginationPageSize={10}
                singleClickEdit={true}
            />

        </div>
    ) : null;
}

export default Home
// suppressClickEdit = {true}

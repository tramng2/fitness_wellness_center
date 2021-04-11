import React, { useState, useContext } from 'react'
import "../App.css"
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { AgGridReact } from 'ag-grid-react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

import { DataContext } from '../DataContext'


const useStyles = makeStyles(() => ({
    root: {
        "& > *": {
            width: "300px",

        }
    }
}));

function Home({ customerInfomation }) {

    const [{ customerInfo }, dispatch] = useContext(DataContext)
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);

    const classes = useStyles();

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
        { field: 'firstname', sortable: true, headerName: "First Name"},
        { field: 'lastname', sortable: true, headerName: "Last Name" },
        { field: 'streetaddress', sortable: true, headerName: "Address" },
        { field: 'postcode', sortable: true, headerName: "Post code"},
        { field: 'city', sortable: true},
        { field: 'phone', sortable: true},

    ]

    function onGridReady(params) {
        setGridApi(params.api)
        setGridColumnApi(params.columnApi);
        params.api.sizeColumnsToFit();
    }

    const handleQuickFilter = (e) => {
        gridApi.setQuickFilter(e.target.value)
    }

    // const handleEdit = () => {
    // }

    return customerInfo ? (
        <div>
            <div className="search">
                <div className={classes.root}>
                    <TextField
                        type="search"
                        id="filter-text-box"
                        label="Search"
                        placeholder="Find anything"
                        variant="outlined"
                        onChange={handleQuickFilter} size="small"
                    />
                </div>

            </div>

            <div className="ag-theme-material" style={{ height: '520px', width: '90%', margin: 'auto' }}>
                <AgGridReact
                    onGridReady={onGridReady}
                    rowData={customerInfomation}
                    columnDefs={columns}
                    pagination={true}
                    paginationPageSize={8}
                // singleClickEdit={true}
                />
            </div>
        </div>
    ) : null;
}

export default Home
// suppressClickEdit = {true}

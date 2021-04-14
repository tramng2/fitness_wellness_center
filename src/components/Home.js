import "../App.css"
import React, { useState, useContext } from 'react'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from "@material-ui/core/styles";

import { DataContext } from '../DataContext'


const useStyles = makeStyles((theme) => ({
    root: {
        padding: '4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
    },
    input: {
        marginLeft: theme.spacing(2),
        width: "80%",
    },
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
        if (window.confirm('Do you want to delete this customer?')) {
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
        { field: 'firstname', sortable: true, headerName: "First Name" },
        { field: 'lastname', sortable: true, headerName: "Last Name" },
        { field: 'streetaddress', sortable: true, headerName: "Address" },
        { field: 'postcode', sortable: true, headerName: "Post code" },
        { field: 'city', sortable: true },
        { field: 'phone', sortable: true },
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
                <Paper className={classes.root}>
                    <SearchIcon />
                    <InputBase
                        type="search"
                        className={classes.input}
                        placeholder="Find anything"
                        onChange={handleQuickFilter}
                        size="small"
                    />
                </Paper>
            </div>

            <div className="ag-theme-alpine" style={{ height: '500px', width: '90%', margin: 'auto' }}>
                <AgGridReact
                    style={{ width: '100%', height: '100%;' }}
                    onGridReady={onGridReady}
                    rowData={customerInfomation}
                    columnDefs={columns}
                    pagination={true}
                    paginationPageSize={8}
                    suppressCellSelection={true}
                />
            </div>
        </div>
    ) : null;
}

export default Home

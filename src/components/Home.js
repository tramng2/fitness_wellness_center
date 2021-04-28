import "../App.css"
import React, { useState, useContext, useEffect, useCallback } from 'react'
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
import Snackbar from '@material-ui/core/Snackbar';
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";


import AddCustomer from './AddCustomer'
import AddTraining from './AddTraining'
import EditCustomer from './EditCustomer'
import axios from "axios"


const useStyles = makeStyles((theme) => ({
    margin: {
        width: '17rem'
    }
}));

function Home() {
    const classes = useStyles();
    const [{ customerInfo, trainingInfo }, dispatch] = useContext(DataContext)
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');


    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);

    const openSnackbar = () => {
        setOpen(true);
    }
    const closeSnackbar = () => {
        setOpen(false);
    }

    const getCustomerInfo = useCallback(async () => {
        const { data: { content } } = await axios
            .get('https://customerrest.herokuapp.com/api/customers')
        dispatch({
            type: 'SET_CUSTOMER_INFO',
            customerInfo: content
        })
    }, [dispatch],
    )

    useEffect(() => {
        getCustomerInfo()
    }, [getCustomerInfo])

    const saveNewCustomer = (newCustomer) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCustomer)
        })

        dispatch({
            type: 'SET_CUSTOMER_INFO',
            newCustomerInfo: newCustomer
        })
        getCustomerInfo()
    }

    const saveNewtraining = (newTraining) => {
        fetch('https://customerrest.herokuapp.com/api/trainings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTraining)
        })
        dispatch({
            type: 'SET_TRAINING_INFO',
            newTrainingInfo: newTraining
        })
    }
    const deleteCustomerInfo = (deleleElement) => {
        dispatch({
            type: "DELETE_CUSTOMER_INFO",
            href: deleleElement
        })
    }

    const handleDeleteItem = (url) => {
        if (window.confirm('Do you want to delete this customer?')) {
            fetch(url, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {
                        deleteCustomerInfo(url)
                        setMsg("Car delete succesfully")
                        openSnackbar();
                    }
                    else alert('Something went wrong!');
                })
                .catch(err => console.error(err))
        }
    }

    const editCustomerInfo = (url, updatedInfo) => {
        fetch(url, {
            method: 'PUT',
            body: JSON.stringify(updatedInfo),
            headers: { 'Content-type': 'application/json' }
        })
            .then(res => {
                if (res.ok) {
                    getCustomerInfo()
                    setMsg("Edit succesfully")
                    openSnackbar();
                } else alert('something went wrong')
                    .catch(err => console.log(err))
            })
    }

    const columns = [
        {
            headerName: '',
            field: 'links',
            width: '70px',
            suppressSizeToFit: true,
            cellRendererFramework: params =>
                <EditCustomer
                    customerInfo={params.data}
                    editCustomerInfo={editCustomerInfo}
                    urlEdit={params.value.filter(e => e.rel === 'self')}
                />
        },
        {
            headerName: '',
            field: 'links',
            width: '70px',
            suppressSizeToFit: true,
            cellRendererFramework: params =>
                <IconButton onClick={() => handleDeleteItem(params.value[0].href)}>
                    <DeleteIcon fontSize="small" color="secondary" />
                </IconButton>
        },
        {
            headerName: '',
            field: 'links',
            width: '150px',
            suppressSizeToFit: true,
            cellRendererFramework: params =>
                <AddTraining saveNewtraining={saveNewtraining} customerInfo={params.data} />
        },
        { field: 'firstname', sortable: true, headerName: "First Name" },
        { field: 'lastname', sortable: true, headerName: "Last Name" },
        { field: 'streetaddress', sortable: true, headerName: "Address" },
        { field: 'postcode', sortable: true, headerName: "Post code" },
        { field: 'city', sortable: true },
        { field: 'phone', sortable: true },
    ]

    const onGridReady = (params) => {
        setGridApi(params.api)
        setGridColumnApi(params.columnApi);
        params.api.sizeColumnsToFit();
    }

    const handleQuickFilter = (e) => {
        gridApi.setQuickFilter(e.target.value)
    }

    return customerInfo ? (
        <div>
            <div className="search">
                <TextField
                    className={classes.margin}
                    type="search"
                    placeholder="Search"
                    onChange={handleQuickFilter}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        )
                    }}
                >


                </TextField>
                <AddCustomer saveNewCustomer={saveNewCustomer} />
            </div>
            <div className="ag-theme-alpine" style={{ height: '500px', width: '90%', margin: 'auto' }}>
                <AgGridReact
                    style={{ width: '100%', height: '100%;', }}
                    rowHeight={50}
                    onGridReady={onGridReady}
                    rowData={customerInfo}
                    columnDefs={columns}
                    pagination={true}
                    paginationPageSize={8}
                    suppressCellSelection={true}
                />
                <Snackbar
                    open={open}
                    autoHideDuration={2000}
                    message={msg}
                    onClose={closeSnackbar}
                />
            </div>
        </div>
    ) : 'Loading';
}

export default Home

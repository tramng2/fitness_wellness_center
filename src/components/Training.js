import React, { useContext, useEffect, useState, useCallback } from 'react'
import { DataContext } from '../DataContext'
import axios from "axios"
import moment from 'moment';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Snackbar from '@material-ui/core/Snackbar';

function Tranning() {
    const [{ trainingInfo }, dispatch] = useContext(DataContext);
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);

    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');


    const openSnackbar = () => {
        setOpen(true);
    }
    const closeSnackbar = () => {
        setOpen(false);
    }

    const gettraining = useCallback(async () => {
        const { data } = await axios
            .get('https://customerrest.herokuapp.com/gettrainings')
        dispatch({
            type: 'SET_TRAINING_INFO',
            trainingInfo: data
        })
    }, [dispatch],
    )

    useEffect(() => {
        gettraining()
    }, [gettraining])


    const handleDeletetraining = (deleleElement) => {
        dispatch({
            type: "DELETE_TRAINING_INFO",
            id: deleleElement
        })
    }

    const deletetraining = (id) => {
        if (window.confirm('Do you want to delete this tranning?')) {
            fetch(`https://customerrest.herokuapp.com/api/trainings/${id}`, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {
                        handleDeletetraining(id)
                        setMsg("Car delete succesfully")
                        openSnackbar();
                    }
                    else alert('Something went wrong!');
                })
                .catch(err => console.error(err))
        }
    }


    const columns = [
        {
            headerName: '', width: 100, field: 'links',
            cellRendererFramework: params =>
                <IconButton onClick={() => deletetraining(params.data.id)}>
                    <DeleteIcon fontSize="small" color="secondary" />
                </IconButton>
        },
        { field: 'activity', sortable: true },
        {
            headerName: 'Date', field: 'date',
            cellRenderer: (data) => {
                return moment(data.createdAt).format('DD.MM.YYYY HH:mm a')
            }
        },
        { field: 'duration', headerName: "Duration (min)", sortable: true },
        { field: 'customer.firstname', headerName: "Customer", sortable: true }
    ]

    function onGridReady(params) {
        setGridApi(params.api)
        setGridColumnApi(params.columnApi);
        params.api.sizeColumnsToFit();
    }


    return trainingInfo ? (
        <div className="ag-theme-alpine" style={{ height: '60vh', width: '90%', margin: 'auto', transform: 'translateY(20%)' }}>
            <AgGridReact
                style={{ width: '100%', height: '100%;' }}
                onGridReady={onGridReady}
                rowHeight={60}
                rowData={trainingInfo}
                columnDefs={columns}
                pagination={true}
                paginationPageSize={6}
                suppressCellSelection={true}
            />
            <Snackbar
                open={open}
                autoHideDuration={2000}
                message={msg}
                onClose={closeSnackbar}
            />
        </div>
    ) : 'loading'
}

export default Tranning

import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../DataContext'
import axios from "axios"

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

function Tranning() {
    const [{ trainingInfo }, dispatch] = useContext(DataContext);
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);

    useEffect(() => {
        const getTrainning = async () => {
            const { data } = await axios
                .get('https://customerrest.herokuapp.com/gettrainings')
            dispatch({
                type: 'SET_TRAINNING_INFO',
                trainingInfo: data
            })
        }
        getTrainning()
    }, [])

    const updateTrainningInfo = (deleleElement) => {
        dispatch({
            type: "DELETE_TRAINNING_INFO",
            id: deleleElement
        })
    }

    const deleteItem = (id) => {
        if (window.confirm('Do you want to delete this tranning?')) {
            fetch(`https://customerrest.herokuapp.com/api/trainings/${id}`, { method: 'DELETE' })
                .then(response => {
                    if (response.ok) {
                        updateTrainningInfo(id)
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
                <IconButton onClick={() => deleteItem(params.data.id)}>
                    <DeleteIcon fontSize="small" />
                </IconButton>
        },
        { field: 'activity', sortable: true },
        { field: 'date', sortable: true },
        { field: 'duration', headerName: "Duration (min)", sortable: true },
        { field: 'customer.firstname', headerName: "Customer", sortable: true }
    ]

    function onGridReady(params) {
        setGridApi(params.api)
        setGridColumnApi(params.columnApi);
        params.api.sizeColumnsToFit();
    }
    return trainingInfo ? (
        <div className="ag-theme-alpine" style={{ height: '500px', width: '90%', margin: 'auto' }}>
            <AgGridReact
                style={{ width: '100%', height: '100%;' }}
                onGridReady={onGridReady}
                rowData={trainingInfo}
                columnDefs={columns}
                pagination={true}
                paginationPageSize={8}
                suppressCellSelection={true}
            />
        </div>
    ) : 'loading'
}

export default Tranning

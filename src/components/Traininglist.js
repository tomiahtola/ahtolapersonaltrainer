import React, { useState, useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import moment from 'moment'

import EditTraining from './EditTraining';

function Traininglist () {
    const [training, setTraining] = useState([]);
    const [open, setOpen] = useState(false);
    const gridRef = useRef();
    const [message, setMessage] = useState('');

    useEffect(() => {
        getTraining();
    }, [])
    const columns = [
        { headerName: 'Date',
            field: 'date',
            valueFormatter: function (params) {
                return moment(params.value).utc().format('DD.MM.YYYY');
            },
            sortable:true,
            filter:true
        },
        { headerName: 'Activity', field: 'activity', sortable:true, filter:true },
        { headerName: 'Duration', field: 'duration', sortable:true, filter:true },
        {
        headerName: 'Customer',
        valueGetter: function customerName(params) {
            return params.data.customer.firstname +" "+ params.data.customer.lastname;
        },
        sortable:true, filter:true
        },
        {
            headerName: '',
            field: 'links.rel.self.href', 
            cellRendererFramework: params =><EditTraining updateTraining={updateTraining} params={params}/>
        },
        {
            headerName: '',
            field: 'params.id', 
            cellRendererFramework: params =>
            <Button color="secondary" size="small" onClick={() => deleteTraining(params.value)}>Delete</Button>
        },
    ]

    function getTraining() {
        fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(response => response.json())
            .then(data => setTraining(data))
            .catch(err => console.log(err));
    }

    const deleteTraining = (link) => {
        if(window.confirm('Are you sure you want to delete?')){
            fetch(link, {
                method: 'DELETE'
            })
            .then(_ => getTraining())
            .then(_ => setMessage('Training deleted!'))
            .then(_ => setOpen(true))
            .catch(err => console.error(err))
        }  
    }
    const updateTraining = (link, training) => {
        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-type' : 'application/json'
            },
            body: JSON.stringify(training)
        })
        .then(_ => getTraining())
        .then(_ => setMessage('Training updated!'))
        .then(_ => setOpen(true))
        .catch(err => console.error(err))    
    }
    const handleClose = (event, reason) => {
        setOpen(false);
      };

    return (
        <div>
            <div className="ag-theme-material" style={{height: '700px', width: '95%', margin: 'auto'}}>
                <AgGridReact
                    ref={gridRef}
                    onGridReady={params =>{
                        gridRef.current = params.api
                        params.api.sizeColumnsToFit();
                    }}
                    columnDefs={columns}
                    suppressCellSelection={true}
                    rowData={training}
                    resizable={true}
                    pagination={true}
                    paginationPageSize={10}>
                      
                </AgGridReact>
                <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    onClose={handleClose}
                    message={message}
                ></Snackbar>
            </div>
        </div>
    )
}
export default Traininglist;
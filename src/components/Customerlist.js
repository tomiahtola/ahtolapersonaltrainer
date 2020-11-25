import React, { useState, useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import FitnessCenterRoundedIcon from '@material-ui/icons/FitnessCenterRounded';

import Traininglist from './Traininglist';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import AddTraining from './AddTraining';

function Customerlist () {
    const [customer, setCustomer] = useState([]);
    const [open, setOpen] = useState(false);
    const gridRef = useRef();
    const [message, setMessage] = useState('');

    useEffect(() => {
        getCustomers();
    }, [])

    const columns = [
        { headerName: '',
            field: 'links.2.href',
            cellRendererFramework: params => <AddTraining addTraining={addTraining} params={params}/>
        },
        { headerName: 'First name', field: 'firstname', sortable:true, filter:true },
        { headerName: 'Last name', field: 'lastname', sortable:true, filter:true },
        { headerName: 'Street Address', field: 'streetaddress', sortable:true, filter:true },
        { headerName: 'Postcode', field: 'postcode', sortable:true, filter:true },
        { headerName: 'City', field: 'city', sortable:true, filter:true },
        { headerName: 'Email', field: 'email', sortable:true, filter:true },
        { headerName: 'Phone', field: 'phone', sortable:true, filter:true },
        {
            headerName: '',
            field: 'links.0.href', 
            cellRendererFramework: params => <EditCustomer updateCustomer={updateCustomer} params={params}/>
        },
        {
            headerName: '',
            field: 'links.0.href', 
            cellRendererFramework: params =>
            <Button color="secondary" size="small" onClick={() => deleteCustomer(params.value)}>Delete</Button>
        },

    ]

    function getCustomers() {
        fetch('https://customerrest.herokuapp.com/api/customers')
            .then(response => response.json())
            .then(data => setCustomer(data.content))
            .catch(err => console.log(err));
    }
    const deleteCustomer = (link) => {
        if(window.confirm('Are you sure you want to delete?')){
            fetch(link, {
                method: 'DELETE'
            })
            .then(_ => getCustomers())
            .then(_ => setMessage('Customer deleted!'))
            .then(_ => setOpen(true))
            .catch(err => console.error(err))
        }  
    }

    const addCustomer = (newCustomer) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST',
            headers:{'Content-type' : 'application/json'},
            body: JSON.stringify(newCustomer)
        })
        .then(_ => getCustomers())
        .then(_ => setMessage('Customer added!'))
        .then(_ => setOpen(true))
        .catch(err => console.error(err))
    }
    
    const addTraining = (newTraining) => {
        fetch('https://customerrest.herokuapp.com/api/trainings', {
            method: 'POST',
            headers:{'Content-type' : 'application/json'},
            body: JSON.stringify(newTraining)
        })
        .then(_ => setMessage('Training added!'))
        .then(_ => setOpen(true))
        .catch(err => console.error(err))
    }
    const updateCustomer = (link, customer) => {
        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-type' : 'application/json'
            },
            body: JSON.stringify(customer)
        })
        .then(_ => getCustomers())
        .then(_ => setMessage('Customer updated!'))
        .then(_ => setOpen(true))
        .catch(err => console.error(err))    
    }
    
    const handleClose = (event, reason) => {
        setOpen(false);
      };

    return (
        <div>
            <div>
               <AddCustomer addCustomer={addCustomer}/>
            </div>
            <div className="ag-theme-material" style={{height: '700px', width: '95%', margin: 'auto'}}>
                <AgGridReact
                    ref={gridRef}
                    onGridReady={params =>{
                        gridRef.current = params.api
                        params.api.sizeColumnsToFit();
                    }}
                    columnDefs={columns}
                    suppressCellSelection={true}
                    rowData={customer}
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
export default Customerlist;
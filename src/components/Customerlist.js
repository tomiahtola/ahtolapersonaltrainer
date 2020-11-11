import React, { useState, useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';

import Traininglist from './Traininglist';

function Customerlist () {
    const [customer, setCustomer] = useState([]);
    const [open, setOpen] = useState(false);
    const gridRef = useRef();
    const [message, setMessage] = useState('');

    useEffect(() => {
        getCustomers();
    }, [])

    const columns = [
        { headerName: 'First name', field: 'firstname', sortable:true, filter:true },
        { headerName: 'Last name', field: 'lastname', sortable:true, filter:true },
        { headerName: 'Street Address', field: 'streetaddress', sortable:true, filter:true },
        { headerName: 'Postcode', field: 'postcode', sortable:true, filter:true },
        { headerName: 'City', field: 'city', sortable:true, filter:true },
        { headerName: 'Email', field: 'email', sortable:true, filter:true },
        { headerName: 'Phone', field: 'phone', sortable:true, filter:true },
        { headerName: 'Training',
            field: 'links.rel.self.href',
            cellRendererFramework: params =>
            <Button color="secondary" size="small" onClick={() => Traininglist(params.value)}>Training</Button>
        },
    ]

    function getCustomers() {
        fetch('https://customerrest.herokuapp.com/api/customers')
            .then(response => response.json())
            .then(data => setCustomer(data.content))
            .catch(err => console.log(err));
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
                    rowData={customer}
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
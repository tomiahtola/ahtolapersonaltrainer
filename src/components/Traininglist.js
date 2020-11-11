import React, { useState, useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';

function Traininglist () {
    const [training, setTraining] = useState([]);
    const [open, setOpen] = useState(false);
    const gridRef = useRef();
    // const [message, setMessage] = useState('');
    const [searchTraining, setSearchTraining] = useState('');
    useEffect(() => {
        getTraining();
    }, [])

    const columns = [
        { headerName: 'Date', field: 'date', sortable:true, filter:true },
        { headerName: 'Duration', field: 'duration', sortable:true, filter:true },
        { headerName: 'Activity', field: 'activity', sortable:true, filter:true },
        { headerName: 'Customer', field: 'links.2.href', sortable:true, filter:true },
        {
            headerName: '',
            field: 'links.rel.self.href', 
            cellRendererFramework: params =>
            <Button color="secondary" size="small" >Delete</Button>
        },
    ]

    function getTraining() {
        fetch('https://customerrest.herokuapp.com/api/trainings')
            .then(response => response.json())
            .then(data => setTraining(data.content))
            .catch(err => console.log(err));
    }
    const inputChanged = (event) => {
        setSearchTraining({...searchTraining, [event.target.name]: event.target.value});
      }
    const handleClose = (event, reason) => {
        setOpen(false);
      };

    return (
        <div>
                <div>
                <h3>Search Training</h3>
                <Input name="searchTraining" type="text" onChange={inputChanged}></Input>
                <IconButton aria-label="search">
                <SearchIcon />
                </IconButton>
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
                    rowData={training}
                    pagination={true}
                    paginationPageSize={10}>
                </AgGridReact>
                <Snackbar
                    open={open}
                    autoHideDuration={3000}
                    onClose={handleClose}
                    // message={message}
                ></Snackbar>
            </div>
        </div>
    )
}
export default Traininglist;
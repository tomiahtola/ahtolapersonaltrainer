import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

function AddCustomer(props) {
    const [open, setOpen] = useState(false);
    const [customer, setCustomer] = useState({
        firstname: '',
        lastname: '',
        address: '',
        postcode: '',
        city: '',
        email: '',
        phone: ''
    });

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleSave = () => {
        props.AddCustomer(customer)
        handleClose();
    }

    const inputChanged = (event) => {
        event.preventDefault();
        setCustomer({...customer, [event.target.name]: event.target.value})
    }

    return(
        <div>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
            Add Customer
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">New Customer</DialogTitle>
            <DialogContent>
            <TextField
                autoFocus
                name="firstname"
                value={customer.firstname}
                onChange={inputChanged}
                margin="dense"
                label="Brand"
                fullWidth
            />
            <TextField
                name="lastname"
                value={customer.lastname}
                onChange={inputChanged}
                margin="dense"
                label="Model"
                fullWidth
            />
            <TextField
                name="address"
                value={customer.address}
                onChange={inputChanged}
                margin="dense"
                label="Color"
                fullWidth
            />
            <TextField
                name="postcode"
                value={customer.postcode}
                onChange={inputChanged}
                margin="dense"
                label="Fuel"
                fullWidth
            />
            <TextField
                name="city"
                value={customer.city}
                onChange={inputChanged}
                margin="dense"
                label="Price"
                fullWidth
            />
            <TextField
                name="email"
                value={customer.email}
                onChange={inputChanged}
                margin="dense"
                label="Year"
                fullWidth
            />
            <TextField
                name="phone"
                value={customer.phone}
                onChange={inputChanged}
                margin="dense"
                label="Year"
                fullWidth
            />
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} color="primary">
                Cancel
            </Button>
            <Button onClick={handleSave} color="primary">
                Save
            </Button>
            </DialogActions>
        </Dialog>
        </div>
    )
}
export default AddCustomer;
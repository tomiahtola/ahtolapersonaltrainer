import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

function EditCustomer(props) {
    const [open, setOpen] = useState(false);
    const [customer, setCustomer] = useState({
        firstname: '',
        lastname: '',
        streetaddress: '',
        postcode: '',
        city: '',
        email: '',
        phone: ''
    });

    const handleClickOpen = () => {
        setCustomer({
            firstname: props.params.data.firstname,
            lastname: props.params.data.lastname,
            streetaddress: props.params.data.streetaddress,
            postcode: props.params.data.postcode,
            city: props.params.data.city,
            email: props.params.data.email,
            phone: props.params.data.phone,
        })
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleSave = () => {
        props.updateCustomer(props.params.value, customer)
        handleClose();
    }

    const inputChanged = (event) => {
        event.preventDefault();
        setCustomer({...customer, [event.target.name]: event.target.value})
    }

    return(
        <div>
        <Button color="primary" onClick={handleClickOpen}>
            Edit
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Update Customer</DialogTitle>
            <DialogContent>
            <TextField
                autoFocus
                name="firstname"
                value={customer.firstname}
                onChange={inputChanged}
                margin="dense"
                label="firstname"
                fullWidth
            />
            <TextField
                name="lastname"
                value={customer.lastname}
                onChange={inputChanged}
                margin="dense"
                label="lastname"
                fullWidth
            />
            <TextField
                name="address"
                value={customer.streetaddress}
                onChange={inputChanged}
                margin="dense"
                label="streetaddress"
                fullWidth
            />
            <TextField
                name="postcode"
                value={customer.postcode}
                onChange={inputChanged}
                margin="dense"
                label="postcode"
                fullWidth
            />
            <TextField
                name="city"
                value={customer.city}
                onChange={inputChanged}
                margin="dense"
                label="city"
                fullWidth
            />
            <TextField
                name="email"
                value={customer.email}
                onChange={inputChanged}
                margin="dense"
                label="email"
                fullWidth
            />
            <TextField
                name="phone"
                value={customer.phone}
                onChange={inputChanged}
                margin="dense"
                label="phone"
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
export default EditCustomer;
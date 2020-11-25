import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import moment from 'moment'
import IconButton from '@material-ui/core/IconButton';
import FitnessCenterRoundedIcon from '@material-ui/icons/FitnessCenterRounded';

function AddTraining(props) {
    const [open, setOpen] = useState(false);
    const [training, setTraining] = useState({
        date: moment().toISOString(),
        activity: '',
        duration: '',
        customer: props.params.data.links[0].href,
    });

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleSave = () => {
        props.addTraining(training)
        handleClose();
    }

    const inputChanged = (event) => {
        event.preventDefault();
        setTraining({...training, [event.target.name]: event.target.value})
    }

    return(
        <div>
        <IconButton onClick={handleClickOpen}>
        <FitnessCenterRoundedIcon/>
        </IconButton>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">New training</DialogTitle>
            <DialogContent>
            <TextField
                autoFocus
                name="date"
                value={training.date}
                onChange={inputChanged}
                margin="dense"
                label="date"
                fullWidth
            />
            <TextField
                name="activity"
                value={training.activity}
                onChange={inputChanged}
                margin="dense"
                label="activity"
                fullWidth
            />
            <TextField
                name="duration"
                value={training.duration}
                onChange={inputChanged}
                margin="dense"
                label="duration"
                fullWidth
            />
            <TextField
                name="customer"
                value={training.customer}
                onChange={inputChanged}
                margin="dense"
                label="customer"
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
export default AddTraining;
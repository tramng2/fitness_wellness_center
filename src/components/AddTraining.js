import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

function AddTraining({ saveNewtraining, customerInfo }) {
    const [open, setOpen] = useState(false);
    const [newTrainingInfo, setNewTrainingInfo] = useState({
        date: '',
        activity: '',
        duration: '',
        customer: ''
    });


    const handleClickOpen = () => {
        setOpen(true);
        setNewTrainingInfo({ ...newTrainingInfo, customer: customerInfo.links[0].href })
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (e) => {
        setNewTrainingInfo({ ...newTrainingInfo, [e.target.name]: e.target.name === 'name'? e.target.value.moment().toISOString() : e.target.value })
    }

    const handleAddNewtraining = () => {
        if (newTrainingInfo.date && newTrainingInfo.activity && newTrainingInfo.duration) {
            saveNewtraining(newTrainingInfo);
            handleClose()
        } else alert ("Input is invalid. Please fill all.")
    }


    return (
        <div>
            <Button 
            size="small" 
            variant="outlined" 
            onClick={handleClickOpen} 
            startIcon={<AddCircleOutlineIcon />}
            style={{fontSize: '0.8rem', textTransform: 'capitalize'}}
            >
                Add training
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">
                    New training for {customerInfo.firstname} {customerInfo.lastname}
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        required="true"
                        margin="dense"
                        name="activity"
                        value={newTrainingInfo.activity}
                        onChange={e => handleInputChange(e)}
                        label="Activity"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="date"
                        type="datetime-local"
                        value={newTrainingInfo.date}
                        onChange={e => handleInputChange(e)}
                        label="Date"
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                          }}
                    />
                    <TextField
                        margin="dense"
                        name="duration"
                        type="number"
                        value={newTrainingInfo.duration}
                        onChange={e => handleInputChange(e)}
                        label="Duration"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary"> Cancel </Button>
                    <Button onClick={handleAddNewtraining} color="primary"> Save </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default AddTraining

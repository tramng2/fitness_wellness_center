import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

function EditCustomer({ customerInfo, editCustomerInfo, urlEdit }) {
    const [url] = urlEdit;
    const [open, setOpen] = useState(false);
    const [newCustomerInfo, setNewCustomerInfo] = useState({
        firstname: '',
        lastname: '',
        streetaddress: '',
        postcode: '',
        city: '',
        phone: ''
    });

    const handleClickOpen = () => {
        setOpen(true);
        setNewCustomerInfo({
            firstname: customerInfo.firstname,
            lastname: customerInfo.lastname,
            streetaddress: customerInfo.streetaddress,
            postcode: customerInfo.postcode,
            city: customerInfo.city,
            phone: customerInfo.phone
        })
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInputChange = (e) => {
        setNewCustomerInfo({ ...newCustomerInfo, [e.target.name]: e.target.value })
    }

    const handleSave = () => {
        editCustomerInfo(url.href, newCustomerInfo)
        handleClose()
    }


    return (
        <div>
            <IconButton color="primary" onClick={handleClickOpen}>
                <EditIcon />
            </IconButton>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">New Customer</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="firstname"
                        value={newCustomerInfo.firstname}
                        onChange={e => handleInputChange(e)}
                        label="First Name"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="lastname"
                        value={newCustomerInfo.lastname}
                        onChange={e => handleInputChange(e)}
                        label="Last Name"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="streetaddress"
                        value={newCustomerInfo.streetaddress}
                        onChange={e => handleInputChange(e)}
                        label="Address"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="postcode"
                        value={newCustomerInfo.postcode}
                        onChange={e => handleInputChange(e)}
                        label="Post Code"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="city"
                        value={newCustomerInfo.city}
                        onChange={e => handleInputChange(e)}
                        label="City"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        name="phone"
                        value={newCustomerInfo.phone}
                        onChange={e => handleInputChange(e)}
                        label="Phone"
                        fullWidth
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary"> Cancel </Button>
                    <Button onClick={handleSave} color="primary"> Save </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default EditCustomer

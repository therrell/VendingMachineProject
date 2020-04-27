import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import TextField from '@material-ui/core/TextField';
import TrashIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import IconButton from '@material-ui/core/IconButton';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    outline: 'none',
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function EditModal(props) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit= () => {
    // props.data : data in row.
    // props.deleteItem: function that does post stuff.
    // props.oldData
    // props.newData
    props.deleteItem(props.data)
    props.addItem(props.newProduct, props.newProName, props.newProType, props.newPrice)
    setOpen(false);
  };
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title" align="center">Update Product</h2>
      <p id="simple-modal-description">
      <TextField
          name="editpro"
          value={props.newProduct}
          onChange={props.handleChange}
          label={"ID" , props.data}
          fullWidth
          />
          <TextField
              name="name"
              value={props.newProName}
              onChange={props.handleChange_proName}
              label="Name eg: Coke Zero"
              fullWidth
              />
          <TextField
              name="type"
              value={props.newProType}
              onChange={props.handleChange_proType}
              label="Type DR/FO"
              fullWidth
              />
          <TextField
              name="price"
              value={props.newPrice}
              onChange={props.handleChange_proPrice}
              label="Price eg: 2.25"
              fullWidth
              />
      </p>
      <Button type="button"
      variant="outlined"
      color="primary"
      onClick={handleEdit}
      startIcon={<ArrowUpwardIcon/>}>
      Edit and Submit
      </Button>

      <Button type="button"
      variant="outlined"
      color="primary"
      onClick={handleClose}
      startIcon={<CloseIcon />}>
      Cancel
      </Button>

    </div>
  );

  return (
    <div>
    <IconButton onClick={handleOpen}>
    <EditIcon/>
    </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import TextField from '@material-ui/core/TextField';

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
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


export default function AddProductModal(props) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd= () => {
    props.addItem(props.newProduct, props.newProName, props.newProType, props.newPrice)
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title" align="center">New Product</h2>
      <p id="simple-modal-description">
      <TextField
          name="product"
          value={props.newProduct}
          onChange={props.handleChange}
          label="ID eg: 1"
          fullWidth
          />
        <TextField
            name="proname"
            value={props.newProName}
            onChange={props.handleChange_proName}
            label="Name eg: Monster Blue"
            fullWidth
              />
        <TextField
            name="protype"
            value={props.newProType}
            onChange={props.handleChange_proType}
            label="Type: DR/FO"
            fullWidth
              />
        <TextField
            name="proprice"
            value={props.newPrice}
            onChange={props.handleChange_proPrice}
            label="Price eg: 2.25"
            fullWidth
            />
      </p>
      <Button type="button"
      variant="outlined"
      color="primary"
      startIcon={<ArrowUpwardIcon/>}
      onClick={handleAdd}>
      Submit
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
      <Button type="button"
       variant="outlined"
       color="primary"
       startIcon={<AddIcon />}
       onClick={handleOpen}>
        Add Product
      </Button>
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

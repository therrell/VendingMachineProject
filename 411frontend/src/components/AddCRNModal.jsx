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
    backgroundColor: theme.palette.background.default,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));


export default function AddCRNModal(props) {
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
    // props.data : data in textfield.
    // props.addItem: function that does post stuff.
    //let data = this.state.crn;
    // console.log(props.addItem)
    props.addItem(props.newName)
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title" align="center">New CRN</h2>
      <p id="simple-modal-description">
      <TextField
          name="crn"
          value={props.newName}
          onChange={props.handleChange}
          label="eg: 42091"
          fullWidth
          //onChange={(e) => {handleChange(e)}}
          //onChange={this.textChange}
          />
      </p>
      <Button type="button"
      variant="outlined"
      color="primary"
      onClick={handleAdd}
      startIcon={<ArrowUpwardIcon/>}>
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
        Add CRN
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

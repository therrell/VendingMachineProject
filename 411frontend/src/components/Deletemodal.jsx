import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import TextField from '@material-ui/core/TextField';
import TrashIcon from '@material-ui/icons/Delete';
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
    backgroundColor: theme.palette.error.light,
    border: '2px solid #000',
    outline: 'none',
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function Deletemodal(props) {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete= () => {
    // props.data : data in row.
    // props.deleteItem: function that does post stuff.
    // props.oldData
    // props.newData
    props.deleteItem(props.data)
    setOpen(false);
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title" align="center">Are you sure you want to delete this?</h2>
      <Button type="button"
      variant="outlined"
      startIcon={<CheckIcon/>}
      onClick={handleDelete}>
      Yes
      </Button>

      <Button type="button"
      variant="outlined"
      onClick={handleClose}
      startIcon={<CloseIcon />}>
      No
      </Button>

    </div>
  );

  return (
    <div>
    <IconButton onClick={handleOpen}>
    <TrashIcon/>
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

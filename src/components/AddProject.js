import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

function AddProject(props) {
  const [open, setOpen] = useState(false);
  const [project, setProject] = useState({
    name: '',
    description: ''
  });

  // Open the modal form
  const handleClickOpen = () => {
    setOpen(true);
  };
    
  // Close the modal form 
  const handleClose = () => {
    setOpen(false);
  };
  
  const handleChange = (event) => {
    setProject({...project, [event.target.name]: event.target.value});
  }

  // Save project and close modal form 
  const handleSave = () => {
    props.addProject(project);
    handleClose();
  }
  
  return(
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        New Project
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New project</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
              <TextField label="Name" name="name" autoFocus
                variant="standard" value={project.name} 
                onChange={handleChange}/>
              <TextField label="Description" name="description" 
                variant="standard" value={project.description} 
                onChange={handleChange}/>
            </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>            
    </div>
  );
}

export default AddProject;

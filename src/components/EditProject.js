import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

function EditProject(props) {
  const [open, setOpen] = useState(false);
  const [project, setProject] = useState({
    name: '', description: ''
  });
    
  // Open the modal form and update the project state
  const handleClickOpen = () => {
    setProject({
      name: props.data.row.name,
      description: props.data.row.description
    })      
    setOpen(true);
  }
  
  // Close the modal form 
  const handleClose = () => {
    setOpen(false);
  };
  
  const handleChange = (event) => {
    setProject({...project, 
      [event.target.name]: event.target.value});
  }

  // Update project and close modal form 
  const handleSave = () => {
    props.updateProject(project, props.data.id);
    handleClose();
  }
 
  return(
    <div>
      <IconButton onClick={handleClickOpen}>
          <EditIcon color="primary" />
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit project</DialogTitle>
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

export default EditProject;
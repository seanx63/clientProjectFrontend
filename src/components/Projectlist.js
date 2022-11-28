import React, { useEffect, useState } from 'react';
import { SERVER_URL } from '../constants.js'
import { 
  DataGrid, 
  GridToolbarContainer, 
  GridToolbarExport, 
  gridClasses } from '@mui/x-data-grid';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import AddProject from './AddProject.js';
import EditProject from './EditProject.js';

function CustomToolbar() {
  return (
    <GridToolbarContainer 
      className={gridClasses.toolbarContainer}>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

function Projectlist() {
  const [projects, setProjects] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = () => {
    // Read the token from the session storage
    // and include it to Authorization header 
    const token = sessionStorage.getItem("jwt"); 

    fetch(SERVER_URL + 'api/projects', {
      headers: { 'Authorization' : token }
    })
    .then(response => response.json())
    .then(data => setProjects(data._embedded.projects))
    .catch(err => console.error(err));    
  }
  
  const onDelClick = (url) => {
    if (window.confirm("Are you sure to delete?")) {
      const token = sessionStorage.getItem("jwt"); 

      fetch(url, {
        method:  'DELETE', 
        headers: { 'Authorization' : token }
      })
      .then(response => { 
        if (response.ok) {
          fetchProjects();
          setOpen(true);
        }
        else {
          alert('Something went wrsong!');
        }  
      })
      .catch(err => console.error(err))
    }
  }

  // Add a new project 
  const addProject = (project) => {
    const token = sessionStorage.getItem("jwt"); 

    fetch(SERVER_URL  +  'api/projects',
      { method: 'POST', headers: {
        'Content-Type':'application/json',
        'Authorization' : token
      },
      body: JSON.stringify(project)
    })
    .then(response => {
      if (response.ok) {
        fetchProjects();
      }
      else {
        alert('Something went wrong!');
      }
    })
    .catch(err => console.error(err))
  }
  
  // Update project 
  const updateProject = (project, link) => {
    const token = sessionStorage.getItem("jwt"); 

    fetch(link,
      { 
        method: 'PUT', 
        headers: {
        'Content-Type':'application/json',
        'Authorization' : token
      },
      body: JSON.stringify(project)
    })
    .then(response => {
      if (response.ok) {
        fetchProjects();
      }
      else {
        alert('Something went wrong!');
      }
    })
    .catch(err => console.error(err))
  }

  const columns = [
    {field: 'name', headerName: 'Name', width: 200},
    {field: 'description', headerName: 'Description', width: 200},
    {
      field: '_links.project.href', 
      headerName: '', 
      sortable: false,
      filterable: false,
      renderCell: row => 
        <EditProject 
          data={row} 
          updateProject={updateProject} />
    },  
    {
      field: '_links.self.href', 
      headerName: '', 
      sortable: false,
      filterable: false,
      renderCell: row => 
        <IconButton onClick={() => onDelClick(row.id)}>
          <DeleteIcon color="error" />
        </IconButton>
    }  
  ];
  
  return(
    <React.Fragment>
      <Stack mt={2} mb={2}>
        <AddProject addProject={addProject} />
      </Stack>
      <div style={{ height: 500, width: '100%' }}>
        <DataGrid 
          rows={projects} 
          columns={columns} 
          disableSelectionOnClick={true}
          components={{ Toolbar: CustomToolbar }}
          getRowId={row => row._links.self.href}/>
        <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={() => setOpen(false)}
          message="Project deleted"
        />
      </div>
    </React.Fragment>
  );

}

export default Projectlist;

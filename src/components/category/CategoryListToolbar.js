import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    InputAdornment,
    SvgIcon,
    
  } from '@material-ui/core';
  import { Search as SearchIcon } from 'react-feather';
  import * as React from 'react';
  import CategoryDialog from './CategoryDialog';
 
  
  
  const CategoryListToolbar = ({incrementCounter, ...rest}) => {
    const [open, setOpen] = React.useState(false);
    const [snackopen,setSnackOpen] = React.useState(false);
  const handleSnackOpen = () =>{
    setSnackOpen(true);
  }

    
    
  
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
   
    return (
      <Box >
          <CategoryDialog handleSnackOpen={handleSnackOpen} incrementCounter={incrementCounter} onClose={handleClose} open={open}/>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end'
          }}
        >
          <Button
            onClick={handleClickOpen}
            color="primary"
            variant="contained"
          >
            Add Category
        </Button>
        </Box>
        <Box sx={{ mt: 3 }}>
          <Card>
            <CardContent>
              <Box sx={{ maxWidth: 500 }}>
                <TextField
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SvgIcon
                          fontSize="small"
                          color="action"
                        >
                          <SearchIcon />
                        </SvgIcon>
                      </InputAdornment>
                    )
                  }}
                  placeholder="Search question"
                  variant="outlined"
                />
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    );
  }
  
  export default CategoryListToolbar;
  
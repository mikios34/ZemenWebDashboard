import { useState} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {

  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  IconButton,
  Grid
} from '@material-ui/core';
import * as React from 'react';
import DeleteAlert from 'src/components/alertdialog/DeleteAlert';
import DeleteIcon from '@material-ui/icons/Delete';



const OrdersListResult = ({incrementCounter, orders, ...rest }) => {

  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);


  const [alertopen, setAlertOpen] = React.useState(false);
 
  const handleClickAlertOpen = () => {
    setAlertOpen(true);
  };
  const handleAlertClose = () => {
    setAlertOpen(false);
  };



  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const [prod,setProduct] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [id,setId] = React.useState(0);
  const [snackopen,setSnackOpen] = React.useState(false);
  const handleSnackOpen = () =>{
    setSnackOpen(true);
  }

  const handleClickOpen = (prod) => {
    setProduct(prod);
    setOpen(true);
  };
  

  

 




  const handleSelectAll = (event) => {
    let newSelectedCategoryIds;
    if (event.target.checked) {
      newSelectedCategoryIds = orders.map((category) => category.id);
    } else {
      newSelectedCategoryIds = [];
    }
    setSelectedCategoryIds(newSelectedCategoryIds);
    //setIsDisabled(true);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCategoryIds.indexOf(id);
    let newSelectedCategoryIds = [];

    if (selectedIndex === -1) {
      newSelectedCategoryIds = newSelectedCategoryIds.concat(selectedCategoryIds, id);
    } else if (selectedIndex === 0) {
      newSelectedCategoryIds = newSelectedCategoryIds.concat(selectedCategoryIds.slice(1));
    } else if (selectedIndex === selectedCategoryIds.length - 1) {
      newSelectedCategoryIds = newSelectedCategoryIds.concat(selectedCategoryIds.slice(0, -1));
    } else if (selectedIndex > 0) {
  
      newSelectedCategoryIds = newSelectedCategoryIds.concat(
        selectedCategoryIds.slice(0, selectedIndex),
        selectedCategoryIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCategoryIds(newSelectedCategoryIds);
   
  
  };
  
  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  

  

  return (
    <Card {...rest}>
    {alertopen && (<DeleteAlert handleSnackOpen={handleSnackOpen} id={selectedCategoryIds} open={alertopen} incrementCounter={incrementCounter} handleClose={handleAlertClose} endpoint="orders" />)}
    <Grid container justifyContent="right">
    <IconButton color="primary" disabled={selectedCategoryIds.length!==0?false:true} onClick={handleClickAlertOpen} 
    >
          <DeleteIcon />
    </IconButton>
    </Grid>


      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table
            
          >
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedCategoryIds.length === orders.length}
                    color="primary"
                    indeterminate={
                      selectedCategoryIds.length > 0
                      && selectedCategoryIds.length < orders.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell>
                <TableCell>
                  User
                </TableCell>
                <TableCell>
                  Items
                </TableCell>
                
                <TableCell>
                  Order date
                </TableCell>
               
              </TableRow>
            </TableHead>
            
            <TableBody>
              {orders.slice(page * limit, page * limit + limit).map((order) => (
                <TableRow
                  hover
                  key={order.id}
                  selected={selectedCategoryIds.indexOf(order.id) !== -1}
                  //onClick={()=>handleClickOpen(order)}
                >
                  
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedCategoryIds.indexOf(order.id) !== -1}
                      onChange={(event) => handleSelectOne(event, order.id)}
                      value="true"
                    />
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                   
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {order.attributes.users.data.attributes.username}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                   
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {
                        order.attributes.products.data.length}
                      </Typography>
                    </Box>
                  </TableCell>
            
                  <TableCell>
                    {moment(order.attributes.publishedAt).format('DD/MM/YYYY')}
                  </TableCell>
                </TableRow>
              ))}

              
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={orders.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
      
     
    </Card>
    
  );
};

OrdersListResult.propTypes = {
  orders: PropTypes.array.isRequired
};

export default OrdersListResult;

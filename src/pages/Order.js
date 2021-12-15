import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import { useState, useEffect } from 'react';
import axios from 'axios';
import OrdersListResult from 'src/components/Order/OrdersListResult';
import OrdersListToolbar from 'src/components/Order/OrdersListToolbar';

const Order = () => {
  
  const [state,setState] = useState({
    response:[],
  })

  const [counter, updateCounter] = useState(0);
  const incrementCounter = () => {
    updateCounter(counter + 1);
}
  useEffect(() => {
       axios.get(`${process.env.REACT_APP_BASE_URL}/orders?populate=users,products`,{
        //  headers:{
        //    authorization: `Bearer ${getToken()}`
        //  }
       }).then((res)=>{
     
        setState({...state , ['response']: res.data.data})

       })

  }, [counter])

  console.log(state.response)

 
  
  return(
  <>
    <Helmet>
      
      <title>Orders | Zemen</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <OrdersListToolbar />
        <Box sx={{ pt: 3 }}>
          <OrdersListResult incrementCounter={incrementCounter} orders={state.response} />
        </Box>
      </Container>
    </Box>
  </>);
}

export default Order;

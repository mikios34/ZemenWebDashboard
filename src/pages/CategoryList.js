import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid,
  Pagination,
  Tab
} from '@material-ui/core';
import {
  TabContext,
  TabList,
  TabPanel
} from '@mui/lab';
import * as React from 'react';

import CategoryListToolbar from 'src/components/category/CategoryListToolbar';
import CategoryListResults from 'src/components/category/CategoryListResult';
import ResourcesListToolbar from 'src/components/products/ProductsListToolbar';
import ResourcesListResults from 'src/components/products/ProductsListResult';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { getToken } from 'src/helper/helpers';

const CategoryList = () => {
  const [value, setValue] = React.useState('1');
  const [counter, updateCounter] = useState(0);
  const incrementCounter = () => {
    updateCounter(counter + 1);
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [state, setState] = useState({
    response: [],

  })
  const [examcat, setexamcat] = useState({
    response: [],

  })
  const [catresponse, setCatresponse] = useState({

    response: []
  })
  const [resourcesresponse, setResourcesresponse] = useState({
    response: []
  })
  useEffect(() => {
   
    axios.get(`${process.env.REACT_APP_BASE_URL}/categories`,
     
    ).then((res) => {
      const categories = []
      res.data.data.map((data) => {
        const entry = {
          value: data.id,
          label: data.attributes.name
        }
        categories.push(entry);
      });
      setCatresponse({ ...catresponse, ['response']: res.data.data })
      setexamcat({ ...examcat, ['response']: categories })
    })
   
  }, [counter])

  return (
    <>
      <Helmet>
        <title>Categories | Zemen</title>
      </Helmet>

      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        
          
        <Container maxWidth={false}>

            <CategoryListToolbar incrementCounter={incrementCounter} />
            <Box sx={{ pt: 3 }}>
            <CategoryListResults incrementCounter={incrementCounter} categories={catresponse.response} />

            </Box>
            </Container>
         
      </Box>


    </>
  );
}
export default CategoryList;

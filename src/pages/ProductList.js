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

const ProductList = () => {
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
    axios.get(`${process.env.REACT_APP_BASE_URL}/products?populate=categories`,
      
        // headers: {
        //   authorization: `Bearer ${getToken()}`
        // }
      ).then((res) => {
        console.log(res.data.data.attributes);
        setResourcesresponse({ ...resourcesresponse, ['response']: res.data.data })
      })
  }, [counter])

  return (
    <>
      <Helmet>
        <title>Products | Zemen</title>
      </Helmet>

      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example" centered>
            <Tab label="Additional Resources" value="1" />
              <Tab label="Categories" value="2" />
            </TabList>
          </Box>
         
         
          <TabPanel value="1">
            <ResourcesListToolbar incrementCounter={incrementCounter} category={examcat.response} />
            <Box sx={{ pt: 3 }}>

            <ResourcesListResults incrementCounter={incrementCounter} category={examcat.response} resources={resourcesresponse.response} />
            </Box>
          </TabPanel>
          <TabPanel value="2">
            <CategoryListToolbar incrementCounter={incrementCounter} />
            <CategoryListResults incrementCounter={incrementCounter} categories={catresponse.response} />
          </TabPanel>
        </TabContext>
      </Box>


    </>
  );
}
export default ProductList;

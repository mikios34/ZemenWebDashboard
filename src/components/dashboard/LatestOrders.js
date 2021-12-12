import moment from 'moment';
import { v4 as uuid } from 'uuid';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { useNavigate } from 'react-router-dom';



const LatestOrders = ({ customers }) => {
  const navigate = useNavigate();
  const nav = ()=>{
    navigate('/app/customers')
  }
  return (

    <Card >
      <CardHeader title="Latest Products" />
      <Divider />
      <PerfectScrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Title
              </TableCell>
                <TableCell>
                  Price
              </TableCell>
                <TableCell>
                Created At
              </TableCell>
                <TableCell>
                  Description
              </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.map((customer) => (
                <TableRow
                  hover
                  key={customer.id}
                >
                  <TableCell>
                    {customer.attributes.title}
                  </TableCell>
                  <TableCell>
                    {customer.attributes.price}
                  </TableCell>
                  <TableCell>
                    {moment(customer.published_at).format('DD/MM/YYYY')}
                  </TableCell>
                  <TableCell>
                    {customer.attributes.description}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 2
        }}
      >
        <Button
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
          onClick={nav}
        >
          View all
      </Button>
      </Box>
    </Card>
  );
}
export default LatestOrders;

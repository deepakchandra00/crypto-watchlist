import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import SearchBox from './searchBox';
import { Grid } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function WatchlistDetail(props) {

  const [modalData, setModalData] = React.useState(props?.modalData?.watchlist)

  const [value, setValue] = React.useState("")

  const [coin, setCoin] = React.useState([])

  console.log(coin)

  const searchForCoin = ((context) => {
    axios({
      method: "GET",
      url: `https://api.coingecko.com/api/v3/coins/${context}`,
    })
      .then((resp) => {
        console.log(resp)
        setCoin([{ _id: resp.data?.id, name: resp.data.name.toLowerCase(), symbol: resp.data.symbol.toUpperCase(), image: resp.data.image.small, price: resp.data.market_data.current_price.usd.toFixed(2) }])
      })
      .catch(() => {
        console.error();
      });
  })
  
  const handleChange = ((event) => {
    setValue(event.target.value)
    console.log(event.target.value)
  })

  const handleSearch = (() => {
    searchForCoin(value)
  })

  React.useEffect(() => {
    setModalData(props?.modalData?.watchlist)
  }, [props?.modalData])
  
  console.log(modalData)

  const removeMe = index => setModalData(modalData.filter((_, i) => i !== index))
  const addSymbol = (() => {
    console.log(modalData.filter((x)=>x._id.includes(coin[0]?._id)).length, coin[0]._id)
    if (!modalData.filter((x)=>x._id.includes(coin[0]?._id)).length > 0 ) {
      setModalData([...modalData, ...coin])
    }
    
  })
  return (
    <div>
      <Dialog
        fullScreen
        open={props?.open}
        onClose={props?.handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={props?.handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {props?.modalData?.Watchlist_name}
            </Typography>
          </Toolbar>
        </AppBar>
        <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell> Image</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Symbol</TableCell>
                <TableCell align="right">Price ($USD)</TableCell>
                <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {modalData?.map((row, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <img src={row?.image} />
              </TableCell>
              <TableCell align="right">{row?.name}</TableCell>
              <TableCell align="right">{row?.symbol}</TableCell>
              <TableCell align="right">{row?.price}</TableCell>
              <TableCell align="right"><Button onClick={() => removeMe(index)}><CloseIcon /></Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
        </TableContainer>
        <Grid container>
        <Grid item xs={6}>
            <SearchBox handleSearch={handleSearch} handleChange={handleChange} value={value} />
          </Grid>
          <Grid item xs={6} align="center">
            {coin?.length > 0 && 
              <>
              {coin[0]?.name}
              <img src={coin[0]?.image} />

              <Button onClick={addSymbol}>Add Symbol</Button>
              </>
            }
          </Grid>
        </Grid>
        
      </Dialog>
    </div>
  );
}
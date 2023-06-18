import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from "react-redux";
import { fetchList } from "../store/watchSlice";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import WatchlistDetail from './watchlistDetail';

export default function Watchlist() {
  const dispatch = useDispatch();
  
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

    const { list, loading, error } = useSelector((state) => state.watches);
  
  const [watchList, setWatchList] = useState([])
  
  const [modalData, setModalData] = useState([])

  
    useEffect(() => {
      dispatch(fetchList());
    }, [dispatch]);

    useEffect(() => {
        setWatchList(list);
      }, [list]);

    console.log(list, loading, error)

    const removeMe = index => setModalData(modalData.filter((_, i) => i !== index))
    
    return (
      <>
        <WatchlistDetail removeMe={removeMe} modalData={modalData} open={open} handleClose={handleClose} />
        {loading && "loading"}
        {!loading &&
          <Box sx={{ flexGrow: 1 }}>
            <Typography align='center' m="75px" variant='h4'>Cryptocurrency Watchlist</Typography>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
              {watchList?.length > 0 && watchList.map((val, index) => (
                <Grid onClick={() => { setModalData(val); setOpen(true); }} className='watchList' item xs={2} sm={4} md={4} key={index}>
                  {val?.Watchlist_name}
                </Grid>
              ))}
            </Grid>
          </Box>
        }
        </>
        
    );
};


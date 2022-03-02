import React from 'react';
import { Masonry } from '@mui/lab';
import FeedItem from './FeedItem'
import { Box } from '@mui/material';
import { useMediaQuery } from '@material-ui/core/';

export default function Feed() {
  let columns = 1;
  if (useMediaQuery('(max-width:600px)')) columns = 1;
  if (useMediaQuery('(min-width:600px) and (max-width:900px)')) columns = 2;
  if (useMediaQuery('(min-width:900px) and (max-width:1200px)')) columns = 3;
  if (useMediaQuery('(min-width:1200px) and (max-width:1500px)')) columns = 4;

  return (
    <Box m={3}>
      <Masonry className="Feed" spacing={2} columns={columns}>
        <FeedItem />
        <FeedItem />
        <FeedItem />
        <FeedItem />
        <FeedItem />
        <FeedItem />
        <FeedItem />
        <FeedItem />
      </Masonry>
    </Box> 
  );
}

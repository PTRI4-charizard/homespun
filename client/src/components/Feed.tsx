import React from 'react';
import { Masonry } from '@mui/lab';
import FeedItem from './FeedItem';
import { Box } from '@mui/material';
import { useMediaQuery } from '@material-ui/core/';

import shoeImg from '../assets/nike_ispa_airmax720.png';
import shoeImg2 from '../assets/nike-brown-flow-2020-ispa-sneakers.png';
import carpentry from '../assets/carpentry.png';
import yoga from '../assets/GettyImages-938890492-becc3fc4757849bea672f148454943f9.png';
import shoe3 from '../assets/nike_full-ispa.png';
import coolIspa from '../assets/cool_ispa.png';
import eggs from '../assets/eggs.png';
import computerRepair from '../assets/computerRepair.png';

export default function Feed() {
	let columns = 1;
	if (useMediaQuery('(max-width:600px)')) columns = 1;
	if (useMediaQuery('(min-width:600px) and (max-width:900px)')) columns = 2;
	if (useMediaQuery('(min-width:900px) and (max-width:1200px)')) columns = 3;
	if (useMediaQuery('(min-width:1200px) and (max-width:1500px)')) columns = 4;

	// ['/asdf', '/asdf', '/asdf']
	const images = [
		shoeImg,
		shoeImg2,
		shoe3,
		coolIspa,
		carpentry,
		yoga,
		eggs,
		computerRepair,
	];
	// can make an arr of products to render forEach
	return (
		<Box m={3}>
			<Masonry className='Feed' spacing={2} columns={columns}>
				{images.map((img: string) => (
					<FeedItem img={img} />
				))}
			</Masonry>
		</Box>
	);
}

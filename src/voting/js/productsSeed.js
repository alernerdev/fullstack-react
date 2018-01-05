// this is needed for webpack to pull the images in
import aquaImg from '../images/products/image-aqua.png';
import roseImg from '../images/products/image-rose.png';
import steelImg from '../images/products/image-steel.png';
import yellowImg from '../images/products/image-yellow.png';

import danielImg from '../images/avatars/daniel.jpg';
import kristyImg from '../images/avatars/kristy.png';
import veronikaImg from '../images/avatars/veronika.jpg';
import mollyImg from '../images/avatars/molly.png';

window.ProductSeed = (function () {
	function generateVoteCount() {
		return Math.floor((Math.random() * 50) + 15);
	}

const products = [
    {
		id: 1,
		title: 'Yellow Pail',
		description: 'On-demand sand castle construction expertise.',
		url: '#',
		votes: generateVoteCount(),
		submitterAvatarUrl: danielImg,
		productImageUrl: aquaImg,
    },
    {
		id: 2,
		title: 'Supermajority: The Fantasy Congress League',
		description: 'Earn points when your favorite politicians pass legislation.',
		url: '#',
		votes: generateVoteCount(),
		submitterAvatarUrl: kristyImg,
		productImageUrl: roseImg,
    },
    {
		id: 3,
		title: 'Tinfoild: Tailored tinfoil hats',
		description: 'We already have your measurements and shipping address.',
		url: '#',
		votes: generateVoteCount(),
		submitterAvatarUrl: veronikaImg,
		productImageUrl: steelImg,
    },
    {
		id: 4,
		title: 'Haught or Naught',
		description: 'High-minded or absent-minded? You decide.',
		url: '#',
		votes: generateVoteCount(),
		submitterAvatarUrl: mollyImg,
		productImageUrl: yellowImg
    },
  ];

  return { products: products };
}());

import aquaImg from '../images/products/image-aqua.png';
import danielImg from '../images/avatars/daniel.jpg';

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
		submitterAvatarUrl: 'images/avatars/kristy.png',
		productImageUrl: 'images/products/image-rose.png',
    },
    {
		id: 3,
		title: 'Tinfoild: Tailored tinfoil hats',
		description: 'We already have your measurements and shipping address.',
		url: '#',
		votes: generateVoteCount(),
		submitterAvatarUrl: 'images/avatars/veronika.jpg',
		productImageUrl: 'images/products/image-steel.png',
    },
    {
		id: 4,
		title: 'Haught or Naught',
		description: 'High-minded or absent-minded? You decide.',
		url: '#',
		votes: generateVoteCount(),
		submitterAvatarUrl: 'images/avatars/molly.png',
		productImageUrl: 'images/products/image-yellow.png',
    },
  ];

  return { products: products };
}());

import React from 'react';
import ReactDOM from 'react-dom';
import './productsSeed';

/*global ProductSeed */
class ProductList extends React.Component {
	handleProductUpVote(productId) {
		console.log('product id is ' +productId);
	}

	render() {
		// get a sorted by votes new product list
		const products = ProductSeed.products.sort((a, b) => (
			b.votes - a.votes
		));

		// generate an array of react Product isntances
		const productComponents = products.map((product) => (
			/*need to generate unique key per list for react framework*/
			<Product
				key={'product-' + product.id}
				id={product.id}
				title={product.title}
				description={product.description}
				url={product.url}
				votes={product.votes}
				submitterAvatarUrl={product.submitterAvatarUrl}
				productImageUrl={product.productImageUrl}
				onVote={this.handleProductUpVote}
			/>
		));

		return (
			<div className='ui unstackable items'>
				{productComponents}
			</div>
		);
	}
 }

class Product extends React.Component {
	constructor(props) {
		super(props);

		// non-react functions need to e bound in es6
		this.handleUpVote = this.handleUpVote.bind(this);
	}

	handleUpVote() {
		this.props.onVote(this.props.id);
	}

	render() {
		return (
			<div className='item'>
				<div className='image'>
					<img src={this.props.productImageUrl}/>
				</div>
				<div className='middle aligned content'>
					<div className='header'>
						<a onClick={this.handleUpVote}>
							<i className='large caret up icon' />
						</a>
						{this.props.votes}
					</div>
					<div className='description'>
						<a href={this.props.url}>{this.props.title}</a>
						<p>{this.props.description}</p>
					</div>
					<div className='extra'>
						<span>Submitted by:</span>
						<img className='ui avatar image' src={this.props.submitterAvatarUrl}/>
					</div>
				</div>
			</div>
		);
	}
}

 ReactDOM.render(
	<ProductList />,
	document.getElementById('content')
);

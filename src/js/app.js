import React from 'react';
import ReactDOM from 'react-dom';
import './productsSeed';

class ProductList extends React.Component {
	render() {
		const product = Seed.products[0];
		return (
		<div className='ui unstackable items'>
			<Product
				id={product.id}
				title={product.title}
				description={product.description}
				url={product.url}
				votes={product.votes}
				submitterAvatarUrl={product.submitterAvatarUrl}
				productImageUrl={product.productImageUrl}
			/>
		</div>
		);
	}
 }

class Product extends React.Component {
	render() {
		console.log("image name " + this.props.productImageUrl);

	  return (
		<div className='item'>
		  <div className='image'>
			<img src={require("../images/products/image-aqua.png")} /> {/*this.props.productImageUrl*/}
		  </div>
		  <div className='middle aligned content'>
			<div className='header'>
			  <a>
				<i className='large caret up icon' />
			  </a>
			  {this.props.votes}
			</div>
			<div className='description'>
			  <a href={this.props.url}>
				{this.props.title}
			  </a>
			  <p>
				{this.props.description}
			  </p>
			</div>
			<div className='extra'>
			  <span>Submitted by:</span>
			  <img
				className='ui avatar image'
				src={this.props.submitterAvatarUrl}
			  />
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

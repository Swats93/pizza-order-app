import React from 'react';
import { connect } from 'react-redux';
import {css} from 'glamor';

import Header from 'container/Header';
import {storeCurrentSelection, changePizzaList} from 'modules/checkout';

class Checkout extends React.Component {
  componentWillMount() {
		if(this.props.selectedToppings.length > 0 || this.props.selectedSize != null) {
      this.props.dispatch(storeCurrentSelection(this.props.selectedToppings, this.props.selectedSize))
    }
	}
	
	removePizzaFromList(pizza) {
		const index = this.props.pizzas.indexOf(pizza);
		const pizzas = this.props.pizzas.slice(0, index).concat(this.props.pizzas.slice(index+1, this.props.pizzas.length))
		this.props.dispatch(changePizzaList(pizzas));
	}

  render() {
		if(this.props.pizzas.length > 0) {
			let total = 0;
			return (
				<div className="w-100 fl-ns cf">
				<Header />
					<div className="w-100 fl-ns cf">
						<div className="mw6 mt4 center pb2 bg-white" style={{boxShadow: 'rgba(0,0,0,0.5) 0px 0px 8px 0px'}}>
							<div className="pa4">
							<div className="overflow-auto">
								<table className="f6 w-100 mw8 center" cellspacing="0">
									<thead>
										<tr>
											<th className="fw6 bb b--black-20 tl pb3 pr3 bg-white">Bill Details</th>
										</tr>
									</thead>
									<tbody className="lh-copy">
										{this.props.pizzas.map((pizza, indx) => {
											const subtotal = +pizza.size.basePrice + pizza.toppings.reduce((price, {topping}) => {
												price = price + +topping.price;
												return price;
											}, 0);
											total = total + subtotal;
											const toppings = pizza.toppings.map((top) => top.topping.name).join(',');
											return (
												<div key={indx}>
													<tr>
														<td className="pv3 pr3">Size : {pizza.size.name}</td>
													</tr>
													<tr>
														<td className="pr3">Topping : {toppings}</td>
														<td className="pr3">Price : {subtotal.toFixed(3)}</td>
													</tr>
													<a className="f6 mt4 link dim br3 ph3 pointer pv2 mb2 dib white" onClick={() => this.removePizzaFromList(pizza)} style={{backgroundColor: '#095c91'}}>Delete</a>
													<hr />
												</div>
											)})}
										<tr>
											<td className="pv3 pr3">Total : $ {total.toFixed(3)}</td>
										</tr>
									</tbody>
								</table>
								<a className="f6 mt4 link dim br3 ph3 pointer pv2 mb2 dib white" onClick={() => this.props.history.push('/')} style={{backgroundColor: '#095c91'}}>Add More</a>
							</div>
						</div>
					</div>
				</div>
			</div>
			)
		} else {
			return (
				<div className="tc"> 
					<h2> Please go back and select pizza base and toppings </h2>
					<a className="f6 mt4 link dim br3 ph3 pointer pv2 mb2 dib white" onClick={() => this.props.history.push('/')} style={{backgroundColor: '#095c91'}}>Go back</a>
				</div>
			);
			}
		}
	}

const mapStateToProps = (state) => {
	return {
		selectedSize: state.size.selectedSize,
		selectedToppings: state.toppings.selectedToppings,
		pizzas: state.checkout.pizzas
	}
}

export default connect(mapStateToProps)(Checkout)
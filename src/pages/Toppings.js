import React from 'react';
import { connect } from 'react-redux';
import {css} from 'glamor';

import {pizz} from 'assets/images';
import {getToppings, setSelectedToppings, setToppingError} from 'modules/toppings';
import Header from 'container/Header';

class Toppings extends React.Component {

  componentWillMount() {
    if(!this.props.selectedSize) {
      this.props.history.push('/');
    } else {
      this.props.dispatch(getToppings(this.props.selectedSize.name));
    }
  }

  checkBoxChange(top, isAlreadyChecked) {
    if(isAlreadyChecked) {
      const index = this.props.selectedToppings.indexOf(top);
      const toppings = this.props.selectedToppings.slice(0, index).concat(this.props.selectedToppings.slice(index+1, this.props.selectedToppings.length))
      this.props.dispatch(setSelectedToppings(toppings));
      this.props.dispatch(setToppingError(null));
    } else {
      if(this.props.selectedToppings.length + 1 > this.props.toppings.maxToppings && this.props.toppings.maxToppings != null) {
        this.props.dispatch(setToppingError('More topping cannot be added.'))
      } else {
        const toppings = this.props.selectedToppings.concat(top);
        this.props.dispatch(setSelectedToppings(toppings));
      }
    }
  }

  render() {
    const toppings = this.props.toppings;
    const selectedSize = this.props.selectedSize;
    const selectedToppings = this.props.selectedToppings;
    const maxToppings = toppings.maxToppings === null ? 'You can select all if you want, we have made some default selection'
     : `This pizza base can have max selection of ${toppings.maxToppings} toppings`;
    if(toppings.length === 0) {
      return (
        <h1 className="tc"> Loading.... </h1>
      )
    }
    return (
      <div className="w-100 fl-ns cf">
        <Header />
        <div className="w-100 fl-ns cf" style={{}}>
          <div className="w-50 fl-ns pl4 pt2 mt3 pb2">
            <img
              src={pizz}
              {...css({height: "80%", width: "80%", align: "center"})}
              className="pl5"
            />
          </div>
          <div className="w-50 fl-ns pl4 pt5 mt3 pb2">
            <div className="f3 black b">Please select the toppings for {selectedSize.name} </div>
            <h3>{maxToppings}, You can change the default selection if you want.</h3>
            {toppings.toppings.map((top, indx) => {
              const selectedTopping = selectedToppings.filter((slecTop) => slecTop.topping.name === top.topping.name);
              return (
                <div key={indx}>
                  <input
                    name={top.topping.name}
                    type="checkbox"
                    checked={selectedTopping.length > 0}
                    onChange={(ev) => this.checkBoxChange(top, selectedTopping.length > 0)}
                    /> {top.topping.name} | Price : ${top.topping.price}
              </div>
              )
            })}
            <h3>{this.props.err}</h3>
            <a className="f6 mt4 link dim br3 ph3 pointer pv2 mb2 dib white" onClick={() => this.props.history.push('/checkout')} style={{backgroundColor: '#095c91'}}>Proceed to Checkout</a>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    err: state.toppings.err,
    toppings: state.toppings.toppings,
    selectedSize: state.size.selectedSize,
    selectedToppings: state.toppings.selectedToppings
  }
}

export default connect(
  mapStateToProps
)(Toppings);
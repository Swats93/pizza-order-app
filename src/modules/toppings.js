import {getPizzaToppings} from 'queries';

const initialState = {
  err: null,
  toppings: [],
  selectedToppings: [],
  pizzas: []
}

export const getToppings = (name) => {
  return dispatch => {
    getPizzaToppings(name).then(({data}) => {
      dispatch({
        type: 'toppings_fetch_success',
        payload: data.pizzaSizeByName
      });
    }).catch(({err}) => {
      dispatch({
        type: 'toppings_fetch_failed',
        payload: err
      });
    })
  }
}

export const setSelectedToppings = (toppings) => {
  return dispatch => {
    dispatch({
      type: 'set_toppings',
      payload: toppings
    });
  }
}

export const setToppingError = (error) => {
  return dispatch => {
    dispatch({
      type: 'set_topping_error',
      payload: error
    });
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'toppings_fetch_success':
      return {
        ...state, toppings: action.payload, selectedToppings: action.payload.toppings.filter((top) => top.defaultSelected)
      }

    case 'toppings_fetch_failed':
      return {
        ...state,
        err: action.payload
      }
    
    case 'set_toppings' : 
    return {
      ...state,
      selectedToppings: action.payload
    }
    
    case 'set_topping_error' : 
    return {
      ...state,
      err: action.payload
    }
    default:
      return state
  }
}
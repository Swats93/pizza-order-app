const initialState = {
  err: null,
  pizzas: []
}

export const storeCurrentSelection = (toppings, size) => {
  return dispatch => {
    dispatch({
      type: 'store_current_selection',
      payload: {
        toppings,
        size
      }
    });
  }
}

export const changePizzaList = (pizzas) => {
  return dispatch => {
    dispatch({
      type: 'change_pizza_list',
      payload: pizzas
    });
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'store_current_selection' : 
    return {
      ...state,
      pizzas: state.pizzas.concat(action.payload)
    }
    case 'change_pizza_list' : 
    return {
      ...state,
      pizzas: action.payload
    }
    default:
      return state
  }
}
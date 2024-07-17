const initialState = {
    groups: [],
  };
  
  const groupReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'ADD_GROUP':
        return {
          ...state,
          groups: [...state.groups, action.payload],
        };
      default:
        return state;
    }
  };
  
  export default groupReducer;
  
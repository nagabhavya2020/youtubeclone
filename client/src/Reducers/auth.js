const authReducer = (state = { data: null}, actions) => {
    switch (actions.type) {
      case 'AUTH':
        localStorage.setItem("Profile", JSON.stringify({ ...actions?.data }));
        return { ...state, data: actions?.data };
      case 'SIGNIN_SUCCESS':
        localStorage.setItem("Profile", JSON.stringify({ ...actions?.data }));
        return {...state, data:actions?.data};
     
        case 'REGISTER_SUCCESS':
          localStorage.setItem("Profile", JSON.stringify({ ...actions?.data }));
          return {...state, data:actions?.data};
          
      default:
        return state;
    }
  };
  export default authReducer;
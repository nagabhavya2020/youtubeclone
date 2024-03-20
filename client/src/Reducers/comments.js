const commentReducer = (state = { data: null }, action) => {
    switch (action.type) {
        case 'POST_COMMENT':
            return {
                ...state};          
        case 'EDIT_COMMENT':
            return {
                ...state,
                data: state.data? state.data.map(comment =>  comment._id === action.payload._id ? action.payload : comment) : []
            }          
              case 'DELETE_COMMENT':
                return {
                    ...state,
                    data: state.data? state.data.filter(comment =>  comment._id !== action.payload) : []
                }
        case "FETCH_ALL_COMMENTS":
            return { ...state, data: action.payload };

            case 'UPDATE_COMMENTS':
      return {
        ...state,
        data: state.data ? [...state.data, action.payload] : [action.payload],
      };
        default:
            return state;
    }
}

export default commentReducer;
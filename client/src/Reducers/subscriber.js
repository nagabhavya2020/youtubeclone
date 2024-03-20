const subscriberReducer = (state = {data:[]}, actions) => {
    switch (actions.type) {
        case 'UNSUBSCRIBE_VIDEOS':
            return { ...state, data: actions?.data };
          case 'SUBSCRIBE_VIDEOS':
            return { ...state, data: actions?.data };
            default:
            return state;
    }
}

export default subscriberReducer;

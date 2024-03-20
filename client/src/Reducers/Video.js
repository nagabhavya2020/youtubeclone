const videoReducer = (state = { data: null }, action) => {
    switch (action.type) {
        case 'POST_VIDEO':
            return { ...state };
            case 'UPDATE_LIKES':
                return {
                    ...state,
                    data: state.data.map((video) =>
                        video._id === action.payload ? { ...video, Like: video.Like + 1 } : video
                    ),
                };
            case 'DELETE_LIKES':
                return {
                    ...state,
                    data: state.data.map((video) =>
                        video._id === action.payload ? { ...video, Like: video.Like - 1 } : video
                    ),
                };
        case 'UPDATE_VIDEO_LIST':
            return { ...state, data: [...state.data, action.payload] };
        case 'POST_LIKE':
            return { ...state };
            case 'UPDATE_VIEWS':
                return {...state, data:state.data.map((video) => 
                    video._id === action.videoId ? {...video, Views:action.views} : video)};
            case 'FETCH_ALL_VIDEOS':
            return { ...state, data: action.payload };
        default:
            return state;
    }
}

export default videoReducer;

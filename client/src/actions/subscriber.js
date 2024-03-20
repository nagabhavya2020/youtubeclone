import * as api from "../api"

export const subscribe = (Subscribedata) => async(dispatch)=>{
    try{
        const {data}=await api.subscribe(Subscribedata)
        dispatch({type: 'SUBSCRIBE_VIDEOS',data});
    }
    catch(error){
        console.error(error);
        alert(error);
    }
}

export const unsubscribe = (unSubscribedata) => async(dispatch)=>{
    try{
        const {data}=await api.unsubscribe(unSubscribedata)
        dispatch({type: 'UNSUBSCRIBE_VIDEOS',data});
    }
    catch(error){
        console.error(error);

        alert(error);
    }
}

export const subscriptionStatus = async (subscriptionData) => {
    try {
      const { data } = await api.subscriptionStatus(subscriptionData);
      return data;
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

import * as api from '../api'
import { setCurrentUser } from './currentUser';

export const login = (authData)=>async(dispatch)=>{

    try{
        const {data} = await api.login(authData);
        dispatch({type:"AUTH",data});
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
     

    }
    catch(error)
    {
        alert(error);
    };
}

export const signin = (email,password,navigate) =>async(dispatch)=>{
  
    try{
        const {data} = await api.signIn(email,password);
        dispatch({type:"SIGNIN_SUCCESS",data});
        alert(data.message)
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
        navigate('/');

    }
    catch(error){
        alert(error.response.data.message);

    }
}

export const signup = (email,password,navigate) => async(dispatch)=>{

    try{
        console.log(email,password);
        const {data} = await api.signUp(email,password);
        dispatch({type: "REGISTER_SUCCESS",data});
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
        navigate('/');
        alert(data.message)

    }
    catch(error){
        alert(error.response.data.message);
    }
}

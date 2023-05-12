import * as usersAPI from './users-api';

export function logOut() {
    localStorage.removeItem('token');
};

export async function signUp(userData){
    const token  = await usersAPI.signUp(userData);
    // Todo: more user service related tasks to handled here later
    localStorage.setItem('token', token);
    return getUser()
}

export async function login(credentials){
    const token = await usersAPI.login(credentials);
    localStorage.setItem('token', token);
    return getUser();
}

export function getToken(){
    const token =localStorage.getItem('token');
    if(!token) return null;
    // get the token from localstorage
    // if a token is retrieved
    // decode the payload from th etoken so we can check if it's still value
    const payload =JSON.parse(atob(token.split('.')[1]));
    
    if(payload.exp < Date.now() /1000){

        //(check if it's expired or not)
        // else remove the token from localstorage
        localStorage.removeItem('token');
        return null   
    }
    return token;
}

export function getUser(){
    const token  = getToken();
    return token ?  JSON.parse(atob(token.split('.')[1])).user: null;
};

export function checkToken(){
    return (
        usersAPI.checkToken()
        .then(dateStr => new Date(dateStr))
        )
}
import config from '../config'

const ROOT_URL = config.clientPort;

// Local Helpers
class CookieStorageMethods {
  static CheckSMCookieExist(cookiename) {
    var d = new Date();
    d.setTime(d.getTime() + (1000));
    var expires = "expires=" + d.toUTCString();
  
    document.cookie = cookiename + "=new_value;path=/;" + expires;

    if (document.cookie.indexOf(cookiename + '=') == -1) {
      return true;
    } else {
      return false;
    }
  }
}

// Exported Clientside Handlers
export async function loginUser(dispatch, loginPayload, signal) {
  const requestOptions = {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(loginPayload),
    signal: signal
  };

  try {
    dispatch({type: 'REQUEST_LOGIN'})
    let response = await fetch(`${ROOT_URL}/auth/login`, requestOptions);
    let data = await response.json();

    let isAuthenticated = CookieStorageMethods.CheckSMCookieExist(config.authCookieName) 

    if (data.user) {
      dispatch({ 
        type: 'LOGIN_SUCCESS', 
        payload: { ...data, authenticated: isAuthenticated }
      });
      return data;
    }
    dispatch({ type: 'LOGIN_ERROR', error: data.message });
    console.log(data.message);
    return;
  }
  catch (error) {
    dispatch({ type: 'LOGIN_ERROR', error: error.message});
    console.log('Action caught error: ', error);
  };
};


export async function signupUser(dispatch, signupPayload, signal) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(signupPayload),
    signal: signal
  };

  try {
    let response = await fetch(`${ROOT_URL}/auth/signup`, requestOptions);
    let data = await response.json();

    if (data.success === false) {
      dispatch({ type: 'LOGIN_ERROR', error: data.message });
      console.log(data.message);
      return;
    }

    console.log(data.message);
    return data;
  }
  catch (error) {
    console.log('Action caught error at Registration: ', error);
  };
};


export async function logout(dispatch) {
  dispatch({ type: 'LOGOUT' });
  localStorage.removeItem('currentUser');
	localStorage.removeItem('currentToken');
};
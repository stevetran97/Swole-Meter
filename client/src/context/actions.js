const ROOT_URL = 'https://localhost:5000';

export async function loginUser(dispatch, loginPayload, signal) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(loginPayload),
    signal: signal
  };

  try {
    dispatch({ type: 'REQUEST_LOGIN' });
    let response = await fetch(`${ROOT_URL}/auth/login`, requestOptions);
    let data = await response.json();

    if (data.user) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: data });
      localStorage.setItem('currentUser', JSON.stringify(data.user));
      localStorage.setItem('currentToken', JSON.stringify(data.token));
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


export async function signupUser(dispatch, signupPayload) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(signupPayload)
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
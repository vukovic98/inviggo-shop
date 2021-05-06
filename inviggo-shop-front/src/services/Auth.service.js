import API from '../services/axios.api';


const ENDPOINTS = {
    LOGIN: 'auth/log-in',
    REGISTER: 'auth/sign-up'
  };

const AuthService =  {

    login: async function (loginData) {
        try {
            const {data} = await API.post(ENDPOINTS.LOGIN, loginData);

            localStorage.setItem("accessToken", data.authenticationToken);

            let user = this.decodeToken(data.authenticationToken);

            localStorage.setItem("username", user.username);
            return true;
        } catch {
            return false;
        }
    },

    signup: async function (signUpData) {
        try{
            const {data} = await API.post(ENDPOINTS.REGISTER, signUpData);

            return true;
        } catch {
            return false;
        }
    },

    logout: function () {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("username");
    },

    getToken: function () {
        return localStorage.getItem("accessToken");
    },

    decodeToken: function (token) {
        if (token) {
          let payload = token.split(".")[1];
          payload = window.atob(payload);
          return JSON.parse(payload);
        } else return null;
      },

    getLoggedUser: function() {
        let token = this.getToken();

        if(token) {
            let data = this.decodeToken(token);
            return data.sub;
        } else
            return null;
    }


}

export default AuthService;
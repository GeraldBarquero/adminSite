import axios from 'axios';
import _ from 'lodash';
import { URLUsers} from '../config/Api';
import * as API from './loginAPI';


export function messageResult(message,type) {
    this.message = message;
    this.type = type;
}

export function getUserName(userId, Token) {
    const dataError = [
        {username: 'No UserName'}
    ]   
    if(Token){
        axios.get(URLUsers, { headers: { "x-access-token": Token },
            params: {
            IdUser: userId
            }
        }).then(function (response) {
            throw response.data.username;
            
        }).catch(function (error) {
            throw error
        });
    }else{
        return dataError
    }
  }

  
export function newUser(data) {
    const objectToken = API.getToken();
    const Token = objectToken.token
    return axios
      .post(URLUsers,data,{ 
          headers: { 
              "x-access-token": Token 
            }
      })
      .then(function (response) {
          return new messageResult(response.data[0].message, response.data[0].type);
      })
      .catch(function (error) {
          if (_.get(error, 'response.status') === 400) {
            return new messageResult('Problema con el formulario del usuario', '-1');
          }else{
            return new messageResult('Contacte al administrador', '-1');
          }
      });
  }

export function getUserData() {
    const objectToken = API.getToken();
    if(objectToken){
        const Token = objectToken.token
        return axios.get(URLUsers, { headers: { "x-access-token": Token }})
                    .then(function (response) {
                        return response.data
                    })
                    .catch(function (error) {
                        return 'No hay datos'
                    });
    }else{
        return 'No hay token';
    }
}

export function editUser(data) {
    const objectToken = API.getToken();
    const Token = objectToken.token
    return axios
      .put(URLUsers+data.Id_user,data,{ 
          headers: { 
              "x-access-token": Token 
            }
      })
      .then(function (response) {
          return new messageResult(response.data[0].message, response.data[0].type);
      })
      .catch(function (error) {
          if (_.get(error, 'response.status') === 400) {
            return new messageResult('Modificación incorrecta', '-1');
          }else{
            return new messageResult('Error de conexión','-1');
          }
      });
  }

  export function deleteUser(data) {
      const objectToken = API.getToken();
      const Token = objectToken.token
      return axios
        .delete(URLUsers+data.Id_user,{ 
            headers: { 
                "x-access-token": Token 
              }
        })
        .then(function (response) {
            return new messageResult(response.data[0].message, response.data[0].type);
        })
        .catch(function (error) {
            if (_.get(error, 'response.status') === 400) {
              return new messageResult('Modificación incorrecta', '-1');
            }else{
              return new messageResult('Error de conexión','-1');
            }
        });
    }
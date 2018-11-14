import axios from 'axios';
import _ from 'lodash';
import { URLRoles} from '../../config/Api';
import * as API from '../loginAPI';


export function messageResult(message,type) {
    this.message = message;
    this.type = type;
}  

export function newRole(data) {
    const objectToken = API.getToken();
    const Token = objectToken.token
    return axios
      .post(URLRoles,data,{ 
          headers: { 
              "x-access-token": Token 
            }
      })
      .then(function (response) {
          return new messageResult(response.data[0].message, response.data[0].type);
      })
      .catch(function (error) {
          if (_.get(error, 'response.status') === 400) {
            return new messageResult('Registro incorrecto', '-1');
          }else{
            return new messageResult(error, 'Error de conexión');
          }
      });
  }

export function getRoles() {
    const objectToken = API.getToken();
    const Token = objectToken.token
      
    if(Token){
        return axios.get(URLRoles, { headers: { "x-access-token": Token }
                }).then(function (response) {
                    return response.data;            
                }).catch(function (error) {
                    return new messageResult('Error al consultar Roles', '-1');
                });
    }else{
        return new messageResult('Error al consultar Roles', '-1');
    }
}

export function getModules(idRole) {
    const objectToken = API.getToken();
    const Token = objectToken.token
    
    if(Token){
        return axios.get(URLRoles+idRole, { headers: { "x-access-token": Token }
                }).then(function (response) {
                    return response.data;            
                }).catch(function (error) {
                    return new messageResult('Error al consultar modúlos', '-1');
                });
    }else{
        return new messageResult('Error al consultar modúlos', '-1');
    }
}

export function getPermissions(idRole,IdModule) {
    const objectToken = API.getToken();
    const Token = objectToken.token
        
    if(Token){
        return axios.get(URLRoles+idRole+"/"+IdModule, { headers: { "x-access-token": Token }
                }).then(function (response) {
                    return response.data;            
                }).catch(function (error) {
                    return new messageResult('Error al consultar permisos', '-1');
                });
    }else{
        return new messageResult('Error al consultar permisos', '-1');
    }
}

export function addPermissionsxRole(idRole,IdModule) {
    const objectToken = API.getToken();
    const Token = objectToken.token
    
    if(Token){
        return axios.put(URLRoles+idRole+"/"+IdModule, IdModule,{ headers: { "x-access-token": Token }
                }).then(function (response) {
                    return response.data;            
                }).catch(function (error) {
                    return new messageResult('Error al agregar Permiso', '-1');
                });
    }else{
        return new messageResult('Error al agregar Permiso', '-1');
    }
}

export function deletePermissionsxRole(idRole,IdModule) {
    const objectToken = API.getToken();
    const Token = objectToken.token
    
    if(Token){
        return axios.delete(URLRoles+idRole+"/"+IdModule, { headers: { "x-access-token": Token }
                }).then(function (response) {
                    return response.data;            
                }).catch(function (error) {
                    return new messageResult('Error al eliminar permiso', '-1');
                });
    }else{
        return new messageResult('Error al eliminar permiso', '-1');
    }
}
import React, { Component } from 'react';
import { Col, OverlayTrigger,Tooltip,Modal,Form,FormControl, FormGroup, ControlLabel, Row,Thumbnail} from "react-bootstrap";
import $ from 'jquery';
import Button from '../../elements/CustomButton/CustomButton.jsx';
import data from '../../assets/js/dataTables/spanish.json';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import SweetAlert from 'react-bootstrap-sweetalert';
import * as API from '../../services/Users';
import * as APIRole from '../../services/security/Roles';
import ReactDOM from 'react-dom'
import Select from 'react-select';
import avaDef from "../../assets/img/faces/face-0.jpg";


pdfMake.vfs = pdfFonts.pdfMake.vfs;

require('datatables.net-responsive');
require('datatables.net-buttons-bs');
require( 'datatables.net-buttons/js/buttons.html5.min' );
$.DataTable = require('datatables.net-bs');
const jzip = require( 'jszip');
window.JSZip = jzip;
const columns = [{title: 'IdUsuario',data: 'Id_user',visible: false,searchable: false},
                {title: 'Nombre',data: 'name'},
                {title: 'Apellido',data: 'lastName'},
                {title: 'Usuario',data: 'username'},
                {title: 'Correo',data: 'email'}, {title: 'Compañía',data: 'companyName'},
                {title: 'Fecha de Creación',data: 'create_time'},
                {title: 'Acciones',data: 'actions'}]
function importAll(r) {
    var arr = []
    console.log(r.keys().map((r,i) => {
        arr.push(r)
        return r
    }))
    console.log(arr.map(e => { return r.resolve(e)}))
    return r.keys().map(r);
}
    
const images = importAll(require.context('assets/img/avatars/', false, /\.(png|jpe?g|svg)$/));
console.log(images)
class ListUsers extends Component{
    constructor(props, context) {
        super(props, context);
        this.state = {
            avatarFile: "",
            changeAvatar:"",
            modalEditUser: false,
            modalAvatar: false,
            modalCreateUser: false,
            alert: null,
            refresh: false,
            dataRows: [],
            userData: [],
            userEditData: {},
            roles: [],
            rolData:{value:'',label:''},
            roleSelect: "",
            dataUser:{
                username: '',
                name: '',
                lastName: '',
                password: '',
                email: '',
                companyName: '',
                roleId: '',
                avatarImg: ''
            }
        };
        this.getUserDataTable = this.getUserDataTable.bind(this);
        this.getListRoles = this.getListRoles.bind(this);
        this.alertconfirm = this.alertconfirm.bind(this);
        this.editUserData = this.editUserData.bind(this);
        this.handleEditSubmit = this.handleEditSubmit.bind(this);
        this.hideAlert = this.hideAlert.bind(this);
        this.createUser = this.createUser.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeAvatar = this.changeAvatar.bind(this);
    }
    componentDidMount() {
        this.getUserDataTable()
        this.getListRoles()
        this.setState({avatarFile:avaDef})
    }
    componentWillUnmount(){
        try{
            var table = $('#datatableUser').DataTable()
            table.destroy(true);
        }catch(e)
        {

        }
    }

    transform(content) {
       return content.map(prop => {
            const result = prop.map(x => ({
                ...x,
                actions: ''
            }))
            return result
        })
      }

    componentWillReceiveProps(){
        const refrescar = this.props.refresh;
        if(refrescar){
            this.getUserDataTable();
        }
    }
    editUserData(rowData, cellData, row){
        var rolList = this.state.roles;
        var rol = rolList.find(function(element) {
            return element.value === rowData.fk_idRole;
          });
        if(rol){
            this.setState({roleSelect:rol})
        }
        var arrData = []
        arrData.push(rowData)
        var usereditArr = rowData
        const nameImg = usereditArr.avatar_img;
        var pathImg = ""
        try { 
            // pathImg = require(`assets/img/${nameImg}`);
            debugger
            pathImg = require('assets/img/avatars/AVA-01.png');
            
        } catch (error) {
            pathImg = nameImg;
        }
        this.setState({avatarFile: pathImg});
        this.setState({userEditData: usereditArr});
        this.setState({userData: arrData});
        this.handleModalEditShow();
    }
    getListRoles(){
        try{
            APIRole.getRoles()
                .then(response =>{
                    const {roles }= this.state;
                    response.map((r) => {
                        var arrData = {
                            value: r.ID_ROLE,
                            label: r.ROLNAME
                        }
                        return roles.push(arrData)
                    })
                    this.setState({roles: roles})
                })
                .catch(response =>{
                    console.log(response)
                });
        }
        catch(e){
            console.log(e)
        }
    }

    getUserDataTable(){
        try{
            API.getUserData()
                .then(response =>{
                    var arrData = []
                    arrData.push(response.map((user) => user))
                    this.setState({
                        dataRows: arrData
                    })
                    this.loadDatatable()
                    this.validatedDatatable();
                })
                .catch(response =>{
                    console.log(response)
                });
        }
        catch(e){
            console.log(e)
        }
    }
    loadDatatable(){
        if ($.fn.DataTable.isDataTable( '#datatableUser' ) ) {
            var table = $('#datatableUser').DataTable()
            table.clear();
        }
        $(this.refs.main).DataTable({
            destroy: true,
            dom: 'Bfrtip',
            buttons: [
                {
                    extend:    'excelHtml5',
                    text:      '<i class="fas fa-file-excel"></i>',
                    titleAttr: 'Excel',
                    className: 'btn-simple btn-options btn-success'
                },
                {
                    extend: 'pdfHtml5',
                    text:      '<i class="fas fa-file-pdf"></i>',
                    titleAttr: 'pdf',
                    className: 'btn-simple btn-options btn-danger'
                }
            ],
            "pagingType": "simple_numbers",
            "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
            responsive: true,
            language: data,
            columns: columns,
            columnDefs: [{
                targets: 7,
                createdCell: (td, cellData, rowData, row, col) =>
                  ReactDOM.render(
                      <div>
                    <OverlayTrigger placement="top" overlay={<Tooltip id="view">Editar</Tooltip>}><a className="btn btn-simple btn-warning btn-icon edit" ><i className="fa fa-edit" onClick={() => this.editUserData(rowData, cellData, row)}></i></a></OverlayTrigger>
                    <OverlayTrigger placement="top" overlay={<Tooltip id="view">Desactivar</Tooltip>}><a className="btn btn-simple btn-danger btn-icon remove"><i className="fa fa-times" onClick={() => this.alertconfirm(rowData)}></i></a></OverlayTrigger></div>, td),
              }],
        });
    }
    validatedDatatable(){
        if ($.fn.DataTable.isDataTable( '#datatableUser' ) ) {
            var table = $('#datatableUser').DataTable();
            table.clear();
            const newData = this.transform(this.state.dataRows)
            table.rows.add(newData[0])
            table.draw();
        }
    }
    alertconfirm(Data){
        this.setState({
            alert: (
                <SweetAlert
                    warning
                    style={{display: "block",marginTop: "-100px"}}
                    title="Desactivar el usuario ?"
                    onConfirm={() => this.deleteUser(Data)}
                    onCancel={() => this.successAlert("Usuario no desactivado",-1)}
                    confirmBtnBsStyle="success"
                    confirmBtnCssClass ="btn-fill"
                    cancelBtnBsStyle="danger"
                    cancelBtnCssClass ="btn-fill"
                    confirmBtnText="Sí, desactivarlo!"
                    cancelBtnText="Cancelar"
                    showCancel
                >
                    {/* El usuario será desactivado y solo un administrador del sistema, lo podrá volver activar! */}
                </SweetAlert>
            )
        });
    }
    deleteUser(Data){
        API.deleteUser(Data)
            .then(response => {
                this.successAlert(response.message,response.type)
            })
            .catch(response => {
                this.successAlert(response.message,response.type)
            });
    }

    

    handleModalEditShow = event => {
        try {
            this.setState({
                modalEditUser: true,
            });
        } catch (error) {
        }
    };

    onChangeInputFormEditUser  = event => {
        const { id, value } = event.target;
        const {userEditData }= this.state;
        this.setState({
            userEditData: {
                ...userEditData,
                [id]: value
            }
        });
    }
    handleModalClose = event => {
        try {
            const target = event.currentTarget;
            
            this.setState({
                [target.name]: false
            });
        } catch (error) {
            console.log(error)
        }
    };

    handleModalShow = event => {
        try {

            const target = event.currentTarget;
            console.log(target)
            this.setState({
                [target.name]: true,
            });
        } catch (err) {
        }
    };
    onChangeInputFormUser  = event => {
        const { id, value } = event.target;
        const {dataUser }= this.state;
        this.setState({
            dataUser: {
                ...dataUser,
                [id]: value
            }
        });
    }
    handleSubmit(event) {
        event.preventDefault();
        const rolsel = this.state.roleSelect.value;
        const { dataUser } = this.state;
        dataUser.avatarImg = this.state.avatarFile;
        if (dataUser.username && dataUser.name && dataUser.password && dataUser.email &&dataUser.lastName && dataUser.companyName && rolsel && dataUser.avatarImg) {
            dataUser.roleId = rolsel.toString();
            this.createUser(dataUser)
        }
    }

    createUser(Data){
        API.newUser(Data)
            .then(response => {
                this.successAlert(response.message,response.type)
                this.setState({dataUser:[],roleSelect:""})
            })
            .catch(response => {
                this.successAlert('error de registro',-1)
            });
    }


    handleEditSubmit(event) {
        event.preventDefault();
        const rolsel = this.state.roleSelect.value;
        const { userEditData } = this.state;
        userEditData.avatarImg = this.state.avatarFile;
        if (userEditData.name && userEditData.email && userEditData.lastName && userEditData.companyName && rolsel) {
            userEditData.roleId = rolsel.toString();
            this.editUser(userEditData)
        }
    }

    editUser(Data){
        API.editUser(Data)
            .then(response => {
                this.successAlert(response.message,response.type)
                this.setState({userEditData:[],roleSelect:""})
            })
            .catch(response => {
                this.successAlert(response.message,response.type)
            });
    }
    
    successAlert(message,typeAlert){
        if(typeAlert === 1){
            typeAlert = 'success'
            this.setState({modalEditUser: false, modalCreateUser: false})
            setTimeout(this.getUserDataTable(),2000);
        }else{
            typeAlert = 'danger'
        }
        this.setState({
            alert: (
                <SweetAlert
                    type ={typeAlert}
                    style={{display: "block",marginTop: "-100px"}}
                    title={message}
                    onConfirm={() => this.hideAlert()}
                    showConfirm={false}
                >
                </SweetAlert>
            )
        });
        setTimeout(this.hideAlert,2000);
    }

    hideAlert(){
        this.setState({
            alert: null
        });
    }

    handleGetPathFile = event => {
        try {
            const target = event.currentTarget;
            this.setState({changeAvatar:target.name})
        } catch (error) {
        }
    };

    changeAvatar(){
        const newAvatar = this.state.changeAvatar;
        if(newAvatar !== ""){
            this.setState({avatarFile: newAvatar, modalAvatar: false})
        }
    }

    render() {
        const { state} = this.props;
        const ModalAvatar = 
            <Modal show={this.state.modalAvatar} onHide={this.handleModalClose} name="modalAvatar">
                <Modal.Header >
                    <Modal.Title>Lista de opciones </Modal.Title>
                    <p>Seleccione una de las siguientes imágenes y luego presione el botón aceptar</p>
                </Modal.Header>
                <Modal.Body style={{overflowY:"scroll",height:"335px"}}>
                    <p>Lista de Avatars:</p>
                        <Row className="flex-row">
                            {images.map((prop,key) => {
                                return (
                                    <Col sm={4} xs={6} md={3} style={{height:"110px",width:"110px"}}  key={key}>
                                        <Thumbnail href="#" alt="171x180" src={prop} onClick={this.handleGetPathFile} name={prop}/>
                                    </Col>
                                );
                            })}
                        </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button fill bsStyle="success" onClick={this.changeAvatar} name="modalAvatar">Aceptar</Button>
                    <Button fill bsStyle="danger"  onClick={this.handleModalClose}  name="modalAvatar">Cancelar</Button>
                </Modal.Footer>
            </Modal>
        const ModaldEditUser = 
            <Modal show={this.state.modalEditUser} onHide={this.handleModalClose} name="modalEditUser">
                <Modal.Header >
                    <Modal.Title>Edición del Usuario: {
                        this.state.userData.map(d =>{return d.name})}</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <Form horizontal onSubmit={this.handleEditSubmit}>
                        <FormGroup controlId="name">
                            <Col componentClass={ControlLabel} sm={2}>
                                Nombre:
                            </Col>
                            <Col sm={10}>
                                <FormControl type="text" placeholder="Nombre del usuario" name="name" onChange={this.onChangeInputFormEditUser}  value={this.state.userEditData.name}/>
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="lastName">
                            <Col componentClass={ControlLabel} sm={2}>
                                Apellido:
                            </Col>
                            <Col sm={10}>
                                <FormControl type="text" placeholder="Apellido del usuario" onChange={this.onChangeInputFormEditUser} value={this.state.userEditData.lastName}/>
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="avatar_img" >
                            <Col componentClass={ControlLabel} sm={2}>
                                Avatar:
                            </Col>
                            <Col sm={10}>
                                <span > <img className="manImg fa" style={{height:"40px",width:"auto",paddingRight:"15px"}} src={this.state.avatarFile} alt="Avatar"></img></span>
                                <Button fill bsStyle="info"  bsSize="xsmall" onClick={this.handleModalShow} name="modalAvatar" >Cambiar</Button>
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="companyName">
                            <Col componentClass={ControlLabel} sm={2}>
                                Compañía:
                            </Col>
                            <Col sm={10}>
                                <FormControl type="text" placeholder="Nombre de la compañía" onChange={this.onChangeInputFormEditUser}  value={this.state.userEditData.companyName}/>
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="email">
                            <Col componentClass={ControlLabel} sm={2}>
                                Correo:
                            </Col>
                            <Col sm={10}>
                                <FormControl type="email" placeholder="Dirección de correo" onChange={this.onChangeInputFormEditUser}  value={this.state.userEditData.email}/>
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="roles">
                            <Col componentClass={ControlLabel} sm={2}>
                                Rol en el sistema:
                            </Col>
                            <Col sm={10}>
                            <Select
                                placeholder="Seleccione el Rol"
                                name="singleSelect"
                                value={this.state.roleSelect}
                                options={this.state.roles}
                                onChange={(value) => this.setState({ roleSelect: value})}
                            />
                            </Col>
                        </FormGroup>

                        
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button fill bsStyle="success" onClick={this.handleEditSubmit} >Aceptar</Button>
                    <Button fill bsStyle="danger"  onClick={this.handleModalClose}  name="modalEditUser">Cancelar</Button>
                </Modal.Footer>
            </Modal>

        const ModalUser = 
            <Modal show={this.state.modalCreateUser} onHide={this.handleModalClose} name="modalCreateUser">
                <Modal.Header >
                    <Modal.Title>Creación de Usuarios</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form horizontal onSubmit={this.handleSubmit}>
                        <FormGroup controlId="name" >
                            <Col componentClass={ControlLabel} sm={2}>
                                Nombre:
                            </Col>
                            <Col sm={10}>
                                <FormControl type="text" placeholder="Nombre del usuario" onChange={this.onChangeInputFormUser} />
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="lastName">
                            <Col componentClass={ControlLabel} sm={2}>
                                Apellido:
                            </Col>
                            <Col sm={10}>
                                <FormControl type="text" placeholder="Apellido del usuario" onChange={this.onChangeInputFormUser}/>
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="username">
                            <Col componentClass={ControlLabel} sm={2}>
                                Usuario:
                            </Col>
                            <Col sm={10}>
                                <FormControl type="text" placeholder="Usuario para el sistema" onChange={this.onChangeInputFormUser}/>
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="avatar" >
                            <Col componentClass={ControlLabel} sm={2}>
                                Avatar:
                            </Col>
                            <Col sm={10}>
                                <span > <img class="manImg fa" style={{height:"40px",width:"auto",paddingRight:"15px"}} src={avaDef}  alt="Avatar"></img></span>
                                <Button fill bsStyle="info"  bsSize="xsmall" onClick={this.handleModalShow} name="modalAvatar" >Cambiar</Button>
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="companyName">
                            <Col componentClass={ControlLabel} sm={2}>
                                Compañía:
                            </Col>
                            <Col sm={10}>
                                <FormControl type="text" placeholder="Nombre de la compañía" onChange={this.onChangeInputFormUser}/>
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="password">
                            <Col componentClass={ControlLabel} sm={2}>
                                Contraseña:
                            </Col>
                            <Col sm={10}>
                                <FormControl type="password" placeholder="Contraseña para el sistema" onChange={this.onChangeInputFormUser}/>
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="password2">
                            <Col componentClass={ControlLabel} sm={2}>
                                Verificar contraseña:
                            </Col>
                            <Col sm={10}>
                                <FormControl type="password" placeholder="Reingreso de contraseña" onChange={this.onChangeInputFormUser}/>
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="email">
                            <Col componentClass={ControlLabel} sm={2}>
                                Correo:
                            </Col>
                            <Col sm={10}>
                                <FormControl type="email" placeholder="Dirección de correo" onChange={this.onChangeInputFormUser}/>
                            </Col>
                        </FormGroup>
                        <FormGroup controlId="roles">
                            <Col componentClass={ControlLabel} sm={2}>
                                Rol en el sistema:
                            </Col>
                            <Col sm={10}>
                            <Select
                                placeholder="Single Select"
                                name="singleSelect"
                                value={this.state.roleSelect}
                                options={this.state.roles}
                                onChange={(value) => this.setState({ roleSelect: value})}
                            />
                            </Col>
                        </FormGroup>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button fill bsStyle="success" onClick={this.handleSubmit} >Aceptar</Button>
                    <Button fill bsStyle="danger" onClick={this.handleModalClose}  name="modalCreateUser">Cancelar</Button>
                </Modal.Footer>
            </Modal>

        return (
            <div>
                {ModaldEditUser}
                {ModalAvatar}
                {ModalUser}
                {this.state.alert}
                <Col sm={6} md={6}>
                    Listado de los usuarios del sistema.
                </Col>
                <Col sm={6} md={6}>
                    <OverlayTrigger placement="top" overlay={<Tooltip id="view">Agregar</Tooltip>}>
                        <Button simple pullRight bsStyle="success" options onClick={this.handleModalShow} name="modalCreateUser" value={state}>
                            <i className="fa fa-user-plus"></i>
                        </Button>
                    </OverlayTrigger>
                </Col>
                <br/>
                <hr/>
                <div className="fresh-datatables">
                    <table id="datatableUser" ref="main" className="table table-striped table-no-bordered table-hover" cellSpacing="0" width="100%" style={{width:"100%"}}>
                    </table>
                </div>          
            </div>
        );
    }
}

export default ListUsers;
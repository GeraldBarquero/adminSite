import React, { Component } from 'react';
import { Col, OverlayTrigger,Tooltip,Tab,Nav,NavItem,Row,ListGroup, ListGroupItem,Modal,Form,FormControl, FormGroup, ControlLabel} from "react-bootstrap";
import BootstrapTable from 'react-bootstrap-table-next';
import Button from '../../elements/CustomButton/CustomButton.jsx';
import Switch from 'react-bootstrap-switch';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import * as API from '../../services/security/Roles';
import SweetAlert from 'react-bootstrap-sweetalert';
// import Card from 'components/Card/Card.jsx';

const PermColum = [{
    dataField: 'Id_permission',
    text: 'ID',
    hidden: true
  }, {
    dataField: 'permissionName',
    text: 'Nombre',
    sort: true
  }, {
    dataField: 'type',
    text: 'Type',
    hidden: true
  }
];
class ListModules extends Component{
    constructor(props){
        super(props);
            this.state = {
                listModules:[],
                idRole: 0
        };
    }
    componentDidMount() {
        this.getListModules(this.props.idRole);
    }

    handleSwitch(elem, state) {
        const self = this;  
        try{
            if(state){
                API.addPermissionsxRole(self.state.idRole, elem.props.name)
                    .then(response =>{
                        this.getListModules(self.state.idRole)
                    })
                    .catch(response =>{
                        console.log(response)
                    });
            }else{
                API.deletePermissionsxRole(self.state.idRole, elem.props.name)
                    .then(response =>{
                        this.getListModules(self.state.idRole)
                    })
                    .catch(response =>{
                        console.log(response)
                    });
            }
        }catch(e){
            console.log(e)
        }
    }

    getListModules(IdRole){
        const self = this;    
        try{
            API.getModules(IdRole)
                .then(response =>{
                    self.setState({listModules: response})
                    self.setState({idRole: IdRole})
                })
                .catch(response =>{
                    console.log(response)
                });
        }
        catch(e){
            console.log(e)
        }
    }
    render() {
        const { idRole, keyPanel, fn} = this.props;
        const listModule = this.state.listModules;
        return (
            <Tab.Pane bsClass="clearPanel" eventKey={idRole} key={keyPanel}>
                <ListGroup bsClass="groupListClear" key={keyPanel}>{
                    listModule.map((e,k) => {
                        const val  = e.fk_idRole === idRole  ? true : false
                        return <Col key={e.id_permission}>
                                    <Col xs={10} sm={10} md={10}>
                                    {val ? (
                                            <ListGroupItem bsClass="list-group-item" key={e.id_permission} bsStyle="success" onClick={()=> fn(e.fk_idRole,e.id_permission)}>{e.modulename}</ListGroupItem>
                                        ) :(
                                            <ListGroupItem bsClass="list-group-item" key={e.id_permission} >{e.modulename}</ListGroupItem>
                                        )}
                                        
                                    </Col>
                                    <Col xs={2} sm={2} md={2}>
                                            <Switch key={e.id_permission}
                                                    onText="✔"
                                                    offText="✘"
                                                    offColor="danger"
                                                    onColor="success"
                                                    defaultValue={val}
                                                    name={e.id_permission}
                                                    onChange={(el, state) => this.handleSwitch(el, state)}
                                                />
                                    
                                    </Col>
                                </Col>                                                    
                    })
                }
                </ListGroup>
            </Tab.Pane>
        )
    }
}
class ListRoles extends Component{
    constructor(props){
        super(props);
            this.state = {
                is_open: false,
                radio: "1",
                showAccess: false,
                type: false,
                listRoles:[],
                listModules:[],
                listAccess: "",
                showRole: false,
                dataRole:{rolname: ''},
                alert:""
            };
        this.handleCheck = this.handleCheck.bind(this);
        this.showAccessList = this.showAccessList.bind(this);
        this.getListRoles = this.getListRoles.bind(this);
        this.getPermisos = this.getPermisos.bind(this);
        this.handleModalShow = this.handleModalShow.bind(this);
        this.onChangeInputFormRole = this.onChangeInputFormRole.bind(this);
        this.handleSubmitRole = this.handleSubmitRole.bind(this);
        this.hideAlert = this.hideAlert.bind(this);
    }
    componentDidMount() {
        this.getListRoles();
    }
    getListRoles(){
        const self = this;    
        try{
            API.getRoles()
                .then(response =>{
                    self.setState({listRoles: response})
                })
                .catch(response =>{
                    console.log(response)
                });
        }
        catch(e){
            console.log(e)
        }
    }
    handleRadio = event => {
        const target = event.target;
        this.setState({
            [target.name]: target.value
        });
    };
    handleCheck = event => {
        this.setState({is_open: (event.currentTarget.value === "true" ? false:true)});
    };
    getPermisos(IdRole,IdModule){
        const self = this; 
        try{
            API.getPermissions(IdRole,IdModule)
                .then(response =>{
                    const idRowSelect =[];
                    idRowSelect.push(response.map((d,i) =>{ 
                                                        if(d.fk_idRole !== 0){
                                                                return d.Id_permission
                                                            }
                                                        }))
                    console.log(idRowSelect)
                    const selectRow = {
                        mode: 'checkbox',
                        clickToSelect: true,
                        style: { backgroundColor: '#c8e6c9' },
                        selected : idRowSelect[0],
                        hideSelectColumn: true,
                        onSelect: (row, isSelect) => {
                            this.handleClickAccess(row,isSelect);
                          }
                      };
                    self.setState({listAccess:  <Col sm={4}>
                                                    <p>Permisos</p>
                                                    <BootstrapTable keyField='Id_permission' data={ response } columns={ PermColum } bordered={ false } selectRow={ selectRow } />
                                                </Col>
                        })
                })
                .catch(response =>{
                    console.log(response)
                });
        }
        catch(e){
            console.log(e)
        }
    }
    
    handleClickAccess(row, state) {
        try{
            if(state){
                API.addPermissionsxRole(row.rol,row.Id_permission)
                    .then(response =>{
                        this.getPermisos(row.rol,row.id_module)
                    })
                    .catch(response =>{
                        console.log(response)
                    });
            }else{
                API.deletePermissionsxRole(row.rol,row.Id_permission)
                    .then(response =>{
                        this.getPermisos(row.rol,row.id_module)
                    })
                    .catch(response =>{
                        console.log(response)
                    });
            }
        }catch(e){
            console.log(e)
        }
    }

    showAccessList(type){
        this.setState({type:type})
        this.setState({showAccess:true})
    }
    componentWillUnmount(){
       
    }

    handleModalClose = event => {
        try {
            this.setState({showRole: false});
        } catch (error) {
            console.log(error)
        }
    };

    handleModalShow = event => {
        try {
            this.setState({showRole: true});
        } catch (error) {
        }
    };

    onChangeInputFormRole  = event => {
        const { id, value } = event.target;
        const {dataRole }= this.state;
        this.setState({
            dataRole: {
                ...dataRole,
                [id]: value
            }
        });
    }

    handleSubmitRole(event) {
        event.preventDefault();
 
        const { dataRole } = this.state;
        if (dataRole.rolname) {
            this.createRole(dataRole)
        }
    }

    createRole(Data){
        API.newRole(Data)
            .then(response => {
                this.successAlert(response.message,response.type)
            })
            .catch(response => {
                this.successAlert(response.message,response.type)
            });
    }

    successAlert(message,typeAlert){
        if(typeAlert === 1){
            typeAlert = 'success'
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
    
    render() {
        const ModalRole = 
            <Modal show={this.state.showRole} onHide={this.handleModalClose} name="showRole">
                <Modal.Header >
                    <Modal.Title>Creación de Roles</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form horizontal>
                        <FormGroup controlId="rolname" onSubmit={this.handleSubmit}>
                            <Col componentClass={ControlLabel} sm={2}>
                                Nombre:
                            </Col>
                            <Col sm={10}>
                                <FormControl type="text" placeholder="Nombre del Rol" onChange={this.onChangeInputFormRole} name="rolname"/>
                            </Col>
                        </FormGroup>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button fill bsStyle="success" onClick={this.handleSubmitRole} >Aceptar</Button>
                    <Button fill bsStyle="danger" onClick={this.handleModalClose}  name="showRole">Cancelar</Button>
                </Modal.Footer>
            </Modal>
        const {name} = this.props;
        const listRoles = this.state.listRoles;
        return (
            <div>{ModalRole}
                {this.state.alert}
                <Col sm={6} md={6}>
                    Listado de los roles del sistema.
                </Col>
                <br/>
                <hr/>
                <Tab.Container id="listRoles" defaultActiveKey="1">
                    <Row className="clearfix">
                        <Col sm={4}>
                            <Col  xs={6} sm={6} md={6}>
                                <p>Roles</p>
                            </Col>
                            <Col  xs={6} sm={6} md={6}>
                                <OverlayTrigger placement="top" overlay={<Tooltip id="view">Agregar</Tooltip>}>
                                    <Button simple pullRight bsStyle="success" options onClick={this.handleModalShow} name={name} value="1">
                                        <i className="fa fa-users-cog" onClick={this.handleModalShow} name={name} value="1"></i>
                                    </Button>
                                </OverlayTrigger>
                            </Col>
                            <Col  xs={12} sm={12} md={12}>
                                <Nav bsStyle="pills" stacked >
                                    {
                                        listRoles.map((d,i) => {
                                            return <NavItem eventKey={d.ID_ROLE} key={i}>{d.ROLNAME}</NavItem>
                                        })
                                    }
                                </Nav>
                            </Col>
                        </Col>
                        <Col sm={4}>
                            <p>Módulos</p>
                            <Tab.Content animation>
                                {
                                    listRoles.map((d,i) => {
                                        return <ListModules idRole={d.ID_ROLE} keyPanel={i} key={i} fn={this.getPermisos}/>
                                    })
                                }
                            </Tab.Content>
                        </Col>
                        {this.state.listAccess}
                        
                    </Row>
                </Tab.Container>
            </div>        
        );
    }
}

export default ListRoles;
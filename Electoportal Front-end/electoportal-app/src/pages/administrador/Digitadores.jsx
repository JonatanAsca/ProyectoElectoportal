import React, { Component } from 'react';
import axios from 'axios';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const url = "http://localhost:3001/administrador/digitadores/";

class Digitadores extends Component {

    state = {
        data: [],
        modalInsertar: false,
        modalEliminar: false,
        form: {
            Cedula: '',
            Nombre: '',
            Apellido: '',
            Telefono: '',
            Correo: '',
            Contrasena: '',
            id_administrador: 0,
            tipoModal: ''
        },
    }

    //MOSTRAR
    peticionGet = () => {
        axios.get(url).then(response => {
            console.log(response.data.data);
            this.setState({ data: response.data.data });
        }).catch(error => {
            console.log(error.message);
        })
    }

    //CREAR
    peticionPost = async () => {
        try {
            console.log('Creando digitador:', this.state.form); // Log para depuración
            const response = await axios.post(url, this.state.form);
            console.log('Respuesta del servidor:', response.data);
            this.modalInsertar();
            this.peticionGet();
        } catch (error) {
            console.log('Error en peticionPost:', error.response ? error.response.data : error.message);
        }
    }

    //ACTUALIZAR
    peticionPut = async () => {
        try {
            console.log('Actualizando digitador:', this.state.form); // Log para depuración
            const response = await axios.put(url + this.state.form.Cedula, this.state.form);
            console.log('Respuesta del servidor:', response.data);
            this.modalInsertar();
            this.peticionGet();
        } catch (error) {
            console.log('Error en peticionPut:', error.response ? error.response.data : error.message);
        }
    }

    //ELIMINAR
    peticionDelete = async () => {
        try {
            console.log('Eliminando digitador:', this.state.form.Cedula); // Log para depuración
            await axios.delete(url + this.state.form.Cedula + "/");
            this.setState({ modalEliminar: false });
        } catch (error) {
            console.log('Error en peticionDelete:', error.response ? error.response.data : error.message);
        }
    }

    modalInsertar = () => {
        this.setState({
            modalInsertar: !this.state.modalInsertar,
            tipoModal: 'insertar',
            form: {
                Cedula: '',
                Nombre: '',
                Apellido: '',
                Telefono: '',
                Correo: '',
                Contrasena: '',
                id_administrador: 0
            }
        });
    }

    seleccionarDigitador = (digitador) => {
        this.setState({
            tipoModal: 'actualizar',
            form: {
                Cedula: digitador.Cedula,
                Nombre: digitador.NombreDigitador, //NombreDigitador es Nombre
                Apellido: digitador.Apellido,
                Telefono: digitador.Telefono,
                Correo: digitador.Correo,
                Contrasena: digitador.Contrasena,
                id_administrador: digitador.id_administrador,
            }
        });
        this.setState({ modalInsertar: true });
    }


    handleChange = async e => {
        e.persist();
        let value = e.target.value;
        if (e.target.name === 'Cedula') {
            value = parseInt(value, 10); // Convertir a entero
        }
        if (e.target.name === 'id_administrador') {
            value = value ? parseInt(value, 10) : ''; // Convertir a entero si no está vacío, de lo contrario, dejar vacío
        }
        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: value
            }
        });
        console.log(this.state.form);
    }

    
    componentDidMount() {
        this.peticionGet();
    }

    render() {
        const { form, tipoModal } = this.state;
        return (
            <div className='App'>
                <br />
                <button className='btn btn-success' onClick={() => this.modalInsertar()}>Agregar digitador</button>
                <br /><br />
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Cedula</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Telefono</th>
                            <th>Correo</th>
                            <th>Clave</th>
                            <th>Nombre administrador</th>
                            <th>OPCIONES</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data.map(digitador => (
                            <tr key={digitador.Cedula}>
                                <td>{digitador.Cedula}</td>
                                <td>{digitador.NombreDigitador}</td> {/* NombreDigitador es Nombre */}
                                <td>{digitador.Apellido}</td>
                                <td>{digitador.Telefono}</td>
                                <td>{digitador.Correo}</td>
                                <td>{digitador.Contrasena}</td>
                                <td>{digitador.NombreAdministrador}</td>
                                <td>
                                    <button className="btn btn-primary" onClick={() => { this.seleccionarDigitador(digitador); }}><FontAwesomeIcon icon={faEdit} /></button>
                                    {"   "}
                                    <button className="btn btn-danger" onClick={() => { this.seleccionarDigitador(digitador); this.setState({ modalEliminar: true }) }}><FontAwesomeIcon icon={faTrashAlt} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <Modal isOpen={this.state.modalInsertar}>
                    <ModalHeader style={{ display: 'block' }}>
                        <span style={{ float: 'right' }} onClick={() => this.modalInsertar()}>x</span>
                    </ModalHeader>
                    <ModalBody>
                        <div className="form-group">
                            <label htmlFor="Cedula">Cedula</label>
                            <input className="form-control" type="number" name="Cedula" id="Cedula" onChange={this.handleChange} value={form ? form.Cedula : ''} />
                            <br />
                            <label htmlFor="Nombre">Nombre</label>
                            <input className="form-control" type="text" name="Nombre" id="Nombre" onChange={this.handleChange} value={form ? form.Nombre : ''} />
                            <br />
                            <label htmlFor="Apellido">Apellidos</label>
                            <input className="form-control" type="text" name="Apellido" id="Apellido" onChange={this.handleChange} value={form ? form.Apellido : ''} />
                            <br />
                            <label htmlFor="Telefono">Telefono</label>
                            <input className="form-control" type="text" name="Telefono" id="Telefono" onChange={this.handleChange} value={form ? form.Telefono : ''} />
                            <br />
                            <label htmlFor="Correo">Correo</label>
                            <input className="form-control" type="text" name="Correo" id="Correo" onChange={this.handleChange} value={form ? form.Correo : ''} />
                            <br />
                            <label htmlFor="Contrasena">Contrasena</label>
                            <input className="form-control" type="text" name="Contrasena" id="Contrasena" onChange={this.handleChange} value={form ? form.Contrasena : ''} />
                            <br />
                            <label htmlFor="id_administrador">Administrador</label>
                            <select className="form-control" name="id_administrador" id="id_administrador" onChange={this.handleChange} value={form ? form.id_administrador : ''}>
                                <option value="">Seleccione un administrador</option>
                                {this.state.data.map(admin => (
                                    <option key={admin.id_administrador} value={admin.CedulaAdministrador}>{admin.NombreAdministrador}</option>
                                ))}
                            </select>
                        </div>
                    </ModalBody>

                    <ModalFooter>
                        {tipoModal === 'insertar' ?
                            <button className="btn btn-success" onClick={() => this.peticionPost()}>
                                Crear
                            </button> :
                            <button className="btn btn-primary" onClick={() => this.peticionPut()}>
                                Actualizar
                            </button>
                        }

                        <button className="btn btn-danger" onClick={() => this.modalInsertar()}>Cancelar</button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.modalEliminar}>
                    <ModalBody>
                        Estás seguro que deseas eliminar el digitador {form && form.Nombre}
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-danger" onClick={() => this.peticionDelete()}>Sí</button>
                        <button className="btn btn-secondary" onClick={() => this.setState({ modalEliminar: false })}>No</button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default Digitadores;

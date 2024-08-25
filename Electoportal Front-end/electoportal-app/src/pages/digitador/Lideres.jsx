import React, { Component } from 'react';
import axios from 'axios';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const url = "http://localhost:3001/administrador/lideres/";
//Complementos 
const urlBarrio = "http://localhost:3001/administrador/barrios/";
const urlMesas = "http://localhost:3001/administrador/mesasvotacion/";
const urlPuestos = "http://localhost:3001/administrador/puestovotacion/";
const urlDigitador = "http://localhost:3001/administrador/digitadores/";

class Lideres extends Component {

    state = {
        data: [],

        dataB: [],
        dataM: [],
        dataP: [],
        dataD: [],
        modalInsertar: false,
        modalEliminar: false,
        form: {
            Cedula: '',
            Nombre: '',
            Apellido: '',
            Telefono: '',
            Correo: '',
            Id_barrio: 0,
            Id_mesa_votacion: 0,
            Id_puesto_votacion: 0,
            Id_digitadores: 0,
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

    //MOSTRAR BARRIO
    peticionGetBarrios = () => {
        axios.get(urlBarrio).then(response => {
            console.log(response.data.dataB);
            this.setState({ dataB: response.data.data });
        }).catch(error => {
            console.log(error.message);
        })
    }

    //MOSTRAR MESAS DE VOTACION
    peticionGetMesas = () => {
        axios.get(urlMesas).then(response => {
            console.log(response.data.dataM);
            this.setState({ dataM: response.data.data });
        }).catch(error => {
            console.log(error.message);
        })
    }

    //MOSTRAR PUESTOS DE BOTACION
    peticionGetPuestos = () => {
        axios.get(urlPuestos).then(response => {
            console.log(response.data.dataP);
            this.setState({ dataP: response.data.data });
        }).catch(error => {
            console.log(error.message);
        })
    }

    //MOSTRAR DIGITADORES
    peticionGetDigitadores = () => {
        axios.get(urlDigitador).then(response => {
            console.log(response.data.dataD);
            this.setState({ dataD: response.data.data });
        }).catch(error => {
            console.log(error.message);
        })
    }

    //CREAR
    peticionPost = async () => {
        try {
            console.log('Creando lider:', this.state.form); // Log para depuración
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
            console.log('Actualizando lider:', this.state.form); // Log para depuración
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
            console.log('Eliminando lider:', this.state.form.Cedula); // Log para depuración
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
                Id_barrio: 0,
                Id_mesa_votacion: 0,
                Id_puesto_votacion: 0,
                Id_digitadores: 0
            }
        });
    }

    seleccionarLider = (lider) => {
        this.setState({
            tipoModal: 'actualizar',
            form: {
                Cedula: lider.Cedula,
                Nombre: lider.NombreLideres, //NombreLider es Nombre
                Apellido: lider.Apellido,
                Telefono: lider.Telefono,
                Correo: lider.Correo,
                Id_barrio: lider.Id_barrio,
                Id_mesa_votacion: lider.Id_mesa_votacion,
                Id_puesto_votacion: lider.Id_puesto_votacion,
                Id_digitadores: lider.Id_digitadores
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
        this.peticionGetBarrios();
        this.peticionGetMesas();
        this.peticionGetPuestos();
        this.peticionGetDigitadores();
    }
    /*
    componentDidMount() {
        this.peticionGet();
    }
    */

    render() {
        const { form, tipoModal } = this.state;
        return (
            <div className='App'>
                <br />
                <button className='btn btn-success' onClick={() => this.modalInsertar()}>Agregar Lider</button>
                <br /><br />
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Cedula</th>
                            <th>Nombre Lider</th>
                            <th>Apellido</th>
                            <th>Telefono</th>
                            <th>Correo</th>
                            <th>Barrio</th>
                            <th>Mesa votacion</th>
                            <th>Puesto votacion</th>
                            <th>Digitador</th>
                            <th>OPCIONES</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data.map(lider => (
                            <tr key={lider.Cedula}>
                                <td>{lider.Cedula}</td>
                                <td>{lider.NombreLideres}</td> {/* NombreLider es Nombre */}
                                <td>{lider.Apellido}</td>
                                <td>{lider.Telefono}</td> 
                                <td>{lider.Correo}</td>
                                <td>{lider.NombreBarrio}</td>
                                <td>{lider.NumeroMesa}</td>
                                <td>{lider.PuestoVotacion}</td>
                                <td>{lider.NombreDigitador}</td>
                                <td>
                                    <button className="btn btn-primary" onClick={() => { this.seleccionarLider(lider); }}><FontAwesomeIcon icon={faEdit} /></button>
                                    {"   "}
                                    <button className="btn btn-danger" onClick={() => { this.seleccionarLider(lider); this.setState({ modalEliminar: true }) }}><FontAwesomeIcon icon={faTrashAlt} /></button>
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
                            <label htmlFor="Id_barrio">Barrio</label>
                            <select className="form-control" name="Id_barrio" id="Id_barrio" onChange={this.handleChange} value={form ? form.Id_barrio : ''}>
                                <option value="">Seleccione un barrio</option>
                                {this.state.dataB.map(barrio => (
                                    <option key={barrio.Id_barrio} value={barrio.Id_barrio}>{barrio.Nombre_barrio}</option>
                                ))}
                            </select>
                            <br/>
                            <label htmlFor="Id_mesa_votacion">Mesa Votacion</label>
                            <select className="form-control" name="Id_mesa_votacion" id="Id_mesa_votacion" onChange={this.handleChange} value={form ? form.Id_mesa_votacion : ''}>
                                <option value="">Seleccione una mesa de votacion</option>
                                {this.state.dataM.map(mesa => (
                                    <option key={mesa.Id_mesa_votacion} value={mesa.Id_mesa_votacion}>{mesa.Numero}</option>
                                ))}
                            </select>
                            <br/>
                            <label htmlFor="Id_puesto_votacion">Puesto Votacion</label>
                            <select className="form-control" name="Id_puesto_votacion" id="Id_puesto_votacion" onChange={this.handleChange} value={form ? form.Id_puesto_votacion : ''}>
                                <option value="">Seleccione un puesto de votacion</option>
                                {this.state.dataP.map(puesto_v => (
                                    <option key={puesto_v.Id_puesto_votacion} value={puesto_v.Id_puesto_votacion}>{puesto_v.sede}</option>
                                ))}
                            </select>
                            <br/>
                            <label htmlFor="Id_digitadores">Digitador</label>
                            <select className="form-control" name="Id_digitadores" id="Id_digitadores" onChange={this.handleChange} value={form ? form.Id_digitadores : ''}>
                                <option value="">Seleccione un digitador</option>
                                {this.state.dataD.map(digitador => (
                                    <option key={digitador.Id_digitadores} value={digitador.Cedula}>{digitador.NombreDigitador}</option>
                                ))}
                            </select>
                            <br/>
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

export default Lideres;

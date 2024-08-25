import { NavLink } from "react-router-dom";
import "../../style/contacto.css";

const Contacto = () => {
    return (
        <div>
        <section>
            <h2>Información de Contacto</h2>
            <p>Puedes contactarnos a través de los siguientes medios:</p>
            <ul>
                <li>Email: calleja@gmail.com</li>
                <li>Teléfono: +57 320 555 2332</li>
                <li>Dirección: Calle 50, Ciudad: Valledupar, País: Colombia</li>
            </ul>
        </section>

        <section>
            <h2>Formulario de Contacto</h2>
            <form>
                <label htmlFor="nombre">Nombre:</label>
                <input type="text" id="nombre" name="nombre" required />

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required />

                <label htmlFor="mensaje">Mensaje:</label>
                <textarea id="mensaje" name="mensaje" rows="4" required></textarea>

                <button type="submit">Enviar Mensaje</button>
                <NavLink to="/dashboard" id="bt1" className="button">Regresar</NavLink>
            </form>
        </section>
    </div>
    );
};

 
export default Contacto;
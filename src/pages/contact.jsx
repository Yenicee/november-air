import './styles.css';
import React, { useState } from 'react';
import { nameRegex, surnameRegex, phoneRegex, emailRegex } from '../utils/formValidation';

const Contact = () => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [telefono, setTelefono] = useState('');
    const [email, setEmail] = useState('');

    // Estados para los mensajes de error
    const [nombreError, setNombreError] = useState('');
    const [apellidoError, setApellidoError] = useState('');
    const [telefonoError, setTelefonoError] = useState('');
    const [emailError, setEmailError] = useState('');

    const handleFormSubmit = (e) => {
        e.preventDefault();

        // Validación de campos
        if (!nombre.match(nameRegex)) {
            setNombreError('El nombre no es válido.');
        } else {
            setNombreError('');
        }

        if (!apellido.match(surnameRegex)) {
            setApellidoError('El apellido no es válido.');
        } else {
            setApellidoError('');
        }

        if (!telefono.match(phoneRegex)) {
            setTelefonoError('El número de teléfono no es válido.');
        } else {
            setTelefonoError('');
        }

        if (!email.match(emailRegex)) {
            setEmailError('La dirección de correo electrónico no es válida.');
        } else {
            setEmailError('');
        }

        if (
            nombre.match(nameRegex) &&
            apellido.match(surnameRegex) &&
            telefono.match(phoneRegex) &&
            email.match(emailRegex)
        ) {
            // Crear un objeto con los datos del cliente
            const cliente = {
                nombre,
                apellido,
                telefono,
                email,
            };
            // Convertir el objeto en una cadena JSON
            const clienteJSON = JSON.stringify(cliente);

            // Guardar el cliente en localStorage
            localStorage.setItem('cliente', clienteJSON);

            // Limpiar los campos del formulario después de guardar los datos
            setNombre('');
            setApellido('');
            setTelefono('');
            setEmail('');

            alert('Cliente guardado con éxito en localStorage.');
        }
    }

    return (
        <div>
            <h1>Contact</h1>
            <div className='login-box'>
                <form onSubmit={handleFormSubmit}>
                    <div className='user-box'>
                        <input
                            type="text"
                            placeholder="Name"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                        <div className="error-message">{nombreError}</div>
                        <label> Name </label>
                    </div>
                    <div className='user-box'>
                        <input
                            type="text"
                            placeholder="Last Name"
                            value={apellido}
                            onChange={(e) => setApellido(e.target.value)}
                        />
                        <div className="error-message">{apellidoError}</div>
                        <label> Last Name </label>
                    </div>
                    <div className='user-box'>
                        <input
                            type="text"
                            placeholder="Phone"
                            value={telefono}
                            onChange={(e) => setTelefono(e.target.value)}
                        />
                        <div className="error-message">{telefonoError}</div>
                        <label>Phone</label>
                    </div>
                    <div className='user-box'>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <div className="error-message">{emailError}</div>
                        <label>Email</label>
                    </div>

                    <button className='button' type="submit">Send</button>
                </form>
            </div>
        </div>
    );
}

export default Contact;

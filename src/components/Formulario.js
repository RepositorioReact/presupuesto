import React, {useState} from 'react';
import Error from './Error';
import shortid from 'shortid';
import PropTypes from 'prop-types';

const Formulario = ({guardarGasto, guardarCrearGasto}) => {

    //Definir dos states
    const[nombre, guardarNombre] = useState('');//se inicia vacío el string porque al principio no el gasto no tiene nombre
    const[cantidad, guardarCantida] = useState(0);//se inicia en 0 porque al principio no hay cantidad
    const[ error, guardarError ] = useState(false); //se inicia en false porque al inicio no debe haber error

    //Cuando el usuario agrega un gasto
    const agregarGasto = e => {
        e.preventDefault();

        //Validar
        if(cantidad < 1 || isNaN(cantidad) || nombre.trim() === ''){
            guardarError(true);
            return;
        }
        guardarError(false);

        //Construir el gasto
        const gasto = {
            nombre,
            cantidad,
            id: shortid.generate()
        }

        //Pasar el gasto al componente principal
        guardarGasto(gasto);
        guardarCrearGasto(true);//una vez que se genera el gasto pasa a true

        //Resetear el form
        guardarNombre('');
        guardarCantida(0);
    }

    return ( 
        <form
            onSubmit={agregarGasto}
        >
            <h2>Agrega tus gastos</h2>
            {error ? <Error mensaje="Ambos campos son obligatorios o Presupuesto Incorrecto"/> : null}
            <div className="campo">
                <label>Nombre gasto</label>
                <input 
                    type="text"
                    className="u-full-width"
                    placeholder="Ej. Transporte"
                    value={nombre}
                    onChange={e=>guardarNombre(e.target.value)} //esto es lo mismo que definir fuera la función pero más abrebiado
                />
            </div>
            <div className="campo">
                <label>Cantidad gasto</label>
                <input 
                    type="number"
                    className="u-full-width"
                    placeholder="Ej. 300"
                    value={cantidad}
                    onChange={e=>guardarCantida(parseInt(e.target.value, 10))} //esto es lo mismo que definir fuera la función pero más abrebiado
                />
            </div>
            <input 
                type="submit"
                className="button-primary u-full-width"
                value="Agregar gasto"
            />
        </form>
     );
}

Formulario.protType = {
    guardarGasto: PropTypes.func.isRequired,
    guardarCrearGasto: PropTypes.func.isRequired
}
 
export default Formulario;
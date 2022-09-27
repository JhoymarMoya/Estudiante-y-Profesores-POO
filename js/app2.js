const formulario = document.querySelector("#formulario");
const cardEstudiantes = document.querySelector("#cardEstudiantes");
const cardProfesores = document.querySelector("#cardProfesores")
const templateEstudiante = document.querySelector("#templateEstudiante").content;
const templateProfesor = document.querySelector("#templateProfesor").content;
const alert = document.querySelector(".alert");

const fragment = document.createDocumentFragment();
const estudiantes = [];//un array de todos los objetos de estudiante
const profesores = [];


formulario.addEventListener('submit', e => {
    e.preventDefault();
    alert.classList.add("d-none");//alerta 

    const datos = new FormData(formulario);
    const [nombre,edad,correo,carrera,opcion] = [...datos.values()];//Utilizamos Destructo y devuelve un array
    //console.log(nombre,edad,opcion);
    
    // validación de campos vacíos
    if (!nombre.trim() || !edad.trim() || !correo.trim() ||  !carrera.trim() || !opcion.trim()) {
        console.log("Elemento vacío");
        alert.classList.remove("d-none");
        return;
    }
    
    if(opcion === "Estudiante")
    {
        const estudiante = new Estudiante(nombre, edad,correo,carrera);//ese Estudiante es de la clase Estudiante (instancia)
        estudiantes.push(estudiante)//para agregar un nuevo estudiante em el array
        //console.log(estudiantes);

        //como pintarPersonas es estatico lo pondesmo llamar aca y poner de donde viene el metodo
        persona.pintarPersonaUI(estudiantes, opcion);
    }
    
    if(opcion === "Profesor"){
        const profesor = new Profesor(nombre, edad,correo, carrera);
        profesores.push(profesor);
        persona.pintarPersonaUI(profesores, opcion);
    }
});

class persona {//clase constructor 
    constructor(nombre,edad,correo,carrera){
        this.nombre = nombre;
        this.edad = edad;
        this.correo = correo;
        this.carrera = carrera;

        // agregamos uid - con esto  ponemos id aleatorios y se reemplazaria por dataSet-correo y en el evento click
        this.uid = `${Date.now()}`;
    }

    //ahora un metodo para pintar la información

    static pintarPersonaUI(personas, tipo) {
        if(tipo === "Estudiante"){
            cardEstudiantes.textContent = "";//la igualamos a vacio

            personas.forEach(item => {
                fragment.appendChild(item.agregarNuevoEstudiante())//el tiene acceso al metodo agregar estudian te y trae el clone
            });

            cardEstudiantes.appendChild(fragment);
        }

        if(tipo === "Profesor"){
            cardProfesores.textContent = "";

            personas.forEach(item => {
                fragment.appendChild(item.agregarNuevoProfesor())//el tiene acceso al metodo agregar profesores y trae el clone
            });
            cardProfesores.appendChild(fragment);
        }
    }
};

document.addEventListener("click", (e) =>{// delegacion de eventos para botenes aprobar y reprobar
    //console.log(e.target);//prueba de donde hacemos click y que trae.

    console.log(e.target.dataset.uid);//aquí seleccionamos el estudiante especifico por el uid otro modo seria tomarlos por el id del estudiante o docente registrado.

    if(e.target.dataset.uid){//aca modificaremos el estado del estudiante selccionado por el uid
        //console.log(e.target.matches('.btn-success')); //prueba si se dio click en el boton aprobar de un estudiante
        if(e.target.matches('.btn-success')){//si da click en el boton aprobado del estudiante
            estudiantes.map(item => {//recorremos el array estudiantes 
                if(item.uid === e.target.dataset.uid){
                    item.setEstado = true//setEstado es el que modifica el estado
                }
                return item
            });
         
        }

        if(e.target.matches('.btn-danger')){//si da click en el boton aprobado del estudiante
            estudiantes.map(item => {//recorremos el array estudiantes 
                if(item.uid === e.target.dataset.uid){
                    item.setEstado = false//setEstado es el que modifica el estado
                }
                return item
            });
            
        }
        
        persona.pintarPersonaUI(estudiantes, "Estudiante");
    }
    
});

class Estudiante extends persona{
    #estado = false// para saber si aprobo
    #estudiante = "Estudiante";
    
    set setEstado(estado){
        this.#estado = estado;
    }

    get getEstudiante(){
        return this.#estudiante;
    }

    agregarNuevoEstudiante(){//con esto podemos acceder a nuestro template y modificar los datos
        const clone = templateEstudiante.cloneNode(true);

        clone.querySelector('h4 .text-primary').textContent = this.nombre;
        clone.querySelector('h5').textContent = this.getEstudiante;
        clone.querySelector('h7').textContent = "Carrera: "+ this.carrera;
        clone.querySelector('p').textContent = "Edad: "+ this.edad;
        clone.querySelector('h6').textContent = "Correo: "+ this.correo;
        
        if(this.#estado){//botones de aprobar y reprobar
            //con (.className) reemplazamos todas las clases que hay en esa clase saelecionada
            clone.querySelector('.badge').className = 'badge bg-success' //Seleccionamos la clase badge del boton aprobabo en el span y agregamos nuevas clases que seria para aprobado
            clone.querySelector('.btn-success').disabled = true; //desactivamos el boton aprobado
            clone.querySelector('.btn-danger').disabled = false; //activamos el boton reprobado
        }else{
            clone.querySelector('.badge').className = 'badge bg-danger'//agregamos nuevas clases a  reprobado
            clone.querySelector('.btn-danger').disabled = true; //desactivamos el boton reclazado
            clone.querySelector('.btn-success').disabled = false; //Activamos el boton aprobado
        }

        clone.querySelector('.badge').textContent = this.#estado ? "Aprobado" : "Reprobado" //para cabiar el texte dependiendo si del estado si es true = aprobado o false = Reprobado (aca afuera queda dinamico para no hacerlos en el if y el else)

        //agregamos data set de forma dinamica para tomar los botones de los estudiante y dar click en aprobar o reprobar
        clone.querySelector('.btn-success').dataset.uid = this.uid;
        clone.querySelector('.btn-danger').dataset.uid = this.uid; 

        return clone;
    }
}

class Profesor extends persona {
    #profesor = "Profesor";

    agregarNuevoProfesor(){
        
        const clone = templateProfesor.cloneNode(true);

        clone.querySelector('h4').textContent = this.nombre;
        clone.querySelector('h5').textContent = this.#profesor;
        clone.querySelector('h7').textContent = "Carrera: "+ this.carrera;
        clone.querySelector('p').textContent = "Edad: "+ this.edad;
        clone.querySelector('h6').textContent = "Correo: "+ this.correo;
        

        return clone;
    }
    
}
/* POO  */

//no se puede usar funcion de fecha en en un metodo porque falla this
// en JS utilizamos funciones especiales llamadas contructoras para definir objetos y sus caracteristicas
/*  pasos 
1- se necesita una pantilla tiene diferentes propiedades 

*/

/* //funtion constructora = plantilla = class

function Persona(nombre) {
    this.nombre = nombre;

    this.saludar = function() {
        return `${this.nombre} dice hola!`;
    };
}

Persona.prototype.saludarIngles = function() {
    return `${this.nombre} says hi!`;
};

const personaUno = new Persona("Ignacio");
console.log(personaUno.saludarIngles());
 */



//las clase: todos los metodos van directamenten  anidados en prototype y
/* class Persona{
    constructor(nombre){//en nombre va las propiedades
        this.nombre = nombre
    }

    //metodos
    saludar = function() {
        return `${this.nombre} dice hola!`;
    }; 
}

const personaUno = new Persona("Ignacio")
console.log(personaUno.saludar());
*/

//                       get y setter
// el set: solo recibe un parametro
//el get: no recibe parametros

/* class Persona{
    constructor(nombre){//en nombre va las propiedades
        this.nombre = nombre
    }

    get getNombre(){
        return this.nombre;
    }

    set setNombre(nombre){
        this.nombre = nombre;
    }

    //metodos
    saludar = function() {
        return `${this.nombre} dice hola!`;
    };
}

const pesonaUno = new Persona("jhoimar");
pesonaUno.setNombre = "julian"//el nombre por el cual vamos a cambiar
console.log(pesonaUno);
 */
/* 
class Persona {
    constructor(nombre, libros) {
        this.nombre = nombre;
        this.libros = libros || [];
    }

    // setter
    set setLibro(libro) {
        this.libros.push(libro);
    }

    // getter
    get getLibros() {
        return this.libros;
    }

    // método
    buscarLibroPorTitulo(titulo) {
        return this.libros.find((item) => item.titulo === titulo);
    }
}

const personaUno = new Persona("Ignacio");
personaUno.setLibro = { titulo: "Papelucho", autor: "Marcela Paz" };
personaUno.setLibro = {
    titulo: "El principito",
    autor: "Antoine de Saint-Exupéry",
};

console.log(personaUno.buscarLibroPorTitulo("Papelucho"));

console.log(personaUno.getLibros);
 */


/* static: La palabra clave static define un método estático para una clase.
    Los métodos estáticos son llamados sin instanciar su clase y no pueden ser llamados mediante una instancia de clase.
    Los métodos estáticos son a menudo usados para crear funciones de utilidad para una aplicación. */
/* 
class Persona2 {

    static probarSaludo(nombre) {
        return `${nombre} está saludando`;
    }
}

console.log(Persona2.probarSaludo("juanito")); */


/* class Persona {
    constructor(nombre, edad) {
        this.nombre = nombre;
        this.edad = edad;
    }

    saludar() {
        return `${this.nombre} está saludando`;
    }

    static probarSaludo(nombre) {
        return `${nombre} está saludando`;
    }
}


class Estudiante extends Persona {//con extends obtenemos todod las propiedades y metodos que tiene la clase persona
//Si un método tiene el mismo nombre se sobrescribe:
saludar() {
    return `${this.nombre} es un estudiante saludando`;
}
}
const juanito = new Estudiante("juanito", 55);
console.log(juanito.saludar()); */

//para agregar propiedades a la clase estudiante se debe utilizar super

class Persona {
    constructor(nombre, edad) {
        this.nombre = nombre;
        this.edad = edad;
    }

    saludar() {
        return `${this.nombre} está saludando`;
    }

    static probarSaludo(nombre) {
        return `${nombre} está saludando`;
    }
}

class Estudiante extends Persona {
    constructor(nombre, edad, notas = []) {
        super(nombre, edad);
        this.notas = notas;
    }

    set setNotas(nota) {
        this.notas.push(nota);
    }

    get getNotas() {
        return this.notas;
    }

    saludar() {
        return `${this.nombre} es un estudiante saludando`;
    }
}

const juanito = new Estudiante("juanito", 55);

juanito.setNotas = 3;
juanito.setNotas = 5;
juanito.setNotas = 7;

console.log(juanito. getNotas);



/* 
private class
Las propiedades de la clase son públicas de forma predeterminada y se pueden examinar o modificar fuera de la clase.
Sin embargo, existe una propuesta experimental para permitir la definición de campos de clase privados utilizando un #prefijo hash  */

class Persona {
    constructor(nombre, edad) {
        this.nombre = nombre;
        this.edad = edad;
    }

    saludar() {
        return `${this.nombre} está saludando`;
    }

    static probarSaludo(nombre) {
        return `${nombre} está saludando`;
    }
}
class Estudiante extends Persona {
    #notas = [];

    set setNotas(nota) {
        this.#notas.push(nota);
    }

    get getNotas() {
        return this.#notas;
    }
}

const juanito = new Estudiante("juanito", 55);

// Error: Private field '#notas'
console.log(juanito.#notas);

juanito.setNotas = 3;
juanito.setNotas = 5;
juanito.setNotas = 7;

console.log(juanito.getNotas);

/* ============================================================
   Ejercicios de TypeScript
   Juan Manuel Moreno Muñoz
   Desarrollo de Aplicaciones Web — Universidad de Medellín
   ============================================================ */


/* ------------------------------------------------------------
   Ejercicio 1
   Crear un array con 5 nombres de estudiantes y mostrar cada
   nombre en consola usando un ciclo.
   ------------------------------------------------------------ */

const nombresEstudiantes: string[] = [
    "Ana Gómez",
    "Carlos Ramírez",
    "Diana Torres",
    "Esteban Muñoz",
    "Laura Restrepo"
];

console.log("--- Ejercicio 1: nombres de los estudiantes ---");

for (const nombre of nombresEstudiantes) {
    console.log(nombre);
}


/* ------------------------------------------------------------
   Ejercicio 2
   Imprimir cuántos estudiantes hay en el arreglo.
   ------------------------------------------------------------ */

console.log("\n--- Ejercicio 2: cantidad de estudiantes ---");
console.log(`Hay ${nombresEstudiantes.length} estudiantes.`);


/* ------------------------------------------------------------
   Ejercicio 3
   Crear un array de números y calcular la suma total.
   ------------------------------------------------------------ */

const numeros: number[] = [12, 87, 45, 96, 30, 64, 51, 8, 73, 22];

const sumaNumeros: number = numeros.reduce(
    (acumulado, actual) => acumulado + actual,
    0
);

console.log("\n--- Ejercicio 3: suma del array ---");
console.log("Array:", numeros);
console.log(`Suma total: ${sumaNumeros}`);


/* ------------------------------------------------------------
   Ejercicio 4
   Crear un array de números (mínimo 1500) y calcular la suma
   total, usando valores aleatorios.
   ------------------------------------------------------------ */

const CANTIDAD_ALEATORIOS: number = 1500;
const numerosAleatorios: number[] = [];

for (let i = 0; i < CANTIDAD_ALEATORIOS; i++) {
    // Math.random() devuelve un decimal entre 0 y 0.999...
    // Multiplicado por 100 da un rango de 0 a 99.9, y Math.round
    // lo redondea al entero más cercano.
    const aleatorio: number = Math.round(Math.random() * 100);
    numerosAleatorios.push(aleatorio);
}

const sumaAleatorios: number = numerosAleatorios.reduce(
    (acumulado, actual) => acumulado + actual,
    0
);

console.log("\n--- Ejercicio 4: suma de 1500 números aleatorios ---");
console.log(`Cantidad de números generados: ${numerosAleatorios.length}`);
console.log(`Suma total: ${sumaAleatorios}`);


/* ------------------------------------------------------------
   Ejercicio 5
   Calcular el promedio de los números del punto 3.
   ------------------------------------------------------------ */

const promedioNumeros: number = sumaNumeros / numeros.length;

console.log("\n--- Ejercicio 5: promedio del array del punto 3 ---");
console.log(`Promedio: ${promedioNumeros.toFixed(2)}`);


/* ------------------------------------------------------------
   Ejercicio 6
   Imprimir los números mayores a 50 del punto 3.
   ------------------------------------------------------------ */

const mayoresA50: number[] = numeros.filter((numero) => numero > 50);

console.log("\n--- Ejercicio 6: números mayores a 50 ---");
console.log(mayoresA50);


/* ------------------------------------------------------------
   Ejercicio 7
   Crear un objeto de persona con nombre, edad y ciudad,
   e imprimir sus valores.
   ------------------------------------------------------------ */

interface Persona {
    nombre: string;
    edad: number;
    ciudad: string;
}

const persona: Persona = {
    nombre: "Juan Manuel Moreno",
    edad: 19,
    ciudad: "Medellín"
};

console.log("\n--- Ejercicio 7: datos de la persona ---");
console.log(`Nombre: ${persona.nombre}`);
console.log(`Edad: ${persona.edad}`);
console.log(`Ciudad: ${persona.ciudad}`);


/* ------------------------------------------------------------
   Ejercicio 8
   Crear un array de productos (nombre y precio) e imprimirlos.
   ------------------------------------------------------------ */

interface Producto {
    nombre: string;
    precio: number;
}

const productos: Producto[] = [
    { nombre: "Teclado mecánico", precio: 250000 },
    { nombre: "Mouse inalámbrico", precio: 90000 },
    { nombre: "Monitor 24 pulgadas", precio: 780000 },
    { nombre: "Audífonos", precio: 150000 },
    { nombre: "Memoria USB 64GB", precio: 45000 }
];

console.log("\n--- Ejercicio 8: lista de productos ---");

for (const producto of productos) {
    console.log(`${producto.nombre}: $${producto.precio.toLocaleString("es-CO")}`);
}


/* ------------------------------------------------------------
   Ejercicio 9
   Encontrar el producto con mayor precio e imprimirlo.
   ------------------------------------------------------------ */

const productoMasCaro: Producto = productos.reduce(
    (masCaro, actual) => (actual.precio > masCaro.precio ? actual : masCaro)
);

console.log("\n--- Ejercicio 9: producto más caro ---");
console.log(
    `${productoMasCaro.nombre}: $${productoMasCaro.precio.toLocaleString("es-CO")}`
);


/* ------------------------------------------------------------
   Ejercicio 10
   Agregar la cantidad de unidades disponibles a cada producto
   y calcular el valor total del inventario.
   ------------------------------------------------------------ */

// La interfaz extiende Producto: hereda nombre y precio,
// y le suma la propiedad unidades.
interface ProductoInventario extends Producto {
    unidades: number;
}

const unidadesPorProducto: number[] = [12, 30, 5, 18, 50];

const inventario: ProductoInventario[] = productos.map((producto, indice) => ({
    ...producto,
    unidades: unidadesPorProducto[indice]
}));

const valorTotalInventario: number = inventario.reduce(
    (total, producto) => total + producto.precio * producto.unidades,
    0
);

console.log("\n--- Ejercicio 10: inventario ---");

for (const producto of inventario) {
    const subtotal: number = producto.precio * producto.unidades;
    console.log(
        `${producto.nombre} | ${producto.unidades} unidades | ` +
        `subtotal: $${subtotal.toLocaleString("es-CO")}`
    );
}

console.log(
    `Valor total del inventario: $${valorTotalInventario.toLocaleString("es-CO")}`
);


/* ------------------------------------------------------------
   Ejercicio 11
   Array de estudiantes con nombre, semestre y un array de
   materias (nombre y nota). Calcular el promedio de cada
   estudiante y el promedio general.
   ------------------------------------------------------------ */

interface Materia {
    nombre: string;
    nota: number;
}

interface Estudiante {
    nombre: string;
    semestre: number;
    materias: Materia[];
}

const estudiantes: Estudiante[] = [
    {
        nombre: "Ana Gómez",
        semestre: 5,
        materias: [
            { nombre: "Desarrollo Web", nota: 4.5 },
            { nombre: "Bases de Datos", nota: 3.8 },
            { nombre: "Estadística", nota: 4.2 }
        ]
    },
    {
        nombre: "Carlos Ramírez",
        semestre: 4,
        materias: [
            { nombre: "Desarrollo Web", nota: 3.0 },
            { nombre: "Bases de Datos", nota: 2.9 },
            { nombre: "Estadística", nota: 3.4 }
        ]
    },
    {
        nombre: "Diana Torres",
        semestre: 6,
        materias: [
            { nombre: "Desarrollo Web", nota: 4.8 },
            { nombre: "Bases de Datos", nota: 4.6 },
            { nombre: "Estadística", nota: 4.9 }
        ]
    },
    {
        nombre: "Esteban Muñoz",
        semestre: 5,
        materias: [
            { nombre: "Desarrollo Web", nota: 3.2 },
            { nombre: "Bases de Datos", nota: 3.5 },
            { nombre: "Estadística", nota: 3.1 }
        ]
    }
];

// Función que recibe un estudiante y devuelve su promedio.
// El ": number" después de los paréntesis es el tipo de retorno.
function calcularPromedio(estudiante: Estudiante): number {
    const sumaNotas: number = estudiante.materias.reduce(
        (acumulado, materia) => acumulado + materia.nota,
        0
    );
    return sumaNotas / estudiante.materias.length;
}

console.log("\n--- Ejercicio 11: promedios ---");

const promedios: number[] = [];

for (const estudiante of estudiantes) {
    const promedio: number = calcularPromedio(estudiante);
    promedios.push(promedio);
    console.log(
        `${estudiante.nombre} (semestre ${estudiante.semestre}): ` +
        `${promedio.toFixed(2)}`
    );
}

const promedioGeneral: number =
    promedios.reduce((acumulado, actual) => acumulado + actual, 0) /
    promedios.length;

console.log(`Promedio general del grupo: ${promedioGeneral.toFixed(2)}`);


/* ------------------------------------------------------------
   Ejercicio 12
   Imprimir el nombre de los estudiantes con promedio mayor a 3.5.
   ------------------------------------------------------------ */

const destacados: Estudiante[] = estudiantes.filter(
    (estudiante) => calcularPromedio(estudiante) > 3.5
);

console.log("\n--- Ejercicio 12: estudiantes con promedio mayor a 3.5 ---");

if (destacados.length === 0) {
    console.log("Ningún estudiante supera el promedio de 3.5.");
} else {
    for (const estudiante of destacados) {
        console.log(
            `${estudiante.nombre} — ${calcularPromedio(estudiante).toFixed(2)}`
        );
    }
}
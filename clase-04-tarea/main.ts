class Empleado{
    nombre : string
    sueldo : number
    fecha_de_contratacion : string
    id_empleado : number
    tipo : Puesto

    constructor (nombre : string, sueldo : number, fecha_de_contratacion : string, id_empleado : number, tipo : Puesto){
        this.nombre = nombre
        this.sueldo = sueldo
        this.fecha_de_contratacion = fecha_de_contratacion
        this.id_empleado = id_empleado
        this.tipo = tipo
    }
}

type Puesto =  'Developer' | 'Designer' | 'Marketing' | 'Proyect Manager' | 'HR' 

class ManejadorEmpleados{
    empleados : Empleado[]
    id_manejador : number 
    tipos_permitidos: string[]
    contador_id: number

    constructor(id_manejador : number){
        this.empleados = []
        this.id_manejador = id_manejador
        this.tipos_permitidos = ['Project Manager', 'Developer', 'Disigner', 'Marketing']
        this.contador_id = 1
    }

    agregarEmpleado(nombre : string, sueldo : number, fecha_de_contratacion : string, tipo : Puesto) : void {
        if(!this.tipos_permitidos.includes(tipo)){
            console.error('Error: El tipo de empleado no es valido.')
        }
        else{
        const nuevo_empleado : Empleado = new Empleado (nombre, sueldo, fecha_de_contratacion, this.contador_id++, tipo)
        this.empleados.push(nuevo_empleado)
        console.log('Empleado agregado con exito') 
        }
    }
    obtenerEmpleadoPorId(id_empleado: number) : Empleado | null {
        const empleado : Empleado | undefined = this.empleados.find(
            (empleado : Empleado ) : boolean => empleado.id_empleado === id_empleado
        );

        if (empleado) {
            return empleado
        } else {
            return null
        }
    }

    obtenerEmpleadosPorTipo(tipo: string) {
        const empleados_filtrados = this.empleados.filter(empleado => empleado.tipo === tipo);
        if (empleados_filtrados.length > 0) {
            console.log(`Empleados de tipo "${tipo}":`);
            empleados_filtrados.forEach(empleado => {
                console.log(`- ID: ${empleado.id_empleado}, Nombre: ${empleado.nombre}, Sueldo: ${empleado.sueldo}`);
            });
        } else {
            console.log(`No se encontraron empleados de tipo "${tipo}".`);
        }
    }

}

const manejador_empleados : ManejadorEmpleados = new ManejadorEmpleados(1)
manejador_empleados.agregarEmpleado('pepe', 3000000, '19/05/23', 'Developer' )
manejador_empleados.agregarEmpleado('sara', 500000, '27/05/23','Designer')
manejador_empleados.agregarEmpleado('Maria', 1000000, '12/07/24','Developer')
manejador_empleados.agregarEmpleado('Diego', 900000, '16/05/24','Marketing')
manejador_empleados.agregarEmpleado('Doroty', 900000, '24/10/23','Marketing')
manejador_empleados.agregarEmpleado('Gabriela', 1000000, '30/06/23','Developer')
manejador_empleados.agregarEmpleado('Laura', 500000, '06/09/23','Designer')
manejador_empleados.obtenerEmpleadoPorId(3)
manejador_empleados.obtenerEmpleadosPorTipo('Developers')


/* 
obtenerEmpleadoPorId(id_empleado : number ){
    const empleado : Empleado | undefined = this.empleados.find((empleado : Empleado) : boolean => empleado.id_empleado === id_empleado)
    for(const empleado of this.empleados){
        if (id_empleado === empleado.id_empleado){
            console.log (empleado)
        }
        else{
            console.log('no se encontraro ningun empleado con ese ID')
        }
    }
}
obtenerEmpleadosPorTipo(tipo : string){
    for(const empleado of this.empleados){
        if (tipo === empleado.tipo){
            console.log (empleado)
        }
        else{
            console.log('no se encontraro ningun empleado con ese tipo')
        }
    }
} 
*/
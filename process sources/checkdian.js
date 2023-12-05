// Importar los módulos necesarios de la biblioteca camunda-external-task-client-js
import { Client, Variables, logger } from "camunda-external-task-client-js";

// Objeto de configuración para el Cliente de Tareas Externas de Camunda
const config = { baseUrl: "http://localhost:8080/engine-rest", use: logger };

// Crear una instancia del Cliente de Tareas Externas de Camunda con la configuración especificada
const client2 = new Client(config);

// Suscribirse al tipo de tarea "SendLetter" y definir la función a ejecutar cuando se recibe una tarea
client2.subscribe("codeAssignment", async function({ task, taskService }) {

    const ID_client = task.variables.get("id_estudiante");  //Traer el cc del cliente 

    //Crear arreglo con la respuesta de la consulta a la BD
    const conname = "FelipeAbello"+ID_client;

    // Verificar si la variable está en el arreglo y devolver un booleano
    
    console.log(conname);

    // Crear un objeto Variables para almacenar variables del proceso
    const variableProcesada = new Variables();
    
    variableProcesada.set("DIANCode",conname);
    
    // Completar la tarea, proporcionando las variables del proceso
    await taskService.complete(task, variableProcesada);
});

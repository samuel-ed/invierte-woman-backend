/**
 * reminder router
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreRouter('api::reminder.reminder');


// const defaultRouter = factories.createCoreRouter("api::reminder.reminder");

/*
export default factories.createCoreRouter('api::reminder.reminder', {
  config: {
    find: {
      auth: false, // Configuración opcional para cada endpoint
    },
  },
  only: ['find', 'findOne', 'create', 'update', 'delete'], // Controla qué endpoints se exponen
  except: [], // Excluye ciertos endpoints
  prefix: '',
  
  
  // routes: [
  //   {
  //     method: "GET",
  //     path: "/reminders/me/:id",
  //     handler: "reminder.userReminder",
  //     config: {
  //       auth: {
  //         // Cambiamos 'true' por un objeto de configuración
  //         // required: true, // Esto asegura que el endpoint esté protegido
  //       },
  //     },
  //   },
  // ],
});
*/

/* 
export default {
  routes: [
    {
      method: "GET",
      path: "/reminders/me",
      handler: "reminder.userReminders",
      config: {
        auth: {
          // Cambiamos 'true' por un objeto de configuración
          // required: true, // Esto asegura que el endpoint esté protegido
        },
      },
    },
    {
      method: "GET",
      path: "/reminders/me/:id",
      handler: "reminder.userReminder",
      config: {
        auth: {
          // Cambiamos 'true' por un objeto de configuración
          // required: true, // Esto asegura que el endpoint esté protegido
        },
      },
    },
    {
      method: "POST",
      path: "/reminders/me",
      handler: "reminder.create", // Esto es la ruta para crear un nuevo Reminder
      config: {
        auth: {
          // required: true, // Solo usuarios autenticados pueden crear un Reminder
        },
      },
    },
  ],
};
 */
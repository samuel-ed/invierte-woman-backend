/**
 * profile router
 */

import { factories } from '@strapi/strapi';

// export default factories.createCoreRouter('api::profile.profile');

// export default factories.createCoreRouter('api::profile.profile', {
//   config: {
//     findProfile: {
//       auth: { scope: ['authenticated'] }, // Requiere autenticación
//       policies: ['plugins::users-permissions.isAuthenticated'],
//     },
//   },
// });

// export default {
//   routes: [
//     {
//       method: 'GET',
//       path: '/profiles/me',  // Ruta personalizada
//       handler: 'profile.findProfile',  // Acción en el controlador
//       config: {
//         auth: { scope: ['authenticated'] },  // Solo accesible para usuarios autenticados
//         policies: ['plugins::users-permissions.isAuthenticated'],  // Asegura que el usuario esté autenticado
//       },
//     },
//   ],
// };

export default {
  routes: [
    {
      method: 'GET',
      path: '/profiles/me',  // Ruta personalizada
      handler: 'profile.findProfile',  // Acción en el controlador
      config: {
        // auth: { scope: ['authenticated'] },  // Solo accesible para usuarios autenticados
        // policies: ['users-permissions.isAuthenticated'],  // Asegura que el usuario esté autenticado
      },
    },
    {
      method: 'PUT',
      path: '/profiles/me',  // Ruta personalizada para el perfil del usuario logueado
      handler: 'profile.updateProfile',  // El controlador que manejará la actualización
      config: {
        // auth: { scope: ['authenticated'] },  // Solo accesible para usuarios autenticados
        // policies: ['users-permissions.isAuthenticated'],  // Asegura que el usuario esté autenticado
      },
    },
  ],
};
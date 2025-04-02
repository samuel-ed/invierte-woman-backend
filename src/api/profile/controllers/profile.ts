/**
 * profile controller
 */

// import { factories } from '@strapi/strapi'

// export default factories.createCoreController('api::profile.profile');

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::profile.profile', ({ strapi }) => ({
  async findProfile(ctx) {
    try {
      // Obtener el ID del usuario desde el token JWT
      const userId = ctx.state.user.id;

      // Buscar el perfil del usuario en la base de datos
      const profile = await strapi.db.query('api::profile.profile').findOne({
        where: { user: userId },
      });

      if (!profile) {
        return ctx.throw(404, 'Perfil no encontrado');
      }

      // Retornar los datos del perfil
      return profile;
    } catch (error) {
      return ctx.throw(500, 'Error al obtener el perfil');
    }
  },
  
  async updateProfile(ctx) {
    try {
      const user = ctx.state.user;

      if (!user) {
        return ctx.unauthorized('No estás autenticado');
      }

      const profile = await strapi.db.query('api::profile.profile').findOne({
        where: { user: user.id },
      });
			console.log('profile: ', profile);
      if (!profile || !profile.id) {
        return ctx.notFound('Perfil no encontrado para el usuario');
      }

      const { name, lastname, age } = ctx.request.body;
      
      const updatedProfile = await strapi.db.query('api::profile.profile').update({
        where: { id: profile.id },
        data: {
          name,
          lastname,
          age,
        },
      });

      if (!updatedProfile) {
        return ctx.throw(500, 'Error al actualizar el perfil');
      }

      return ctx.send({ data: updatedProfile });
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
      return ctx.internalServerError('Error al actualizar el perfil');
    }
  },
}));

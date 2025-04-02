/**
 * A set of functions called "actions" for `user-reminders`
 */

export default {

  async find(ctx) {
		try {
			const user = ctx.state.user;
	
			if (!user) {
				return ctx.unauthorized("You must be logged in");
			}
	
			
			const reminders = await strapi.db.query("api::reminder.reminder").findMany({
				where: { users_permissions_user: user.id, publishedAt: {
					$ne: null,  // Filtra aquellos con un valor de publishedAt (es decir, los publicados)
				},  },
				populate: {
					reminder_image: {
						populate: {
							media_src: true, // Solo cargamos la URL de la imagen
						}
					},
					reminder_schedules: {
						populate: {
							week_days: true, // Si necesitas los días de la semana asociados
						}
					},
					// users_permissions_user: true, // Para incluir el usuario relacionado
				},
				
			});
	
			// Transformar los datos para devolver solo lo necesario
			const remindersWithDetails = reminders.map(reminder => {
				return {
					id: reminder.id,
					title: reminder.title,
					description: reminder.description,
					imageUrl: reminder.reminder_image?.media_src?.url || null, // Solo la URL de la imagen
					reminder_schedules: reminder.reminder_schedules.map(schedule => ({
						id: schedule.id,
						time: schedule.time,
						week_days: schedule.week_days.map(day => day.Name),
					})),
					// user: {
					// 	id: reminder.users_permissions_user.id,
					// 	username: reminder.users_permissions_user.username,
					// 	email: reminder.users_permissions_user.email,
					// },
				};
			});
	
			return ctx.send(remindersWithDetails);
		} catch (error) {
			console.error("Error retrieving reminders:", error);
			ctx.throw(500, "Error retrieving reminders");
		}
	},
	
	// Nuevo endpoint para obtener un solo reminder por ID
  async findOne(ctx) {
    try {
      const user = ctx.state.user;
      const { id } = ctx.params;

      if (!user) {
        return ctx.unauthorized("You must be logged in");
      }

      // Buscar el recordatorio por ID y cargar las relaciones necesarias
      const reminder = await strapi.db.query("api::reminder.reminder").findOne({
        where: { 
          id,
          users_permissions_user: user.id,  // Aseguramos que el recordatorio pertenezca al usuario logueado
          publishedAt: {
            $ne: null,  // Filtra aquellos con un valor de publishedAt
          },
        },
        populate: {
          reminder_image: {
            populate: {
              media_src: true, // Solo cargamos la URL de la imagen
            }
          },
          reminder_schedules: {
            populate: {
              week_days: true, // Si necesitas los días de la semana asociados
            }
          },
        },
      });

      if (!reminder) {
        return ctx.notFound("Reminder not found");
      }

      // Transformar los datos para devolver solo lo necesario
      const reminderWithDetails = {
        id: reminder.id,
        title: reminder.title,
        description: reminder.description,
        imageUrl: reminder.reminder_image?.media_src?.url || null, // Solo la URL de la imagen
        reminder_schedules: reminder.reminder_schedules.map(schedule => ({
          id: schedule.id,
          time: schedule.time,
          week_days: schedule.week_days.map(day => day.Name),
        })),
      };

      return ctx.send(reminderWithDetails);
    } catch (error) {
      console.error("Error retrieving the reminder:", error);
      ctx.throw(500, "Error retrieving the reminder");
    }
  },
  
  async create(ctx) {
    // return ctx.request.body;
    // 🔹 Validar que el usuario esté autenticado
    if (!ctx.state.user) {
      return ctx.unauthorized('You must be logged in to create a reminder.');
    }

    try {
      const { title, description, reminder_image, schedules } = ctx.request.body;

      // 🔹 Crear el Reminder en la base de datos
      const reminder = await strapi.db.query('api::reminder.reminder').create({
        data: {
          title,
          description,
          users_permissions_user: ctx.state.user.id, // Asignar el usuario autenticado
          // reminder_image: reminder_image ? { connect: { id: reminder_image } } : undefined,
          reminder_image: reminder_image,
          reminder_schedules: [],
        },
        populate: ['reminder_image'],
      });

      // 🔹 Crear los ReminderSchedules con WeekDays
      // if (schedules && schedules.length > 0) {
      //   for (const schedule of schedules) {
      //     const { time, week_days } = schedule;
      //     await strapi.db.query('api::reminder-schedule.reminder-schedule').create({
      //       data: {
      //         time,
      //         reminder: { connect: { id: reminder.id } },
      //         week_days: week_days.map((dayId: number) => ({ connect: { id: dayId } })),
      //       },
      //       populate: ['week_days'],
      //     });
      //   }
      // }

      return ctx.created({ message: 'Reminder created successfully', reminder });
    } catch (error) {
      return ctx.internalServerError(`Error creating reminder ${error}`, { error });
    }
  },
};

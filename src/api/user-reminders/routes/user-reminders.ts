export default {
  routes: [
    {
      method: "GET",
      path: "/user-reminders",
      handler: "user-reminders.find",
      config: {
        auth: {
          required: true,
        },
      },
    },
    {
      method: "GET",
      path: "/user-reminders/:id",
      handler: "user-reminders.findOne",
      config: {
        auth: {
          required: true,
        },
      },
    },
    {
      method: "POST",
      path: "/user-reminders",
      handler: "user-reminders.create",
      config: {
        auth: {
          required: true, 
        },
      },
    },
  ]
};

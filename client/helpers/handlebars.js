Handlebars.registerHelper('isAdmin', function() {
  return Meteor.user() && Meteor.user().services.google.email == 'stuart.nelson@neo.com';
});

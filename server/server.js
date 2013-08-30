Accounts.validateNewUser(function(user) {
  // beef up this regex?
  if (user['services']['google']['email'].search(/@neo.com$/) > 0)
    return true;
  throw new Meteor.Error(403, "You need to have a neo.com email address!");
});

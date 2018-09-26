import { Meteor } from 'meteor/meteor';

import "../imports/api/orders";


Meteor.startup(() => {
  // code to run on server at startup
    Roles.addUsersToRoles("vYDX7rXKLAGz3goQ5", 'minorista');
    Roles.addUsersToRoles("EXS6xFMfYgBJr2uhw", 'minorista');
    Roles.addUsersToRoles("wffmGJDABgWhDboWT", 'minorista');
    Roles.addUsersToRoles("PqL5L8egzgvwGbQ2E", 'minorista');

    Roles.addUsersToRoles("ChZWr6iwZLS4aeByn", 'planta');

    Roles.addUsersToRoles("9Fxm5cRTnLc5vm3YD", 'cd');

    Roles.addUsersToRoles("otX2zZL9HiH7nPap9", 'admin');

});

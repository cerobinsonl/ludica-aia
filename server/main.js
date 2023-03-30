import { Meteor } from 'meteor/meteor';

import "../imports/api/orders";


Meteor.startup(() => {
  // code to run on server at startup
    Roles.setUserRoles("vYDX7rXKLAGz3goQ5", 'minorista');
    Roles.setUserRoles("EXS6xFMfYgBJr2uhw", 'minorista');
    Roles.setUserRoles("wffmGJDABgWhDboWT", 'minorista');
    Roles.setUserRoles("PqL5L8egzgvwGbQ2E", 'minorista');

    Roles.setUserRoles("ChZWr6iwZLS4aeByn", 'planta');

    Roles.setUserRoles("9Fxm5cRTnLc5vm3YD", 'cd');

    Roles.setUserRoles("otX2zZL9HiH7nPap9", 'admin');

});

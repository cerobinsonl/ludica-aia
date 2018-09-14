import { Meteor } from 'meteor/meteor';

import "../imports/api/orders";


Meteor.startup(() => {
  // code to run on server at startup
    Roles.addUsersToRoles("Wom68RPx8ddp2yDdP", 'minorista');
    Roles.addUsersToRoles("wTud3im676K6yCqom", 'minorista');
    Roles.addUsersToRoles("ZcadozYcZwfeucSHk", 'minorista');
    Roles.addUsersToRoles("w25F9AETjRreyrvyE", 'minorista');

    Roles.addUsersToRoles("4uSwX3p3fwzpJFff3", 'planta');

    Roles.addUsersToRoles("rGiCZSWYL4MqCaBEr", 'cd');

    Roles.addUsersToRoles("Tfs6C5Z2yZzhg7syQ", 'admin');
});

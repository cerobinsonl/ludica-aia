import { Meteor } from 'meteor/meteor';

import "../imports/api/orders";


Meteor.startup(() => {
  // code to run on server at startup
    Roles.addUsersToRoles("BYoSKArdEhoqTvCGJ", 'minorista');
    Roles.addUsersToRoles("h89m9k9Yk5YCy7K6Z", 'minorista');
    Roles.addUsersToRoles("YvFfSJzPRh6MvsbQh", 'minorista');
    Roles.addUsersToRoles("tR4vi5GeAtQBrcdfN", 'minorista');

    Roles.addUsersToRoles("m3FfBFQm5aB5ShPtr", 'planta');

    Roles.addUsersToRoles("rpHJu3ghHub5FfrFD", 'cd');
});

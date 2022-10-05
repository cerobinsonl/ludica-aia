import { Meteor } from 'meteor/meteor';

import "../imports/api/orders";


Meteor.startup(() => {
  // code to run on server at startup
    Roles.setUserRoles("nA3mpTyp82cvoB5H9", 'minorista');
    Roles.setUserRoles("B6kAnGu9ENkkXzWGH", 'minorista');
    Roles.setUserRoles("LW3rg7druqbRhiRJg", 'minorista');
    Roles.setUserRoles("Y8v9uEtjNJkKvN2wa", 'minorista');

    Roles.setUserRoles("gv8SmrruDGRDC3ocn", 'planta');

    Roles.setUserRoles("TwcxoPqK3sAjfrHkk", 'cd');

    Roles.setUserRoles("vhC8zvthpMR33joGf", 'admin');

});

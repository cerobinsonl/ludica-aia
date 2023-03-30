import { Meteor } from 'meteor/meteor';

import "../imports/api/orders";


Meteor.startup(() => {
  // code to run on server at startup
<<<<<<< HEAD
    Roles.setUserRoles("vYDX7rXKLAGz3goQ5", 'minorista');
    Roles.setUserRoles("EXS6xFMfYgBJr2uhw", 'minorista');
    Roles.setUserRoles("wffmGJDABgWhDboWT", 'minorista');
    Roles.setUserRoles("PqL5L8egzgvwGbQ2E", 'minorista');

    Roles.setUserRoles("ChZWr6iwZLS4aeByn", 'planta');

    Roles.setUserRoles("9Fxm5cRTnLc5vm3YD", 'cd');

    Roles.setUserRoles("otX2zZL9HiH7nPap9", 'admin');
=======
    Roles.setUserRoles("nA3mpTyp82cvoB5H9", 'minorista');
    Roles.setUserRoles("B6kAnGu9ENkkXzWGH", 'minorista');
    Roles.setUserRoles("LW3rg7druqbRhiRJg", 'minorista');
    Roles.setUserRoles("Y8v9uEtjNJkKvN2wa", 'minorista');

    Roles.setUserRoles("gv8SmrruDGRDC3ocn", 'planta');

    Roles.setUserRoles("TwcxoPqK3sAjfrHkk", 'cd');

    Roles.setUserRoles("vhC8zvthpMR33joGf", 'admin');
>>>>>>> 26cbfdd615cc98c27ae3fad4df01c21958e31f91

});

import { Mongo } from "meteor/mongo";
import {Meteor} from "meteor/meteor";
import {check} from "meteor/check";


export const Orders = new Mongo.Collection("orders");

if (Meteor.isServer) {
    Meteor.publish("Orders", () => {
        return Orders.find({});
    });
}

Meteor.methods({
    "orders.insert"(amount){
        check(amount, Number);

        //Make sure the user is logged in before inserting a comment
        if(!this.userId){
            throw new Meteor.Error("Not-authorized");
        }
        let provider, providerEmail;
        if (Roles.userIsInRole(this.userId, "cd")){
            provider = "ChZWr6iwZLS4aeByn";
            providerEmail = "planta@ua.com";
        }
        else if (Roles.userIsInRole(this.userId, "minorista")){
            provider = "9Fxm5cRTnLc5vm3YD";
            providerEmail = "cd@ua.com";
        }
        Orders.insert({
            createdAt: new Date().valueOf(),
            provider,
            providerEmail,
            client: this.userId,
            clientEmail: Meteor.user().emails[0].address,
            amount,
            answered:false,
            result:false,
            expired:false,
            acceptedAt: 0,
            declinedAt: 0
        });
    },
    "orders.accept"(id){
        const order = Orders.find({_id:id}).fetch();

        if(order.length>0){
            let obj = order[0];
            Orders.update(obj._id, {
                $set: { answered:true, result:true, acceptedAt: new Date().valueOf() },});
        }
    },
    "orders.decline"(id){
        const order = Orders.find({_id:id}).fetch();

        if(order.length>0){
            let obj = order[0];
            Orders.update(obj._id, {
                $set: { answered:true, result:false, declinedAt: new Date().valueOf()},});
        }
    },
    "orders.checkExpired"(expirationTime){
        const orders = Orders.find({}).fetch();
        const currentTime = new Date().valueOf()
        orders.forEach((order)=>{
            if ((currentTime-order.createdAt)>expirationTime){
                if (!order.answered){
                    Orders.update(order._id, {
                        $set: { expired:true },});
                }
            }
        })
    },
    "orders.delete"(){
        Orders.remove({});
    },
    "orders.simulate"(){
        const minoristas = [
            {
                id: "PqL5L8egzgvwGbQ2E",
                email: "minorista1@ua.com"
            },
            {
                id: "wffmGJDABgWhDboWT",
                email: "minorista2@ua.com"
            },
            {
                id: "EXS6xFMfYgBJr2uhw",
                email: "minorista3@ua.com"
            },
            {
                id: "vYDX7rXKLAGz3goQ5",
                email: "minorista4@ua.com"
            }
        ];

        minoristas.forEach((min)=>{
            
            const num = Math.floor(Math.random() * 50);
            Orders.insert({
                createdAt: new Date().valueOf(),
                provider: min.id,
                providerEmail: min.email,
                client: "cliente "+num,
                clientEmail: "cliente"+num+"@ua.com",
                    function createRand(seed) {
  var m = 8;
  var a = 11;
  var c = 17;

  var z = seed || 3;
  return function() {
    z = (a * z + c) % m;
    return z/m;
  };
}
       
                amount: Math.ceil(z/m * 7),
                answered:false,
                result:false,
                acceptedAt:0,
                declinedAt:0
            })
        })


    }
});

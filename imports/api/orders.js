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
            provider = "4uSwX3p3fwzpJFff3";
            providerEmail = "planta@ua.com";
        }
        else if (Roles.userIsInRole(this.userId, "minorista")){
            provider = "rGiCZSWYL4MqCaBEr";
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
                id: "Wom68RPx8ddp2yDdP",
                email: "minorista1@ua.com"
            },
            {
                id: "wTud3im676K6yCqom",
                email: "minorista2@ua.com"
            },
            {
                id: "w25F9AETjRreyrvyE",
                email: "minorista3@ua.com"
            },
            {
                id: "ZcadozYcZwfeucSHk",
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
                amount: Math.ceil(Math.random() * 9),
                answered:false,
                result:false,
                acceptedAt:0,
                declinedAt:0
            })
        })


    }
});
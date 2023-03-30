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
            provider = "gv8SmrruDGRDC3ocn";
            providerEmail = "JCPlanta@gmail.com";
        }
        else if (Roles.userIsInRole(this.userId, "minorista")){
            provider = "TwcxoPqK3sAjfrHkk";
            providerEmail = "JCCentroDistribucion@gmail.com";
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
    "orders.simulate"(r){
        const minoristas = [
            {
                id: "nA3mpTyp82cvoB5H9",
                email: "JCMinorista1@gmail.com"
            },
            {
                id: "B6kAnGu9ENkkXzWGH",
                email: "JCMinorista2@gmail.com"
            },
            {
                id: "LW3rg7druqbRhiRJg",
                email: "JCMinorista3@gmail.com"
            },
            {
                id: "Y8v9uEtjNJkKvN2wa",
                email: "JCMinorista4@gmail.com"
                
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
                amount: Math.ceil(Math.random() * 7),
                answered:false,
                result:false,
                acceptedAt:0,
                declinedAt:0
            })

           
        })


    }
});

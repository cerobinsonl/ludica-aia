import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Order extends Component {
  constructor(props) {
    super(props);

    this.state={

    };
  }

  renderUser(){
    if(Meteor.user()==undefined){return("No ha iniciado sesión")} else {return(Meteor.user().emails[0].address)}
  }

  renderNode(){

    var aQuien = "";

    if(Meteor.user() != undefined){


      if(Meteor.user().emails[0].address == "minorista1@ua.com"){
        console.log(Meteor.user().emails[0].address);
        console.log("aquiiiiiii");
        console.log(Meteor.users.findOne({"emails.address": "cd@ua.com"}));
      }
      else{
        console.log("no se pudo");
      }

    }
    else{
      console.log("nadaaaaaa");
    }
    
  }

  render() {
    return (
      <div className="Order panel panel-default">
      <div className="panel-body">
        <div>Cliente: </div>
        <div>Proveedor </div>
        <div>Unidades {this.props.order.count}</div>
        <div>Holaaa {this.renderUser() }</div>
        <div>{console.log(Meteor.user())}</div>
        <div>{console.log(this.renderNode())}</div>
        </div>
      </div>
    );
  }
}

Order.propTypes = {
  order: PropTypes.object.isRequired,
};

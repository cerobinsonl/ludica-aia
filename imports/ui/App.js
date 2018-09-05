import React, { Component } from "react";
import PropTypes from "prop-types";
import { withTracker } from "meteor/react-meteor-data";


import OrderList from "./OrderList";
import OrderAdd from "./OrderAdd";
import { Orders } from "../api/orders";

import AccountsUIWrapper from './AccountsUIWrapper.js';


export class App extends Component {
  constructor(props) {
    super(props);

  }


  onAdd(count, envia) {
    
    if (Meteor.userId() === null) 
    {
      window.alert("Por favor inicie sesión");
       
      return; 
    }

    if (!count) return;
    Orders.insert({
      count, envia
      
    });


  }


  render() {
    return (
      <div className="App">

        <h1>Lúdica Logística AIA</h1>

        <div id="sign-in-place" >
                <AccountsUIWrapper />
        </div>

        <hr/>

        <div className="col-sm-6">

        <div className="col-sm-12">
        <OrderAdd
          onAdd={this.onAdd.bind(this)}
          >
        </OrderAdd>
        </div>

        
        <OrderList
          orders={this.props.orders}
          
          >
        </OrderList>
        
        </div>
        <div className="col-sm-6">
        </div>
        


      </div>
    );
  }
}

App.propTypes = {
  orders: PropTypes.array.isRequired
};

export default withTracker(
  () => {
    return {
      user : Meteor.user(),
      orders: Orders.find({}).fetch()
    };
  }
)(App);










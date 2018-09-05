import React, { Component } from "react";
import PropTypes from "prop-types";

export default class OrderAdd extends Component {
  constructor(props) {
    super(props);

    this.state={

    };
  }

  getUser(){
    if(Meteor.user()==null){
      window.alert("Por favor inicie sesión");
    }
    else{
      Meteor.user()._id;
    }
  }

  render() {
    return (
      <div className="OrderAdd">
        <h3>Unidades a pedir</h3>

        <input
          type="text"
          className="form-control"
          placeholder="Text"
          ref="text"/>
        <button className="btn btn-primary"
          onClick={
            () =>
              this.props.onAdd(this.refs.text.value, this.getUser())
          }
        >Add
        </button>
      </div>
    );
  }
}

OrderAdd.propTypes = {
  onAdd:PropTypes.func.isRequired
};

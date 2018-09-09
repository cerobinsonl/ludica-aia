import React, {Component} from "react";
import PropTypes from "prop-types";
import {Meteor} from "meteor/meteor";

export default class OrderAdd extends Component {
    constructor(props) {
        super(props);

    }

    getUser() {
        if (Meteor.user() == null) {
            window.alert("Por favor inicie sesión");
        }
        else {
            Meteor.user()._id;
        }
    }

    render() {
        return (
            <div className="OrderAdd">
                <h3>Unidades a pedir</h3>

                <div className="row">
                    <div className="col-md-8">
                        <input
                            required
                            type="number"
                            className="form-control"
                            placeholder="Cantidad"
                            ref="text"/>
                    </div>
                    <div className="col-md-4">
                        <button className="btn btn-primary"
                                onClick={
                                    () =>
                                        this.props.onAdd(parseInt(this.refs.text.value))
                                }>Add
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

OrderAdd.propTypes = {
    onAdd: PropTypes.func.isRequired
};

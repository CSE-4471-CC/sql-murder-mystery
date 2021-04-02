import React, { Component } from 'react'

export default class ResponseTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.props = props;
    }


    render() {
        return (
            <div>
                <p> TESTING: {this.props.results} </p>
            </div>
        )
    }
}
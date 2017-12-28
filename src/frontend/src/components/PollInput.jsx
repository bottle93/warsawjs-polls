import React, { Component } from 'react';


export default class PollInput extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <label htmlFor={this.props.options.id}>{this.props.questionText}</label>
                <input type="text" placeholder='wpisz odpowiedź' id={this.props.options.id}/>
            </div>
        )
    }
}

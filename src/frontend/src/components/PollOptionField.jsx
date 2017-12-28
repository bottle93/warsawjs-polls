import React, { Component } from 'react';

export default class PollOptionField extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <fieldset>
                <legend>
                    <p>{this.props.questionText}</p>
                </legend>
                {this.props.options.map((elem, index)=> {
                    return(
                        <div key={index}>
                            <label htmlFor={elem.id}> {elem.text} </label>
                            < input type = "radio" id={elem.id}  name={elem.question} value={elem.text}/>
                        </div>
                    )
                })}
            </fieldset>
        )
    }
}
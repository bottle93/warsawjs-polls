import React, { Component } from 'react';


export default class PollScore extends Component {
    constructor(props){
        super(props);
        this.state = {
            scoreTab : [1,2,3,4,5]
        }
    }
    render(){
        return (
            <fieldset>
                <legend>
                    <p>{this.props.questionText}</p>
                </legend>
                {this.state.scoreTab.map((elem, index)=> {
                    return(
                        <div key={index}>
                            <label htmlFor={elem}> {elem} </label>
                            < input type = "radio" id={elem}  name={this.props.name} value={elem}/>
                        </div>
                    )
                })}
            </fieldset>
        )
    }
}
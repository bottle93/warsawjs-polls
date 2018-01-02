import React, { Component } from 'react';
import PropTypes from 'prop-types';



export default class PollScore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scoreTab: [1,2,3,4,5]
        }
    }
    render() {
        return (
            <fieldset>
                <legend>
                    <p> {this.props.questionText} </p>
                </legend>
                {this.state.scoreTab.map((elem, index)=> {
                    return(
                        <div key={index}>
                            <label htmlFor={elem}> {elem} </label>
                            <input
                                type="radio"
                                id={elem}
                                name={this.props.name}
                                value={elem}
                                onChange={e => this.props.onChange(e.target.value)}
                            />
                        </div>
                    )
                })}
            </fieldset>
        )
    }
}


PollScore.propTypes = {
    questionText: PropTypes.string.isRequired,
    inputValue: PropTypes.string,
    onChange: PropTypes.func.isRequired  //sprawdzamy czy przekazany props jest funkcją
}
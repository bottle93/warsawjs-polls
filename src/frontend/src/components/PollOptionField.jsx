import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class PollOptionField extends Component {
    render() {
        return (
            <fieldset>
                <legend>
                    <p> {this.props.questionText} </p>
                </legend>
                {this.props.options.map((elem, index)=> {
                    return(
                        <div key={index}>
                            <label htmlFor={elem.id}> {elem.text} </label>
                            <input
                                type="radio"
                                id={elem.id}
                                name={elem.question}
                                value={elem.id}
                                onChange={e => this.props.onChange(e.target.value)}
                            />
                        </div>
                    )
                })}
            </fieldset>
        )
    }
}

PollOptionField.propTypes = {
    questionText: PropTypes.string.isRequired,
    inputValue: PropTypes.string,
    onChange: PropTypes.func.isRequired
}
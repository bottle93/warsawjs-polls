import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class PollOptionField extends Component {
    render() {
        return (
            <fieldset className='polloptionfield__main'>
                <legend>
                    <h2 className='formsheet__question-text'> {this.props.questionText} </h2>
                </legend>
                <div className='question-value--container'>
                    {this.props.options.map((elem)=> {
                        return(
                            <div key={elem.id} className='polloptionfield__label-container'>
                                <input
                                    className='polloptionfield__input'
                                    type="radio"
                                    id={elem.id}
                                    name={elem.question}
                                    value={elem.id}
                                    onChange={e => this.props.onChange(e.target.value)}
                                />
                                <label htmlFor={elem.id} className='polloptionfield__label'> {elem.text} </label>
                            </div>
                        )
                    })}
                </div>
            </fieldset>
        )
    }
}

PollOptionField.propTypes = {
    questionText: PropTypes.string.isRequired,
    inputValue: PropTypes.string,
    onChange: PropTypes.func.isRequired
}
import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class PollInput extends Component {
    render() {
        return (
            <div className='pollinput__main'>
                <label>
                    <h2 className='formsheet__question-text'>{this.props.questionText}</h2>
                </label>
                <div className='question-value--container'>
                    <textarea
                    rows='5'
                    className='pollinput__textarea '
                    type="text"
                    placeholder='Wpisz odpowiedź'
                    value={this.props.inputValue}
                    onChange={e => this.props.onChange(e.target.value)}
                />
                </div>

            </div>
        )
    }
}

PollInput.propTypes = {
    questionText: PropTypes.string.isRequired,
    inputValue: PropTypes.string,
    onChange: PropTypes.func.isRequired  //sprawdzamy czy przekazany props jest funkcją
};

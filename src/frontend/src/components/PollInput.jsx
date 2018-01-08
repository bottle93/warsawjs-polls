import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class PollInput extends Component {
    render() {
        return (
            <div className='pollinput__main'>
                <label> {this.props.questionText} </label>
                <textarea
                    type="text"
                    placeholder='wpisz odpowiedź'
                    value={this.props.inputValue}
                    onChange={e => this.props.onChange(e.target.value)}
                />
            </div>
        )
    }
}

PollInput.propTypes = {
    questionText: PropTypes.string.isRequired,
    inputValue: PropTypes.string,
    onChange: PropTypes.func.isRequired  //sprawdzamy czy przekazany props jest funkcją
};

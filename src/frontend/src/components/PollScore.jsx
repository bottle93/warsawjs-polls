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
            <fieldset className='pollscore__main'>
                <legend>
                    <h2 className='formsheet__question-text'>
                        {this.props.questionText}
                        <span className='polscore__question-score--range'> (1-5)</span></h2>
                </legend>
                <div className='question-value--container'>
                    <label className='pollscore__label'> 1  </label>
                    {this.state.scoreTab.map((elem)=> {
                        return(
                            <div key={elem} className='pollscore__input-container'>
                                <input
                                    className='pollscore__input'
                                    type="radio"
                                    id={elem}
                                    name={this.props.name}
                                    value={elem}
                                    checked={elem === this.props.inputValue}
                                    onChange={e => this.props.onChange(parseInt(e.target.value, 10))}
                                />
                                <label htmlFor={elem} className='input__style'></label>
                            </div>
                        )
                    })}
                    <label className='pollscore__label'>5 </label>
                </div>
            </fieldset>
        )
    }
}


PollScore.propTypes = {
    questionText: PropTypes.string.isRequired,
    inputValue: PropTypes.number,
    onChange: PropTypes.func.isRequired  //sprawdzamy czy przekazany props jest funkcją
}
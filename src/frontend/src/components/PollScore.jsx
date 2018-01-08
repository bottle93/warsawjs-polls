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
                    <p> {this.props.questionText} </p>
                </legend>
                <label> 1 </label>
                {this.state.scoreTab.map((elem, index)=> {
                    return(
                        <div key={index} className='pollscore__input-container'>
                            <input
                                className='pollscore__input'
                                type="radio"
                                id={elem}
                                name={this.props.name}
                                value={elem}
                                checked={elem === this.props.inputValue}
                                onChange={e => this.props.onChange(parseInt(e.target.value))}
                            />
                        </div>
                    )
                })}
                <label> 5 </label>
            </fieldset>
        )
    }
}


PollScore.propTypes = {
    questionText: PropTypes.string.isRequired,
    inputValue: PropTypes.string,
    onChange: PropTypes.func.isRequired  //sprawdzamy czy przekazany props jest funkcją
}
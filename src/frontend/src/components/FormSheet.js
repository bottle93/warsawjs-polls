import React, { Component } from 'react';
import Progress from 'react-progressbar';
import PollOptionField from './PollOptionField';
import PollScore from './PollScore';
import PollInput from './PollInput';

export default class FormSheet extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            currentQuestionNumber: 0,
            error : false,
            buttonStatus :'',
        }
    }

    setValue(name, value) {
        this.setState({
            data: {...this.state.data, [name]: value}  //tworzymy nowy klucz i wartość dla danego elementu
         })
    }

    letsSubmit(e){
        e.preventDefault();
        this.props.onSubmit(this.state.data)
        this.setState({
            buttonStatus: 'disabled'
        })

    }

    nextQuestion(){
        if(Object.values(this.state.data)[this.state.currentQuestionNumber] !== undefined){
            if(this.state.currentQuestionNumber >= 0 && this.state.currentQuestionNumber < this.props.pollData.questions.length){
                this.setState({
                    currentQuestionNumber: this.state.currentQuestionNumber + 1,
                    error: false
                })
            }
        } else {
            this.setState({
                error: true
            })
        }
    }


    prevQuestion(){
        if(this.state.currentQuestionNumber > 0 && this.state.currentQuestionNumber <= this.props.pollData.questions.length){
            this.setState({
                currentQuestionNumber: this.state.currentQuestionNumber - 1,
            })
        }
    }


    renderComponent(component) {
        const shouldShowButtons = this.state.currentQuestionNumber !== this.props.pollData.questions.length;
        const showAlert = Object.values(this.state.data)[this.state.currentQuestionNumber] === undefined && this.state.error === true;

        return (
            <form action=""
                  className='formsheet__form-main'>
                <div className='formsheet__form-title'>
                    <h1 className='formsheet__form-title--text'>{this.props.pollData.name}</h1>
                    <Progress completed={100/(this.props.pollData.questions.length) * (this.state.currentQuestionNumber)}/>
                </div>
                <div className='formsheet__generated-question'>
                    {component}
                    {showAlert && <div className='formsheet__question--alert'>
                        Proszę wprowadzić odpowiedź
                    </div>}
                    {shouldShowButtons &&
                        <div className='formsheet__button-container'>
                            <button type="button" onClick={() => this.prevQuestion()} className='formsheet__button'>Prev</button>
                            <button type="button" onClick={() => this.nextQuestion()} className='formsheet__button'>Next</button>
                        </div>}

                </div>
            </form>
        )
    }

    render() {
        if (this.state.currentQuestionNumber <= this.props.pollData.questions.length-1) {
            const elem = this.props.pollData.questions[this.state.currentQuestionNumber];
            const name = elem.id.toString();
            switch (elem.type) {
                case 'score':
                    return this.renderComponent(
                        <PollScore
                            questionText={elem.text}
                            name={name}
                            inputValue={this.state.data[name]}
                            onChange={value => {this.setValue(name, value)}}
                            key={name}
                        />
                    );
                case 'text':
                    return this.renderComponent (
                        <PollInput
                            questionText={elem.text}
                            inputValue={this.state.data[name]}
                            onChange={value => {this.setValue(name, value)}}
                            key={name}
                        />
                    );
                case 'option':
                    return this.renderComponent(
                        <PollOptionField
                            questionText={elem.text}
                            options={elem.options}
                            inputValue={this.state.data[name]}
                            onChange={value => {this.setValue(name, value)}}
                            key={name}
                        />
                    )
                default:
                    return this.renderComponent(
                        <div>
                            <p>This question type is currently not supported,
                                please contact with us to solve this problem.
                            </p>
                        </div>
                    )
            }
        } else if(this.state.currentQuestionNumber > this.props.pollData.questions.length-1) {
            return this.renderComponent(
                <div className='question-value--container'>
                    <h2 className='formsheet__ready-to-send'>Dziękujemy za wypełnienie ankiety</h2>
                    <div className='formsheet__button-container'>
                        <button onClick={() => this.prevQuestion()} className='formsheet__button-submit'>Prev</button>
                        <button onClick={e => this.letsSubmit(e)} value='Submit' className='formsheet__button-submit' disabled={this.state.buttonStatus}>Submit</button>
                    </div>
                </div>
            )
        }
    }
}

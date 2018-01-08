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
            counter: 0,
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
    }

    nextQuestion(){
        if(this.state.counter >= 0 && this.state.counter < this.props.pollData.questions.length){
            this.setState({
                counter: this.state.counter + 1
            })
        }
        console.log('next' + this.state.counter)
    }

    prevQuestion(){
        if(this.state.counter > 0 && this.state.counter <= this.props.pollData.questions.length){
            this.setState({
                counter: this.state.counter - 1,
            })
        }
        console.log('prev' + this.state.counter)

    }


    renderComponent(component) {
        const shouldShowButtons = this.state.counter !== this.props.pollData.questions.length
        return (
            <form action=""
                  onSubmit={e => this.letsSubmit(e)}
                  className='formsheet__form-main'>
                <div className='formsheet__form-title'>
                    <p className='formsheet__form-title--text'>{this.props.pollData.name}</p>
                    <Progress completed={100/(this.props.pollData.questions.length) * (this.state.counter)}/>
                </div>
                <div>
                    {component}
                    {shouldShowButtons &&
                        <div className='formsheet__button-container'>
                            <button onClick={() => this.prevQuestion()} className='formsheet__button'>Prev</button>
                            <button onClick={() => this.nextQuestion()} className='formsheet__button'>Next</button>
                        </div>}
                </div>
            </form>
        )
    }

    render() {
        if (this.state.counter <= this.props.pollData.questions.length-1) {
            const elem = this.props.pollData.questions[this.state.counter];
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
                case 'options':
                    return this.renderComponent(
                        <PollOptionField
                            questionText={elem.text}
                            options={elem.options}
                            inputValue={this.state.data[name]}
                            onChange={value => {this.setValue(name, value)}}
                            key={name}
                        />
                    )
            }
        } else if(this.state.counter > this.props.pollData.questions.length-1) {
            return this.renderComponent(
                <div>
                    <p>Dziękujemy za wypełnienie ankiety</p>
                    <button onClick={() => this.prevQuestion()}>Prev</button>
                    <input type="submit" value='Submit'/>
                </div>
            )
        }
    }
}

import React, { Component } from 'react';
import PollOptionField from './PollOptionField';
import PollScore from './PollScore';
import PollInput from './PollInput';

export default class FormSheet extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data: {},
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

    render() {
        return (
            <form action="" onSubmit={e => this.letsSubmit(e)}>
                {this.props.pollData.questions.map(elem => {
                    const name = elem.id.toString()
                    if (elem.type === 'score') {
                        return (
                            <PollScore
                                questionText={elem.text}
                                name={name}
                                inputValue={this.state.data[name]}
                                onChange={value => {this.setValue(name, value)}}
                            />
                        )
                    } else if (elem.type === 'text') {
                        return (
                            <PollInput
                                questionText={elem.text}
                                inputValue={this.state.data[name]}
                                onChange={value => {this.setValue(name, value)}}
                            />
                        )
                    } else if (elem.type === 'options') {
                        return (
                            <PollOptionField
                                questionText={elem.text}
                                options={elem.options}
                                inputValue={this.state.data[name]}
                                onChange={value => {this.setValue(name, value)}}
                            />
                        )
                    }
                })}
                <input type="submit" value="Submit"/>
            </form>
        )
    }
}


import React, { Component } from 'react';
import PollOptionField from './PollOptionField';
import PollScore from './PollScore';
import PollInput from './PollInput';

export default class FormSheet extends Component{
    constructor(props){
        super(props);
    }
    render() {
        return (
            <form action="">
                {this.props.pollData.questions.map(elem => {
                    console.log(elem)
                    if (elem.type === 'score') {
                        return (
                            <PollScore questionText={elem.text} options={elem.options} name={elem.id}/>
                        )
                    } else if(elem.type === 'text') {
                        return (
                            <PollInput questionText={elem.text} options={elem.options}/>
                        )
                    }else if(elem.type === 'options') {
                        return (
                            <PollOptionField questionText={elem.text} options={elem.options}/>
                        )
                    }
                })}
            </form>
        )
    }
}


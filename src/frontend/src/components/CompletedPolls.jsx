import React, { Component } from 'react';
import axios from 'axios';
import 'font-awesome/css/font-awesome.min.css';


class CompletedPolls extends Component {
    constructor() {
        super();
        this.state = {
            submissions: [],
        }
    }

    componentDidMount() {
        axios.get(`/api/submissions/`)
            .then(response =>
                this.setState({
                    submissions: response.data.filter(elem =>
                        elem.poll.toString() === this.props.match.params.poll
                    ),
                })
            )
            .then(() => axios.get(`/api/polls/${this.props.match.params.poll}/`))
            .then( response => {
                let pollName = response.data.name
                let questionsById = response.data.questions.reduce((final, question) => {
                        final[question.id] = question;
                        return final }, {})
                this.state.submissions.forEach(elem => {
                    elem.answers.forEach( answer => {
                        answer.question = questionsById[answer.question]
                    })
                })
                this.setState({
                    name: pollName
                })
            }).catch(err => console.log('error!'))
    }

    render() {
        if(this.state.submissions.length !== 0 && this.state.submissions[0].answers[0].question.text !== undefined) {
            let answerNumber = 0;
            return(
                <div className='results__main'>
                    <div className='header__main'>
                        <a href="/" className='button__back'>
                            <i className="fa fa-arrow-left" aria-hidden="true"></i>
                        </a>
                    </div>
                    <div>
                        <h1 className='result__title-text'>{this.state.name}</h1>
                    </div>
                    {this.state.submissions.map((poll, index )=> {
                        answerNumber++
                        let pollAnswers = poll.answers.map( (elem) =>{
                            if (elem.text !== null) {
                                return (
                                    <div key={elem.id}>
                                        <div>
                                            <h3>{elem.question.text}</h3>
                                            <p>{elem.text}</p>
                                        </div>
                                    </div>
                                )
                            } else if (elem.score !== null) {
                                return (
                                    <div key={elem.id}>
                                        <div>
                                            <h3>{elem.question.text}</h3>
                                            <p>{elem.score}</p>
                                        </div>
                                    </div>
                                )
                            } else if (elem.option !== null) {
                                let optionAnswerID = elem.option
                                let optionAnswerText = elem.question.options.filter(element=> {
                                    return element.id === optionAnswerID
                                })
                                return (
                                    <div key={elem.id}>
                                        <div>
                                            <h3>{elem.question.text}</h3>
                                            <p>
                                                {optionAnswerText[0].text}
                                            </p>
                                        </div>
                                    </div>
                                )
                            }
                        })
                        return (
                            <div key={index} >
                                <h3 className='result__answer-number'>Odpowiedź #{answerNumber}</h3>
                                <div className='results__one-poll'>{pollAnswers}</div>
                            </div>)
                    })}
                </div>
            )
        } else {
            return(
                <div>
                    Loading...
                </div>
            )
        }

    }
}

export default CompletedPolls
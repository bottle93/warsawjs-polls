import React, { Component } from 'react';
import axios from 'axios';

class CompletedPolls extends Component {
    constructor() {
        super();
        this.state = {
            submissions: [],
            questionsById:[],
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
                let questionsById = response.data.questions.reduce((final, question) => {
                        final[question.id] = question;
                        return final }, {})
                this.state.submissions.forEach(elem => {
                    elem.answers.forEach( answer => {
                        answer.question = questionsById[answer.question]
                    })
                })
            }).catch(err => console.log('error!'))
    }

    render() {
        /*t.reduce(function(final, elem) { final[elem.id] = elem; return final }, {})*/
        if(this.state.submissions.length !== 0) {
            return(
                <div>
                    {console.log(this.state.submissions)}
                    {console.log(this.state.questionsById)}
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
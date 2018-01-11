import React, { Component } from 'react';
import axios from 'axios';

const toLookup = (arr, keyName) => arr.reduce((final, elem) => {
    final[elem[keyName]] = elem;
    return final
}, {})

class CompletedPolls extends Component {
    constructor() {
        super();
        this.state = {
            submissions: [],
            questionsById:[],
        }
    }

    componentDidMount() {
        const pollId = this.props.match.params.poll
        const getPoll = axios.get(`/api/polls/${this.props.match.params.poll}/`)
        const getSubmissions = axios.get(`/api/submissions/`)
            .then(response => response.data.filter(elem => elem.poll.toString() === pollId))

        Promise.all([getSubmissions, getPoll])
            .then(([submissions, poll]) => {
                const questionsById = toLookup(poll.data.questions, 'id')
                return submissions.map(submission => ({
                    ...submission,
                    answers: submission.answers.map(answer => ({
                        ...answer,
                        question: questionsById[answer.question]
                    }))
                }))
            })
            .then(submissions => this.setState({submissions}))
            .catch(err => console.log(err))
    }

    render() {
        if(this.state.submissions.length !== 0) {
            return(
                <div>
                    {console.log(this.state.submissions)}
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
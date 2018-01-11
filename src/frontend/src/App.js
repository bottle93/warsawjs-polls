import React, { Component } from 'react';
import './App.css';
import FormSheet from './components/FormSheet';
import axios from 'axios';
import 'font-awesome/css/font-awesome.min.css';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
        }
    }

    componentDidMount() {
        axios.get(`/api/polls/${this.props.match.params.poll}`).then(response =>
            this.setState({
                data: response.data,
            })
        ).catch(err => console.log('error!'))
    }

    submitData(value) {

        const answers = this.state.data.questions.map(q => {
            return {
                question: q.id,
                [q.type]: value[q.id]
            }
        });

        const userAnswersTab = {
            poll: this.state.data.id,
            answers
        }

        axios.post('/api/submissions/', userAnswersTab)
            .then(response => console.log(response))
            .catch(err => console.log('error!' + err))
    }

    render() {
        if(this.state.data !== null) {
            return (
                <div className='generate__content'>
                    <div className='header__main'>
                        <a href="/" className='button__back'>
                            <i className="fa fa-arrow-left" aria-hidden="true"></i>
                        </a>
                    </div>
                    <FormSheet
                        pollData={this.state.data}
                        onSubmit={value => this.submitData(value)} //otrzymanie danych z FormSheet
                    />
                </div>
            );
        } else {
            return <div>
                Loading...
            </div>
        }
    }
}

export default App;



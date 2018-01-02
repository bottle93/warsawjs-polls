import React, { Component } from 'react';
import './App.css';
import FormSheet from './components/FormSheet'
import axios from 'axios';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
        }
    }

    componentDidMount() {
        axios.get('/api/polls/').then(response =>
            this.setState({
                data: response.data,
            })
        ).catch(err => console.log('error!'))
    }

    submitData(data) {
        console.log(data)
    }

    render() {
            if(this.state.data !== null) {
                return (
                    <FormSheet
                        pollData={this.state.data[1]}
                        onSubmit={value => this.submitData(value)} //otrzymanie danych z FormSheet
                    />
                );
            } else {
               return <div>
                    Loading...
                </div>
            }
  }
}

export default App;



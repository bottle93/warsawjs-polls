import React, { Component } from 'react';
import './App.css';
import FormSheet from './components/FormSheet'
import axios from 'axios';


class App extends Component {
    constructor(props){
        super(props);
        this.state ={
            data: null,
        }
    }

    componentDidMount(){
        axios.get('/api/polls/').then(response =>
            this.setState({
                data: response.data,
            })
        )
    }

    render() {
            if(this.state.data !== null){
                return (
                    < FormSheet pollData={this.state.data[1]}/>
                );
            } else {
               return <div>
                    Loading...
                </div>
            }
  }
}

export default App;



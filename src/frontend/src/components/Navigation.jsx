import React, { Component } from 'react';
import axios from 'axios';


export default class Navigation extends Component {
    constructor(){
        super();
        this.state = {
            data: [],
        }
    }

    componentDidMount(){
        axios.get(`/api/polls/`).then(response =>
            this.setState({
                data: response.data,
            })
        ).catch(err => console.log('error!'))
    }

    render(){
        if(this.state.data !== null){
            return (
                <ul>
                    {this.state.data.map(elem => {
                        return (
                            <li key={elem.id}>
                                <a href={`/${elem.id}`}>{elem.name}</a>
                            </li>
                        )}
                    )}
                </ul>
            )
        } else {
            return (
                <div>
                    Loading...
                </div>
            )
        }
    }
}
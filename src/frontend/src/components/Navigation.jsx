import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'


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
                <div className='nav__main'>
                    <div className='header__main'></div>
                    <ul className='nav__list-content'>
                        {this.state.data.map(elem => {
                            return (
                                <li key={elem.id} className='nav__list-element'>
                                    <div className='nav__list-element-name'> <h1>{elem.name}</h1> </div>
                                    <div className='nav__list-element-btn-container'>
                                        <Link to={`/${elem.id}`} className='nav__list-element--link'>
                                            Ankieta
                                        </Link>
                                        <Link to={`/${elem.id}/result`} className='nav__list-element--link'>
                                            Wyniki
                                        </Link></div>
                                </li>
                            )}
                        )}
                    </ul>
                </div>
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
import React, { Component } from 'react';
import octocatImage from '../images/octocat.png';
import './home.css';

export default class Home extends Component {
    render() {
        return (
            <div className="full-height-container">
                <div className="bg-white text-center octocat-container">
                    <img src={octocatImage} className="img-fluid" id="octocat-logo" alt="Octocat Logo" />
                </div>
                <div className='container py-5'>
                    <div className='row text-center pb-5'>
                        <div className='col-12 text-white'>
                            <h1>Azure DevOps configurator</h1>
                        </div>
                    </div>
                    <div className='row text-center pb-5 justify-content-center'>
                        <div className='col-8 text-white'>
                            <p className="lead">This open-source application will help setup your client Azure DevOps organization with just few clicks.</p>
                        </div>
                    </div>
                    <div className='row text-center'>
                        <div className='col-12 text-white'>
                            <button className="btn btn-light btn-lg" onClick={() => this.props.history.push('/settings')}>Get Started</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
import React from 'react';

export default class HomePage extends React.Component {
    constructor() {
        super();

        window.location = '/login';
    }
    render() {
        return(
            <div className="container">
                <div className="card">
                    <div className="card-title d-flex justify-content-center">Home</div>
                </div>
            </div>
        );
    }
}
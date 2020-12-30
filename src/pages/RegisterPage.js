import React from 'react';
import { connect } from 'react-redux';
import history from '../history';

import SimpleReactValidator from 'simple-react-validator';

import { register } from '../redux/actions/User';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.validator = new SimpleReactValidator();
        this.state = {
            name: '',
            email: '',
            password: '',
            passwordConfirmation: ''
        }
    }

    render() {
        const { name, email, password, passwordConfirmation } = this.state;
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Register</div>

                            <div className="card-body">

                                <div className="form-group row p-1">
                                    <label htmlFor="name" className="col-md-4 col-form-label text-md-right">Name</label>

                                    <div className="col-md-6">
                                        <input id="name" type="text" className="form-control" name="name" value={name} onChange={e => this.setState({ name: e.target.value })} autoFocus />

                                        <span className="text-danger" role="alert">
                                            {this.validator.message('name', name, 'required|alpha')}
                                        </span>
                                    </div>
                                </div>

                                <div className="form-group row p-1">
                                    <label htmlFor="email" className="col-md-4 col-form-label text-md-right">E-Mail Address</label>

                                    <div className="col-md-6">
                                        <input id="email" type="email" className="form-control" name="email" value={email} onChange={e => this.setState({ email: e.target.value })} />

                                        <span className="text-danger" role="alert">
                                            {this.validator.message('email', email, 'required|email')}
                                        </span>
                                    </div>
                                </div>

                                <div className="form-group row p-1">
                                    <label htmlFor="password" className="col-md-4 col-form-label text-md-right">Password</label>

                                    <div className="col-md-6">
                                        <input id="password" type="password" className="form-control" name="password" value={password} onChange={e => this.setState({ password: e.target.value })} />

                                        <span className="text-danger" role="alert">
                                            {this.validator.message('password', password, 'required|min:6|max:20')}
                                        </span>
                                    </div>
                                </div>

                                <div className="form-group row p-1">
                                    <label htmlFor="password-confirm" className="col-md-4 col-form-label text-md-right">Confirm Password</label>

                                    <div className="col-md-6">
                                        <input id="password-confirm" type="password" className="form-control" name="password_confirmation" onChange={e => this.setState({ passwordConfirmation: e.target.value })} />

                                        <span className="text-danger" role="alert">
                                            {this.validator.message('password confirmation', passwordConfirmation, 'required|min:6|max:20')}
                                        </span>
                                    </div>
                                </div>

                                <div className="form-group row mb-0 p-1">
                                    <div className="col-md-6 offset-md-4">
                                        <button type="submit" className="btn btn-primary float-right" onClick={this.submitForm}>
                                            Register
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    submitForm = () => {
        console.log('submit');
        if (this.validator.allValid()) {
            console.log('You submitted the form and stuff!');
            const { name, email, password, passwordConfirmation } = this.state;
            const user = {
                name: name,
                email: email,
                password: password,
                passwordConfirmation: passwordConfirmation
            }
            this.props.register(user);
        } else {
            this.validator.showMessages();
            // rerender to show messages for the first time
            // you can use the autoForceUpdate option to do this automatically`
            this.forceUpdate();
        }
    }

    componentDidUpdate() {
        if(this.props.user && this.props.user.token) {
            console.log('ma token');
            history.push('/dashboard');
        }
    }

}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}
const mapDispatchToProps = () => {
    return { register }
}
export default connect(mapStateToProps, mapDispatchToProps())(RegisterPage);
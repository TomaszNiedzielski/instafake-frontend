import React from 'react';
import { connect } from 'react-redux';
import history from '../history';

import SimpleReactValidator from 'simple-react-validator';

import { login } from '../redux/actions/User';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.validator = new SimpleReactValidator();
        this.state = {
            email: '',
            password: '',
        }
    }

    render() {
        const { email, password } = this.state;
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Login</div>

                            <div className="card-body">

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

                                <div className="form-group row mb-0 p-1">
                                    <div className="col-md-6 offset-md-4">
                                        <button type="submit" className="btn btn-primary float-right" onClick={this.submitForm}>
                                            Login
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
            const { email, password } = this.state;
            const user = {
                email: email,
                password: password
            }
            this.props.login(user);
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
    return { login }
}
export default connect(mapStateToProps, mapDispatchToProps())(LoginPage);
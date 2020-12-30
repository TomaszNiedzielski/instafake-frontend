import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../redux/actions/User';
import { Link } from 'react-router-dom';

class Navbar extends React.Component {
    render() {
        console.log(this.props);
        const loggedIn = this.props.user && this.props.user.token ? true : false;
        return (
            <nav className="navbar navbar-expand-md navbar-light bg-white shadow-sm">
                <div className="container">
                    <a className="navbar-brand" href="/">
                        Insta Fake
                    </a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="{{ __('Toggle navigation') }}">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">

                        <ul className="navbar-nav mr-auto">

                        </ul>

                        <ul className="navbar-nav ml-auto">
                            {!loggedIn ?
                            <>
                                <li className="nav-item">
                                    <a className="nav-link" href="/login">Login</a>
                                </li>

                                <li className="nav-item">
                                    <a className="nav-link" href="/register">Register</a>
                                </li>
                            </> :
                                <li>
                                    <a href="/dashboard" className="nav-link">{this.props.user.name}</a>
                                </li>
                            }
                            
                            <li className="nav-item dropdown">
                                {loggedIn &&
                                    <>
                                        <a id="navbarDropdown" className="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre></a>

                                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                            <a className="dropdown-item" href="/login" onClick={this.props.logout}>Logout</a>
                                        </div>
                                    </>
                                }
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}
const mapDispatchToProps = () => {
    return { logout }
}
export default connect(mapStateToProps, mapDispatchToProps())(Navbar);
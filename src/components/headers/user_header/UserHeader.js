import React from 'react';
import './userheader.css';

import { connect } from 'react-redux';
import { ApiUrl, ApiUrlStorage } from '../../../constans/ApiUrl';

import ClipLoader from "react-spinners/ClipLoader";

class UserHeader extends React.Component {
    state = {
        userName: null,
        imagesNumber: null,
        avatarName: null,
        followersNumber: null,
        loading: true,
        error404: false,
        isFollowed: null
    }

    render() {
        const { user } = this.props;
        const { userName, imagesNumber, avatarName, followersNumber, loading, error404, isFollowed } = this.state;
        if(!error404) {
            return(
                <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
                    {loading ? (<div className="">
                        <ClipLoader size={30} color={"#ccc"} loading={this.state.loading} />
                    </div>) :
                    <>
                        <div className="user-header__center">
                            <div>
                                <img src={ApiUrlStorage + (avatarName ? avatarName : 'default.jpg')} className="user-header__profile-image" />
                            </div>
                            <p className="user-header__nick">{userName}</p>
                            <div className="d-flex justify-content-between">
                                {user.name === userName ? <>
                                    <button className="btn btn-primary mr-2" data-toggle="modal" data-target="#upload-modal">upload</button>
                                    <button className="btn" data-toggle="modal" data-target="#settings-modal">settings</button>
                                </> :   <button
                                            className={isFollowed ? "btn" : "btn btn-primary"}
                                            onClick={() => isFollowed ? this.unfollow(userName) : this.follow(userName)}
                                        >
                                            {isFollowed ? 'followed' : 'follow'}
                                        </button>}
                            </div>
                            <div className="d-flex mt-3">
                                <p className="mr-3">Photos: {imagesNumber ? imagesNumber : 0}</p>
                                <p>Followers: {followersNumber ? followersNumber : 0}</p>
                            </div>
                        </div>
                    </>}
                </div>
            )
        } else {
            return (
                <div className="card">
                    <div className="card-body">
                        <h5 className="text-center">Error 404</h5>
                    </div>
                </div>
            )
        }
    }

    componentDidMount() {
        this.loadData(this.props.userName);
    }

    loadData = userName => {
        fetch(ApiUrl + 'users/information', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + this.props.user.token,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userName: userName
            })
        })
        .then((response) => response.json())
        .then((userInformation) => {
            console.log(userInformation);
            if(Object.keys(userInformation).length === 0) {
                console.log("error 404");
                this.setState({ error404: true });
                return;
            }
            const { userName, imagesNumber, avatarName, followersNumber, isFollowed } = userInformation;
            this.setState({
                userName: userName,
                imagesNumber: imagesNumber,
                avatarName: avatarName,
                loading: false,
                followersNumber: followersNumber,
                isFollowed: isFollowed
            });
        })
        .catch(e => {
            console.log(e);
        });
    }

    follow = userName => {
        fetch(ApiUrl + 'follow', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + this.props.user.token,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userName: userName
            })
        })
        .then((response) => response.json())
        .then((response) => {
            if(response === true) {
                this.setState({ isFollowed: true });
            }
        })
        .catch(e => {
            console.log(e);
        });
    }

    unfollow = userName => {
        fetch(ApiUrl + 'unfollow', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + this.props.user.token,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userName: userName
            })
        })
        .then((response) => response.json())
        .then((response) => {
            if(response === true) {
                this.setState({ isFollowed: false });
            }
        })
        .catch(e => {
            console.log(e);
        });
    }
}
const mapStateToProps = state => {
    return {
        user: state.user
    }
}
const mapDispatchToProps = () => {
    return {  }
}
export default connect(mapStateToProps, mapDispatchToProps())(UserHeader);
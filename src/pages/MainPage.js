import React from 'react';
import { connect } from 'react-redux';
import SearchModal from '../components/modals/SearchModal';

import { ApiUrl, ApiUrlStorage } from '../constans/ApiUrl';
import { restoreToken } from '../redux/actions/User';

class MainPage extends React.Component {
    state = {
        images: []
    }
    render() {
        const { images } = this.state;
        return (
            <div className="container d-flex flex-column align-items-center" id="main-page-container">
                <SearchModal />
                {images.length > 0 ? images.map(item => (
                    <div className="col-12 mt-4 card p-0" style={{ maxWidth: '650px' }}>
                        <div className="d-flex p-2">
                            <img src={ApiUrlStorage + (item.avatar ? item.avatar : 'default.jpg')} style={styles.avatar} />
                            <div className="ml-3">
                                <a href={"/users/" + item.userName} className="text-dark">{item.userName}</a>
                            </div>
                        </div>
                        <div>
                            <img src={ApiUrlStorage + item.image} className="w-100" />
                        </div>
                    </div>
                )) : <b className="mt-2">Search and follow users to see posts.</b>}
            </div>
        )
    }

    componentDidMount() {
        this.loadImages();
    }

    loadImages = () => {
        const token = this.props.restoreToken();
        fetch(ApiUrl + 'images/load/main-page', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            })
        })
        .then((response) => response.json())
        .then((images) => {
            console.log(images);
            if(images.length > 0) {
                this.setState({ images: images });
            }
        })
        .catch(e => {
            console.log(e);
        });
    }
    
}

const styles = {
    avatar: {
        width: '40px',
        height: '40px',
        objectFit: 'cover',
        borderRadius: '50%'
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}
const mapDispatchToProps = () => {
    return { restoreToken }
}
export default connect(mapStateToProps, mapDispatchToProps())(MainPage);
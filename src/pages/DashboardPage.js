import React from 'react';
import { connect } from 'react-redux';

import UserHeader from '../components/headers/user_header/UserHeader';
import ImagesList from '../components/lists/pure_images_list/ImagesList';
import ImageModal from '../components/modals/ImageModal';
import SettingsModal from '../components/modals/SettingsModal';
import UploadModal from '../components/modals/UploadModal';

class DashboardPage extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            selectedImage: null
        }
    }

    render() {
        const { user } = this.props;
        console.log('midel: ', user);
        return(
            <div className="container">
                {user && user.name ?
                    <>
                        <UserHeader
                            userName={user.name}
                        />
                        <ImagesList
                            userName={user.name}
                            onSelectImage={image => this.setState({ selectedImage: image })}
                        />
                        <ImageModal
                            image={this.state.selectedImage}
                        />
                        <UploadModal
                            endpoint="images/upload"
                            id="upload-modal"
                            title="Upload image."
                        />
                        <UploadModal
                            endpoint="avatar/upload"
                            id="upload-avatar-modal"
                            title="Change avatar picture."
                        />
                        <SettingsModal />
                    </> : null
                }
            </div>
        );
    }

    componentDidUpdate() {
        if(!this.props.user || !this.props.user.token) {
            document.location.href = '/login';
        }
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}
const mapDispatchToProps = () => {
    return {}
}
export default connect(mapStateToProps, mapDispatchToProps())(DashboardPage);
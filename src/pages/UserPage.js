import React from 'react';

import UserHeader from '../components/headers/user_header/UserHeader';
import ImagesList from '../components/lists/pure_images_list/ImagesList';
import ImageModal from '../components/modals/ImageModal';
import UploadModal from '../components/modals/UploadModal';

export default class UserPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedImage: null,
            userName: null
        }
    }
    render() {
        const { userName, selectedImage } = this.state;
        return (
            <div className="container">
                {userName ?
                <>
                <UserHeader
                    userName={userName}
                />
                <ImagesList
                    userName={userName}
                    onSelectImage={image => this.setState({ selectedImage: image })}
                />
                <ImageModal
                    image={selectedImage}
                />
                <UploadModal />
                </> : null}
            </div>
        );
    }

    componentDidMount() {
        const url = window.location.href;
        const userName = url.split("/").pop();
        console.log(userName);
        this.setState({ userName: userName });
    }
}
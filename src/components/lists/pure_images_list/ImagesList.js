import React from 'react';
import './imageslist.css';
import { ApiUrlStorage } from '../../../constans/ApiUrl';

import { connect } from 'react-redux';
import { getImagesOfSpecificUser } from '../../../redux/actions/Images';

class ImagesList extends React.Component {
    render() {
        const { images } = this.props;
        console.log('render images: ', images);
        return(
            <div className="container">
                <hr />
                <div className="pure-images-list">
                    {images.map(image => (
                        <div>
                            <img src={ApiUrlStorage + image.name} data-toggle="modal" data-target="#image-modal" onClick={() => this.props.onSelectImage(ApiUrlStorage + image.name)} />
                        </div>
                    ))}
                </div>
            </div>
        );
    }
    componentDidMount() {
        this.props.getImagesOfSpecificUser(this.props.userName);
    }
}

const mapStateToProps = state => {
    return {
        images: state.images,
        user: state.user
    }
}
const mapDispatchToProps = () => {
    return { getImagesOfSpecificUser }
}
export default connect(mapStateToProps, mapDispatchToProps())(ImagesList);
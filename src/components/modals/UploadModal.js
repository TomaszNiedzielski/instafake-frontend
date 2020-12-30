import React from 'react';
import { connect } from 'react-redux';

import { uploadImage } from '../../redux/actions/Images'; 

class UploadModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null,
            imageUrl: null
        }
    }

    render() {
        const { imageUrl } = this.state;
        return (
            <div class="modal fade" id={this.props.id} tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <div>{this.props.title}</div>
                            <button type="button" class="close close-upload-modal" data-dismiss="modal" aria-label="Close" onClick={() => this.setState({ imageUrl: null })}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <img className="w-100" src={imageUrl} />
                            {!imageUrl ?
                            <div className="card d-flex">
                                <p className="text-center pt-5 pb-4">Drop image here or click to select from disk.</p>
                                <input type="file" className="input-file" accept="image/png,image/jpeg" onChange={this.onChangeImage} />
                            </div>
                            : <button className="btn btn-primary float-right mt-2" onClick={() => this.onClickUpload()}>upload</button>}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    onClickUpload = () => {
        const { image } = this.state;

        this.props.uploadImage(image, this.props.endpoint);
        const closeButtons = document.getElementsByClassName('close-upload-modal');
        for(let button of closeButtons) {
            button.click()
        }
    }

    onChangeImage = event => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            this.setState({ imageUrl: URL.createObjectURL(img) });
            const reader = new FileReader();
            reader.onload = (event) => {
                this.setState({ image: event.target.result });
            }
            reader.readAsDataURL(img);
        }
    }

}
const mapStateToProps = state => {
    return {}
}
const mapDispatchToProps = () => {
    return { uploadImage }
}
export default connect(mapStateToProps, mapDispatchToProps())(UploadModal);
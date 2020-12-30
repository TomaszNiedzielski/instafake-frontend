import React from 'react';

export default class ImageModal extends React.Component {
    render() {
        return (
            <div class="modal fade" id="image-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <img src={this.props.image} className="w-100" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
import React from 'react';

export default class SettingsModal extends React.Component {
    render() {
        return (
            <div class="modal fade" id="settings-modal" tabindex="-1" role="dialog" aria-labelledby="settingsModal" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div className="card">
                                <div className="card-body" data-dismiss="modal" data-toggle="modal" data-target="#upload-avatar-modal" style={{ cursor: 'pointer' }} >Change profile image</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
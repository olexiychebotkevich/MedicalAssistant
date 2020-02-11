import React, { Component } from 'react';
import classnames from 'classnames';
import './index.css';
import 'cropperjs/dist/cropper.css';
import Cropper from 'react-cropper';



class CropperWidgetContainer extends Component {


    onCroppPhoto = (e) => {
        e.preventDefault();

        if (typeof this.cropper.getCroppedCanvas() === 'undefined') {

            return;
        }

        this.props.croppImage(this.cropper.getCroppedCanvas().toDataURL());
    }

    render() {
        const { loading } = this.props;
        const { src, onClose } = this.props;
        return (



            <div className={classnames('croppermodal', { 'open': loading })}>

                <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                            <Cropper
                                style={{ maxHeight:400, maxWidth: '100%' }}
                                aspectRatio={1 / 1}
                                guides={false}
                                viewMode={1}
                                preview=".img-preview"
                                dragMode="move"
                                src={src}
                                minContainerWidth="200"
                                minCanvasWidth="200"
                                minCropBoxWidth="200"
                                ref={cropper => { this.cropper = cropper; }}

                            />
                        </div>


                        <div className="col-md-4">

                            <div>
                                <div className="box" style={{ width: '100%' }}>
                                    <button className="btn btn-success" onClick={this.onCroppPhoto}>Обрізати фото</button>
                                    <button onClick={(e) => onClose(e)} className="btn btn-danger">Close</button>

                                    <br />
                                    <div style={{ marginTop: 20 }}>
                                        <div className="img-preview" style={{ height: 300 }} />
                                    </div>
                                </div>
                            </div>

                        </div>




                    </div>
                </div>
            </div >
        );
    }
}
const CropperWidget = CropperWidgetContainer;

export default CropperWidget;
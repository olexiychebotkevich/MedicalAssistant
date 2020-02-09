import React, { Component } from 'react';
import './index.css';





class SpinnerWidgetContainer extends Component {
    state = {
        loading: true
      }
    render() { 
        const { loading } = this.props;
     
        return ( 
            <div className="spinnermodal open">
                <div className="position-center">
                <i className="fa fa-heartbeat fa-spin fa-3x fa-fw"></i>
                    <span className="sr-only">Loading...</span>
                </div>
            </div>

        );
    }
}
const SpinnerWidget = SpinnerWidgetContainer;
 
export default SpinnerWidget;
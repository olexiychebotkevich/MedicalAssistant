import React, { Component } from 'react';
import 'antd/dist/antd.css';

class AdminPage extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    AddDoctor=()=>
    {
        this.props.history.push("admin/RegistrDoctor");
    }

    render() { 
        return ( 
            <div>
                <button>Add Doctor</button>
            </div>
         );
    }
}
 
export default AdminPage;
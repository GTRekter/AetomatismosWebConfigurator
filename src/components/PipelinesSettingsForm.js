import React, { Component } from 'react';
import './settings.css';

export default class PipelinesSettingsForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            serviceEndpoints: []        
        };
        this.onChangeInput = this.onChangeInput.bind(this);
    }
    componentDidUpdate(prevProps) {
        // console.log('prevProps', prevProps);
        // console.log('this.props', this.props);
        // if (prevProps !== this.props) {
        //     this.setState({
        //         serviceEndpoints: this.props.settings.serviceEndpoints || []
        //     });
        // }  
    }
    onChangeInput = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }
    onClickAddServiceEndpoint = () => {
        const { serviceEndpoints } = this.state;
        serviceEndpoints.push({
            name: ''
        });
        this.setState({
            serviceEndpoints: serviceEndpoints
        });
    }
    render() {
        return (
            <div>
                <div className="mb-3">
                    <label className="form-label">Service endpoints</label>
                    <div className="row">
                    {this.state.serviceEndpoints.map((serviceEndpoint, index) => {
                        return (
                            <div className="col-6">
                                <div class="card mb-3">
                                    <div class="card-header">Header</div>
                                    <div class="card-body">
                                        <label className="form-label">Service endpoint name</label>
                                        <input className="mb-3 form-control" key={index} type="text" name={index} placeholder="microsoft" value={serviceEndpoint.name} onChange={this.onChangeServiceEndpointNameInput} />
                                        <label className="form-label">Subscription ID</label>
                                        <input className="mb-3 form-control" key={index} type="text" name={index} placeholder="microsoft" value={serviceEndpoint.subscriptionId} onChange={this.onChangeServiceEndpointSubscriptionIdInput} />
                                        <label className="form-label">Subscription name</label>
                                        <input className="mb-3 form-control" key={index} type="text" name={index} placeholder="microsoft" value={serviceEndpoint.subscriptionName} onChange={this.onChangeServiceEndpointSubscriptionNameInput} />
                                        <label className="form-label">Tenant ID</label>
                                        <input className="mb-3 form-control" key={index} type="text" name={index} placeholder="microsoft" value={serviceEndpoint.tenantId} onChange={this.onChangeServiceEndpointTenantIdInput} />
                                        <label className="form-label">Service principal ID</label>
                                        <input className="mb-3 form-control" key={index} type="text" name={index} placeholder="microsoft" value={serviceEndpoint.servicePrincipalId} onChange={this.onChangeServiceEndpointServicePrincipalIdInput} />
                                        <label className="form-label">Service principal key</label>
                                        <input className="mb-3 form-control" key={index} type="text" name={index} placeholder="microsoft" value={serviceEndpoint.servicePrincipalKey} onChange={this.onChangeServiceEndpointServicePrincipalKeyInput} />
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    </div>
                    <button type="button" className="btn btn-primary" onClick={() => this.onClickAddServiceEndpoint()}>Add serviceEndpoint</button>   
                    {/* <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Launch demo modal</button> */}
                    <p>GitHub service endpoints</p>
                    {this.state.serviceEndpoints.map((serviceEndpoint, index) => {
                        return (
                            <div>
                                <input className="mb-3 form-control" key={index} type="text" name={index} placeholder="microsoft" value={serviceEndpoint.name} onChange={this.onChangeServiceEndpointNameInput} />
                                <input className="mb-3 form-control" key={index} type="text" name={index} placeholder="microsoft" value={serviceEndpoint.githubConnectionName} onChange={this.onChangeServiceEndpointGithubConnectionNameInput} />
                            </div>
                        )
                    })}     
                    <button type="button" className="btn btn-primary" onClick={() => this.onClickAddServiceEndpoint()}>Add serviceEndpoint</button>   
                </div>
            </div>
        )
    }
}
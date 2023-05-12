import React, { Component } from 'react';
import './settings.css';

export default class OrganizationSettingsForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disableAnonymousAccessBadges: true,
            limitVariablesSetQueueTime: false,
            limitJobAuthorizationCurrentProjectNonReleasePipelines: false,
            limitJobAuthorizationCurrentProjectReleasePipelines: false,
            protectAccessRepositoriesYamlPipelines: false,
            disableStageChooser: false,
            disableCreationClassicBuildAndClassicReleasePipelines: false,
            disableBuiltInTasks: false,
            disableMarketplaceTasks: false,
            disableNodeSixTasks: false      
        };
        this.onChangeInput = this.onChangeInput.bind(this);
    }
    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.setState({
                disableAnonymousAccessBadges: this.props.settings.disableAnonymousAccessBadges || false,
                limitVariablesSetQueueTime: this.props.settings.limitVariablesSetQueueTime || false,
                limitJobAuthorizationCurrentProjectNonReleasePipelines: this.props.settings.limitJobAuthorizationCurrentProjectNonReleasePipelines || false,
                limitJobAuthorizationCurrentProjectReleasePipelines: this.props.settings.limitJobAuthorizationCurrentProjectReleasePipelines || false,
                protectAccessRepositoriesYamlPipelines: this.props.settings.protectAccessRepositoriesYamlPipelines || false,
                disableStageChooser: this.props.settings.disableStageChooser || false,
                disableCreationClassicBuildAndClassicReleasePipelines: this.props.settings.disableCreationClassicBuildAndClassicReleasePipelines || false,
                disableBuiltInTasks: this.props.settings.disableBuiltInTasks || false,
                disableMarketplaceTasks: this.props.settings.disableMarketplaceTasks || false,
                disableNodeSixTasks: this.props.settings.disableNodeSixTasks || false
            });
        }  
    }
    onChangeInput = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState(
            {
                [name]: value
            },
            () => {
                // Call the onUpdate function passed from the parent with the updated values
                this.props.onUpdate(this.state);
            }
        );
    };
    render() {
        return (
            <div>
                <div className="mb-3 form-check">
                    <input className="form-check-input" type="checkbox" name="disableAnonymousAccessBadges" checked={this.state.disableAnonymousAccessBadges} onChange={this.onChangeInput} />
                    <label className="form-check-label">Disable Anonymous Access Badges</label>
                </div>
                <div className="mb-3 form-check">
                    <input className="form-check-input" type="checkbox" name="limitVariablesSetQueueTime" checked={this.state.limitVariablesSetQueueTime} onChange={this.onChangeInput} />
                    <label className="form-check-label">Limit Variables Set Queue Time</label>
                </div>
                <div className="mb-3 form-check">
                    <input className="form-check-input" type="checkbox" name="limitJobAuthorizationCurrentProjectNonReleasePipelines" checked={this.state.limitJobAuthorizationCurrentProjectNonReleasePipelines} onChange={this.onChangeInput} />
                    <label className="form-check-label">Limit Job Authorization Current Project Non Release Pipelines</label>
                </div>
                <div className="mb-3 form-check">
                    <input className="form-check-input" type="checkbox" name="limitJobAuthorizationCurrentProjectReleasePipelines" checked={this.state.limitJobAuthorizationCurrentProjectReleasePipelines} onChange={this.onChangeInput} />
                    <label className="form-check-label">Limit Job Authorization Current Project Release Pipelines</label>
                </div>
                <div className="mb-3 form-check">
                    <input className="form-check-input" type="checkbox" name="protectAccessRepositoriesYamlPipelines" checked={this.state.protectAccessRepositoriesYamlPipelines} onChange={this.onChangeInput} />
                    <label className="form-check-label">Protect Access Repositories YAML Pipelines</label>
                </div>
                <div className="mb-3 form-check">
                    <input className="form-check-input" type="checkbox" name="disableStageChooser" checked={this.state.disableStageChooser} onChange={this.onChangeInput} />
                    <label className="form-check-label">Disable Stage Chooser</label>
                </div>
                <div className="mb-3 form-check">
                    <input className="form-check-input" type="checkbox" name="disableCreationClassicBuildAndClassicReleasePipelines" checked={this.state.disableCreationClassicBuildAndClassicReleasePipelines} onChange={this.onChangeInput} />
                    <label className="form-check-label">Disable Creation Classic Build And Classic Release Pipelines</label>
                </div>
                <div className="mb-3 form-check">
                    <input className="form-check-input" type="checkbox" name="disableBuiltInTasks" checked={this.state.disableBuiltInTasks} onChange={this.onChangeInput} />
                    <label className="form-check-label">Disable BuiltIn Tasks</label>
                </div>
                <div className="mb-3 form-check">
                    <input className="form-check-input" type="checkbox" name="disableMarketplaceTasks" checked={this.state.disableMarketplaceTasks} onChange={this.onChangeInput} />
                    <label className="form-check-label">Disable Marketplace Tasks</label>
                </div>
                <div className="mb-3 form-check">
                    <input className="form-check-input" type="checkbox" name="disableNodeSixTasks" checked={this.state.disableNodeSixTasks} onChange={this.onChangeInput} />
                    <label className="form-check-label">Disable Node Six Tasks</label>
                </div>
            </div>
        )
    }
}
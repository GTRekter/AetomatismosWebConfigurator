import React, { Component } from 'react';
import TemplateManagementService from '../services/TemplateManagementService';
import './settings.css';

export default class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {

            // Organization general settings
            targetOrganizationName: '',
            connectToAzureActiveDirectory: false,
            tenantId: '',
            usersToAddToOrganiation: '',
            extensionsToAddToOrganiation: '',

            // Organization policies
            disallowThirdPartyAccessViaOauth: false,
            disallowSSHAuthentication: false,
            logAuditEvents: true,
            allowPublicProjects: true,
            additionalProtectionsPublicPackageRegistries: true,
            enableAzureActiveDirectoryConditionalAccessPolicyValidation: true,
            disallowExternalGuestAccess: false,
            allowTeamAndProjectAdministratorsToInviteNewUsers: true,
            requestAccessEnable: false,
            requestAccessUrl: "https://dev.azure.com/GTRekter",

            // Organization settings
            disableAnonymousAccessBadges: true,
            limitVariablesSetQueueTime: false,
            limitJobAuthorizationCurrentProjectNonReleasePipelines: false,
            limitJobAuthorizationCurrentProjectReleasePipelines: false,
            protectAccessRepositoriesYamlPipelines: false,
            disableStageChooser: false,
            disableCreationClassicBuildAndClassicReleasePipelines: false,
            disableBuiltInTasks: false,
            disableMarketplaceTasks: false,
            disableNodeSixTasks: false,

            // Repositories settings
            repositories = []
        
        };
        this.onChangeInput = this.onChangeInput.bind(this);
        this.onClickExport = this.onClickExport.bind(this);
        this.onClickAddRepository = this.onClickAddRepository.bind(this);
    }
    onChangeInput = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }
    onClickAddRepository = () => {
        const repositories = this.state.repositories;
        repositories.push({
            name: ''
        });
        this.setState({
            repositories: repositories
        });
    }
    onClickExport = () => {
        const filename = 'organization.json';
        const templateManagementService = new TemplateManagementService(this.state, filename);
        templateManagementService.generateJson();
    }
    render() {
        return (
            <div className="full-height-container">
                <div className='container py-5'>
                    <div className='row'>
                        <div className='col-12 text-white text-center pb-5'>
                            <h1>Configure</h1>
                            <p>Each tab will allow you to enable/disable or configure specific features of the target organiation.</p>
                            <button className='btn btn-light btn-lg' onClick={() => this.onClickStartBreak()}>Import</button>
                        </div>
                    </div>
                    <div className='row pb-5'>
                        <div className="accordion" id="organizationGeneralSettingsAccordion">
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="repositoriesSettingsHeader">
                                    <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#repositoriesSettingsCollapse" aria-expanded="true" aria-controls="repositoriesSettingsCollapse">
                                        Repositories settings
                                    </button>                   
                                </h2>
                                <div id="repositoriesSettingsCollapse" className="accordion-collapse collapse show" aria-labelledby="repositoriesSettingsHeader" data-bs-parent="#settingsAccordion">
                                    <div className="accordion-body">
                                        {this.state.repositories.map((this.state.repositories, index) => {
                                            return (
                                                <div className="mb-3">
                                                    <label className="form-label">Repository name</label>
                                                    <input type="text" className="form-control" name="repositoryName" placeholder="microsoft" value={this.state.repositoryName} onChange={this.onChangeInput} />
                                                    <button type="button" class="btn btn-primary" onClick={() => this.onClickAddRepository()}>Add repository</button>
                                                </div>
                                            )
                                        })}
                                        <button type="button" class="btn btn-primary" onClick={() => this.onClickAddRepository()}>Add repository</button>        
                                    </div>
                                </div>
                            </div> 
                        </div>
                    </div>
                    <div className='row text-center pb-5'>
                        <div className='col-12 text-center'>
                            <button className='btn btn-light btn-lg' onClick={() => this.onClickExport()}>Export</button>
                            {/* <button className='btn btn-light btn-lg' onClick={() => this.onClickStartBreak()}>Configure</button> */}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
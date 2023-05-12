import React, { Component } from 'react';
import TemplateManagementService from '../services/TemplateManagementService';
import OrganizationGeneralSettingsForm from './OrganizationGeneralSettingsForm';
import OrganizationPoliciesForm from './OrganizationPoliciesForm';
import OrganizationSettingsForm from './OrganizationSettingsForm';
import ProjectGeneralSettingsForm from './ProjectGeneralSettingsForm';
import RepositoriesSettingsForm from './RepositoriesSettingsForm';
import PipelinesSettingsForm from './PipelinesSettingsForm';
import './settings.css';

export default class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            settings : {
                organizationGeneralSettings : {
                    targetOrganizationName: '',
                    connectToAzureActiveDirectory: false,
                    tenantId: '',
                    usersToAddToOrganiation: '',
                    extensionsToAddToOrganiation: ''
                },
                organizationPoliciesSettings: {
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
                },
                organizationSettings : {
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
                },
                projectGeneralSettings: {
                    projectName: '',
                    projectDescription: '',
                    projectVisibility: 'private',
                    projectProcessTemplate: 'Agile',
                    securityGroups: []
                },
                repositoriesSettings: {
                    repositories: [],
                    branches: []
                },
                pipelinesSettings: {
                    serviceEndpoints: []    
                }    
            }
        };
        this.onChangeInput = this.onChangeInput.bind(this);
        this.onClickExport = this.onClickExport.bind(this);
        this.onChangeFileInput = this.onChangeFileInput.bind(this);
    }
    onChangeInput = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }
    onChangeFileInput = (event) => {
        const fileReader = new FileReader();
        fileReader.onload = (e) => {
          const content = e.target.result;
          const templateManagementService = new TemplateManagementService();
          const data = templateManagementService.convertJson(content); 
          this.setState({ settings: data });
        };
        fileReader.readAsText(event.target.files[0]);
    };
    onClickExport = () => {
        const filename = 'organization.json';
        const templateManagementService = new TemplateManagementService();
        templateManagementService.generateJson(this.state.settings, filename);
    }
    onClickImport = () => {
        console.log(this.state.settings); // Display imported JSON data in the console
    };


    handleOrganizationGeneralSettingsUpdate = (updatedSettings) => {
        this.setState(prevState => ({
            settings: {
                ...prevState.settings,
                organizationGeneralSettings: {
                    ...prevState.settings.organizationGeneralSettings,
                    ...updatedSettings
                }
            }
        }));
    }
    handleOrganizationPoliciesSettingsUpdate = (updatedSettings) => {
        this.setState(prevState => ({
            settings: {
                ...prevState.settings,
                organizationPoliciesSettings: {
                ...prevState.organizationPoliciesSettings,
                ...updatedSettings
                }
            }
        }));
    }
    handleOrganizationSettingsUpdate = (updatedSettings) => {
        this.setState(prevState => ({
            settings: {
                ...prevState.settings,
                organizationSettings: {
                ...prevState.organizationSettings,
                ...updatedSettings
                }
            }
        }));
    }
    handleProjectGeneralSettingsUpdate = (updatedSettings) => {
        this.setState(prevState => ({
            settings: {
                ...prevState.settings,
                projectGeneralSettings: {
                ...prevState.projectGeneralSettings,
                ...updatedSettings
                }
            }
        }));
        console.log(this.state.settings);
    }
    handleRepositoriesSettingsUpdate = (updatedSettings) => {
        this.setState(prevState => ({
            settings: {
                ...prevState.settings,
                repositoriesSettings: {
                ...prevState.repositoriesSettings,
                ...updatedSettings
                }
            }
        }));
    }
    handlePipelinesSettingsUpdate = (updatedSettings) => {
        this.setState(prevState => ({
            settings: {
                ...prevState.settings,
                pipelinesSettings: {
                ...prevState.pipelinesSettings,
                ...updatedSettings
                }
            }
        }));
    }
    render() {
        return (
            <div className="full-height-container">
                <div className='container py-5'>
                    <div className='row'>
                        <div className='col-12 text-white text-center pb-5'>
                            <h1>Configure</h1>
                            <p>Welcome to a web-based application designed to simplify the management of Azure DevOps projects. This application features Bootstrap accordions to organize content, and provides comprehensive tools for configuring organization settings, policies, and connections to Azure, as well as managing repositories, pipelines, work items, and more specific to your project.</p>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-12 text-white text-center pb-5'>
                            <h2>Organization</h2>
                            <p>The first section allows you to configure Azure DevOps organization settings, policies, and connections to Azure, providing comprehensive tools for managing your DevOps environment.</p>
                        </div>
                    </div>
                    <div className='row pb-5'>
                        <div className="accordion" id="organizationSettingsAccordion">
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="organizationGeneralSettingsHeader">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#organizationGeneralSettingsCollapse" aria-expanded="false" aria-controls="organizationGeneralSettingsCollapse">
                                        Azure Active Directory, users and extensions
                                    </button>                   
                                </h2>
                                <div id="organizationGeneralSettingsCollapse" className="accordion-collapse collapse" aria-labelledby="organizationGeneralSettingsHeader" data-bs-parent="#organizationSettingsAccordion">
                                    <div className="accordion-body">
                                    <OrganizationGeneralSettingsForm
                                        settings={this.state.settings.organizationGeneralSettings}
                                        onUpdate={this.handleOrganizationGeneralSettingsUpdate}  />
                                    </div>
                                </div>
                            </div> 
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="organizationPoliciesHeader">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#organizationPoliciesCollapse" aria-expanded="false" aria-controls="organizationPoliciesCollapse">
                                        Policies
                                    </button>                   
                                </h2>
                                <div id="organizationPoliciesCollapse" className="accordion-collapse collapse" aria-labelledby="organizationPoliciesHeader" data-bs-parent="#organizationSettingsAccordion">
                                    <div className="accordion-body">
                                        <OrganizationPoliciesForm 
                                            settings={this.state.settings.organizationPoliciesSettings}
                                            onUpdate={this.handleOrganizationPoliciesSettingsUpdate} />
                                    </div>
                                </div>
                            </div> 
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="organizationSettingsHeader">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#organizationSettingsCollapse" aria-expanded="false" aria-controls="organizationSettingsCollapse">
                                        Settings
                                    </button>                   
                                </h2>
                                <div id="organizationSettingsCollapse" className="accordion-collapse collapse" aria-labelledby="organizationSettingsHeader" data-bs-parent="#organizationSettingsAccordion">
                                    <div className="accordion-body">
                                        <OrganizationSettingsForm
                                            settings={this.state.settings.organizationSettings}
                                            onUpdate={this.handleOrganizationSettingsUpdate} />
                                    </div>
                                </div>
                            </div> 
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-12 text-white text-center pb-5'>
                            <h2>Project</h2>
                            <p>The second section provides configuration options for your Azure DevOps project, including repositories, pipelines, work items, and more, helping you manage your project with ease.</p>
                        </div>
                    </div>          
                    <div className='row pb-5'>
                        <div className="accordion" id="projectSettingsAccordion">
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="projectSettingsHeader">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#projectSettingsCollapse" aria-expanded="false" aria-controls="projectSettingsCollapse">
                                        Project
                                    </button>                   
                                </h2>               
                                <div id="projectSettingsCollapse" className="accordion-collapse collapse" aria-labelledby="projectSettingsHeader" data-bs-parent="#projectSettingsAccordion">
                                    <div className="accordion-body">
                                        <ProjectGeneralSettingsForm 
                                            settings={this.state.settings.projectGeneralSettings}
                                            onUpdate={this.handleProjectGeneralSettingsUpdate} />
                                    </div>
                                </div>
                            </div> 
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="repositoriesSettingsHeader">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#repositoriesSettingsCollapse" aria-expanded="false" aria-controls="repositoriesSettingsCollapse">
                                        Repositories
                                    </button>                   
                                </h2>               
                                <div id="repositoriesSettingsCollapse" className="accordion-collapse collapse" aria-labelledby="repositoriesSettingsHeader" data-bs-parent="#projectSettingsAccordion">
                                    <div className="accordion-body">
                                       <RepositoriesSettingsForm
                                            settings={this.state.settings.repositoriesSettings}
                                            onUpdate={this.handleRepositoriesSettingsUpdate} />
                                    </div>
                                </div>
                            </div> 
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="pipelinesSettingsHeader">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#pipelinesSettingsCollapse" aria-expanded="true" aria-controls="pipelinesSettingsCollapse">
                                        Pipelines
                                    </button>                   
                                </h2>
                                <div id="pipelinesSettingsCollapse" className="accordion-collapse collapse" aria-labelledby="pipelinesSettingsHeader" data-bs-parent="#projectSettingsAccordion">
                                    <div className="accordion-body">
                                        <PipelinesSettingsForm
                                            settings={this.state.settings.pipelinesSettings}
                                            onUpdate={this.handlePipelinesSettingsUpdate} />
                                    </div>
                                </div>
                            </div> 
                        </div>
                    </div>
                    <div className='row text-center pb-5'>
                        <div className='col-12 text-center'>
                            <button className="btn btn-light btn-lg" data-bs-toggle="modal" data-bs-target="#importModal">Import</button>                  
                            <button className='btn btn-light btn-lg mx-2' onClick={() => this.onClickExport()}>Export</button>
                            <button className='btn btn-light btn-lg' onClick={() => this.onClickConfigure()}>Configure</button>
                        </div>
                    </div>
                </div>

                <div className="modal" id="importModal" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-body">
                                <div className="mb-3">
                                    <input type="file" className="form-control" onChange={this.onChangeFileInput} />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-secondary" onClick={this.onClickImport}>Import</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



        )
    }
}
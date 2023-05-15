import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrown, faTrophy, faClipboardList, faFile, faPlus, faPencilAlt, faTrashCan } from '@fortawesome/free-solid-svg-icons';
// import {  } from '@fortawesome/free-regular-svg-icons';

import './BoardsSettingsForm.css';

export default class BoardsSettingsForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedEpicIndex: null,
            selectedFeatureIndex: null,
            selectedUserStoryIndex: null,
            workItems: {
                epics: [
                    {
                        name: 'Epic 1', 
                        description: 'Epic 1 description',
                        features: [
                            {
                                name: 'Feature 1',
                                description: 'Feature 1 description',
                                userStory: [
                                    { 
                                        name: 'User Story 1', 
                                        description: 'User Story 1 description',
                                        task: [
                                            { 
                                                name: 'Task 1',
                                                description: 'Task 1 description'
                                            },
                                            { 
                                                name: 'Task 2',
                                                description: 'Task 2 description'
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                name: 'Feature 2',
                                description: 'Feature 2 description',
                                userStory: [
                                    { 
                                        name: 'User Story 2', 
                                        description: 'User Story 2 description',
                                        task: [
                                            { 
                                                name: 'Task 3',
                                                description: 'Task 3 description'
                                            },
                                            { 
                                                name: 'Task 4',
                                                description: 'Task 4 description'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: 'Epic 2', 
                        description: 'Epic 2 description',
                        features: [
                            {
                                name: 'Feature 1',
                                description: 'Feature 1 description',
                                userStory: [
                                    { 
                                        name: 'User Story 1', 
                                        description: 'User Story 1 description',
                                        task: [
                                            { 
                                                name: 'Task 1',
                                                description: 'Task 1 description'
                                            },
                                            { 
                                                name: 'Task 2',
                                                description: 'Task 2 description'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        };
    }
    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.setState({
               
            });
        }  
    }
    toggleFeatures = (epicIndex) => {
        this.setState((prevState) => ({
            selectedEpicIndex: prevState.selectedEpicIndex === epicIndex ? null : epicIndex,
            selectedFeatureIndex: null,
            selectedUserStoryIndex: null,
        }));
    };
    toggleUserStories = (featureIndex) => {
        this.setState((prevState) => ({
            selectedFeatureIndex: prevState.selectedFeatureIndex === featureIndex ? null : featureIndex,
            selectedUserStoryIndex: null,
        }));
    };
    toggleTasks = (userStoryIndex) => {
        this.setState((prevState) => ({
            selectedUserStoryIndex: prevState.selectedUserStoryIndex === userStoryIndex ? null : userStoryIndex,
        }));
    };
    render() {
        return (
            <div>
                <ul className="mb-3 list-group work-items">
                    {this.state.workItems.epics.map((epic, epicIndex) => (
                        <div>
                            <li className="list-group-item d-flex justify-content-between align-items-center" key={`epic-${epicIndex}`} onClick={() => this.toggleFeatures(epicIndex)}>
                                <div className="me-auto">
                                    <div className="description-tooltip" data-bs-toggle="tooltip" data-bs-placement="top" title={epic.description}>
                                        <FontAwesomeIcon className="icon-epic" icon={faCrown} size="xs" />
                                        <span className="px-2">{epic.name}</span>
                                    </div>
                                </div>
                                <div className="btn-group" role="group" aria-label="Ations">
                                    <button type="button" className="btn btn-secondary btn-sm">
                                        <FontAwesomeIcon className="text-white" icon={faPlus} size="xs" />
                                    </button>
                                    <button type="button" className="btn btn-secondary btn-sm">
                                        <FontAwesomeIcon className="text-white" icon={faPencilAlt} size="xs" />
                                    </button>
                                    <button type="button" className="btn btn-danger btn-sm">
                                        <FontAwesomeIcon className="text-white" icon={faTrashCan} size="xs" />
                                    </button>
                                </div>  
                            </li>
                            {this.state.selectedEpicIndex === epicIndex && epic.features.map((feature, featureIndex) => (
                                <div>
                                    <li className="list-group-item d-flex justify-content-between align-items-center" key={`feature-${epicIndex}-${featureIndex}`} onClick={() => this.toggleUserStories(featureIndex)}>
                                        <div className="mx-2">
                                            <div className="description-tooltip" data-bs-toggle="tooltip" data-bs-placement="top" title={feature.description}>
                                                <FontAwesomeIcon className="icon-feature" icon={faTrophy} size="xs" />
                                                <span className="px-2">{feature.name}</span>
                                            </div>
                                        </div>
                                        <div className="btn-group" role="group" aria-label="Ations">
                                            <button type="button" className="btn btn-secondary btn-sm">
                                                <FontAwesomeIcon className="text-white" icon={faPlus} size="xs" />
                                            </button>
                                            <button type="button" className="btn btn-secondary btn-sm">
                                                <FontAwesomeIcon className="text-white" icon={faPencilAlt} size="xs" />
                                            </button>
                                            <button type="button" className="btn btn-danger btn-sm">
                                                <FontAwesomeIcon className="text-white" icon={faTrashCan} size="xs" />
                                            </button>
                                        </div> 
                                    </li>
                                    {this.state.selectedFeatureIndex === featureIndex && feature.userStory.map((userStory, userStoryIndex) => (
                                        <div>
                                            <li className="list-group-item d-flex justify-content-between align-items-center" key={`userStory-${epicIndex}-${featureIndex}-${userStoryIndex}`} onClick={() => this.toggleTasks(userStoryIndex)}>
                                                <div className="mx-3">
                                                    <div className="description-tooltip" data-bs-toggle="tooltip" data-bs-placement="top" title={userStory.description}>
                                                        <FontAwesomeIcon className="icon-userstory" icon={faClipboardList} size="xs" />
                                                        <span className="px-2">{userStory.name}</span>
                                                    </div>
                                                </div>
                                                <div className="btn-group" role="group" aria-label="Ations">
                                                    <button type="button" className="btn btn-secondary btn-sm">
                                                        <FontAwesomeIcon className="text-white" icon={faPlus} size="xs" />
                                                    </button>
                                                    <button type="button" className="btn btn-secondary btn-sm">
                                                        <FontAwesomeIcon className="text-white" icon={faPencilAlt} size="xs" />
                                                    </button>
                                                    <button type="button" className="btn btn-danger btn-sm">
                                                        <FontAwesomeIcon className="text-white" icon={faTrashCan} size="xs" />
                                                    </button>
                                                </div> 
                                            </li>
                                            {this.state.selectedUserStoryIndex === userStoryIndex && userStory.task.map((task, taskIndex) => (
                                                <li className="list-group-item d-flex justify-content-between align-items-center" key={`task-${epicIndex}-${featureIndex}-${userStoryIndex}-${taskIndex}`}>
                                                    <div className="mx-4">
                                                        <div className="description-tooltip" data-bs-toggle="tooltip" data-bs-placement="top" title={task.description}>
                                                            <FontAwesomeIcon className="icon-task" icon={faFile} size="xs" />
                                                            <span className="px-2">{task.name}</span>
                                                        </div>
                                                    </div>
                                                    <div className="btn-group" role="group" aria-label="Ations">
                                                        <button type="button" className="btn btn-secondary btn-sm">
                                                            <FontAwesomeIcon className="text-white" icon={faPencilAlt} size="xs" />
                                                        </button>
                                                        <button type="button" className="btn btn-danger btn-sm">
                                                            <FontAwesomeIcon className="text-white" icon={faTrashCan} size="xs" />
                                                        </button>
                                                    </div> 
                                                </li>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            ))}     
                        </div>
                    ))}
                </ul>
                <div className="mb-3">
                    <button type="button" className="btn btn-secondary">Add Epic</button>
                </div>
            </div>
        );
    }       
}
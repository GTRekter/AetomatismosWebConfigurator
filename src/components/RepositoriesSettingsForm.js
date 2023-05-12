import React, { Component } from 'react';
import './settings.css';

export default class RepositoriesSettingsForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            repositories: [],
            branches: []    
        };
        this.onChangeInput = this.onChangeInput.bind(this);
        this.onClickAddRepository = this.onClickAddRepository.bind(this);
        this.onClickRemoveRepository = this.onClickRemoveRepository.bind(this);
    }
    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            this.setState({
                repositories: this.props.settings.repositories || [],
                branches: this.props.settings.branches || []
            });
        }  
    }
    onChangeInput = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        }, () => {
            this.props.onUpdate(this.state);
        });
    };
    onChangeRepositoryNameInput = (event) => {
        const target = event.target;
        const name = target.name;
        const { repositories } = this.state;
        const updatedRepositories = [...repositories];
        updatedRepositories[name].name = target.value;
        this.setState({
            repositories: updatedRepositories
        },() => {
            this.props.onUpdate(this.state);
        });
    }
    onChangeBranchNameInput = (event) => {
        const target = event.target;
        const name = target.name;
        const { branches } = this.state;
        const updatedBranches = [...branches];
        updatedBranches[name].name = target.value;
        this.setState({
            branches: updatedBranches
        },() => {
            this.props.onUpdate(this.state);
        });
    }
    onClickAddRepository = () => {
        const { repositories } = this.state;
        repositories.push({
            name: ''
        });
        this.setState({
            repositories: repositories
        },() => {
            this.props.onUpdate(this.state);
        });
    }
    onClickRemoveRepository = (index) => {
        const { repositories } = this.state;
        repositories.splice(index, 1);
        this.setState({
            repositories: repositories
        },() => {
            this.props.onUpdate(this.state);
        });
    }
    onClickAddBranch = () => {
        const { branches } = this.state;
        branches.push({
            name: ''
        });
        this.setState({
            branches: branches
        },() => {
            this.props.onUpdate(this.state);
        });
    }
    onClickRemoveBranch = (index) => {
        const { branches } = this.state;
        branches.splice(index, 1);
        this.setState({
            branches: branches
        },() => {
            this.props.onUpdate(this.state);
        });
    }
    render() {
        return (
            <div>
                <div className="mb-3">
                    <label className="form-label">Repositories name</label><br/>
                    {this.state.repositories.map((repository, index) => {
                        return (
                            <div className="row" key={index}>
                                <div className="col-10">
                                    <input className="mb-3 form-control" key={index} type="text" name={index} placeholder="microsoft" value={repository.name} onChange={this.onChangeRepositoryNameInput} />         
                                </div>
                                <div className="col-2">
                                    <button type="button" className="btn btn-danger" onClick={() => this.onClickRemoveRepository(index)}>Remove</button>
                                </div>
                            </div>     
                        )
                    })}
                    <button type="button" className="btn btn-secondary" onClick={() => this.onClickAddRepository()}>Add repository</button>        
                </div>
                <div className="mb-3">
                    <label className="form-label">Branches name</label><br/>
                    {this.state.branches.map((branch, index) => {
                        return (
                            <div className="row" key={index}>
                                <div className="col-10">
                                    <input className="mb-3 form-control" key={index} type="text" name={index} placeholder="microsoft" value={branch.name} onChange={this.onChangeBranchNameInput} />     
                                </div>
                                <div className="col-2">
                                    <button type="button" className="btn btn-danger" onClick={() => this.onClickRemoveBranch(index)}>Remove</button>
                                </div>
                            </div>           
                        )
                    })}
                    <button type="button" className="btn btn-secondary" onClick={() => this.onClickAddBranch()}>Add branch</button>        
                </div>
            </div>
        )
    }
}
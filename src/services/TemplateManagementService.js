class TemplateManagementService {
  constructor(state, filename) {
    this.state = state;
    this.filename = filename;
  }
  generateJson() {
    const json = {
      organization: {
        name: '',
        azure_active_directory: {},
        users: [],
        extensions: [],
        policies: {
          disallow_third_party_application_access_via_oauth: false,
          disallow_ssh_authentication: false,
          log_audit_events: false,
          allow_public_projects: false,
          additional_protections_public_package_registries: false,
          enable_azure_active_directory_conditional_access_policy_validation: false,
          disallow_external_guest_access: false,
          allow_team_and_project_administrators_to_invite_new_users: false,
          request_access: {
              enable: false,
              url: ''
          }
        },
        settings: {
            disable_anonymous_access_badges: false,
            limit_variables_set_queue_time: false,
            limit_job_authorization_current_project_non_release_pipelines: false,
            limit_job_authorization_current_project_release_pipelines: false,
            protect_access_repositories_yaml_pipelines: false,
            disable_stage_chooser: false,
            disable_creation_classic_build_and_classic_release_pipelines: false,
            disable_built_in_tasks: false,
            disable_marketplace_tasks: false,
            disable_node_six_tasks: false
        }
      },
      repository: {
        repositories: []
      }
    };


    // Organization general settings
    if (this.state.targetOrganizationName) {
      json.organization.name = this.state.targetOrganizationName;
    }
    if (this.state.connectToAzureActiveDirectory) {
      json.organization.azure_active_directory = {
        tenant_id: this.state.tenantId
      };
    }
    if (this.state.usersToAddToOrganiation) {
      const emails = this.state.usersToAddToOrganiation.split(",");
      for (const email of emails) {
        json.organization.users.push({
          email: email
        });
      }
    }
    if (this.state.extensionsToAddToOrganiation) {
      const extensions = this.state.extensionsToAddToOrganiation.split(",");
      for (const extension of extensions) {
        const [id, publisher_id] = extension.trim().split(".");
        json.organization.extensions.push({
          id: id,
          publisher_id: publisher_id
        });
      }
    }

    // Organization Policies
    if (this.state.disallowThirdPartyApplicationAccessViaOauth) {
      json.organization.policies.disallow_third_party_application_access_via_oauth = this.state.disallowThirdPartyApplicationAccessViaOauth;
    }
    if (this.state.disallowSshAuthentication) {
      json.organization.policies.disallow_ssh_authentication = this.state.disallowSshAuthentication;
    }
    if (this.state.logAuditEvents) {
      json.organization.policies.log_audit_events = this.state.logAuditEvents;
    }
    if (this.state.allowPublicProjects) {
      json.organization.policies.allow_public_projects = this.state.allowPublicProjects;
    }
    if (this.state.additionalProtectionsPublicPackageRegistries) {
      json.organization.policies.additional_protections_public_package_registries = this.state.additionalProtectionsPublicPackageRegistries;
    }
    if (this.state.enableAzureActiveDirectoryConditionalAccessPolicyValidation) {
      json.organization.policies.enable_azure_active_directory_conditional_access_policy_validation = this.state.enableAzureActiveDirectoryConditionalAccessPolicyValidation;
    }
    if (this.state.disallowExternalGuestAccess) {
      json.organization.policies.disallow_external_guest_access = this.state.disallowExternalGuestAccess;
    }
    if (this.state.allowTeamAndProjectAdministratorsToInviteNewUsers) {
      json.organization.policies.allow_team_and_project_administrators_to_invite_new_users = this.state.allowTeamAndProjectAdministratorsToInviteNewUsers;
    }
    if (this.state.requestAccessEnable) {
      json.organization.policies.request_access.enable = this.state.requestAccessEnable;
    }
    if (this.state.requestAccessUrl) {
      json.organization.policies.request_access.url = this.state.requestAccessUrl;
    }

    // Organization Settings
    if (this.state.disableAnonymousAccessBadges) {
      json.organization.settings.disable_anonymous_access_badges = this.state.disableAnonymousAccessBadges;
    }
    if (this.state.limitVariablesSetQueueTime) {
      json.organization.settings.limit_variables_set_queue_time = this.state.limitVariablesSetQueueTime;
    }
    if (this.state.limitJobAuthorizationCurrentProjectNonReleasePipelines) {
      json.organization.settings.limit_job_authorization_current_project_non_release_pipelines = this.state.limitJobAuthorizationCurrentProjectNonReleasePipelines;
    }
    if (this.state.limitJobAuthorizationCurrentProjectReleasePipelines) {
      json.organization.settings.limit_job_authorization_current_project_release_pipelines = this.state.limitJobAuthorizationCurrentProjectReleasePipelines;
    }
    if (this.state.protectAccessRepositoriesYamlPipelines) {
      json.organization.settings.protect_access_repositories_yaml_pipelines = this.state.protectAccessRepositoriesYamlPipelines;
    }
    if (this.state.disableStageChooser) {
      json.organization.settings.disable_stage_chooser = this.state.disableStageChooser;
    }
    if (this.state.disableCreationClassicBuildAndClassicReleasePipelines) {
      json.organization.settings.disable_creation_classic_build_and_classic_release_pipelines = this.state.disableCreationClassicBuildAndClassicReleasePipelines;
    }
    if (this.state.disableBuiltInTasks) {
      json.organization.settings.disable_built_in_tasks = this.state.disableBuiltInTasks;
    }
    if (this.state.disableMarketplaceTasks) {
      json.organization.settings.disable_marketplace_tasks = this.state.disableMarketplaceTasks;
    }
    if (this.state.disableNodeSixTasks) {
      json.organization.settings.disable_node_six_tasks = this.state.disableNodeSixTasks;
    }

    // Repositories settings
    if (this.state.repositories) {
      for(const repository of this.state.repositories) {
        json.repository.repositories.push({
          name: repository.name
        });
      }
    }

    const jsonString = JSON.stringify(json, null, 2);
    const blob = new Blob([jsonString], {type: "application/json"});
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = this.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }  
}
export default TemplateManagementService;
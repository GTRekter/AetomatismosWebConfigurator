class TemplateManagementService {
  convertJson(content) {
    const data = JSON.parse(content);
    const transformedData = {
      organizationGeneralSettings: {
        targetOrganizationName: data.organization.name,
        connectToAzureActiveDirectory: data.organization.azure_active_directory !== undefined,
        tenantId: data.organization.azure_active_directory?.tenant_id || '',
        usersToAddToOrganiation: '',
        extensionsToAddToOrganiation: '',
      },
      organizationPoliciesSettings: {
        disallowThirdPartyApplicationAccessViaOauth: data.organization.policies.disallow_third_party_application_access_via_oauth,
        disallowSshAuthentication: data.organization.policies.disallow_ssh_authentication,
        logAuditEvents: data.organization.policies.log_audit_events,
        allowPublicProjects: data.organization.policies.allow_public_projects,
        additionalProtectionsPublicPackageRegistries: data.organization.policies.additional_protections_public_package_registries,
        enableAzureActiveDirectoryConditionalAccessPolicyValidation: data.organization.policies.enable_azure_active_directory_conditional_access_policy_validation,
        disallowExternalGuestAccess: data.organization.policies.disallow_external_guest_access,
        allowTeamAndProjectAdministratorsToInviteNewUsers: data.organization.policies.allow_team_and_project_administrators_to_invite_new_users,
        requestAccessEnable: data.organization.policies.request_access.enable,
        requestAccessUrl: data.organization.policies.request_access.url,
      },
      organizationSettings: {
        disableAnonymousAccessBadges: data.organization.settings.disable_anonymous_access_badges,
        limitVariablesSetQueueTime: data.organization.settings.limit_variables_set_queue_time,
        limitJobAuthorizationCurrentProjectNonReleasePipelines: data.organization.settings.limit_job_authorization_current_project_non_release_pipelines,
        limitJobAuthorizationCurrentProjectReleasePipelines: data.organization.settings.limit_job_authorization_current_project_release_pipelines,
        protectAccessRepositoriesYamlPipelines: data.organization.settings.protect_access_repositories_yaml_pipelines,
        disableStageChooser: data.organization.settings.disable_stage_chooser,
        disableCreationClassicBuildAndClassicReleasePipelines: data.organization.settings.disable_creation_classic_build_and_classic_release_pipelines,
        disableBuiltInTasks: data.organization.settings.disable_built_in_tasks,
        disableMarketplaceTasks: data.organization.settings.disable_marketplace_tasks,
        disableNodeSixTasks: data.organization.settings.disable_node_six_tasks
      },
      projectGeneralSettings: {
          projectName: data.project.name,
          projectDescription: data.project.description,
          projectVisibility: data.project.visibility,
          projectProcessTemplate: data.process,
          securityGroups: data.project.security_groups
      },
      repositoriesSettings: {
          repositories: data.repository.repositories,
          branches: data.repository.branches
      }
    };
    return transformedData;
  }
  generateJson(settings, filename) {
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
      project: {
        name: '',
        description: '',
        process: '',
        visibility: '',
        security_groups: []
      },
      repository: {
        repositories: []
      }
    };

    // Organization General Settings
    if (settings.organizationGeneralSettings.targetOrganizationName) {
      json.organization.name = settings.organizationGeneralSettings.targetOrganizationName;
    }
    if (settings.organizationGeneralSettings.connectToAzureActiveDirectory) {
      json.organization.azure_active_directory = {
        tenant_id: settings.organizationGeneralSettings.tenantId
      };
    }
    if (settings.organizationGeneralSettings.usersToAddToOrganiation) {
      const emails = settings.organizationGeneralSettings.usersToAddToOrganiation.split(",");
      for (const email of emails) {
        json.organization.users.push({
          email: email
        });
      }
    }
    if (settings.organizationGeneralSettings.extensionsToAddToOrganiation) {
      const extensions = settings.organizationGeneralSettings.extensionsToAddToOrganiation.split(",");
      for (const extension of extensions) {
        const [id, publisher_id] = extension.trim().split(".");
        json.organization.extensions.push({
          id: id,
          publisher_id: publisher_id
        });
      }
    }

    // Organization Policies
    if (settings.organizationPoliciesSettings.disallowThirdPartyApplicationAccessViaOauth) {
      json.organization.policies.disallow_third_party_application_access_via_oauth = settings.organizationPoliciesSettings.disallowThirdPartyApplicationAccessViaOauth;
    }
    if (settings.organizationPoliciesSettings.disallowSshAuthentication) {
      json.organization.policies.disallow_ssh_authentication = settings.organizationPoliciesSettings.disallowSshAuthentication;
    }
    if (settings.organizationPoliciesSettings.logAuditEvents) {
      json.organization.policies.log_audit_events = settings.organizationPoliciesSettings.logAuditEvents;
    }
    if (settings.organizationPoliciesSettings.allowPublicProjects) {
      json.organization.policies.allow_public_projects = settings.organizationPoliciesSettings.allowPublicProjects;
    }
    if (settings.organizationPoliciesSettings.additionalProtectionsPublicPackageRegistries) {
      json.organization.policies.additional_protections_public_package_registries = settings.organizationPoliciesSettings.additionalProtectionsPublicPackageRegistries;
    }
    if (settings.organizationPoliciesSettings.enableAzureActiveDirectoryConditionalAccessPolicyValidation) {
      json.organization.policies.enable_azure_active_directory_conditional_access_policy_validation = settings.organizationPoliciesSettings.enableAzureActiveDirectoryConditionalAccessPolicyValidation;
    }
    if (settings.organizationPoliciesSettings.disallowExternalGuestAccess) {
      json.organization.policies.disallow_external_guest_access = settings.organizationPoliciesSettings.disallowExternalGuestAccess;
    }
    if (settings.allowTeamAndProjectAdministratorsToInviteNewUsers) {
      json.organization.policies.allow_team_and_project_administrators_to_invite_new_users = settings.organizationPoliciesSettings.allowTeamAndProjectAdministratorsToInviteNewUsers;
    }
    if (settings.organizationPoliciesSettings.requestAccessEnable) {
      json.organization.policies.request_access.enable = settings.organizationPoliciesSettings.requestAccessEnable;
    }
    if (settings.organizationPoliciesSettings.requestAccessUrl) {
      json.organization.policies.request_access.url = settings.organizationPoliciesSettings.requestAccessUrl;
    }

    // Organization Settings
    if (settings.organizationSettings.disableAnonymousAccessBadges) {
      json.organization.settings.disable_anonymous_access_badges = settings.organizationSettings.disableAnonymousAccessBadges;
    }
    if (settings.organizationSettings.limitVariablesSetQueueTime) {
      json.organization.settings.limit_variables_set_queue_time = settings.organizationSettings.limitVariablesSetQueueTime;
    }
    if (settings.organizationSettings.limitJobAuthorizationCurrentProjectNonReleasePipelines) {
      json.organization.settings.limit_job_authorization_current_project_non_release_pipelines = settings.organizationSettings.limitJobAuthorizationCurrentProjectNonReleasePipelines;
    }
    if (settings.organizationSettings.limitJobAuthorizationCurrentProjectReleasePipelines) {
      json.organization.settings.limit_job_authorization_current_project_release_pipelines = settings.organizationSettings.limitJobAuthorizationCurrentProjectReleasePipelines;
    }
    if (settings.organizationSettings.protectAccessRepositoriesYamlPipelines) {
      json.organization.settings.protect_access_repositories_yaml_pipelines = settings.organizationSettings.protectAccessRepositoriesYamlPipelines;
    }
    if (settings.organizationSettings.disableStageChooser) {
      json.organization.settings.disable_stage_chooser = settings.organizationSettings.disableStageChooser;
    }
    if (settings.organizationSettings.disableCreationClassicBuildAndClassicReleasePipelines) {
      json.organization.settings.disable_creation_classic_build_and_classic_release_pipelines = settings.organizationSettings.disableCreationClassicBuildAndClassicReleasePipelines;
    }
    if (settings.organizationSettings.disableBuiltInTasks) {
      json.organization.settings.disable_built_in_tasks = settings.organizationSettings.disableBuiltInTasks;
    }
    if (settings.organizationSettings.disableMarketplaceTasks) {
      json.organization.settings.disable_marketplace_tasks = settings.organizationSettings.disableMarketplaceTasks;
    }
    if (settings.organizationSettings.disableNodeSixTasks) {
      json.organization.settings.disable_node_six_tasks = settings.organizationSettings.disableNodeSixTasks;
    }

    // Project settings
    if (settings.projectGeneralSettings.projectName) {
      json.project.name = settings.projectGeneralSettings.projectName;
    }
    if (settings.projectGeneralSettings.projectDescription) {
      json.project.description = settings.projectGeneralSettings.projectDescription;
    }
    if (settings.projectGeneralSettings.projectProcessTemplate) {
      json.project.process = settings.projectGeneralSettings.projectProcessTemplate;
    }
    if (settings.projectGeneralSettings.projectVisibility) {
      json.project.visibility = settings.projectGeneralSettings.projectVisibility;
    }
    console.log(settings.projectGeneralSettings.securityGroups);
    if(settings.projectGeneralSettings.securityGroups) {
      for (const securityGroup of settings.projectGeneralSettings.securityGroups) {
        json.project.security_groups.push({
          name: securityGroup.name,
          description: securityGroup.description
        });
      }
    }

    // Repositories settings
    if (settings.repositoriesSettings.repositories) {
      for(const repository of settings.repositoriesSettings.repositories) {
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
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }  
}
export default TemplateManagementService;
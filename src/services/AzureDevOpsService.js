class AzureDevOpsService {   
    
    get_organization_id() {
        // local ORG_NAME=$1
        // local PAT=$2
        // log "Read organization ID by $ORG_NAME"
        // log verbose 'Request: {"contributionIds": ["ms.vss-features.my-organizations-data-provider"],"dataProviderContext":{"properties":{}}}'
        // log verbose "Url: https://dev.azure.com/$ORG_NAME/_apis/Contribution/HierarchyQuery?api-version=5.0-preview.1"
        // RESPONSE=$(curl --silent \
        //         --write-out "\n%{http_code}" \
        //         --header "Authorization: Basic $(echo -n :$PAT | base64)" \
        //         --header "Content-Type: application/json" \
        //         --data-raw '{"contributionIds": ["ms.vss-features.my-organizations-data-provider"],"dataProviderContext":{"properties":{}}}' \
        //         "https://dev.azure.com/$ORG_NAME/_apis/Contribution/HierarchyQuery?api-version=5.0-preview.1")
        // HTTP_STATUS=$(tail -n1 <<< "$RESPONSE")
        // log verbose "Response HTTP status: $HTTP_STATUS"
        // RESPONSE_BODY=$(sed '$ d' <<< "$RESPONSE") 
        // log verbose "Response body: $RESPONSE_BODY"
        // if [ $HTTP_STATUS != 200 ]; then
        //     log error "Error during the reading of the organization ID"
        //     exit 1;
        // else
        //     log success "Organization ID was read successfully"
        // fi
        // ORG_ID=$(echo "$RESPONSE_BODY" | jq '.dataProviders."ms.vss-features.my-organizations-data-provider".organizations[] | select(.name == "'"$ORG_NAME"'") | .id' | tr -d '"')
        // log debug "Organization ID: $ORG_ID"
        // echo $ORG_ID
    }
    
    getOrgnizationTenantData(){
        return fetch("https://dev.azure.com/${ORG_NAME}/_settings/organizationAad?__rt=fps&__ver=2",{ 
            method: 'get',
            mode: 'cors',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                "Authorization: Basic ${PersonalAccessToken}"
            }
        })
        .then(res => res.json());   

        // RESPONSE=$(curl --silent \
        //     --write-out "\n%{http_code}" \
        //     --header "Authorization: Basic $(echo -n :$PAT | base64)" \
        //     --header "Content-Type: application/json" \
        //     "https://dev.azure.com/$ORG_NAME/_settings/organizationAad?__rt=fps&__ver=2")
        // if [[ $(echo "$RESPONSE_BODY" | jq -r '.fps.dataProviders.data."ms.vss-admin-web.organization-admin-aad-data-provider".orgnizationTenantData.domain') != "" ]]; then    
        //     DISPLAY_NAME=$(echo "$RESPONSE_BODY" | jq -r '.fps.dataProviders.data."ms.vss-admin-web.organization-admin-aad-data-provider".orgnizationTenantData.displayName')
        //     ID=$(echo "$RESPONSE_BODY" | jq -r '.fps.dataProviders.data."ms.vss-admin-web.organization-admin-aad-data-provider".orgnizationTenantData.id')
        //     DOMAIN=$(echo "$RESPONSE_BODY" | jq -r '.fps.dataProviders.data."ms.vss-admin-web.organization-admin-aad-data-provider".orgnizationTenantData.domain')
        //     return 1
        // else
        //     log "The $ORG_NAME organization is not connected to Azure Active Directory. Connecting..."
        // fi
    }
    setOrgnizationTenantData(){
        return fetch("https://vssps.dev.azure.com/${ORG_NAME}/_apis/Organization/Organizations/Me?api-version=5.0-preview.1",{ 
            method: 'get',
            mode: 'cors',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                "Authorization: Basic ${PersonalAccessToken}"
            }
        })
        .then(res => res.json());   
        // RESPONSE=$(curl --silent \
        //     --request PATCH \
        //     --write-out "\n%{http_code}" \
        //     --header "Authorization: Basic $(echo -n :$PAT | base64)" \
        //     --header "Content-Type: application/json-patch+json" \
        //     --data-raw '[{"from":"","op":2,"path":"/TenantId","value":"'$TENANT_ID'"}]' \
        //     "https://vssps.dev.azure.com/$ORG_NAME/_apis/Organization/Organizations/Me?api-version=5.0-preview.1")
        // if [ $HTTP_STATUS != 200 ]; then
        //     log error "Error during the connection to Azure Active Directory. $RESPONSE_BODY"
        //     return 1;
        // else
        //     log success "Connection to Azure Active Directory was successful"
        // fi
    }
    getOrganizationExtensions(){
        // RESPONSE=$(az devops extension show --extension-id "$ID" --publisher-id "$PUBLISHER_ID" --organization "https://dev.azure.com/$ORG_NAME")
        // if [ -z "$RESPONSE" ]; then
        //     log "$ID is not installed"
        // else
        //     log warning "$ID is already installed. Skipping..."
        //     continue
        // fi
    }
    setOrganizationExtensions(){
        // az devops extension install --extension-id "$ID" --publisher-id "$PUBLISHER_ID" --organization "https://dev.azure.com/$ORG_NAME"
        // if [ $? -eq 0 ]; then
        //     log success "Extension $ID was installed to $ORG_NAME organization"
        // else
        //     log error "Extension $ID was not installed to $ORG_NAME organization"
        //     return 1
        // fi
    }
    getUsereFromOrganization(){
        // EMAIL=$(echo "$USER_JSON" | jq -r '.email')
        // RESPONSE=$(az devops user show --user $EMAIL --organization "https://dev.azure.com/$ORG_NAME")
        // if [ -z "$RESPONSE" ]; then
        //     log success "User $NAME ($EMAIL) is not a member of $ORG_NAME organization"
        // else
        //     log warning  "User $NAME ($EMAIL) is already a member of $ORG_NAME organization. Skipping..."
        //     continue
        // fi
    }
    addUserToOrganization(){
        // az devops user add --email-id "$EMAIL" --license-type "express" --send-email-invite false --organization "https://dev.azure.com/$ORG_NAME"
        // if [ $? -eq 0 ]; then
        //     log success "User $NAME ($EMAIL) was added to $ORG_NAME organization"
        // else
        //     log error "User $NAME ($EMAIL) was not added to $ORG_NAME organization"
        //     return 1
        // fi
    }

    // Organization Policy
    configureOrganizationThirdPartyAccessViaOauthPolicy(){
        // THIRD_PARTY_ACCESS_VIA_OAUTH=$(echo "$DEFAULT_JSON" | jq -r '.organization.policies.disallow_third_party_application_access_via_oauth')
        // RESPONSE=$(curl --silent \
        //         --request PATCH \
        //         --write-out "\n%{http_code}" \
        //         --header "Authorization: Basic $(echo -n :$PAT | base64)" \
        //         --header "Content-Type: application/json-patch+json" \
        //         --data-raw '[{"from":"","op":2,"path":"/Value","value":"'$THIRD_PARTY_ACCESS_VIA_OAUTH'"}]' \
        //         "https://dev.azure.com/$ORG_NAME/_apis/OrganizationPolicy/Policies/Policy.DisallowOAuthAuthentication?api-version=5.0-preview.1")
        // HTTP_STATUS=$(tail -n1 <<< "$RESPONSE")
        // log verbose "Response code: $HTTP_STATUS"
        // if [ $HTTP_STATUS != 204 ]; then
        //     log error "Error during the configuration of the Third-party application access via OAuth policy. $RESPONSE_BODY"
        //     return 1;
        // else
        //     log success "Configuration of the Third-party application access via OAuth policy was successful"
        // fi
    }
    configureOrganizationSSHAuthenticationPolicy(){
        // SSH_AUTHENTICATION=$(echo "$DEFAULT_JSON" | jq -r '.organization.policies.disallow_ssh_authentication')
        // log "Setting SSH authentication to $SSH_AUTHENTICATION"
        // log verbose 'Request: [{"from":"","op":2,"path":"/Value","value":"'$SSH_AUTHENTICATION'"}]'
        // log verbose "Url: https://dev.azure.com/$ORG_NAME/_apis/OrganizationPolicy/Policies/Policy.DisallowSecureShell?api-version=5.0-preview.1"
        // RESPONSE=$(curl --silent \
        //         --request PATCH \
        //         --write-out "\n%{http_code}" \
        //         --header "Authorization: Basic $(echo -n :$PAT | base64)" \
        //         --header "Content-Type: application/json-patch+json" \
        //         --data-raw '[{"from":"","op":2,"path":"/Value","value":"'$SSH_AUTHENTICATION'"}]' \
        //         "https://dev.azure.com/$ORG_NAME/_apis/OrganizationPolicy/Policies/Policy.DisallowSecureShell?api-version=5.0-preview.1")
        // HTTP_STATUS=$(tail -n1 <<< "$RESPONSE") 
        // log verbose "Response code: $HTTP_STATUS"
        // if [ $HTTP_STATUS != 204 ]; then
        //     log error "Error during the configuration of the SSH authentication policy. $RESPONSE_BODY"
        //     return 1;
        // else
        //     log success "Configuration of the SSH authentication policy was successful"
        // fi
    }
    configureOrganizationLogAuditEventsPolicy(){
        // LOG_AUDIT_EVENTS=$(echo "$DEFAULT_JSON" | jq -r '.organization.policies.log_audit_events')
        // log "Setting Log audit events to $LOG_AUDIT_EVENTS"
        // log verbose 'Request: [{"from":"","op":2,"path":"/Value","value":"'$LOG_AUDIT_EVENTS'"}]'
        // log verbose "Url: https://dev.azure.com/$ORG_NAME/_apis/OrganizationPolicy/Policies/Policy.LogAuditEvents?api-version=5.0-preview.1"
        // RESPONSE=$(curl --silent \
        //         --request PATCH \
        //         --write-out "\n%{http_code}" \
        //         --header "Authorization: Basic $(echo -n :$PAT | base64)" \
        //         --header "Content-Type: application/json-patch+json" \
        //         --data-raw '[{"from":"","op":2,"path":"/Value","value":"'$LOG_AUDIT_EVENTS'"}]' \
        //         "https://dev.azure.com/$ORG_NAME/_apis/OrganizationPolicy/Policies/Policy.LogAuditEvents?api-version=5.0-preview.1")
        // HTTP_STATUS=$(tail -n1 <<< "$RESPONSE")
        // log verbose "Response code: $HTTP_STATUS"
        // if [ $HTTP_STATUS != 204 ]; then
        //     log error "Error during the configuration of the Log audit events policy. $RESPONSE_BODY"
        //     return 1;
        // else
        //     log success "Configuration of the Log audit events policy was successful"
        // fi
    }
    configureOrganizationAllowPublicProjectsPolicy(){
        // ALLOW_PUBLIC_PROJECTS=$(echo "$DEFAULT_JSON" | jq -r '.organization.policies.allow_public_projects')
        // log "Setting Allow public projects to $ALLOW_PUBLIC_PROJECTS"
        // log verbose 'Request: [{"from":"","op":2,"path":"/Value","value":"'$ALLOW_PUBLIC_PROJECTS'"}]'
        // log verbose "Url: https://dev.azure.com/$ORG_NAME/_apis/OrganizationPolicy/Policies/Policy.AllowAnonymousAccess?api-version=5.0-preview.1"
        // RESPONSE=$(curl --silent \
        //         --request PATCH \
        //         --write-out "\n%{http_code}" \
        //         --header "Authorization: Basic $(echo -n :$PAT | base64)" \
        //         --header "Content-Type: application/json-patch+json" \
        //         --data-raw '[{"from":"","op":2,"path":"/Value","value":"'$ALLOW_PUBLIC_PROJECTS'"}]' \
        //         "https://dev.azure.com/$ORG_NAME/_apis/OrganizationPolicy/Policies/Policy.AllowAnonymousAccess?api-version=5.0-preview.1")
        // HTTP_STATUS=$(tail -n1 <<< "$RESPONSE")
        // log verbose "Response code: $HTTP_STATUS"
        // if [ $HTTP_STATUS != 204 ]; then
        //     log error "Error during the configuration of the Allow public projects policy. $RESPONSE_BODY"
        //     return 1;
        // else
        //     log success "Configuration of the Allow public projects policy was successful"
        // fi
    }
    configureOrganizationArtifactExternalPackageProtectionTokenPolicy(){
        // ARTIFACTS_EXTERNAL_PACKAGE_PROTECTION_TOKEN=$(echo "$DEFAULT_JSON" | jq -r '.organization.policies.additional_protections_public_package_registries')
        // log "Setting Additional protections for public package registries to $ARTIFACTS_EXTERNAL_PACKAGE_PROTECTION_TOKEN"
        // log verbose 'Request: [{"from":"","op":2,"path":"/Value","value":"'$ARTIFACTS_EXTERNAL_PACKAGE_PROTECTION_TOKEN'"}]'
        // log verbose "Url: https://dev.azure.com/$ORG_NAME/_apis/OrganizationPolicy/Policies/Policy.ArtifactsExternalPackageProtectionToken?api-version=5.0-preview.1"
        // RESPONSE=$(curl --silent \
        //         --request PATCH \
        //         --write-out "\n%{http_code}" \
        //         --header "Authorization: Basic $(echo -n :$PAT | base64)" \
        //         --header "Content-Type: application/json-patch+json" \
        //         --data-raw '[{"from":"","op":2,"path":"/Value","value":"'$ARTIFACTS_EXTERNAL_PACKAGE_PROTECTION_TOKEN'"}]' \
        //         "https://dev.azure.com/$ORG_NAME/_apis/OrganizationPolicy/Policies/Policy.ArtifactsExternalPackageProtectionToken?api-version=5.0-preview.1")
        // HTTP_STATUS=$(tail -n1 <<< "$RESPONSE")
        // log verbose "Response code: $HTTP_STATUS"
        // if [ $HTTP_STATUS != 204 ]; then
        //     log error "Error during the configuration of the Additional protections for public package registries policy. $RESPONSE_BODY"
        //     return 1;
        // else
        //     log success "Configuration of the Additional protections for public package registries policy was successful"
        // fi
    }
    configureOrganizationEnforceAzureActiveDirectoryConditionalAccessPolicy(){
        // ENFORCE_AZURE_ACTIVE_DIRECTORY_CONDITIONAL_ACCESS=$(echo "$DEFAULT_JSON" | jq -r '.organization.policies.enable_azure_active_directory_conditional_access_policy_validation')
        // log "Setting Additional protections for public package registries to $ENFORCE_AZURE_ACTIVE_DIRECTORY_CONDITIONAL_ACCESS"
        // log verbose 'Request: [{"from":"","op":2,"path":"/Value","value":"'$ENFORCE_AZURE_ACTIVE_DIRECTORY_CONDITIONAL_ACCESS'"}]'
        // log verbose "Url: https://dev.azure.com/$ORG_NAME/_apis/OrganizationPolicy/Policies/Policy.EnforceAADConditionalAccess?api-version=5.0-preview.1"
        // RESPONSE=$(curl --silent \
        //         --request PATCH \
        //         --write-out "\n%{http_code}" \
        //         --header "Authorization: Basic $(echo -n :$PAT | base64)" \
        //         --header "Content-Type: application/json-patch+json" \
        //         --data-raw '[{"from":"","op":2,"path":"/Value","value":"'$ENFORCE_AZURE_ACTIVE_DIRECTORY_CONDITIONAL_ACCESS'"}]' \
        //         "https://dev.azure.com/$ORG_NAME/_apis/OrganizationPolicy/Policies/Policy.EnforceAADConditionalAccess?api-version=5.0-preview.1")
        // HTTP_STATUS=$(tail -n1 <<< "$RESPONSE")
        // log verbose "Response code: $HTTP_STATUS"
        // if [ $HTTP_STATUS != 204 ]; then
        //     log error "Error during the configuration of the Additional protections for public package registries policy. $RESPONSE_BODY"
        //     return 1;
        // else
        //     log success "Configuration of the Additional protections for public package registries policy was successful"
        // fi
    }
    configureOrganizationAllowTeamAdminsInvitationsAccessTokenPolicy(){
        // ALLOW_TEAM_ADMINS_INVITATIONS_ACCESS_TOKEN=$(echo "$DEFAULT_JSON" | jq -r '.organization.policies.allow_team_and_project_administrators_to_invite_new_users')
        // log "Setting Additional protections for public package registries to $ALLOW_TEAM_ADMINS_INVITATIONS_ACCESS_TOKEN"
        // log verbose 'Request: [{"from":"","op":2,"path":"/Value","value":"'$ALLOW_TEAM_ADMINS_INVITATIONS_ACCESS_TOKEN'"}]'
        // log verbose "Url: https://dev.azure.com/$ORG_NAME/_apis/OrganizationPolicy/Policies/Policy.AllowTeamAdminsInvitationsAccessToken?api-version=5.0-preview.1"
        // RESPONSE=$(curl --silent \
        //         --request PATCH \
        //         --write-out "\n%{http_code}" \
        //         --header "Authorization: Basic $(echo -n :$PAT | base64)" \
        //         --header "Content-Type: application/json-patch+json" \
        //         --data-raw '[{"from":"","op":2,"path":"/Value","value":"'$ALLOW_TEAM_ADMINS_INVITATIONS_ACCESS_TOKEN'"}]' \
        //         "https://dev.azure.com/$ORG_NAME/_apis/OrganizationPolicy/Policies/Policy.AllowTeamAdminsInvitationsAccessToken?api-version=5.0-preview.1")
        // HTTP_STATUS=$(tail -n1 <<< "$RESPONSE")
        // log verbose "Response code: $HTTP_STATUS"
        // if [ $HTTP_STATUS != 204 ]; then
        //     log error "Error during the configuration of the Additional protections for public package registries policy. $RESPONSE_BODY"
        //     return 1;
        // else
        //     log success "Configuration of the Additional protections for public package registries policy was successful"
        // fi
    }
    configureOrganizationAllowGuestUsersPolicy(){
        // ALLOW_GUEST_USERS=$(echo "$DEFAULT_JSON" | jq -r '.organization.policies.disallow_external_guest_access')
        // log "Setting Allow guest users to $ALLOW_GUEST_USERS"
        // log verbose 'Request: [{"from":"","op":2,"path":"/Value","value":"'$ALLOW_GUEST_USERS'"}]'
        // log verbose "Url: https://dev.azure.com/$ORG_NAME/_apis/OrganizationPolicy/Policies/Policy.DisallowAadGuestUserAccess?api-version=5.0-preview.1"
        // RESPONSE=$(curl --silent \
        //         --request PATCH \
        //         --write-out "\n%{http_code}" \
        //         --header "Authorization: Basic $(echo -n :$PAT | base64)" \
        //         --header "Content-Type: application/json-patch+json" \
        //         --data-raw '[{"from":"","op":2,"path":"/Value","value":"'$ALLOW_GUEST_USERS'"}]' \
        //         "https://dev.azure.com/$ORG_NAME/_apis/OrganizationPolicy/Policies/Policy.DisallowAadGuestUserAccess?api-version=5.0-preview.1")
        // HTTP_STATUS=$(tail -n1 <<< "$RESPONSE")
        // log verbose "Response code: $HTTP_STATUS"
        // if [ $HTTP_STATUS != 204 ]; then
        //     log error "Error during the configuration of the Allow guest users policy. $RESPONSE_BODY"
        //     return 1;
        // else
        //     log success "Configuration of the Allow guest users policy was successful"
        // fi
    }
    configureOrganizationRequestAccessPolicy(){
        // REQUEST_ACCESS=$(echo "$DEFAULT_JSON" | jq -r '.organization.policies.request_access.enable')
        // REQUEST_ACCESS_URL=$(echo "$DEFAULT_JSON" | jq -r '.organization.policies.request_access.url')
        // log "Skipping the configuration of the organization url"
        // if  [  ! $REQUEST_ACCESS ]; then
        //     log "Setting $ORG_NAME organization url to $REQUEST_ACCESS_URL"
        //     log verbose 'Request: [{"from":"","op":2,"path":"/Value","value":"'$REQUEST_ACCESS_URL'"}]'
        //     log verbose "Url: https://vssps.dev.azure.com/$ORG_NAME/_apis/Organization/Collections/$ORG_ID/Properties?api-version=5.0-preview.1"
        //     RESPONSE=$(curl --silent \
        //             --request PATCH \
        //             --write-out "\n%{http_code}" \
        //             --header "Authorization: Basic $(echo -n :$PAT | base64)" \
        //             --header "Content-Type: application/json-patch+json" \
        //             --data-raw '[{"from":"","op":2,"path":"/Value","value":"'$ALLOW_GUEST_USERS'"}]' \
        //             "https://vssps.dev.azure.com/$ORG_NAME/_apis/Organization/Collections/$ORG_ID/Properties?api-version=5.0-preview.1")
        //     HTTP_STATUS=$(tail -n1 <<< "$RESPONSE")
        //     log verbose "Response code: $HTTP_STATUS"
        //     if [ $HTTP_STATUS != 200 ]; then
        //         log error "Error during the configuration of the organization url. $RESPONSE_BODY"
        //         return 1;
        //     else
        //         log success "Configuration of the organization url was successful"
        //     fi
        // fi
        // log "Setting Request access to $REQUEST_ACCESS"
        // log verbose 'Request: [{"from":"","op":2,"path":"/Value","value":"'$REQUEST_ACCESS'"}]'
        // log verbose "Url: https://dev.azure.com/$ORG_NAME/_apis/OrganizationPolicy/Policies/Policy.AllowRequestAccessToken?api-version=5.0-preview.1"
        // RESPONSE=$(curl --silent \
        //         --request PATCH \
        //         --write-out "\n%{http_code}" \
        //         --header "Authorization: Basic $(echo -n :$PAT | base64)" \
        //         --header "Content-Type: application/json-patch+json" \
        //         --data-raw '[{"from":"","op":2,"path":"/Value","value":"'$REQUEST_ACCESS'"}]' \
        //         "https://dev.azure.com/$ORG_NAME/_apis/OrganizationPolicy/Policies/Policy.AllowRequestAccessToken?api-version=5.0-preview.1")
        // HTTP_STATUS=$(tail -n1 <<< "$RESPONSE")
        // log verbose "Response code: $HTTP_STATUS"
        // if [ $HTTP_STATUS != 204 ]; then
        //     log error "Error during the configuration of the Request access policy. $RESPONSE_BODY"
        //     return 1;
        // else
        //     log success "Configuration of the Request access policy was successful"
        // fi
    }

    // Organization Settings
    configureOrganizationDisableAnonymousAccessBadgeSettings(){
        // DISABLE_ANONYMOUS_ACCESS_BADGES=$(echo "$DEFAULT_JSON" | jq -r '.organization.settings.disable_anonymous_access_badges')
        // log "Setting Disable anonymous access badges to $DISABLE_ANONYMOUS_ACCESS_BADGES"
        // log verbose 'Request: {"contributionIds":["ms.vss-build-web.pipelines-org-settings-data-provider"],"dataProviderContext":{"properties":{"badgesArePublic":"'$DISABLE_ANONYMOUS_ACCESS_BADGES'","sourcePage":{"url":"https://dev.azure.com/'$ORG_NAME'/_settings/pipelinessettings","routeId":"ms.vss-admin-web.collection-admin-hub-route","routeValues":{"adminPivot":"pipelinessettings","controller":"ContributedPage","action":"Execute","serviceHost":"'$ORG_ID' ('$ORG_NAME')"}}}}}'
        // log verbose "Url: https://dev.azure.com/$ORG_NAME/_apis/Contribution/HierarchyQuery?api-version=5.0-preview.1"
        // RESPONSE=$(curl --silent \
        //     --request POST \
        //     --write-out "\n%{http_code}" \
        //     --header "Authorization: Basic $(echo -n :$PAT | base64)" \
        //     --header "Content-Type: application/json" \
        //     --data-raw '{"contributionIds":["ms.vss-build-web.pipelines-org-settings-data-provider"],"dataProviderContext":{"properties":{"badgesArePublic":"'$DISABLE_ANONYMOUS_ACCESS_BADGES'","sourcePage":{"url":"https://dev.azure.com/'$ORG_NAME'/_settings/pipelinessettings","routeId":"ms.vss-admin-web.collection-admin-hub-route","routeValues":{"adminPivot":"pipelinessettings","controller":"ContributedPage","action":"Execute","serviceHost":"'$ORG_ID' ('$ORG_NAME')"}}}}}' \
        //     "https://dev.azure.com/$ORG_NAME/_apis/Contribution/HierarchyQuery?api-version=5.0-preview.1")
        // HTTP_STATUS=$(tail -n1 <<< "$RESPONSE")
        // log verbose "Response code: $HTTP_STATUS"
        // RESPONSE_BODY=$(sed '$ d' <<< "$RESPONSE") 
        // log verbose "Response body: $RESPONSE_BODY"
        // if [ $HTTP_STATUS != 200 ]; then
        //     log error "Error during the configuration of the Disable anonymous access badges policy. $RESPONSE_BODY"
        //     return 1;
        // else
        //     log success "Configuration of the Disable anonymous access badges policy was successful"
        // fi
    }
    configureOrganizationLimitVariablesSetQueueTimeSettings(){
        // LIMIT_VARIABLES_SET_QUEUE_TIME=$(echo "$DEFAULT_JSON" | jq -r '.organization.settings.limit_variables_set_queue_time')
        // log "Setting Limit variables set at queue time to $LIMIT_VARIABLES_SET_QUEUE_TIME"
        // log verbose 'Request: {"contributionIds":["ms.vss-build-web.pipelines-org-settings-data-provider"],"dataProviderContext":{"properties":{"enforceSettableVar":"'$LIMIT_VARIABLES_SET_QUEUE_TIME'","sourcePage":{"url":"https://dev.azure.com/'$ORG_NAME'/_settings/pipelinessettings","routeId":"ms.vss-admin-web.collection-admin-hub-route","routeValues":{"adminPivot":"pipelinessettings","controller":"ContributedPage","action":"Execute","serviceHost":"'$ORG_ID' ('$ORG_NAME')"}}}}}'
        // log verbose "Url: https://dev.azure.com/$ORG_NAME/_apis/Contribution/HierarchyQuery?api-version=5.0-preview.1"
        // RESPONSE=$(curl --silent \
        //     --request POST \
        //     --write-out "\n%{http_code}" \
        //     --header "Authorization: Basic $(echo -n :$PAT | base64)" \
        //     --header "Content-Type: application/json" \
        //     --data-raw '{"contributionIds":["ms.vss-build-web.pipelines-org-settings-data-provider"],"dataProviderContext":{"properties":{"enforceSettableVar":"'$LIMIT_VARIABLES_SET_QUEUE_TIME'","sourcePage":{"url":"https://dev.azure.com/'$ORG_NAME'/_settings/pipelinessettings","routeId":"ms.vss-admin-web.collection-admin-hub-route","routeValues":{"adminPivot":"pipelinessettings","controller":"ContributedPage","action":"Execute","serviceHost":"'$ORG_ID' ('$ORG_NAME')"}}}}}' \
        //     "https://dev.azure.com/$ORG_NAME/_apis/Contribution/HierarchyQuery?api-version=5.0-preview.1")
        // HTTP_STATUS=$(tail -n1 <<< "$RESPONSE")
        // log verbose "Response code: $HTTP_STATUS"
        // RESPONSE_BODY=$(sed '$ d' <<< "$RESPONSE") 
        // log verbose "Response body: $RESPONSE_BODY"
        // if [ $HTTP_STATUS != 200 ]; then
        //     log error "Error during the configuration of the Limit variables set at queue time policy. $RESPONSE_BODY"
        //     return 1;
        // else
        //     log success "Configuration of the Limit variables set at queue time policy was successful"
        // fi
    }
    configureOrganizationLimitJobAuthorizationCurrentProjectNonReleasePipelinesSettings(){
        // LIMIT_JOB_AUTHORIZATION_CURRENT_PROJECT_NON_RELEASE_PIPELINES=$(echo "$DEFAULT_JSON" | jq -r '.organization.settings.limit_job_authorization_current_project_non_release_pipelines')
        // log "Setting Limit job authorization scope to current project for non-release pipelines to $LIMIT_JOB_AUTHORIZATION_CURRENT_PROJECT_NON_RELEASE_PIPELINES"
        // log verbose 'Request: {"contributionIds":["ms.vss-build-web.pipelines-org-settings-data-provider"],"dataProviderContext":{"properties":{"enforceJobAuthScope":"'$LIMIT_JOB_AUTHORIZATION_CURRENT_PROJECT_NON_RELEASE_PIPELINES'","sourcePage":{"url":"https://dev.azure.com/'$ORG_NAME'/_settings/pipelinessettings","routeId":"ms.vss-admin-web.collection-admin-hub-route","routeValues":{"adminPivot":"pipelinessettings","controller":"ContributedPage","action":"Execute","serviceHost":"'$ORG_ID' ('$ORG_NAME')"}}}}}'
        // log verbose "Url: https://dev.azure.com/$ORG_NAME/_apis/Contribution/HierarchyQuery?api-version=5.0-preview.1"
        // RESPONSE=$(curl --silent \
        //     --request POST \
        //     --write-out "\n%{http_code}" \
        //     --header "Authorization: Basic $(echo -n :$PAT | base64)" \
        //     --header "Content-Type: application/json" \
        //     --data-raw '{"contributionIds":["ms.vss-build-web.pipelines-org-settings-data-provider"],"dataProviderContext":{"properties":{"enforceJobAuthScope":"'$LIMIT_JOB_AUTHORIZATION_CURRENT_PROJECT_NON_RELEASE_PIPELINES'","sourcePage":{"url":"https://dev.azure.com/'$ORG_NAME'/_settings/pipelinessettings","routeId":"ms.vss-admin-web.collection-admin-hub-route","routeValues":{"adminPivot":"pipelinessettings","controller":"ContributedPage","action":"Execute","serviceHost":"'$ORG_ID' ('$ORG_NAME')"}}}}}' \
        //     "https://dev.azure.com/$ORG_NAME/_apis/Contribution/HierarchyQuery?api-version=5.0-preview.1")
        // HTTP_STATUS=$(tail -n1 <<< "$RESPONSE")
        // log verbose "Response code: $HTTP_STATUS"
        // RESPONSE_BODY=$(sed '$ d' <<< "$RESPONSE") 
        // log verbose "Response body: $RESPONSE_BODY"
        // if [ $HTTP_STATUS != 200 ]; then
        //     log error "Error during the configuration of the Limit job authorization scope to current project for non-release pipelines policy. $RESPONSE_BODY"
        //     return 1;
        // else
        //     log success "Configuration of the Limit job authorization scope to current project for non-release pipelines policy was successful"
        // fi
    }
    configureOrganizationLimitJobAuthorizationCurrentJobProjectReleasePipelinesSettings(){
        // LIMIT_JOB_AUTHORIZATION_CURRENT_PROJECT_RELEASE_PIPELINES=$(echo "$DEFAULT_JSON" | jq -r '.organization.settings.limit_job_authorization_current_project_release_pipelines')
        // log "Setting Limit job authorization scope to current project for release pipelines to $LIMIT_JOB_AUTHORIZATION_CURRENT_PROJECT_NON_RELEASE_PIPELINES"
        // log verbose 'Request: {"contributionIds":["ms.vss-build-web.pipelines-org-settings-data-provider"],"dataProviderContext":{"properties":{"enforceJobAuthScopeForReleases":"'$LIMIT_JOB_AUTHORIZATION_CURRENT_PROJECT_RELEASE_PIPELINES'","sourcePage":{"url":"https://dev.azure.com/'$ORG_NAME'/_settings/pipelinessettings","routeId":"ms.vss-admin-web.collection-admin-hub-route","routeValues":{"adminPivot":"pipelinessettings","controller":"ContributedPage","action":"Execute","serviceHost":"'$ORG_ID' ('$ORG_NAME')"}}}}}'
        // log verbose "Url: https://dev.azure.com/$ORG_NAME/_apis/Contribution/HierarchyQuery?api-version=5.0-preview.1"
        // RESPONSE=$(curl --silent \
        //     --request POST \
        //     --write-out "\n%{http_code}" \
        //     --header "Authorization: Basic $(echo -n :$PAT | base64)" \
        //     --header "Content-Type: application/json" \
        //     --data-raw '{"contributionIds":["ms.vss-build-web.pipelines-org-settings-data-provider"],"dataProviderContext":{"properties":{"enforceJobAuthScopeForReleases":"'$LIMIT_JOB_AUTHORIZATION_CURRENT_PROJECT_RELEASE_PIPELINES'","sourcePage":{"url":"https://dev.azure.com/'$ORG_NAME'/_settings/pipelinessettings","routeId":"ms.vss-admin-web.collection-admin-hub-route","routeValues":{"adminPivot":"pipelinessettings","controller":"ContributedPage","action":"Execute","serviceHost":"'$ORG_ID' ('$ORG_NAME')"}}}}}' \
        //     "https://dev.azure.com/$ORG_NAME/_apis/Contribution/HierarchyQuery?api-version=5.0-preview.1")
        // HTTP_STATUS=$(tail -n1 <<< "$RESPONSE")
        // log verbose "Response code: $HTTP_STATUS"
        // RESPONSE_BODY=$(sed '$ d' <<< "$RESPONSE") 
        // log verbose "Response body: $RESPONSE_BODY"
        // if [ $HTTP_STATUS != 200 ]; then
        //     log error "Error during the configuration of the Limit job authorization scope to current project for release pipelines policy. $RESPONSE_BODY"
        //     return 1;
        // else
        //     log success "Configuration of the Limit job authorization scope to current project for release pipelines policy was successful"
        // fi  
    }
    configureOrganizationProjectAccessRepositoriesYamlPipelinesSettings(){
        // PROJECT_ACCESS_REPOSITORIES_YAML_PIPELINES=$(echo "$DEFAULT_JSON" | jq -r '.organization.settings.protect_access_repositories_yaml_pipelines')
        // log "Setting Protect access to repositories for YAML pipelines to $PROJECT_ACCESS_REPOSITORIES_YAML_PIPELINES"
        // log verbose 'Request: {"contributionIds":["ms.vss-build-web.pipelines-org-settings-data-provider"],"dataProviderContext":{"properties":{"enforceReferencedRepoScopedToken":"'$PROJECT_ACCESS_REPOSITORIES_YAML_PIPELINES'","sourcePage":{"url":"https://dev.azure.com/'$ORG_NAME'/_settings/pipelinessettings","routeId":"ms.vss-admin-web.collection-admin-hub-route","routeValues":{"adminPivot":"pipelinessettings","controller":"ContributedPage","action":"Execute","serviceHost":"'$ORG_ID' ('$ORG_NAME')"}}}}}'
        // log verbose "Url: https://dev.azure.com/$ORG_NAME/_apis/Contribution/HierarchyQuery?api-version=5.0-preview.1"
        // RESPONSE=$(curl --silent \
        //     --request POST \
        //     --write-out "\n%{http_code}" \
        //     --header "Authorization: Basic $(echo -n :$PAT | base64)" \
        //     --header "Content-Type: application/json" \
        //     --data-raw '{"contributionIds":["ms.vss-build-web.pipelines-org-settings-data-provider"],"dataProviderContext":{"properties":{"enforceReferencedRepoScopedToken":"'$PROJECT_ACCESS_REPOSITORIES_YAML_PIPELINES'","sourcePage":{"url":"https://dev.azure.com/'$ORG_NAME'/_settings/pipelinessettings","routeId":"ms.vss-admin-web.collection-admin-hub-route","routeValues":{"adminPivot":"pipelinessettings","controller":"ContributedPage","action":"Execute","serviceHost":"'$ORG_ID' ('$ORG_NAME')"}}}}}' \
        //     "https://dev.azure.com/$ORG_NAME/_apis/Contribution/HierarchyQuery?api-version=5.0-preview.1")
        // HTTP_STATUS=$(tail -n1 <<< "$RESPONSE")
        // log verbose "Response code: $HTTP_STATUS"
        // RESPONSE_BODY=$(sed '$ d' <<< "$RESPONSE") 
        // log verbose "Response body: $RESPONSE_BODY"
        // if [ $HTTP_STATUS != 200 ]; then
        //     log error "Error during the configuration of the Protect access to repositories for YAML pipelines policy. $RESPONSE_BODY"
        //     return 1;
        // else
        //     log success "Configuration of the Protect access to repositories for YAML pipelines policy was successful"
        // fi
    }
    configureOrganizationDisableStageChooserSettings(){
        // DISABLE_STAGE_CHOOSER=$(echo "$DEFAULT_JSON" | jq -r '.organization.settings.disable_stage_chooser')
        // log "Setting Disable stage chooser to $DISABLE_STAGE_CHOOSER"
        // log verbose 'Request: {"contributionIds":["ms.vss-build-web.pipelines-org-settings-data-provider"],"dataProviderContext":{"properties":{"disableStageChooser":"'$DISABLE_STAGE_CHOOSER'","sourcePage":{"url":"https://dev.azure.com/'$ORG_NAME'/_settings/pipelinessettings","routeId":"ms.vss-admin-web.collection-admin-hub-route","routeValues":{"adminPivot":"pipelinessettings","controller":"ContributedPage","action":"Execute","serviceHost":"'$ORG_ID' ('$ORG_NAME')"}}}}}'
        // log verbose "Url: https://dev.azure.com/$ORG_NAME/_apis/Contribution/HierarchyQuery?api-version=5.0-preview.1"
        // RESPONSE=$(curl --silent \
        //     --request POST \
        //     --write-out "\n%{http_code}" \
        //     --header "Authorization: Basic $(echo -n :$PAT | base64)" \
        //     --header "Content-Type: application/json" \
        //     --data-raw '{"contributionIds":["ms.vss-build-web.pipelines-org-settings-data-provider"],"dataProviderContext":{"properties":{"disableStageChooser":"'$DISABLE_STAGE_CHOOSER'","sourcePage":{"url":"https://dev.azure.com/'$ORG_NAME'/_settings/pipelinessettings","routeId":"ms.vss-admin-web.collection-admin-hub-route","routeValues":{"adminPivot":"pipelinessettings","controller":"ContributedPage","action":"Execute","serviceHost":"'$ORG_ID' ('$ORG_NAME')"}}}}}' \
        //     "https://dev.azure.com/$ORG_NAME/_apis/Contribution/HierarchyQuery?api-version=5.0-preview.1")
        // HTTP_STATUS=$(tail -n1 <<< "$RESPONSE")
        // log verbose "Response code: $HTTP_STATUS"
        // RESPONSE_BODY=$(sed '$ d' <<< "$RESPONSE") 
        // log verbose "Response body: $RESPONSE_BODY"
        // if [ $HTTP_STATUS != 200 ]; then
        //     log error "Error during the configuration of the Disable stage chooser policy. $RESPONSE_BODY"
        //     return 1;
        // else
        //     log success "Configuration of the Disable stage chooser policy was successful"
        // fi
    }
    configureOrganizationDisableCreationClassicBuildAndClassicReleasePipelinesSettings(){
        // DISABLE_CREATION_CLASSIC_BUILD_AND_CLASSIC_RELEASE_PIPELINES=$(echo "$DEFAULT_JSON" | jq -r '.organization.settings.disable_creation_classic_build_and_classic_release_pipelines')
        // log "Setting Disable creation of classic build and classic release pipelines to $DISABLE_CREATION_CLASSIC_BUILD_AND_CLASSIC_RELEASE_PIPELINES"
        // log verbose 'Request: {"contributionIds":["ms.vss-build-web.pipelines-org-settings-data-provider"],"dataProviderContext":{"properties":{"disableClassicPipelineCreation":"'$DISABLE_CREATION_CLASSIC_BUILD_AND_CLASSIC_RELEASE_PIPELINES'","sourcePage":{"url":"https://dev.azure.com/'$ORG_NAME'/_settings/pipelinessettings","routeId":"ms.vss-admin-web.collection-admin-hub-route","routeValues":{"adminPivot":"pipelinessettings","controller":"ContributedPage","action":"Execute","serviceHost":"'$ORG_ID' ('$ORG_NAME')"}}}}}'
        // log verbose "Url: https://dev.azure.com/$ORG_NAME/_apis/Contribution/HierarchyQuery?api-version=5.0-preview.1"
        // RESPONSE=$(curl --silent \
        //     --request POST \
        //     --write-out "\n%{http_code}" \
        //     --header "Authorization: Basic $(echo -n :$PAT | base64)" \
        //     --header "Content-Type: application/json" \
        //     --data-raw '{"contributionIds":["ms.vss-build-web.pipelines-org-settings-data-provider"],"dataProviderContext":{"properties":{"disableClassicPipelineCreation":"'$DISABLE_CREATION_CLASSIC_BUILD_AND_CLASSIC_RELEASE_PIPELINES'","sourcePage":{"url":"https://dev.azure.com/'$ORG_NAME'/_settings/pipelinessettings","routeId":"ms.vss-admin-web.collection-admin-hub-route","routeValues":{"adminPivot":"pipelinessettings","controller":"ContributedPage","action":"Execute","serviceHost":"'$ORG_ID' ('$ORG_NAME')"}}}}}' \
        //     "https://dev.azure.com/$ORG_NAME/_apis/Contribution/HierarchyQuery?api-version=5.0-preview.1")
        // HTTP_STATUS=$(tail -n1 <<< "$RESPONSE")
        // log verbose "Response code: $HTTP_STATUS"
        // RESPONSE_BODY=$(sed '$ d' <<< "$RESPONSE") 
        // log verbose "Response body: $RESPONSE_BODY"
        // if [ $HTTP_STATUS != 200 ]; then
        //     log error "Error during the configuration of the Disable creation of classic build and classic release pipelines policy. $RESPONSE_BODY"
        //     return 1;
        // else
        //     log success "Configuration of the Disable creation of classic build and classic release pipelines policy was successful"
        // fi
    }
    configureOrganizationDisableBuiltInTasksSettings(){
        // DISABLE_BUILD_IN_TASKS=$(echo "$DEFAULT_JSON" | jq -r '.organization.settings.disable_built_in_tasks')
        // log "Setting Disable built-in tasks to $DISABLE_BUILD_IN_TASKS"
        // log verbose 'Request: {"contributionIds":["ms.vss-build-web.pipelines-org-settings-data-provider"],"dataProviderContext":{"properties":{"disableInBoxTasksVar":"'$DISABLE_BUILD_IN_TASKS'","sourcePage":{"url":"https://dev.azure.com/'$ORG_NAME'/_settings/pipelinessettings","routeId":"ms.vss-admin-web.collection-admin-hub-route","routeValues":{"adminPivot":"pipelinessettings","controller":"ContributedPage","action":"Execute","serviceHost":"'$ORG_ID' ('$ORG_NAME')"}}}}}'
        // log verbose "Url: https://dev.azure.com/$ORG_NAME/_apis/Contribution/HierarchyQuery?api-version=5.0-preview.1"
        // RESPONSE=$(curl --silent \
        //     --request POST \
        //     --write-out "\n%{http_code}" \
        //     --header "Authorization: Basic $(echo -n :$PAT | base64)" \
        //     --header "Content-Type: application/json" \
        //     --data-raw '{"contributionIds":["ms.vss-build-web.pipelines-org-settings-data-provider"],"dataProviderContext":{"properties":{"disableInBoxTasksVar":"'$DISABLE_BUILD_IN_TASKS'","sourcePage":{"url":"https://dev.azure.com/'$ORG_NAME'/_settings/pipelinessettings","routeId":"ms.vss-admin-web.collection-admin-hub-route","routeValues":{"adminPivot":"pipelinessettings","controller":"ContributedPage","action":"Execute","serviceHost":"'$ORG_ID' ('$ORG_NAME')"}}}}}' \
        //     "https://dev.azure.com/$ORG_NAME/_apis/Contribution/HierarchyQuery?api-version=5.0-preview.1")
        // HTTP_STATUS=$(tail -n1 <<< "$RESPONSE")
        // log verbose "Response code: $HTTP_STATUS"
        // RESPONSE_BODY=$(sed '$ d' <<< "$RESPONSE") 
        // log verbose "Response body: $RESPONSE_BODY"
        // if [ $HTTP_STATUS != 200 ]; then
        //     log error "Error during the configuration of the Disable built-in tasks policy. $RESPONSE_BODY"
        //     return 1;
        // else
        //     log success "Configuration of the Disable built-in tasks policy was successful"
        // fi
    }
    configureOrganizationDisableMarketplaceTasksSettings(){
        // DISABLE_MARKETPLACE_TASKS=$(echo "$DEFAULT_JSON" | jq -r '.organization.settings.disable_marketplace_tasks')
        // log "Setting Disable marketplace tasks to $DISABLE_MARKETPLACE_TASKS"
        // log verbose 'Request: {"contributionIds":["ms.vss-build-web.pipelines-org-settings-data-provider"],"dataProviderContext":{"properties":{"disableMarketplaceTasksVar":"'$DISABLE_MARKETPLACE_TASKS'","sourcePage":{"url":"https://dev.azure.com/'$ORG_NAME'/_settings/pipelinessettings","routeId":"ms.vss-admin-web.collection-admin-hub-route","routeValues":{"adminPivot":"pipelinessettings","controller":"ContributedPage","action":"Execute","serviceHost":"'$ORG_ID' ('$ORG_NAME')"}}}}}'
        // log verbose "Url: https://dev.azure.com/$ORG_NAME/_apis/Contribution/HierarchyQuery?api-version=5.0-preview.1"
        // RESPONSE=$(curl --silent \
        //     --request POST \
        //     --write-out "\n%{http_code}" \
        //     --header "Authorization: Basic $(echo -n :$PAT | base64)" \
        //     --header "Content-Type: application/json" \
        //     --data-raw '{"contributionIds":["ms.vss-build-web.pipelines-org-settings-data-provider"],"dataProviderContext":{"properties":{"disableMarketplaceTasksVar":"'$DISABLE_MARKETPLACE_TASKS'","sourcePage":{"url":"https://dev.azure.com/'$ORG_NAME'/_settings/pipelinessettings","routeId":"ms.vss-admin-web.collection-admin-hub-route","routeValues":{"adminPivot":"pipelinessettings","controller":"ContributedPage","action":"Execute","serviceHost":"'$ORG_ID' ('$ORG_NAME')"}}}}}' \
        //     "https://dev.azure.com/$ORG_NAME/_apis/Contribution/HierarchyQuery?api-version=5.0-preview.1")
        // HTTP_STATUS=$(tail -n1 <<< "$RESPONSE")
        // log verbose "Response code: $HTTP_STATUS"
        // RESPONSE_BODY=$(sed '$ d' <<< "$RESPONSE") 
        // log verbose "Response body: $RESPONSE_BODY"
        // if [ $HTTP_STATUS != 200 ]; then
        //     log error "Error during the configuration of the Disable built-in tasks policy. $RESPONSE_BODY"
        //     return 1;
        // else
        //     log success "Configuration of the Disable built-in tasks policy was successful"
        // fi
    }
    configureOrganizationDisableNodeSixTasksSettings(){
        // DISABLE_NODE_SIX_TASKS=$(echo "$DEFAULT_JSON" | jq -r '.organization.settings.disable_node_six_tasks')
        // log "Setting Disable Node 6 tasks to $DISABLE_NODE_SIX_TASKS"
        // log verbose 'Request: {"contributionIds":["ms.vss-build-web.pipelines-org-settings-data-provider"],"dataProviderContext":{"properties":{"disableNode6Tasksvar":"'$DISABLE_NODE_SIX_TASKS'","sourcePage":{"url":"https://dev.azure.com/'$ORG_NAME'/_settings/pipelinessettings","routeId":"ms.vss-admin-web.collection-admin-hub-route","routeValues":{"adminPivot":"pipelinessettings","controller":"ContributedPage","action":"Execute","serviceHost":"'$ORG_ID' ('$ORG_NAME')"}}}}}'
        // log verbose "Url: https://dev.azure.com/$ORG_NAME/_apis/Contribution/HierarchyQuery?api-version=5.0-preview.1"
        // RESPONSE=$(curl --silent \
        //     --request POST \
        //     --write-out "\n%{http_code}" \
        //     --header "Authorization: Basic $(echo -n :$PAT | base64)" \
        //     --header "Content-Type: application/json" \
        //     --data-raw '{"contributionIds":["ms.vss-build-web.pipelines-org-settings-data-provider"],"dataProviderContext":{"properties":{"disableNode6Tasksvar":"'$DISABLE_NODE_SIX_TASKS'","sourcePage":{"url":"https://dev.azure.com/'$ORG_NAME'/_settings/pipelinessettings","routeId":"ms.vss-admin-web.collection-admin-hub-route","routeValues":{"adminPivot":"pipelinessettings","controller":"ContributedPage","action":"Execute","serviceHost":"'$ORG_ID' ('$ORG_NAME')"}}}}}' \
        //     "https://dev.azure.com/$ORG_NAME/_apis/Contribution/HierarchyQuery?api-version=5.0-preview.1")
        // HTTP_STATUS=$(tail -n1 <<< "$RESPONSE")
        // log verbose "Response code: $HTTP_STATUS"
        // RESPONSE_BODY=$(sed '$ d' <<< "$RESPONSE") 
        // log verbose "Response body: $RESPONSE_BODY"
        // if [ $HTTP_STATUS != 200 ]; then
        //     log error "Error during the configuration of the Disable built-in tasks policy. $RESPONSE_BODY"
        //     return 1;
        // else
        //     log success "Configuration of the Disable built-in tasks policy was successful"
        // fi
    }

    getProject(){
        // RESPONSE=$(az devops project show --project "$PROJECT_NAME" --org "https://dev.azure.com/$ORG_NAME")
        // if [ -z "$RESPONSE" ]; then
        //     log "$PROJECT_NAME project does not exist"
        // else
        //     log warning "Project $PROJECT_NAME already exists. Skipping..."
        //     return 0
        // fi
    }
    addProject(){
        // DESCRIPTION=$(echo "$DEFAULT_JSON" | jq -r '.organization.project.description')
        // PROCESS=$(echo "$DEFAULT_JSON" | jq -r '.organization.project.process')
        // log verbose "az devops project create --name $PROJECT_NAME --description '$DESCRIPTION' --detect false --org https://dev.azure.com/$ORG_NAME --process $PROCESS --source-control git --visibility private"
        // az devops project create --name "$PROJECT_NAME" --description "$DESCRIPTION" --detect false --org "https://dev.azure.com/$ORG_NAME" --process $PROCESS --source-control git --visibility private
        // if [ $? -eq 0 ]; then
        //     log success "$PROJECT_NAME project created successfully"
        // else
        //     log error "Failed to create $PROJECT_NAME project"
        //     return 1
        // fi
    }
}
export default new AzureDevOpsService();
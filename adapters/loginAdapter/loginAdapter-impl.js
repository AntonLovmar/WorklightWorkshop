function onAuthRequired(headers, errorMessage) {
    errorMessage = errorMessage ? errorMessage : null;
    return {
        authRequired: true,
        errorMessage: errorMessage
    };
}

function submitAuthentication(username, password) {
    var input = {
        method: 'post',
        path: '/session',
        body: {
            contentType: 'application/x-www-form-urlencoded',
            content: 'username=' + username + '&password=' + password
        }
    };
    var invocationResult = WL.Server.invokeHttp(input);
    if (invocationResult.error) {
        return {
            authRequired: true,
            errorMessage: 'Invalid login credentials'
        };
    }
    var sessionID = '';
	if(invocationResult.responseHeaders['set-cookie']) {
		sessionID = invocationResult.responseHeaders['set-cookie'];
	}
	
	var userIdentity = {
	        userId: username,
	        displayName: username,
	        attributes: {
	            session: sessionID
	        }
	    };
	    WL.Server.setActiveUser('BlogRealm', userIdentity);
    
    return {
        authRequired: false
    };
}

function onLogout() {
	//do nothing
}

function onAuthRequired(headers, errorMessage) {
    errorMessage = errorMessage ? errorMessage : null;
    return {
        authRequired: true,
        errorMessage: errorMessage
    };
}

function submitAuthentication(username, password) {
    var input = {
        method: 'put',
        path: '/session',
        body: {
            contentType: 'application/x-www-form-urlencoded',
            content: 'username=' + username + '&password=' + password
        }
    };
    var invocationResult = WL.Server.invokeHttp(input);
    if (!invocationResult.responseHeaders['set-cookie']) {
        return {
            authRequired: true,
            errorMessage: 'Invalid login credentials'
        };
    }
    var sessionID = invocationResult.responseHeaders['set-cookie'].split(';')[0];
    var userIdentity = {
        userId: username,
        displayName: username,
        attributes: {
            session: sessionID
        }
    };
    return {
        authRequired: false
    };
}

var worklightBlog = worklightBlog || {};
worklightBlog.challengeHandler = {};
worklightBlog.challengeHandler = WL.Client.createChallengeHandler('BlogRealm');

worklightBlog.challengeHandler.isCustomResponse = function(response) {
    if (!response || !response.responseJSON || response.responseText === null) {
        return false;
    }
	
    if (typeof(response.responseJSON.authRequired) !== 'undefined') {
        return true;
    } else {
        return false;
    }
};

worklightBlog.challengeHandler.handleChallenge = function(response) {
    var authRequired = response.responseJSON.authRequired;
    worklightBlog.mainPage.hideLoader();
    if (authRequired === true) {
    } else if (authRequired === false) {
    	worklightBlog.mainPage.moveTo();
    }
};
    
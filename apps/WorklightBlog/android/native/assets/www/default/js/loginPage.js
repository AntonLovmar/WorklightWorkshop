
/* JavaScript content from js/loginPage.js in folder common */
var worklightBlog = worklightBlog || {};
worklightBlog.loginPage = {};
worklightBlog.loginPage.bindElements = function () {
	$('#submitBtn').click(function () {
		worklightBlog.loginPage.sendForm();
	});
};

worklightBlog.loginPage.sendForm = function() {
	var username = $('#un').val();
	var password = $('#pw').val();
	var invocationData = {
            adapter: 'loginAdapter',
            procedure: 'submitAuthentication',
            parameters: [username, password]
        };
	worklightBlog.mainPage.displayLoader('Logging in...');
	worklightBlog.challengeHandler.submitAdapterAuthentication(invocationData, {
        onFailure: handleLoginError
    });
	
	function handleLoginError(error) {
    	worklightBlog.mainPage.hideLoader();
    	if(error.errorMsg.indexOf('already logged in') !== -1) {
    		worklightBlog.mainPage.moveTo();
    	}
		console.log(error);
	}
};

worklightBlog.loginPage.logout = function() {
	WL.Client.logout('BlogRealm');
};

worklightBlog.loginPage.moveTo = function() {
	$.mobile.pageContainer.pagecontainer('change','#loginPage');
};

worklightBlog.loginPage.bindElements();
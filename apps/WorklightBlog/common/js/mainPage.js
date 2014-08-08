var worklightBlog = worklightBlog || {};
worklightBlog.mainPage = {};
worklightBlog.mainPage.bindElements = function () {
	$('#getPostsBtn').click(function () {
		worklightBlog.mainPage.retrievePosts();
	});
	
	$('#logoutBtn').click(function () {
		worklightBlog.loginPage.logout();
		worklightBlog.loginPage.moveTo();
	});
};

worklightBlog.mainPage.retrievePosts = function() {
	
	var invocationData = {
            adapter: 'blogAdapter',
            procedure: 'getPosts'
        };
	worklightBlog.mainPage.displayLoader('Retrieving posts...');
	$('#postList').empty();
	WL.Client.invokeProcedure(invocationData).then(function(response) {
		var posts = response.invocationResult.posts;
		worklightBlog.mainPage.hideLoader();
		insertPosts(posts);
	}, worklightBlog.mainPage.hideLoader);
	
	function insertPosts(posts) {
		var postList = $('#postList');
		$(postList).empty();
		for(var i = 0; i < posts.length; i++) {
			var post = posts[i];
			$(postList).append(['<li>'+'<h1>'+post.title+'</h1>',
			                    	   '<p>'+post.content+'</p>',
			                    	   '<p>'+post.author+'</p>',
			                    	   '<p>'+post.created+'</p>',
			                    '</li>'].join('\n'));
		}
		$(postList).listview('refresh');
	}
};

worklightBlog.mainPage.moveTo = function() {
	$('#postList').empty();
	$.mobile.pageContainer.pagecontainer('change','#mainPage');
};

worklightBlog.mainPage.displayLoader = function(message) {
	$.mobile.loading( 'show', {
		text: message,
		textVisible: true,
		html: ""
	});
};

worklightBlog.mainPage.hideLoader = function() {
	$.mobile.loading().hide();
}

worklightBlog.mainPage.bindElements();
function getPosts() {
	 var input = {
		        method: 'get',
		        path: '/posts',
	            headers: {
	                cookie: WL.Server.getActiveUser().attributes.session
	            }
		    };
	 var invocationResult = WL.Server.invokeHttp(input);
	 return {posts: invocationResult.posts};
}

function addPost(title, content) {
	 var input = {
		        method: 'put',
		        path: '/posts',
	            headers: {
	                cookie: WL.Server.getActiveUser().attributes.session
	            },
		        body: {
		        	contentType: 'application/x-www-form-urlencoded',
		            content: 'title=' + title + '&content=' + content
		        }
		    };
	 var invocationResult = WL.Server.invokeHttp(input);
}
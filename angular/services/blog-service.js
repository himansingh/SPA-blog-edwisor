
myApp.service('blogService' , function($http ){

	var main = this ;

  	this.baseUrl = 'https://projectsapi.edwisor.com/api/blogs';
  	//this.blogId = $routeParams.blogId;

	this.getRequest = function(){

			return	$http({
		        method: 'GET',
		        url: main.baseUrl+'/all'
		      }) // end of return statement

			} // end of  getRequest

	this.getSingleBlog = function(Id){

					return $http({
				    method: 'GET',
				    url: main.baseUrl +'/'+ Id
				  }) // end of return statement
				} // end of getSingleBlog

	this.createRequest = function (myData){

					return $http({

			        method: 'POST',
			        data  : myData,
			        url: main.baseUrl+'/create'
			        
			      })// end of return statement
				} // end of createRequest

	this.editBlog = function(myData , Id){

						return  $http({

				        method : "PUT",           // put method is used for updating or uploading files 
				        url : main.baseUrl + '/' + Id + '/edit' ,
				        data : myData 
				      }) // end of return statement
					}	// end of editBlog

	this.deleteBlog = function(Id){

					return $http({ // data method is not required for deleting blog, unlike create post request

			              method  : "POST" ,
			              url     : main.baseUrl + '/' + Id + '/remove' ,
			        }) // end of return 
				}


}); // end of services
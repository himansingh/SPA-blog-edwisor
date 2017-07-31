
myApp.controller('editController' , ['blogService' , '$routeParams' , function(blogService , $routeParams){

  var main = this ; // created a context
   this.pageHeading = " Edit the blog" ;
   this.pageSubHeading = " Fill all the details" ;

   this.blogId = $routeParams.blogId ;
    this.baseUrl = 'https://projectsapi.edwisor.com/api/blogs';

    // get request is sent first so that all the details are available to user in input boxes for editing them.
    this.loadSingleBlog = function(){
   
      blogService.getSingleBlog(main.blogId).then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          console.log("This is complete response" , response);

          main.heading = response.data.data.heading ;
          main.bodyHtml = response.data.data.bodyHtml ;
          main.author = response.data.data.author ;
          main.subHeading = response.data.data.subHeading ;
          
        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          alert("some error occurred. Check the console.");
          console.log(response);
        });


  }(); // end load single blogs





    this.editBlog = function( ){

      if (confirm("Are you sure you want to make changes?")){

        var myData = {

          author : main.author ,
          bodyHtml : main.bodyHtml ,
          heading : main.heading ,
          subHeading : main.subHeading

        }
      

     blogService.editBlog(myData , main.blogId).then( function ( response){

        alert("updated!") ;
        window.location = 'index.html#/blog/'+response.data.data.blogId;
      
        console.log (response);
      } , function(reason){

          console.log (reason);
          alert("Error occured ! check console.");
          console.log("reason");
      });
   } 
  }   

}]) ; // end of editController
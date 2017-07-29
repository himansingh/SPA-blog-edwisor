

// first we have to declare the module. note that [] is where we will declare the dependecies later. Right now we are leaving it blank
var myApp = angular.module('blogApp', ['ngRoute']); 


// this is without $scope
myApp.controller('mainController',['$http',function($http) {

  //create a context
  var main = this;


  this.pageHeading = 'edWisor Blog';
  this.pageSubHeading = 'A collection of experience by students, alumni and edWisor.com team'
  
  // i knew the result is going to be array, so i declared an empty array to initialize
  this.blogs = [];
  console.log(this.blogs);

  this.baseUrl = 'https://projectsapi.edwisor.com/api/blogs';



  this.loadAllBlogs = function(){
   
      $http({
        method: 'GET',
        url: main.baseUrl+'/all'
      }).then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          console.log(response);
          main.blogs = response.data.data;
          console.log(main.blogs);

        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          alert("some error occurred. Check the console.");
          console.log(response);

        });


  }// end load all blogs

  this.loadAllBlogs();


   


}]); // end controller





myApp.controller('singleBlogController',['$http','$routeParams',function($http,$routeParams) {

  //create a context
  var main = this;


  this.pageHeading = '';
  this.pageSubHeading = ''
 

  /*this.getParameterByName = function(name){

      name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
      var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(location.search);
      return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));


  }// end get parameter by name*/

  this.blogId = $routeParams.blogId;

  console.log(this.blogId);


  this.baseUrl = 'https://projectsapi.edwisor.com/api/blogs';

  this.loadSingeBlog = function(){
   
      $http({
        method: 'GET',
        url: main.baseUrl+'/'+main.blogId
      }).then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          console.log("This is complete response" , response);
          main.blog = response.data.data;
          console.log(main.blog);

          main.pageHeading = main.blog.heading;
          main.pageSubHeading = main.blog.subHeading;
          

        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          alert("some error occurred. Check the console.");
          console.log(response);
        });


  }// end load all blogs

  
   


}]); // end controller



myApp.controller('blogCreateController',['$http',function($http) {

  //create a context
  var main = this;


  this.pageHeading = 'Create a blog post';
  this.pageSubHeading = 'please fill all the data'
 

  this.baseUrl = 'https://projectsapi.edwisor.com/api/blogs';

  this.createPost = function(){

      var myData = {

          heading     : main.heading,
          subHeading  : main.subHeading,
          bodyHtml    : main.bodyHtml,
          author      : main.author


      }

      console.log(myData);
   
      $http({

        method: 'POST',
        data  : myData,
        url: main.baseUrl+'/create'
        
      }).then(function successCallback(response) {
          // this callback will be called asynchronously
          // when the response is available
          //console.log(response);
          alert("blog created successfully");
          window.location = 'index.html#/blog/'+response.data.data.blogId;
          

        }, function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          alert("some error occurred. Check the console.");
          console.log(response);
        });


  }// end load all blogs
   


}]); // end controller

myApp.controller('editController' , ['$http' , '$routeParams' , function($http , $routeParams){

  var main = this ; // created a context
   this.pageHeading = " Edit the blog" ;
   this.pageSubHeading = " Fill all the details" ;

   this.blogId = $routeParams.blogId ;
    this.baseUrl = 'https://projectsapi.edwisor.com/api/blogs';

    // get request is ent first so that all the details are available to user in input boxes for editing them.
    this.loadSingleBlog = function(){
   
      $http({
        method: 'GET',
        url: main.baseUrl+'/'+main.blogId
      }).then(function successCallback(response) {
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
      


      $http({

        method : "PUT",           // put method is used for updating or uploading files 
        url : main.baseUrl + '/' + main.blogId + '/edit' ,
        data : myData 
      }).then( function ( response){

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

myApp.controller('deleteController' , ['$http' , '$routeParams' , function ($http , $routeParams){

    this.blogId = $routeParams.blogId ;
    var main = this;
    this.baseUrl = "https://projectsapi.edwisor.com/api/blogs" ;

    this.remove = function() {

      if (confirm("Do you really want to delete this blog?")){      

        $http({

              method  : "POST" ,
              url     : main.baseUrl + '/' + main.blogId + '/remove' ,
        }) . then(function(response) {

          alert("Deleting successful!") ;
          console.log(response) ;
        } , function(reason){

          alert("error");
          console.log(reason) ;

        });
      }// end of if condition  
    } // end of remove function 


}]) ;
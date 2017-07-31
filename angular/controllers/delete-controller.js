myApp.controller('deleteController' , ['blogService' , '$routeParams' , function (blogService , $routeParams){

    this.blogId = $routeParams.blogId ;
    var main = this;

    this.remove = function() {

      if (confirm("Do you really want to delete this blog?")){      

        blogService.deleteBlog(main.blogId)
        .then(function(response) {

          alert("Deleting successful!") ;
          console.log(response) ;
        } , function(reason){

          alert("error");
          console.log(reason) ;

        });
      }// end of if condition  
    } // end of remove function 


}]) ;
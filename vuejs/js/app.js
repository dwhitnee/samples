//----------------------------------------
// Demo using VueJS to create an app eventloop
//
// See also http://codepen.io/dwhitnee/pen/mAXEoJ
//
// 2016 David Whitney
//----------------------------------------

let now = new Date();

let serverURL = "https://htlz8qbag4.execute-api.us-east-1.amazonaws.com/dev";

// Our data and methods that can be seen directly on the web
// page go here.  Other objects can go elsewhere
new Vue({
  el: '#myVueApp',


  // update these values, rather than update the DOM directly
  data: {
    message: "Hello Vue.js! It's " + now.toDateString(),
    newState: "",
    states: ["WA","OR","CA"],
    buses: []
  },


  // event handlers accessible from the web page
  methods: {
    addState: function() {
      this.states.push( this.newState );
      this.newState = "";
      console.log( this.states );
    },
    
    loadBusRoutes: function() {
      // save "this" so we can access our Vue object inside async then() functions
      // by the time the data is returned, loadBusRoutes() has exited, our context is no longer the Vue object
      // but "self" sticks around since it was defined here. This is a "closure".
      let self = this;
      
      fetch( serverURL + "/bussy-mcbus").
        then( function( response ) { if (response.ok) { return response.json(); }}).
        then( function( data ) {
          console.log( data );
          self.buses = data.busRoutes;
        });
    }
  }
})

//----------------------------------------
// Demo using VueJS to create an app eventloop
//
// See also http://codepen.io/dwhitnee/pen/mAXEoJ
//
// 2016 David Whitney
//----------------------------------------

var now = new Date();

// Our data and methods that can be seen directly on the web
// page go here.  Other objects can go elsewhere
new Vue({
  el: '#myVueApp',


  // update these values, rather than update the DOM directly
  data: {
    message: "Hello Vue.js! It's " + now.toDateString(),
    newState: "",
    states: ["WA","OR","CA"]
  },


  // event handlers accessible from the web page
  methods: {
    addState: function() {
      this.states.push( this.newState );
      this.newState = "";
      console.log( this.states );
    }
  }
})

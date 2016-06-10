
var init = function (){

  class SoundBox {
    
    constructor(mp3, ogg,icon,color) {
      this.mp3 = mp3;
      this.ogg = ogg;
      this.location = location;
      this.color = color;
      SoundBox.counter++;
      this.boxId = SoundBox.counter;
      this.icon = icon;
      this.myAudio = new Audio(mp3); 
      this.myAudio.addEventListener('ended', function() {
          this.currentTime = 0;
          this.play();
      }, false);
      this.myAudio.play();
      this.myAudio.volume = 0.05;
    }
    get icon_() {
      return this.icon;
    }
    get location_() {
      return this.location;
    }
    get color_() {
      return this.color;
    }
   get id_() {
      return this.boxId;
    }
    set location_ (str) {
     this.location = str; 
    }
  }
  SoundBox.counter =0;

  var height = (window.innerHeight > 0) ? window.innerHeight : screen.height;
  var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
  var boxHeight = 50;

  var arr = new Array();
  arr.push(new SoundBox( "includes/Free Style Rythm.mp3", "includes/Free Style Rythm.ogg.ogg","includes/free_style.png", "#a0321a"));
  arr.push(new SoundBox( "includes/Muezzin.mp3", "includes/Muezzin", "includes/muezzin.png","#f76a40"));
  arr.push(new SoundBox( "includes/tar short.mp3", "includes/tar short,ogg","includes/tar.png", "#d47c76"));
  arr.push(new SoundBox( "includes/Turkish Blend.mp3", "Tincludes/urkish Blend.ogg","includes/blend.png", "#8c536d"));

  jQuery.each( arr, function( i, val ) {
    $("section#sound-content").append('<div id=sound-box' + i + ' class=sound-box></div>');
    $('#sound-box'+i).css("width", width);
    $('#sound-box'+i).css("height", height);
    $('#sound-box'+i).css("background-color", val.color);
    $('#sound-box'+i).css("z-index", 100-i);
    var init =  -i*boxHeight + height -boxHeight;
    $('#sound-box'+i).css("top",init);
    arr[i].location_ = init;
    this.startLimit_ = init;
    $('#sound-box'+i).draggable({ axis: "y" ,
       containment: [0,0,0,height-(boxHeight*i)-boxHeight]
    });

    // Icons
    var mouseX;
    var mouseY;
    $(document).mousemove( function(e) {
       mouseX = e.pageX; 
       mouseY = e.pageY;
       $('#sound-icon'+i).css('left',mouseX+20);
    });    
    $("#sound-icons").append('<div id=sound-icon'+i+' class=sound-icon></div>');
    $('#sound-icon'+i).css({"background-image":'url('+ arr[i].icon_ +')', 'left':mouseX, 'top': $('#sound-box'+i).position().top-50});    
    $('#sound-box'+i).hover(function(){
      $('#sound-icon'+i).toggle();
    });
    
    // Gradient
    $('#sound-box'+i).css("background",arr[i].color_);
    if(i<arr.length-1){
      $('#sound-box'+i).css("background",'-webkit-linear-gradient('+arr[i+1].color_+','+arr[i].color_);
      $('#sound-box'+i).css("background",'-o-linear-gradient('+arr[i+1].color_+','+arr[i].color_);
      $('#sound-box'+i).css("background",'-moz-linear-gradient('+arr[i+1].color_+','+arr[i].color_);
      $('#sound-box'+i).css("background",'linear-gradient('+arr[i+1].color_+','+arr[i].color_);
    }else{
      $('#sound-box'+i).css("background",'-webkit-linear-gradient(rgba(50,50,50,0.0),'+arr[i].color_);
      $('#sound-box'+i).css("background",'-o-linear-gradient(rgba(50,50,50,0.0),'+arr[i].color_);
      $('#sound-box'+i).css("background",'-moz-linear-gradient(rgba(50,50,50,0.0),'+arr[i].color_);
      $('#sound-box'+i).css("background",'linear-gradient(rgba(50,50,50,0.0),'+arr[i].color_);
    }
    

    // Drag event
    $('#sound-box'+i).on( "drag", function( event, ui ) { 
      $('#sound-icon'+i).css("top",ui.position.top-50);// move spesific icon      
        jQuery.each( arr, function( j, val ) {
          if(i<j  && $('#sound-box'+j).position().top >(arr.length-j)*boxHeight-boxHeight){
            var delta = ui.position.top - arr[i].location_;
            var dragged = $('#sound-box'+j).position().top;
            $('#sound-box'+j).css("top",dragged+delta);
            arr[j].location_ = $('#sound-box'+j).position().top;
            $('#sound-icon'+j).css("top",arr[j].location_-50); // move all up icons
          }
        });
      arr[i].location_ = ui.position.top;
      volume();
    }); 

    // Mouse down event
    $('#sound-box'+i).mousedown(function() {
      var friendHeight = height;
      if(i>0){
        friendHeight = $('#sound-box'+(i-1)).position().top;
      }
      $('#sound-box'+i).draggable({ axis: "y" ,
         containment: [0,(arr.length-i)*boxHeight-boxHeight,0,friendHeight-boxHeight]
      });
    });

    

    function volume(){
      jQuery.each( arr, function( j, val ) {
        if(j==0){
          arr[j].myAudio.volume = Math.abs(height-arr[j].location_)/height;
        }
        else{
          arr[j].myAudio.volume = Math.abs(arr[j].location_ - arr[j-1].location_)/height;
        }     
        var newHeight = arr[j].myAudio.volume*100 + "%";
     
        $('#sound-box'+j).css("background-size",newHeight + " " + newHeight);
      });
      
        
    }  

  });
init_gradient();
  function init_gradient(){
    if(arr.length>0){
      var newHeight = ((height-arr[0].location_)/height)*100 + "%";
      jQuery.each( arr, function( j, val ) {          
          console.log(newHeight+ ">>>");
          $('#sound-box'+j).css("background-size",newHeight + ' ' +newHeight);
        });
    }
  }
}

$(document).ready(function() {
  
  // The harmony / gravity point calculator
  // -------------------------------------------------
  
  
  // How it works:
  // 1. Calculates and draws the gravity point based on those elements which are currently visible on the page, and defined in the .html
  // 2. Draws a vertical, a horizontal axis around the page centre together with a centered golden ration rectangle and the gravity point
  // 3. Repeats 1. and 2. on scroll and browser resize
  
  
  
  // 1. Calculate the gravity point
  // ----
  function drawGravityPoint() {
    
    // Check if the elements are defined in the .html file
    // - these elements will be taken into consideration when calculating the gravity point
    if (typeof gravityPointElements == "undefined") {
      console.log("gravityPointElements is undefined in the HTML");
      return;
    }
    
    // The algorithm
    // - calculate the weight of each element, wich is the area of the element * the tone of the element (40% for text, 70% for image). Add these weights into a variable (sum) 
    // - calculate the distance of the centre of the element from the centre of the page
    // - add these distances (sumX, sumY)
    // - the position of the gravity point is: half of the screen + sumX / sum on horizontal, half of the screen - sumY / sum on vertical
    
    // The elements of the gravity point
    // - they are defined in the .html as JSON
    // - there can be singular elements (ex. #header) or a collection of elements (ex. .articles)
    // - example:
    //  - a H1 element and all the images
    // <script>
    //  var gravityPointElements = '[{"id" : "h1", "type" : "text"},{"id" : "img", "type" : "image", "collection" : "true"}]';
    // </script>
    
    
    // Set up variables for the arithmetic mean calculations
    var sum = 0;
    var sumX = 0;
    var sumY = 0;
    
    
    // Loop through elements
    var data = $.parseJSON(gravityPointElements);
    $.each(data, function() {
      
      // This is a collection 
      if (this['collection']) {
        var type = this['type'];
        $(this['id']).each(function() {
          
          // Do calculate
          // - I couldn't pass sum, sumX, sumY as a reference so their values were lost
          // - so I've copied here the function body ...
          item = $(this);
          if (isElementInViewport(item)) {
              var weight = getElementWeight(item, type);
              var x = distanceX(item);
              var y = distanceY(item);
              
              sum += weight;
              sumX += weight * x;
              sumY += weight * y;
          }
        });
        
        // This is a single standalone item, not a collection
      } else {
        item = $(this['id']);
        if (isElementInViewport(item)) {
            var weight = getElementWeight(item, type);
            var x = distanceX(item);
            var y = distanceY(item);
            
            sum += weight;
            sumX += weight * x;
            sumY += weight * y;
        }
      }
    });
    
    // 2. append the results to the end of the .html
    // ---
    appendToPage(sumX, sumY, sum);
  }
  
  
  // 3. Recalculate and redraw everything on scroll / browser resize
  // ----
  $(window).on('DOMContentLoaded load resize scroll', drawGravityPoint); 
  $(window).on('DOMContentLoaded load resize scroll', drawGoldenRectangle); 
  
  
  
  
  
  // Helper functions
  // ----
  
  
  
 
  // Get the distance of the center of an element from the centre of the page
  // - for X
  function distanceX(item) {
    var w = item.css('width');
    var centerX = parseInt(w) / 2;
    
    var position = item.offset();
    
    var coordinateX = position.left + centerX;
    return coordinateX - $(window).width() / 2;
  }
  
  // - for Y
  function distanceY(item) {
    var h = item.css('height');
    var centerY = parseInt(h) / 2;
    
    var position = item.offset();
    
    var coordinateY = position.top + centerY;
    return $(window).height() / 2 - coordinateY;
  }
  
  
  // Get a single element's weight
  function getElementWeight(item, type) {
    var w = item.css('width');
    var h = item.css('height');
    return parseInt(w) * parseInt(h) * getGravityByType(type);
  }
  
  // Get a single element's tone
  // text: 40%, image: 70%
  function getGravityByType(type) {
    return (type == 'text') ? 0.4 : 0.7;
  }
  
  
  // Check if the element is inside the viewport
  // - source: http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
  function isElementInViewport (el) {

    //special bonus for those using jQuery
    if (el instanceof jQuery) {
        el = el[0];
    }

    var rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
    );
  }
  
  
  
  // Add all the results to the HTML
  function appendToPage(sumX, sumY, sum) {   
    // A special section will hold all the gravity markup together
    $('body').append('<section id="gravity">');
    
    // Draw the guides and the rectangle
    drawGuides();
    drawGoldenRectangle();
    
    // Draw the gravity point
    var x = $(window).width() / 2 + sumX / sum;
    var y = $(window).height() / 2 - sumY / sum;
    var style = 'left: ' + x + 'px; top: ' + y + 'px';
    $('#gravity').append('<div class="h-gravity-point" style="' + style + '"></div>');
    
    $('body').append('</section>');
  }
  
  
  
  // Draw the axis and the rectangle holders
  function drawGuides() {
    $('#gravity').append('<div class="h-horizontal"></div>');
    $('#gravity').append('<div class="h-vertical"></div>');
    $('#gravity').append('<div class="h-golden-rectangle"></div>');
  }
  
  
  
  // Draw the golden ratio sized rectangle around the page centre
  function drawGoldenRectangle() {
    var minorX = $(window).width() / 8 * 3;
    var majorX = $(window).width() / 8 * 5;
    var left = $(window).width() / 2 - minorX;
    var right = majorX - $(window).width() / 2;
    
    var minorY = $(window).height() / 8 * 3;
    var majorY = $(window).height() / 8 * 5;
    var top = $(window).height() / 2 - minorY;
    var bottom = majorY - $(window).height() / 2;
    
    
    $('.h-golden-rectangle').css('width', left + right + 'px');
    $('.h-golden-rectangle').css('height', top + bottom + 'px');
    $('.h-golden-rectangle').css('left', minorX + 'px');
    $('.h-golden-rectangle').css('top', minorY + 'px');
  }
});

var circles = [];

function onKeyDown(event) {
    if (data[event.key]) {
         // get a new random circle
        var maxPoint = new Point(view.size.width, view.size.height);
        var ramdonPoint = Point.random() * maxPoint;
        var circle = new Path.Circle(ramdonPoint, 500);
        circle.fillColor = data[event.key].color;
        circles.push(circle);
        data[event.key].sound.play();
    }
}


// onFrame function will be execute by paper.js every 1/60 seconds
// every time we add an circle objects, within the onFrame function
// we need to loop all added circle and make some animated changes

function onFrame(event) {
    for (var i = 0; i < circles.length; i ++) {
        circles[i].fillColor.hue += 1;
        circles[i].scale(0.9);

        if(circles[i].area < 1){
          circles[i].remove(); // remove the circle from the canvas
          circles.splice(i, 1); // remove the circle from the array
        }
    }
}
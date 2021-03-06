/**
 * Creates a psudo random unique identifier string
 * 
 * @returns {string} randomized unique ID
 */
export function generate_ID() {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
}


let images = {};
let loader = new PxLoader();
export function getImage(url, callback) {
    if (!images[url]) {        
        //images[url] = new Image();
        //images[url].src = url;
        images[url] = loader.addImage(url);
        loader.addCompletionListener(function() {
            callback();
        });
        loader.start();
    } else {
        callback();
    }
    return images[url];
}

/**
 * Rotates a point (x, y) around a center point (cx, cy)
 * a number of radians (rad)
 */
export function rotatePoint(cx, cy, x, y, rad) {
    let cos = Math.cos(rad),
        sin = Math.sin(rad),
        nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
        ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
    return {x:nx, y:ny};
}

export function pointInRectangle(x, y, rx, ry, rw, rh) {
    return x >= rx && x <= rx + rw &&
        y >= ry && y <= ry + rh;

}

// credit: https://yal.cc/rot-rect-vs-circle-intersection/
export function pointInRotatedRectangle(pointX, pointY,
    rectX, rectY, rectOffsetX, rectOffsetY, rectWidth, rectHeight, rectAngle
) {
    var relX = pointX - rectX;
    var relY = pointY - rectY;
    var angle = -rectAngle;
    var angleCos = Math.cos(angle);
    var angleSin = Math.sin(angle);
    var localX = angleCos * relX - angleSin * relY;
    var localY = angleSin * relX + angleCos * relY;
    return localX >= -rectOffsetX && localX <= rectWidth - rectOffsetX &&
        localY >= -rectOffsetY && localY <= rectHeight - rectOffsetY;
}
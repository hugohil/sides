var explosions = [];

function Explosion(x, y, asset, frame, id) {
    ImageObject.call(this, x, y, asset);
    this.radius = 0.1;
    this.width = this.height = this.radius;
    this.radiusIncrement = (explAsset.width / settings.explLifeTime);
    this.alpha = 1;
    this.frame = frame;
    this.id = id;
}
Explosion.prototype = Object.create(ImageObject.prototype);
Explosion.prototype.constructor = ImageObject;

Explosion.prototype.update = function() {
    if(this.frame + settings.explLifeTime > currentFrame){
        this.radius += this.radiusIncrement;
    } else if (this.radius >= 0) {
        this.radius -= this.radiusIncrement;
        // see alpha channel in canvas image drawing
    } else {
        this.radius = 0;
    }
    this.width = this.height = this.radius;
    // this.x = this.x - (this.radius / 2);
    // this.y = this.y - (this.radius / 2);
    // see translation hack on redwire project
};

Explosion.prototype.draw = function(){
    ctx.drawImage(this.asset, this.x, this.y, this.radius, this.radius);
}

function makeExplosion(x, y, frame){
    var explosion = new Explosion(x, y, explAsset, frame, explosions.length);
    explosions.push(explosion);
}

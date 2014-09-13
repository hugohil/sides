var enemies = [];

function Enemy(x, y, asset, id){
    ImageObject.call(this, x, y, asset);
    this.alive = true;
    this.history = [];
    this.history.push({x: this.x, y: this.y, alive: this.alive});
    this.id = id;
}
Enemy.prototype = Object.create(ImageObject.prototype);
Enemy.prototype.constructor = ImageObject;

Enemy.prototype.update = function() {
    var self = this;
    var velocity = {
        x: Math.random() * 2,
        y: Math.random() * 2 - 1
    };
    self.x -= velocity.x;
    self.y += velocity.y;

    offLeftBorder(self) ? self.alive = false : self.alive = true;

    _.each(explosions, function(explosion){
        if(explosion.radius > 0){
            if(areColliding(self, explosion)){
                self.alive = false;
            }
        }
    });

    self.history.push({x: self.x, y: self.y, alive: self.alive});
};

Enemy.prototype.draw = function(){
    ctx.drawImage(this.asset, this.x, this.y);
}

function enemyGenerator(){
    var enemy = new Enemy(cvs.width + enemyAsset.width, Math.random() * (cvs.height / 2), enemyAsset, enemies.length);
    enemies.push(enemy);
}

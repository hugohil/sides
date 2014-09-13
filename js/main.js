var cvs,
    ctx,
    currentFrame;

var enemyAsset = new Image();
var explAsset = new Image();

window.requestAnimationFrame =  window.requestAnimationFrame ||
                                window.mozRequestAnimationFrame ||
                                window.webkitRequestAnimationFrame ||
                                window.msRequestAnimationFrame;

(function(){ // start-up function
    cvs = document.createElement('canvas');
    document.body.appendChild(cvs);
    cvs.width = window.innerWidth;
    cvs.height = window.innerHeight;
    cvs.x = 0;
    cvs.y = 0;

    ctx = cvs.getContext('2d');

    window.addEventListener('resize', windowResize, false);
    currentFrame = 0;
    init();
})(jQuery);

function init(){
    enemyAsset.src = 'assets/EnemyPhase1.png';
    explAsset.src = 'assets/ExplosionPhase1.png';

    render();
}

function windowResize(){
    cvs.width = window.innerWidth;
    cvs.height = window.innerHeight;
}

function render(){
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    currentFrame++;

    if(currentFrame % 45 == 0){
        enemyGenerator();
    }

    _.each(enemies, function(enemy){
        if(enemy.alive){
            enemy.update();
            enemy.draw();
        }
    });

    _.each(explosions, function(explosion){
        if(explosion.radius > 0){
            explosion.update();
            explosion.draw();
        }
    });
    
    requestAnimationFrame(render);
}

$(cvs).on('click', function (e){
    makeExplosion(e.screenX, e.screenY, currentFrame);
})

var settings = {
    explLifeTime: 120
}

MakoMermaidsGame.Game = function(game) {
    this.fx;
    ariel = null;
    this.map;
    this.layer;
    this.cursors;
    this.items;
};

MakoMermaidsGame.Game.prototype = {
    
    create: function() {
            
    this.fx = this.add.audio('sfx');
    this.fx.addMarker('ping', 10, 1.0);
    
    //physics system
    this.physics.startSystem(Phaser.Physics.ARCADE);

    this.stage.backgroundColor = '546d8e';

    this.map = this.add.tilemap('map');

    this.map.addTilesetImage('ground_1x1');
    //map.addTilesetImage('walls_1x2');
    //map.addTilesetImage('tiles2');
    this.map.addTilesetImage('coin');
    
    
    this.layer = this.map.createLayer('Tile Layer 1');
    //var myLayer = map.createLayer('Tile Layer 2');
    //var coin = map.createLayer('coins')
    
    //collision on blockedLayer
    this.map.setCollisionBetween(1, 100000, true, 'Tile Layer 1');
    
    this.layer.resizeWorld();
        
    ariel = this.add.sprite(200, 200, 'ariel');
    this.physics.arcade.enable(ariel);

    this.camera.follow(ariel);
        
    //Set Ariel animations
    ariel.animations.add('wait',[0]);
    ariel.animations.add('down',[0,1,2,3]);
    ariel.animations.add('up',[12,13,14,15]);
    ariel.animations.add('left',[4,5,6,7]);
    ariel.animations.add('right',[8,9,10,11]);
    
    // Wait
    ariel.animations.play('down', 6, true);
        
    //create items
    this.items = this.add.group();
    this.items.enableBody = true;
    this.items.physicsBodyType = Phaser.Physics.ARCADE;
        
    var result = this.findObjectsByType('coin',this.map, 'coins');
        
    result.forEach(function(element){
      this.createFromTiledObject(element,this.items);
    }, this);
        
    this.cursors = this.input.keyboard.createCursorKeys();
    //window.addEventListener("deviceorientation", this.handleOrientation, true);    
    },
    
    
    //find objects in a Tiled layer that containt a property called "type" equal to a certain value
   findObjectsByType : function(type, map, layer) {
    var result = new Array();
    map.objects[layer].forEach(function(element){
      if(element.properties.type === type) {
        //Phaser uses top left, Tiled bottom left so we have to adjust
        //also keep in mind that the cup images are a bit smaller than the tile which is 16x16
        //so they might not be placed in the exact position as in Tiled
        element.y -= map.tileHeight;
        result.push(element);
      }      
    });
    return result;
  }, 
   
    
    //create a sprite from an object
  createFromTiledObject : function(element, group) {
    var sprite = group.create(element.x, element.y, element.properties.sprite);
        sprite.animations.add('loop',[0,1,2,3,4,5]);
    
    // Wait
    sprite.animations.play('loop', 6, true);
      //copy all properties to the sprite
      Object.keys(element.properties).forEach(function(key){
        sprite[key] = element.properties[key];
      });
  },
    
     collect : function (ariel, collectable) {
       collectable.destroy();
        this.fx.play('ping');
    },
    
     handleOrientation: function(e) {
		
        var x = e.gamma; // range [-90,90]
		var y = e.beta;  // range [-180,180]
		
        ariel.body.velocity.x += x/2;
		ariel.body.velocity.y += y;
        
        
               },
                
    update: function() {
        this.physics.arcade.collide(ariel,this.layer);
        this.physics.arcade.overlap(ariel, this.items, this.collect, null, this);
    
    //player movement
    ariel.body.velocity.y = 0;
    ariel.body.velocity.x = 0;
           
      if (this.cursors.left.isDown)
    {
        ariel.body.velocity.x = -50;
        ariel.animations.play('left', 6, true);
    }
    else if (this.cursors.right.isDown)
    {
        ariel.body.velocity.x = 50;
        ariel.body.velocity.y = 0;
        ariel.animations.play('right', 6, true);
    }
    
    else if (this.cursors.up.isDown)
    {
        ariel.body.velocity.y = -50;
        ariel.animations.play('up', 6, true);
    }
    else if (this.cursors.down.isDown)
    {
        ariel.body.velocity.y = 50;
        ariel.animations.play('down', 6, true);
    }
    
    else if (this.input.mousePointer.isDown || this.input.pointer1.isDown)
    {
        
        //  400 is the speed it will move towards the mouse
        this.physics.arcade.moveToPointer(ariel, 150);
        if(ariel.body.velocity.x > 0) {
            ariel.animations.play('right', 6, true);
        } else {
           ariel.animations.play('left', 6, true);
        }

        //  if it's overlapping the mouse, don't move any more
        if (Phaser.Rectangle.contains(this.ariel.body, this.input.x, this.input.y))
        {
            ariel.body.velocity.setTo(0, 0);
        }
    }
            
    else {
        ariel.body.velocity.y = 0;
        ariel.body.velocity.x = 0;
            ariel.animations.stop;
    }
    }
    };
var width = window.innerWidth;
var height = window.innerHeight; 
    
if(height > 576) 
    {
    height = 576; 
    } 

var game = new Phaser.Game(width, height, Phaser.AUTO, 'game');  

game.state.add('Boot', MakoMermaidsGame.Boot);
game.state.add('Preloader', MakoMermaidsGame.Preloader);
game.state.add('Game', MakoMermaidsGame.Game);
game.state.add('MainMenu', MakoMermaidsGame.MainMenu);

game.state.start('Boot');
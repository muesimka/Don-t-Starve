// UI функции
window.drawUIPanel = function(ctx, health, hunger, wood, day) {
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.fillRect(0, 0, 800, 55);
    
    if(window.GameRenderer) {
        GameRenderer.drawUIcon('heart', 10, 12, health);
        GameRenderer.drawUIcon('meat', 100, 12, hunger);
    }
    
    ctx.fillStyle = "#ffde9c";
    ctx.font = "bold 18px monospace";
    ctx.fillText("🪵", 210, 35);
    ctx.fillText(wood, 235, 35);
    
    ctx.fillStyle = "#ffaa66";
    ctx.fillText("🌞 Day " + day, 700, 35);
};

window.drawUIButtons = function(ctx) {
    ctx.fillStyle = "#4a3a2a";
    ctx.fillRect(20, 545, 90, 35);
    ctx.fillRect(120, 545, 90, 35);
    ctx.fillRect(690, 545, 90, 35);
    
    ctx.fillStyle = "#ffde9c";
    ctx.font = "bold 14px monospace";
    ctx.fillText("GATHER", 35, 568);
    ctx.fillText("ATTACK", 142, 568);
    ctx.fillText("RESTART", 700, 568);
};

window.drawMinimap = function(ctx, camera) {
    const minimapCanvas = document.getElementById('minimap');
    if(!minimapCanvas) return;
    
    const mCtx = minimapCanvas.getContext('2d');
    const scaleX = 150 / GameConfig.WORLD_WIDTH;
    const scaleY = 150 / GameConfig.WORLD_HEIGHT;
    
    mCtx.fillStyle = "#2d5a2c";
    mCtx.fillRect(0, 0, 150, 150);
    
    mCtx.fillStyle = "#5d3a1a";
    for(let tree of GameState.world.trees) {
        mCtx.fillRect(tree.x * scaleX, tree.y * scaleY, 2, 2);
    }
    
    mCtx.fillStyle = "#cc3366";
    for(let berry of GameState.world.berries) {
        mCtx.fillRect(berry.x * scaleX, berry.y * scaleY, 2, 2);
    }
    
    mCtx.fillStyle = "#aa3333";
    for(let enemy of GameState.enemies) {
        mCtx.fillRect(enemy.x * scaleX, enemy.y * scaleY, 3, 3);
    }
    
    mCtx.fillStyle = "#ffcc44";
    mCtx.beginPath();
    mCtx.arc(GameState.player.x * scaleX, GameState.player.y * scaleY, 4, 0, Math.PI * 2);
    mCtx.fill();
    
    if(camera) {
        const viewX = camera.x * scaleX;
        const viewY = camera.y * scaleY;
        const viewW = 800 * scaleX;
        const viewH = 600 * scaleY;
        mCtx.strokeStyle = "white";
        mCtx.strokeRect(viewX, viewY, viewW, viewH);
    }
};

console.log("🖼️ UI ready");
// Рендерер
window.GameRenderer = {
    ctx: null,
    camera: null,
    
    init: function(ctx, camera) {
        this.ctx = ctx;
        this.camera = camera;
        console.log("🎨 GameRenderer initialized");
    },
    
    worldToScreen: function(worldX, worldY) {
        return this.camera.worldToScreen(worldX, worldY);
    },
    
    drawGround: function() {
        const img = AssetLoader.getImage('ground');
        if(img && img.complete) {
            this.ctx.drawImage(img, 0, 0, 800, 600);
        } else {
            // Градиентный фон
            const gradient = this.ctx.createLinearGradient(0, 0, 0, 600);
            gradient.addColorStop(0, '#2d5a2c');
            gradient.addColorStop(1, '#1a3a1a');
            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(0, 0, 800, 600);
            
            // Сетка для текстуры
            this.ctx.strokeStyle = '#3a6a3a';
            this.ctx.lineWidth = 0.5;
            for(let i = 0; i < 800; i += 50) {
                this.ctx.beginPath();
                this.ctx.moveTo(i, 0);
                this.ctx.lineTo(i, 600);
                this.ctx.stroke();
                this.ctx.beginPath();
                this.ctx.moveTo(0, i);
                this.ctx.lineTo(800, i);
                this.ctx.stroke();
            }
        }
    },
    
    drawPlayer: function(worldX, worldY, hp) {
        const screen = this.worldToScreen(worldX, worldY);
        if(screen.x + 40 < 0 || screen.x - 40 > 800 || screen.y + 40 < 0 || screen.y - 40 > 600) return;
        
        const img = AssetLoader.getImage('player');
        if(img && img.complete) {
            this.ctx.drawImage(img, screen.x - 24, screen.y - 24, 48, 48);
        } else {
            // Рисуем примитив
            this.ctx.fillStyle = '#FFD700';
            this.ctx.beginPath();
            this.ctx.arc(screen.x, screen.y, 18, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.fillStyle = '#000';
            this.ctx.beginPath();
            this.ctx.arc(screen.x - 6, screen.y - 5, 3, 0, Math.PI * 2);
            this.ctx.arc(screen.x + 6, screen.y - 5, 3, 0, Math.PI * 2);
            this.ctx.fill();
        }
        
        // Полоска здоровья
        this.ctx.fillStyle = "#aa3333";
        this.ctx.fillRect(screen.x - 28, screen.y - 38, 56, 6);
        this.ctx.fillStyle = "#4caf50";
        this.ctx.fillRect(screen.x - 28, screen.y - 38, 56 * (hp / 100), 6);
    },
    
    drawEnemy: function(worldX, worldY, hp, maxHp, type) {
        const screen = this.worldToScreen(worldX, worldY);
        if(screen.x + 40 < 0 || screen.x - 40 > 800 || screen.y + 40 < 0 || screen.y - 40 > 600) return;
        
        const img = AssetLoader.getImage('enemy');
        if(img && img.complete) {
            this.ctx.drawImage(img, screen.x - 24, screen.y - 24, 48, 48);
        } else {
            // Рисуем примитив
            this.ctx.fillStyle = type === 'guard' ? "#883333" : (type === 'patrol' ? "#336688" : "#668833");
            this.ctx.beginPath();
            this.ctx.ellipse(screen.x, screen.y, 16, 20, 0, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.fillStyle = "#fff";
            this.ctx.fillRect(screen.x - 8, screen.y - 5, 4, 4);
            this.ctx.fillRect(screen.x + 4, screen.y - 5, 4, 4);
        }
        
        // Полоска здоровья
        this.ctx.fillStyle = "#aa3333";
        this.ctx.fillRect(screen.x - 28, screen.y - 38, 56, 5);
        this.ctx.fillStyle = "#ff6666";
        this.ctx.fillRect(screen.x - 28, screen.y - 38, 56 * (hp / maxHp), 5);
        
        // Тип врага
        this.ctx.fillStyle = "white";
        this.ctx.font = "8px monospace";
        this.ctx.fillText(type, screen.x - 12, screen.y - 42);
    },
    
    drawTree: function(worldX, worldY) {
        const screen = this.worldToScreen(worldX, worldY);
        if(screen.x + 40 < 0 || screen.x - 40 > 800 || screen.y + 50 < 0 || screen.y - 50 > 600) return;
        
        const img = AssetLoader.getImage('tree');
        if(img && img.complete) {
            this.ctx.drawImage(img, screen.x - 32, screen.y - 48, 64, 64);
        } else {
            this.ctx.fillStyle = "#5d3a1a";
            this.ctx.fillRect(screen.x - 8, screen.y - 30, 16, 50);
            this.ctx.fillStyle = "#2d5a2c";
            this.ctx.beginPath();
            this.ctx.arc(screen.x, screen.y - 25, 20, 0, Math.PI * 2);
            this.ctx.fill();
        }
    },
    
    drawBerry: function(worldX, worldY, count) {
        const screen = this.worldToScreen(worldX, worldY);
        if(screen.x + 30 < 0 || screen.x - 30 > 800 || screen.y + 30 < 0 || screen.y - 30 > 600) return;
        
        const img = AssetLoader.getImage('berry');
        if(img && img.complete) {
            this.ctx.drawImage(img, screen.x - 16, screen.y - 16, 32, 32);
        } else {
            this.ctx.fillStyle = "#cc3366";
            this.ctx.beginPath();
            this.ctx.arc(screen.x, screen.y, 10, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.fillStyle = "#fff";
            this.ctx.fillRect(screen.x - 3, screen.y - 12, 6, 4);
        }
        
        this.ctx.fillStyle = "white";
        this.ctx.font = "10px monospace";
        this.ctx.shadowBlur = 2;
        this.ctx.fillText("🍓" + count, screen.x - 10, screen.y - 20);
        this.ctx.shadowBlur = 0;
    },
    
    drawUIcon: function(iconName, x, y, value) {
        const img = AssetLoader.getImage(iconName);
        if(img && img.complete) {
            this.ctx.drawImage(img, x, y, 28, 28);
        } else {
            this.ctx.fillStyle = iconName === 'heart' ? "#ff3366" : "#ffaa33";
            this.ctx.fillRect(x, y, 28, 28);
        }
        this.ctx.fillStyle = "white";
        this.ctx.font = "bold 18px monospace";
        this.ctx.fillText(Math.floor(value), x + 35, y + 22);
    }
};

console.log("🎨 Renderer ready");
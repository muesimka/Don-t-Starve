// Модуль для тестирования и отладки
window.QAModule = {
    enabled: true,
    
    init: function() {
        if(!this.enabled) return;
        
        console.log("🧪 QA Module loaded");
        this.runTests();
        this.setupDebugCommands();
    },
    
    runTests: function() {
        console.group("📋 Running Tests");
        
        // Проверка конфигов
        console.assert(window.GameConfig, "❌ GameConfig not found");
        console.assert(window.GameBalance, "❌ GameBalance not found");
        console.assert(window.GameState, "❌ GameState not found");
        console.assert(window.GameRenderer, "❌ GameRenderer not found");
        console.assert(window.GameCamera, "❌ GameCamera not found");
        console.assert(window.AssetLoader, "❌ AssetLoader not found");
        console.assert(window.SoundManager, "❌ SoundManager not found");
        console.assert(window.EffectsManager, "❌ EffectsManager not found");
        console.assert(window.InputHandler, "❌ InputHandler not found");
        console.assert(window.GameAI, "❌ GameAI not found");
        console.assert(window.CoreGame, "❌ CoreGame not found");
        
        // Проверка мира
        if(GameState.world) {
            console.log(`✅ World size: ${GameState.world.width}x${GameState.world.height}`);
            console.log(`✅ Trees: ${GameState.world.trees.length}`);
            console.log(`✅ Berries: ${GameState.world.berries.length}`);
        }
        
        console.groupEnd();
    },
    
    setupDebugCommands: function() {
        window.debug = {
            getState: () => {
                console.log("=== GAME STATE ===");
                console.log("Player:", GameState.player);
                console.log("Day:", GameState.day);
                console.log("Enemies:", GameState.enemies.length);
                console.log("Trees:", GameState.world.trees.length);
                console.log("Berries:", GameState.world.berries.length);
                console.log("Active:", GameState.gameActive);
            },
            
            killAllEnemies: () => {
                GameState.enemies = [];
                console.log("🗡️ All enemies eliminated!");
            },
            
            addWood: (amount = 50) => {
                GameState.addWood(amount);
                console.log(`🪵 Added ${amount} wood. Total: ${GameState.player.wood}`);
            },
            
            heal: () => {
                GameState.healPlayer(100);
                console.log("💚 Player fully healed!");
            },
            
            nextDay: () => {
                GameState.nextDay();
            },
            
            spawnEnemy: () => {
                GameState.spawnEnemy();
                console.log(`👾 Enemy spawned. Total: ${GameState.enemies.length}`);
            },
            
            toggleMusic: () => {
                if(SoundManager.muted) {
                    SoundManager.unmute();
                    console.log("🔊 Music unmuted");
                } else {
                    SoundManager.mute();
                    console.log("🔇 Music muted");
                }
            },
            
            help: () => {
                console.log("=== DEBUG COMMANDS ===");
                console.log("debug.getState() - Show game state");
                console.log("debug.killAllEnemies() - Remove all enemies");
                console.log("debug.addWood(n) - Add wood (default 50)");
                console.log("debug.heal() - Full heal");
                console.log("debug.nextDay() - Skip to next day");
                console.log("debug.spawnEnemy() - Spawn new enemy");
                console.log("debug.toggleMusic() - Mute/unmute music");
            }
        };
        
        console.log("🐛 Debug commands available! Type 'debug.help()'");
    }
};

// Запуск QA модуля
setTimeout(() => {
    QAModule.init();
}, 100);

console.log("🧪 QA ready");
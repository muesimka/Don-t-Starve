// js/core/core.js
class CoreGame {
    constructor(gameState, gameBalance, gameAI, effectsManager, soundManager, camera) {
        this.gameState = gameState;
        this.gameBalance = gameBalance;
        this.gameAI = gameAI;
        this.effectsManager = effectsManager;
        this.soundManager = soundManager;
        this.camera = camera;
        this.lastTimestamp = 0;
    }
}

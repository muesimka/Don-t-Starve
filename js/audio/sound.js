function helloSound() {
    const audio = document.getElementById('testSound');
    console.log("Sound & Effects ready 🔊 (звук загружен: " + !!audio + ")");
    
    console.log("🔊 Sound & Effects ready");
}

window.SoundManager = {
    sounds: {},
    loadedCount: 0,
    totalSounds: 0,
    
    registerSound: function(name, path) {
        this.totalSounds++;
        const audio = new Audio();
        audio.addEventListener('canplaythrough', () => {
            this.loadedCount++;
            console.log(`✅ Sound loaded: ${name} (${this.loadedCount}/${this.totalSounds})`);
        });
        audio.src = path;
        audio.load();
        this.sounds[name] = audio;
        console.log(`🔊 Sound registered: ${name}`);
    },
    
    play: function(name) {
        if(this.sounds[name]) {
            this.sounds[name].currentTime = 0;
            this.sounds[name].play().catch(e => console.log("Audio error:", e));
        } else {
            console.warn(`⚠️ Sound not found: ${name}`);
        }
    },
    
    setVolume: function(name, volume) {
        if(this.sounds[name]) {
            this.sounds[name].volume = Math.max(0, Math.min(1, volume));
        }
    }
};

helloSound();

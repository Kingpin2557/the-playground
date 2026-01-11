import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import styles from './AudioManager.module.css';
import widgetStyles from '../widget/Widget.module.css';
import { useSeason } from '../../hooks/useSeason';

const BGM_URL = "/audio/soundtrack.mp3";

function AudioManager() {
    const audioRef = useRef<HTMLAudioElement>(null);
    const ambienceRef = useRef<HTMLAudioElement>(null);
    const [volume, setVolume] = useState(0);
    const [showSlider, setShowSlider] = useState(false);
    const seasonClass = useSeason(widgetStyles);

    // Bepaal de extra sound laag op basis van de maand
    const month = new Date().getMonth();
    const getAmbienceSrc = () => {
        if (month >= 2 && month <= 4) return "/audio/birds-chirping.mp3";
        if (month >= 5 && month <= 7) return "/audio/summer-cicadas.mp3";
        if (month >= 8 && month <= 10) return "/audio/wind-leaves.mp3";
        return "/audio/cold-wind.mp3";
    };

    const ambienceSrc = getAmbienceSrc();

    useEffect(() => {
        const bgm = audioRef.current;
        const amb = ambienceRef.current;
        if (!bgm || !amb) return;

        bgm.volume = volume;
        amb.volume = volume * 0.5;

        if (volume > 0) {
            bgm.play().catch(() => {});
            amb.play().catch(() => {});
        } else {
            bgm.pause();
            amb.pause();
        }
    }, [volume]);

    return (
        <div 
            className={styles.audioFixedWrapper}
            onMouseEnter={() => setShowSlider(true)}
            onMouseLeave={() => setShowSlider(false)}
        >
            <audio ref={audioRef} src={BGM_URL} loop />
            <audio ref={ambienceRef} src={ambienceSrc} loop />
            
            <div className={`${styles.sliderContainer} ${showSlider ? styles.visible : ''}`}>
                <input 
                    type="range" 
                    min="0" 
                    max="1" 
                    step="0.01" 
                    value={volume} 
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className={styles.volumeSlider}
                    style={{
                        background: `linear-gradient(to right, #3b82f6 ${volume * 100}%, #e2e8f0 ${volume * 100}%)`
                    }}
                />
            </div>

            <button 
                className={`${styles.muteButton} ${seasonClass}`} 
                onClick={() => setVolume(volume > 0 ? 0 : 0.5)}
            >
                {volume > 0 ? <Volume2 size={20} /> : <VolumeX size={20} />}
            </button>
        </div>
    );
}

export default AudioManager;
import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import styles from './AudioManager.module.css';
import widgetStyles from '../widget/Widget.module.css';
import { useSeason } from '../../hooks/useSeason';

const BGM_URL = "/audio/soundtrack.mp3";

// Added prop type for autoStart
interface AudioManagerProps {
    autoStart?: boolean;
}

function AudioManager({ autoStart }: AudioManagerProps) {
    const audioRef = useRef<HTMLAudioElement>(null);

    // Initialize volume directly from prop to avoid ESLint cascading render error
    const [volume, setVolume] = useState(autoStart ? 0.2 : 0);
    const [showSlider, setShowSlider] = useState(false);
    const seasonClass = useSeason(widgetStyles);


    // Audio Engine: Syncs the <audio> element with the volume state
    useEffect(() => {
        const bgm = audioRef.current;
        if (!bgm) return;

        bgm.volume = volume;

        if (volume > 0) {
            // Browser allows play because it's tied to the user gesture in Intro
            bgm.play().catch((err) => {
                console.warn("Audio playback blocked by browser policy:", err);
            });
        } else {
            bgm.pause();
        }
    }, [volume]);

    return (
        <div
            className={styles.audioFixedWrapper}
            onMouseEnter={() => setShowSlider(true)}
            onMouseLeave={() => setShowSlider(false)}
        >
            <audio ref={audioRef} src={BGM_URL} loop />

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
                aria-label={volume > 0 ? "Mute" : "Unmute"}
            >
                {volume > 0 ? <Volume2 size={20} /> : <VolumeX size={20} />}
            </button>
        </div>
    );
}

export default AudioManager;

import { useProgress } from "@react-three/drei";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "./Intro.module.css";

function Intro({ onComplete }: { onComplete: () => void }) {
    const { progress } = useProgress();
    const [checked, setChecked] = useState(false);
    const location = useLocation();
    const isRoot = location.pathname === "/";

    useEffect(() => {
        if (!isRoot && progress === 100) {
            onComplete();
        }
    }, [progress, isRoot, onComplete]);

    const handleStart = () => {
        if ((isRoot && checked) || !isRoot) {
            onComplete();
        }
    };

    return (
        <div
            className={styles.intro}
            onClick={!isRoot && progress === 100 ? handleStart : undefined}
        >
            <div className={styles.content}>

                <div className={styles.textSection}>{/* 1. Title Section */}
                    <div className={styles.titleSection}>
                        {isRoot ? (
                            <h1>Welkom tot het speelse eiland!</h1>
                        ) : (
                            progress < 100 && <h1>Loading Assets</h1>
                        )}
                    </div>

                    {/* 2. Description Section */}
                    {isRoot && (
                        <>
                            <p className={styles.description}>
                                Ontdek de verschillende gebieden en geniet van de
                                unieke sfeer van dit eiland.
                            </p>
                            <p>Voor een betere ervaring vragen wij uw toestemming om muziek te mogen af spelen</p>
                        </>
                    )}</div>

                {/* 3. Loader or Interaction Section */}
                <div className={styles.actionSection}>
                    {progress < 100 ? (
                        <div className={styles.loaderWrapper}>
                            <div className={styles.track}>
                                <div
                                    className={styles.fill}
                                    style={{ width: `${progress}%` }}
                                />
                                <div
                                    className={styles.thumb}
                                    style={{ left: `${progress}%` }}
                                />
                            </div>
                            <span className={styles.percentage}>{Math.round(progress)}%</span>
                        </div>
                    ) : (
                        <div className={styles.loadedWrapper}>
                            {isRoot ? (
                                <div className={styles.controls}>
                                    <label className={styles.checkboxLabel}>
                                        <input
                                            type="checkbox"
                                            checked={checked}
                                            onChange={(e) => setChecked(e.target.checked)}
                                        />
                                        Speel muziek
                                    </label>
                                    <button
                                        disabled={!checked}
                                        onClick={handleStart}
                                        className={styles.button}
                                    >
                                        Enter Experience
                                    </button>
                                </div>
                            ) : (
                                <p className={styles.pulse}>Click anywhere to enter</p>
                            )}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}

export default Intro;
import styles from "./InfoWidget.module.css";

import {useLocation} from "react-router-dom";
import {Baby, Box, CheckCircle2, CloudRain, ShieldCheck, User} from "lucide-react";

function InfoWidget() {
    const { state } = useLocation();
    
    if (!state || !state.info) return null;

    const { info } = state;

    return (
        <div className={styles.info}>
            <section>
                <header>
                    <h3>Geschiedenis</h3>
                </header>
                <p>{info.history}</p>
            </section>

            <section>
                <h3>Informatie</h3>
                <ul>
                    <li>
                        <User size={16} className={styles.icon} />
                        <p>{info.capacity}</p>
                    </li>
                    <li>
                        <Box size={16} className={styles.icon} />
                        <p>{info.material}</p>
                    </li>
                    <li>
                        <Baby size={16} className={styles.icon} />
                        <p>{info.ageRange}</p>
                    </li>
                    <li>
                        <ShieldCheck size={16} className={styles.icon} />
                        <p>{info.maintenanceStatus}</p>
                    </li>
                    <li>
                        {info.safeInRain ? (
                            <>
                                <CheckCircle2 size={16} className={styles.icon} />
                                <p className={styles.text}>Veilig bij regen</p>
                            </>
                        ) : (
                            <>
                                <CloudRain size={16} className={styles.icon} />
                                <p className={styles.text}>Te glad!</p>
                            </>
                        )}
                    </li>
                </ul>
            </section>

            <footer>
                {info.interactive && (
                    <p><small>* Dit is een interactief toestel</small></p>
                )}
            </footer>
        </div>
    );
}

export default InfoWidget;
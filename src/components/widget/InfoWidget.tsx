import styles from "./Widget.module.css";

import {useLocation} from "react-router-dom";
import {Baby, Box, CheckCircle2, CloudRain, ShieldCheck, User} from "lucide-react";
import {useSeason} from "../../hooks/useSeason.ts";

function InfoWidget() {
    const { state } = useLocation();
    const seasonClass = useSeason(styles);

    if (!state || !state.info) return null;

    const { info } = state;

    return (
        <div className={`${styles.info} ${seasonClass}`}>
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
                        <User size={20} />
                        <p>{info.capacity}</p>
                    </li>
                    <li>
                        <Box size={20} />
                        <p>{info.material}</p>
                    </li>
                    <li>
                        <Baby size={20} />
                        <p>{info.ageRange}</p>
                    </li>
                    <li>
                        <ShieldCheck size={20} />
                        <p>{info.maintenanceStatus}</p>
                    </li>
                    <li>
                        {info.safeInRain ? (
                            <>
                                <CheckCircle2 size={20} />
                                <p className={styles.text}>Veilig bij regen</p>
                            </>
                        ) : (
                            <>
                                <CloudRain size={20} />
                                <p className={styles.text}>Te glad!</p>
                            </>
                        )}
                    </li>
                </ul>
            </section>
        </div>
    );
}

export default InfoWidget;
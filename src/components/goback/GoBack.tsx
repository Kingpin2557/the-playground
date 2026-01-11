import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import styles from "./GoBack.module.css";
import widgetStyles from "../widget/Widget.module.css";
import { useSeason } from "../../hooks/useSeason";

function GoBack() {
    const navigate = useNavigate();
    const location = useLocation();
    const seasonClass = useSeason(widgetStyles);

    // Als we op "/" zijn, is het pad leeg of exact "/"
    const isRoot = location.pathname === "/";

    if (isRoot) return null;

    return (
        <button 
            className={`${styles.goBack} ${seasonClass}`} 
            onClick={() => navigate("/")}
        >
            <ArrowLeft size={20} />
            <span>Terug naar overzicht</span>
        </button>
    );
}

export default GoBack;
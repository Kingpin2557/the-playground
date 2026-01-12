import styles from "./Widget.module.css";
import { useSeason } from '../../hooks/useSeason';

// Static summer values
const summerData = {
    maxTemp: 28.5,
    minTemp: 18.2,
    windSpd: 12.4,
    wCode: 0, // 0 is Clear Sky
};

function WeatherWidget() {
    const seasonClass = useSeason(styles);

    const getDetails = (code: number) => {
        // Clear Summer Icon
        if (code === 0) return {
            imgUrl: "https://www.amcharts.com/lib/images/weather/animated/day.svg",
            txt: "Clear"
        };
        if (code <= 3) return {
            imgUrl: "https://www.amcharts.com/lib/images/weather/animated/cloudy-day-1.svg",
            txt: "Cloudy"
        };
        return {
            imgUrl: "https://www.amcharts.com/lib/images/weather/animated/thunder.svg",
            txt: "Stormy"
        };
    };

    const curWeather = getDetails(summerData.wCode);

    return (
        <div className={`${styles.weather} ${seasonClass}`}>
            <div className={styles.column}>
                <img
                    className={styles.icon}
                    src={curWeather.imgUrl}
                    alt={curWeather.txt}
                />
            </div>

            <div className={styles.column}>
                <h3>Temp</h3>
                <span>{summerData.minTemp}° / {summerData.maxTemp}°C</span>
            </div>

            <div className={styles.column}>
                <h3>Wind</h3>
                <span>{summerData.windSpd} km/h</span>
            </div>
        </div>
    );
}

export default WeatherWidget;
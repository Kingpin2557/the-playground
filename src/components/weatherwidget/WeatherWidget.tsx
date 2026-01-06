import { useState, useEffect } from 'react';
import styles from   './WeatherWidget.module.css';

interface MeteoData {
    daily: {
        temperature_2m_max: number[];
        temperature_2m_min: number[];
        wind_speed_10m_max: number[];
        weather_code: number[];
        time: string[];
    };
}

function WeatherWidget() {
    const [weather, setWeather] = useState<MeteoData | null>(null);

    useEffect(() => {
        fetch("https://api.open-meteo.com/v1/forecast?latitude=51.07&longitude=3.71&daily=weather_code,temperature_2m_max,temperature_2m_min,wind_speed_10m_max&timezone=Europe%2FBerlin")
            .then(res => res.json())
            .then(data => setWeather(data))
            .catch(err => console.error(err));
    }, []);

    if (!weather) return null;

    // We pakken de data van vandaag (index 0)
    const maxTemp = weather.daily.temperature_2m_max[0];
    const minTemp = weather.daily.temperature_2m_min[0];
    const wind = weather.daily.wind_speed_10m_max[0];
    const code = weather.daily.weather_code[0];

    const getWeatherDetails = (code: number) => {
        if (code === 0) return { icon: "https://www.amcharts.com/lib/images/weather/animated/day.svg", label: "Clear" };
        if (code <= 3) return { icon: "https://www.amcharts.com/lib/images/weather/animated/cloudy-day-1.svg", label: "Partly Cloudy" };
        if (code <= 48) return { icon: "https://www.amcharts.com/lib/images/weather/animated/cloudy.svg", label: "Foggy" };
        if (code <= 67) return { icon: "https://www.amcharts.com/lib/images/weather/animated/rainy-6.svg", label: "Rainy" };
        if (code <= 77) return { icon: "https://www.amcharts.com/lib/images/weather/animated/snowy-6.svg", label: "Snowy" };
        return { icon: "https://www.amcharts.com/lib/images/weather/animated/thunder.svg", label: "Stormy" };
    };

    const details = getWeatherDetails(code);

    const getSeasonClass = () => {
        const month = new Date().getMonth();
        if (month >= 2 && month <= 4) return styles.labelSpring;
        if (month >= 5 && month <= 7) return styles.labelSummer;
        if (month >= 8 && month <= 10) return styles.labelAutumn;
        return styles.labelWinter;
    };

    return (
        <div className={`${styles.weather}  ${getSeasonClass()}`}>
                <div className={styles.column}>
                    <img
                        className={styles.icon}
                        src={details.icon}
                        alt={details.label}
                    />
                </div>
                <div className={styles.column}>
                    <p className={styles.label}>Temp</p>
                    <span className={styles.value}>{minTemp}° / {maxTemp}°C</span>
                </div>

                <div className={styles.column}>
                    <p className={styles.label}>Wind</p>
                    <span className={styles.value}>{wind} km/h</span>
                </div>
            </div>
    );
}

export default WeatherWidget;
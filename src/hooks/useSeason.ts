export type Season = 'spring' | 'summer' | 'autumn' | 'winter';

export const useSeason = (styles: Record<string, string>): string => {
    const month = new Date().getMonth();
    let season: Season;

    if (month >= 2 && month <= 4) {
        season = 'spring';
    } else if (month >= 5 && month <= 7) {
        season = 'summer';
    } else if (month >= 8 && month <= 10) {
        season = 'autumn';
    } else {
        season = 'winter';
    }

    const seasonClasses: Record<Season, string> = {
        spring: styles.labelSpring,
        summer: styles.labelSummer,
        autumn: styles.labelAutumn,
        winter: styles.labelWinter,
    };

    return seasonClasses[season];
};
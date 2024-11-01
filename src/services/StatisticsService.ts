import { MealService } from "./MealService";

export interface IStatistics {
    percentage: number
    total: number;
    inDiet: number;
    outDiet: number;
    longestStreak: number

}

export class StatisticsService {


    static async calculate(): Promise<IStatistics> {
        const meals = await MealService.getAll()
        const total = meals.length;
        const inDiet = meals.filter(meal => meal.diet).length;
        const outDiet = total - inDiet;
        const dietPercentage = total > 0 ? (inDiet / total) * 100 : 0;

        // Calculate the longest streak of diet meals
        let currentStreak = 0;
        let maxStreak = 0;

        meals.forEach((meal) => {
            if (meal.diet) {
                currentStreak++;
                if (currentStreak > maxStreak) {
                    maxStreak = currentStreak;
                }
            } else {
                currentStreak = 0;
            }
        });

        return {
            percentage: dietPercentage,
            longestStreak: maxStreak,
            total,
            inDiet,
            outDiet
        };
    }
}





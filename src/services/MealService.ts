import AsyncStorage from "@react-native-async-storage/async-storage";
import { IMeal, IMealCreate, IMealUpdate } from "../models/Meal";



const STORAGE_KEY = 'meals'

export class MealService {
    static async create(meal: IMealCreate) {

        const response = await AsyncStorage.getItem(STORAGE_KEY)
        const new_meal = {
            id: Date.now(),
            created_at: new Date(),
            updated_at: new Date(),
            ...meal
        }

        if (response) {
            const meals = JSON.parse(response)
            const data = JSON.stringify([...meals, new_meal])
            await AsyncStorage.setItem(STORAGE_KEY, data)
            return
        }

        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([new_meal]))
    }

    static async update(meal: IMealUpdate) {
        const meals = await this.getAll()

        const find_meal = meals.find(item => item.id === meal.id)

        const new_meal = {
            updated_at: new Date(),
            ...find_meal,
            ...meal
        }

        const new_meals = meals.map(item => {
            if (item.id === meal.id) {
                return new_meal
            }
            return item
        })

        const data = JSON.stringify(new_meals)

        await AsyncStorage.setItem(STORAGE_KEY, data)
    }

    static async get(id: number): Promise<IMeal> {
        const meals = await this.getAll()
        const meal = meals.find(item => item.id === id)
        if (!meal) {
            throw new Error('not found')
        }
        return meal
    }
    static async getAll(): Promise<IMeal[]> {
        const response = await AsyncStorage.getItem(STORAGE_KEY)

        if (!response) {
            return []
        }

        const meals: IMeal[] = JSON.parse(response)
        return meals
    }

    static async delete(id: number) {
        try {
            const meals = await this.getAll()
            const new_meals = meals.filter(item => item.id !== id)

            const data = JSON.stringify(new_meals)

            await AsyncStorage.setItem(STORAGE_KEY, data)
        } catch {

        }

    }
}
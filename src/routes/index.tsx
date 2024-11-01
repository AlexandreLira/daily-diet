import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Home } from "../screens/Home";
import { CreateOrEditMeal } from "../screens/CreateOrEditMeal";
import { IMeal } from "../models/Meal";
import { MealDetails } from "../screens/MealDetails";
import { CreatedMeal } from "../screens/CreatedMeal";
import { Statistics } from "../screens/Statistics";

export type RootStackParamList = {
    Home: undefined;
    CreateOrEditMeal: Pick<IMeal, 'id'> | undefined;
    MealDetails: Pick<IMeal, 'id'>;
    CreatedMeal: Pick<IMeal, 'diet'>;
    Statistics: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function Routes() {
    return (
        <NavigationContainer independent={true} >
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="MealDetails" component={MealDetails} />
                <Stack.Screen
                    name="CreatedMeal"
                    component={CreatedMeal}
                    options={{ animation: 'fade_from_bottom' }}
                />
                <Stack.Screen
                    name="CreateOrEditMeal"
                    component={CreateOrEditMeal}
                    options={{ animation: 'fade_from_bottom' }}
                />
                <Stack.Screen
                    name="Statistics"
                    component={Statistics}
                    options={{ animation: 'fade_from_bottom' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
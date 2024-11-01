import { Button } from "@/src/components/Button";
import { MealCard } from "@/src/components/MealCard";
import { PercentCard } from "@/src/components/PercentCard";
import { IMeal } from "@/src/models/Meal";
import { RootStackParamList } from "@/src/routes";
import { MealService } from "@/src/services/MealService";
import { IStatistics, StatisticsService } from "@/src/services/StatisticsService";
import { theme } from "@/src/theme";
import { images } from "@/src/theme/images";
import { PHOTO_URL } from "@/src/utils/constants";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Image, SectionList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface HomeProps extends NativeStackScreenProps<RootStackParamList, 'Home'> { }

interface IMealSection {
    title: string;
    data: IMeal[]
}

export function Home({ navigation }: HomeProps) {

    const [list, setList] = useState<IMealSection[]>([])
    const [statistics, setStatistics] = useState({} as IStatistics)



    function handleGoToMeal() {
        navigation.navigate('CreateOrEditMeal')
    }

    async function getMeals() {
        const meals = await MealService.getAll()


        const a = meals.reduce((result, meal) => {

            const formattedDate = new Date(meal.date).toLocaleDateString('pt-BR');

            let new_result = result

            const find = result.find(item => item.title === formattedDate)

            if (find) {
                new_result = new_result.map(item => {
                    if (item.title == formattedDate) {
                        return {
                            title: item.title,
                            data: [...item.data, meal]
                        }
                    }

                    return item
                })

            } else {

                new_result.push({
                    title: formattedDate,
                    data: [meal]
                })
            }







            return new_result;
        }, [] as IMealSection[]);

        console.log(a)

        setList(a)

    }

    async function loadStatistics() {
        const data = await StatisticsService.calculate()
        setStatistics(data)
    }

    useFocusEffect(useCallback(() => {
        loadStatistics()
        getMeals()
    }, []))

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.header}>
                <Image source={images.logo} />
                <Image
                    source={{ uri: PHOTO_URL }}
                    style={styles.profile}
                />
            </View>

            <PercentCard
                onPress={() => navigation.navigate('Statistics')}
                value={statistics?.percentage}
            />

            <View>
                <Text style={{
                    ...theme.texts.body_m,
                    marginBottom: 8,
                    color: theme.colors.gray_1
                }}>Refeições</Text>
                <Button
                    onPress={handleGoToMeal}
                    icon="plus"
                    title="Nova refeição"
                />

            </View>
            <SectionList
                sections={list}
                keyExtractor={(item, index) => item.description + index}
                contentContainerStyle={{ gap: 8 }}
                renderItem={({ item }) =>
                    <MealCard
                        data={item}
                        onPress={() => navigation.navigate('MealDetails', { id: item.id })}
                    />
                }
                renderSectionHeader={({ section: { title } }) => (
                    <Text style={styles.date}>{title}</Text>
                )}
            />

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: theme.colors.gray_7,
        gap: 24
    },
    date: {
        ...theme.texts.title_s,
        color: theme.colors.gray_1
    },
    header: {
        flexDirection: 'row', justifyContent: 'space-between'
    },
    profile: {
        width: 40,
        aspectRatio: 1,
        borderWidth: 2,
        borderColor: theme.colors.gray_2,
        borderRadius: 999,
        resizeMode: 'contain'
    }
})
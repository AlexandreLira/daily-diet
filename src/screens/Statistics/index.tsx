import { RootStackParamList } from "@/src/routes";
import { theme } from "@/src/theme";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { InfoCard } from "@/src/components/InfoCard";
import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { IStatistics, StatisticsService } from "@/src/services/StatisticsService";

interface StatisticsProps extends NativeStackScreenProps<RootStackParamList, 'Statistics'> { }


export function Statistics({ navigation, route }: StatisticsProps) {

    const [statistics, setStatistics] = useState({} as IStatistics)

    const styles = styling(statistics.percentage)

    async function loadStatistics() {
        const data = await StatisticsService.calculate()
        setStatistics(data)
    }

    useFocusEffect(useCallback(() => {
        loadStatistics()
    }, []))

    return (
        <SafeAreaView style={styles.container} edges={{ bottom: 'off', top: 'additive' }} >
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.headerButton}
                    onPress={navigation.goBack}
                >
                    <Image
                        style={styles.headerIcon}
                        source={theme.icons.arrow_left}
                    />
                </TouchableOpacity>
                <Text
                    style={styles.headerTitle}
                >
                    {statistics?.percentage?.toFixed(2) + '%'}
                </Text>
                <Text
                    style={styles.headerLabel}
                >
                    das refeições dentro da dieta
                </Text>
            </View>

            <View style={styles.content}>
                <Text style={styles.title} >
                    Estatísticas gerais
                </Text>

                <InfoCard
                    value={statistics.longestStreak}
                    label="melhor sequência de pratos dentro da dieta"
                />

                <InfoCard
                    value={statistics.total}
                    label="refeições registradas"
                />

                <View style={styles.row}>

                    <InfoCard
                        value={statistics.inDiet}
                        label="refeições dentro da dieta"
                        bg={theme.colors.green_light}
                    />
                    <InfoCard
                        value={statistics.outDiet}
                        label="refeições fora da dieta"
                        bg={theme.colors.red_light}
                    />
                </View>

            </View>

        </SafeAreaView>
    )
}


const styling = (porcetage: number) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: porcetage > 50 ? theme.colors.green_light : theme.colors.red_light,
    },
    content: {
        padding: 24,
        flex: 1,
        gap: 16,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        backgroundColor: theme.colors.gray_7
    },

    header: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: 160,
    },

    headerButton: {
        position: 'absolute',
        left: 24,
        top: 24
    },
    headerIcon: {
        tintColor: porcetage > 50 ? theme.colors.green_dark : theme.colors.red_dark,
        width: 24,
        aspectRatio: 1
    },

    headerTitle: {
        ...theme.texts.title_g,
        color: theme.colors.gray_1
    },
    headerLabel: {
        ...theme.texts.body_s,
        color: theme.colors.gray_2
    },

    title: {
        ...theme.texts.title_sx,
        color: theme.colors.gray_1,
        textAlign: 'center',
        marginVertical: 8
    },

    row: {
        flexDirection: 'row', gap: 16
    },

    text: {
        ...theme.texts.title_sx, color: theme.colors.gray_2
    }
})
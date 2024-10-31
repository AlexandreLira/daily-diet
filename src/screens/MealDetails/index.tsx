import { AlertModal } from "@/src/components/AlertModal";
import { Button } from "@/src/components/Button";
import { IMeal } from "@/src/models/Meal";

import { RootStackParamList } from "@/src/routes";
import { MealService } from "@/src/services/MealService";
import { theme } from "@/src/theme";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface CreateOrEditMealProps extends NativeStackScreenProps<RootStackParamList, 'MealDetails'> { }


export function MealDetails({ navigation, route }: CreateOrEditMealProps) {

    const [meal, setMeal] = useState<IMeal>({} as IMeal)
    const [deleteModal, setDeleteModal] = useState(false)
    const mealId = route.params?.id;

    const styles = styling(meal.diet)

    async function loadMeal() {
        console.log(mealId)
        if (!mealId) return
        const response = await MealService.get(mealId)
        setMeal(response)
    }

    async function handleDelete() {
        try {
            await MealService.delete(mealId)
            navigation.goBack()

        } catch {

        }
    }

    useFocusEffect(useCallback(() => {
        loadMeal()
    }, []))

    return (
        <SafeAreaView style={styles.container} edges={{ bottom: 'off', top: 'additive' }} >
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.headerButton}
                    onPress={navigation.goBack}
                >
                    <Image source={theme.icons.arrow_left} style={styles.headerIcon} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Refeição</Text>
            </View>

            <View style={styles.content}>
                <View style={styles.gap}>
                    <Text style={styles.name}>{meal.name}</Text>
                    <Text style={theme.texts.body_m}>{meal.description}</Text>
                </View>

                <View style={styles.gap}>
                    <Text style={styles.date}>Data e hora</Text>
                    <Text style={theme.texts.body_m}>{meal.description}</Text>
                </View>


                <View style={styles.status}>
                    <View style={styles.statusBall} />
                    <Text style={styles.statusLabel}>{meal.diet ? 'Fora da dieta' : 'Dentro da dieta'}</Text>
                </View>

                <View style={styles.footer}>
                    <Button
                        title="Editar refeição"
                        icon="pencil_simple_line"
                        onPress={() => navigation.navigate('CreateOrEditMeal', { id: mealId })}
                    />
                    <Button
                        title="Excluir refeição"
                        icon="trash"
                        outline
                        onPress={() => setDeleteModal(true)}
                    />
                </View>
            </View>

            <AlertModal
                visible={deleteModal}
                title="Deseja realmente excluir o registro da refeição?"
                cancelText="Cancelar"
                confirmText="Sim, exluir"
                onCancel={() => setDeleteModal(false)}
                onConfirm={handleDelete}

            />
        </SafeAreaView>
    )
}


const styling = (diet: boolean) => StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: diet ? theme.colors.green_light : theme.colors.red_light
    },

    headerButton: {
        position: 'absolute', left: 24
    },

    headerIcon: {
        width: 24,
        aspectRatio: 1,
    },

    headerTitle: {
        ...theme.texts.title_s,
        color: theme.colors.gray_1
    },
    gap: {
        gap: 8
    },

    name: {
        fontSize: 20,
        fontFamily: theme.fonts.bold
    },
    date: {
        ...theme.texts.title_sx,
        color: theme.colors.gray_1
    },

    form: {
        flex: 1,
        gap: 24
    },
    row: {
        flexDirection: 'row', gap: 20
    },

    content: {
        padding: 24,
        flex: 1,
        gap: 24,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        backgroundColor: theme.colors.gray_7
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 80,
    },
    text: {
        ...theme.texts.title_sx, color: theme.colors.gray_2
    },

    status: {
        backgroundColor: theme.colors.gray_6,
        borderRadius: 999,
        paddingHorizontal: 16,
        paddingVertical: 8,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
        alignSelf: 'flex-start'

    },

    statusBall: {
        backgroundColor: diet ? theme.colors.green_dark : theme.colors.red_dark,
        width: 8,
        aspectRatio: 1,
        borderRadius: 999
    },

    statusLabel: {
        ...theme.texts.body_s,
        color: theme.colors.gray_1
    },

    footer: {
        gap: 16, flex: 1, justifyContent: 'flex-end'
    }
})
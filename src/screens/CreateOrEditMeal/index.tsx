import { Button } from "@/src/components/Button";
import { Input } from "@/src/components/Input";
import { Select } from "@/src/components/Select";
import { RootStackParamList } from "@/src/routes";
import { theme } from "@/src/theme";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Controller, useForm } from "react-hook-form";
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { yupResolver } from '@hookform/resolvers/yup';
import { IMealForm, schema } from "./schema";
import { DateTimePicker } from "@/src/components/DatePicker";
import { MealService } from "@/src/services/MealService";
import { useEffect, useState } from "react";

interface CreateOrEditMealProps extends NativeStackScreenProps<RootStackParamList, 'CreateOrEditMeal'> { }


export function CreateOrEditMeal({ navigation, route }: CreateOrEditMealProps) {
    const [createdModal, setCreatedModal] = useState(false)
    const { control, handleSubmit, reset } = useForm<IMealForm>({
        resolver: yupResolver(schema),
        defaultValues: {
            date: new Date(),
            description: '',
            diet: true,
            name: ''
        }
    })

    const mealId = route.params?.id
    const isEdited = Boolean(mealId)

    async function onSubmit(data: IMealForm) {

        try {

            // if (mealId) {
            //     await MealService.update({
            //         id: mealId,
            //         ...data
            //     })
            //     navigation.navigate('Home')
            //     return
            // }
            // await MealService.create(data)
            navigation.navigate('CreatedMeal', { diet: Boolean(data.diet) })
        } catch {

        } finally {

        }
    }

    async function loadMeal() {
        if (!mealId) return
        const meal = await MealService.get(mealId)


        reset({
            date: new Date(meal.date),
            description: meal.description,
            diet: meal.diet,
            name: meal.name
        })
    }

    useEffect(() => {
        loadMeal()
    }, [mealId])


    return (
        <SafeAreaView style={styles.container} edges={{ bottom: 'off', top: 'additive' }} >
            <View style={styles.header}>
                <TouchableOpacity
                    style={{ position: 'absolute', left: 24 }}
                    onPress={navigation.goBack}
                >
                    <Image style={{}} source={theme.icons.arrow_left} />
                </TouchableOpacity>
                <Text
                    style={{ ...theme.texts.title_s, color: theme.colors.gray_1 }}
                >
                    {isEdited ? "Editar refeição" : "Nova refeição"}
                </Text>
            </View>

            <View style={styles.content}>
                <View style={styles.form}>
                    <Controller
                        name="name"
                        render={({ field: { onChange, value } }) =>
                            <Input
                                title="Nome"
                                value={value}
                                onChangeText={onChange}
                            />
                        }
                        control={control}
                    />

                    <Controller
                        name="description"
                        render={({ field: { onChange, value } }) =>
                            <Input
                                multiline
                                title="Descrição"
                                blurOnSubmit
                                value={value}
                                onChangeText={onChange}
                            />

                        }
                        control={control}
                    />


                    <View style={styles.row}>
                        <Controller
                            name="date"
                            render={({ field: { onChange, value } }) =>
                                <DateTimePicker
                                    style={{ flexGrow: 1 }}
                                    title="Data"
                                    value={value}
                                    onChange={(event, date) => onChange(date)}
                                />
                            }
                            control={control}
                        />

                        <Controller
                            name="date"
                            render={({ field: { onChange, value }, fieldState }) =>
                                <DateTimePicker
                                    style={{ flexGrow: 1 }}
                                    title="Hora"
                                    mode="time"
                                    error={fieldState.error?.message}
                                    value={value}
                                    onChange={(event, date) => onChange(date)}
                                />
                            }
                            control={control}
                        />

                    </View>

                    <View style={{ gap: 8 }}>
                        <Text style={styles.text}>Está dentro da dieta?</Text>

                        <Controller
                            name="diet"
                            render={({ field: { value, onChange } }) =>
                                <View style={styles.row}>
                                    <Select
                                        isSelected={value}
                                        title="Sim"
                                        onPress={() => onChange(true)}
                                        color={theme.colors.green_dark}
                                    />
                                    <Select
                                        isSelected={!value}
                                        title="Não"
                                        onPress={() => onChange(false)}
                                        color={theme.colors.red_dark}
                                    />
                                </View>
                            }
                            control={control}
                        />


                    </View>
                </View>
                <Button
                    title={isEdited ? "Salvar alterações" : "Cadastrar refeição"}
                    onPress={handleSubmit(onSubmit)}
                />
            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: theme.colors.gray_5
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
    }
})
import { Button } from "@/src/components/Button"
import { RootStackParamList } from "@/src/routes";
import { theme } from "@/src/theme"
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Image, StyleSheet, Text, View } from "react-native";

interface CreateOrEditMealProps extends NativeStackScreenProps<RootStackParamList, 'CreatedMeal'> { }


export function CreatedMeal({ navigation, route }: CreateOrEditMealProps) {
    const diet = route.params.diet;

    const options = {
        inDiet: {
            title: "Continue assim!",
            subtitle: "Você continua dentro da dieta. Muito bem!",
            image: theme.images.women_illustration
        },
        outDiet: {
            title: "Que pena!!",
            subtitle: "Você saiu da dieta dessa vez, mas continue se esforçando e não desista!",
            image: theme.images.man_illustration
        },
    }
    
    const data = diet ? options.inDiet : options.outDiet

    const styles = styling(diet)
    return (
        <View style={styles.container}>
            <View style={styles.titleWrapper}>
                <Text style={styles.title}>{data.title}</Text>
                <Text style={styles.subtitle}>{data.subtitle}</Text>
            </View>

            <Image source={data.image} />

            <Button
                title="Ir para a página inícial"
                style={{ width: '60%' }}
                onPress={() => navigation.navigate('Home')}
            />
        </View>
    )
}

const styling = (diet: boolean) => StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 38
    },
    titleWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8
    },
    title: {
        ...theme.texts.title_m,
        color: diet ? theme.colors.green_dark : theme.colors.red_dark
    },
    subtitle: {
        ...theme.texts.body_m,
        color: theme.colors.gray_1,
        textAlign: 'center'
    }
})
import { IMeal } from "@/src/models/Meal";
import { theme } from "@/src/theme";
import { StyleSheet, Text, View, TouchableOpacity, TouchableOpacityProps } from "react-native";

interface MealCardProps extends TouchableOpacityProps {
    data: IMeal
}


export function MealCard(props: MealCardProps) {
    const { data, ...rest } = props
    const styles = styling(data.diet)

    function hour(date: Date) {
        const hour = String(date.getHours()).padStart(2, '0')
        const minute = String(date.getMinutes()).padStart(2, '0')
        return `${hour}:${minute}`
    }

    return (
        <TouchableOpacity style={styles.container} {...rest}>
            <View style={styles.wrapper}>
                <Text style={styles.hour}>{hour(new Date(data.date))}</Text>
                <View style={styles.line} />
                <Text style={styles.description}>{data.name}</Text>
            </View>
            <View style={styles.statusBall} />
        </TouchableOpacity>
    )
}

const styling = (diet: boolean) => StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 12,
        paddingRight: 16,
        borderRadius: 6,
        minHeight: 50,
        borderWidth: 1,
        borderColor: theme.colors.gray_5,
    },
    wrapper: {
        gap: 12,
        flexDirection: 'row',
        alignItems: 'center'
    },
    line: {
        width: 1,
        height: 14,
        backgroundColor: theme.colors.gray_4,
        borderRadius: 14
    },
    hour: {
        ...theme.texts.body_sx,
        color: theme.colors.gray_1
    },
    description: {
        ...theme.texts.body_m,
        color: theme.colors.gray_1
    },
    statusBall: {
        width: 14,
        aspectRatio: 1,
        backgroundColor: diet ? theme.colors.green_mid : theme.colors.red_mid,
        borderRadius: 14
    }
})
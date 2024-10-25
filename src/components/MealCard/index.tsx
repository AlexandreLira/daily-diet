import { theme } from "@/src/theme";
import { StyleSheet, Text, View } from "react-native";

export function MealCard() {
    const styles = styling()
    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <Text style={styles.hour}>20:00</Text>
                <View style={styles.line} />
                <Text style={styles.description}>X-tudo</Text>
            </View>
            <View style={styles.statusBall} />
        </View>
    )
}

const styling = () => StyleSheet.create({
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
        width: 1, height: 14, backgroundColor: theme.colors.gray_4, borderRadius: 14
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
        backgroundColor: theme.colors.red_mid,
        borderRadius: 14
    }
})
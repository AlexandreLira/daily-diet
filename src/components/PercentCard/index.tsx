import { theme } from "@/src/theme"
import { Image, StyleSheet, Text, View, ViewProps } from "react-native"

interface PercentCardProps extends ViewProps {
    value: number;
}

export function PercentCard(props: PercentCardProps) {
    const { value } = props;

    const styles = styling()
    return (
        <View style={styles.card}>
            <Image
                source={theme.icons.arrow_up_right}
                style={styles.icon}
            />
            <Text style={styles.title}>
                {value}%
            </Text>
            <Text style={styles.label}>
                Das refeições dentro da dieta
            </Text>
        </View>
    )
}

const styling = () => StyleSheet.create({
    card: {
        borderRadius: 8,
        width: '100%',
        backgroundColor: theme.colors.green_light,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
        gap: 4
    },
    title: {
        ...theme.texts.title_g,
        color: theme.colors.gray_1
    },
    label: {
        ...theme.texts.body_s,
        color: theme.colors.gray_2
    },
    icon: {
        width: 24, aspectRatio: 1,
        position: 'absolute',
        right: 8,
        top: 8,
        tintColor: theme.colors.green_dark
    }
})
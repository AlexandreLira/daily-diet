import { theme } from "@/src/theme"
import { Image, StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View, ViewProps } from "react-native"

interface PercentCardProps extends TouchableOpacityProps {
    value: number;
}

export function PercentCard(props: PercentCardProps) {
    const { value, ...rest } = props;

    const styles = styling(value)
    return (
        <TouchableOpacity style={styles.card} {...rest}>
            <Image
                source={theme.icons.arrow_up_right}
                style={styles.icon}
            />
            <Text style={styles.title}>
                {value?.toFixed(2)}%
            </Text>
            <Text style={styles.label}>
                Das refeições dentro da dieta
            </Text>
        </TouchableOpacity>
    )
}

const styling = (porcetage: number) => StyleSheet.create({
    card: {
        borderRadius: 8,
        width: '100%',
        backgroundColor: porcetage > 50 ? theme.colors.green_light : theme.colors.red_light,
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
        tintColor: porcetage > 50 ? theme.colors.green_dark : theme.colors.red_dark,
    }
})
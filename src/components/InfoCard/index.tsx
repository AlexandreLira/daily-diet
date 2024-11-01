import { theme } from "@/src/theme"
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from "react-native"

interface InfoCardProps extends TouchableOpacityProps {
    value: number;
    label: string;
    bg?: string
}

export function InfoCard(props: InfoCardProps) {
    const { value, label, bg, ...rest } = props;

    const styles = styling(bg)
    return (
        <TouchableOpacity style={styles.card} {...rest}>
            <Text style={styles.title}>
                {value}
            </Text>
            <Text style={styles.label}>
                {label}
            </Text>
        </TouchableOpacity>
    )
}

const styling = (bg?: string) => StyleSheet.create({
    card: {
        borderRadius: 8,
        backgroundColor: bg || theme.colors.gray_6,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        gap: 4,
        flexShrink: 1,
    },
    title: {
        ...theme.texts.title_m,
        color: theme.colors.gray_1
    },
    label: {
        ...theme.texts.body_s,
        color: theme.colors.gray_2,
        flexShrink: 1,
        textAlign: 'center'
    },
    icon: {
        width: 24, aspectRatio: 1,
        position: 'absolute',
        right: 8,
        top: 8,
        tintColor: theme.colors.green_dark
    }
})
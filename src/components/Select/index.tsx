import { theme } from "@/src/theme";
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";

interface SelectProps extends TouchableOpacityProps {
    isSelected?: boolean;
    title: string;
    color?: string;

}

export function Select(props: SelectProps) {
    const {
        title,
        isSelected = false,
        color = theme.colors.green_dark,
        ...rest
    } = props;

    const styles = styling({
        isSelected,
        color
    })

    return (
        <TouchableOpacity style={styles.container} {...rest}>
            <View style={styles.statusBall} />
            <Text style={{ ...theme.texts.title_sx, color: theme.colors.gray_1 }}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}

const styling = (values: Pick<SelectProps, 'color' | 'isSelected'>) => StyleSheet.create({
    container: {
        minHeight: 50,
        flex: 1,
        backgroundColor: values.isSelected ? values.color + '20' : theme.colors.gray_6,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 8,
        borderColor: values.color,
        borderWidth: values.isSelected ? 1 : 0

    },
    statusBall: {
        width: 8,
        aspectRatio: 1,
        backgroundColor: values.color,
        borderRadius: 8
    }
})
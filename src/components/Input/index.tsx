import { theme } from "@/src/theme";
import { StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

interface InputProps extends TextInputProps {
    title: string;
    error?: string;
}

export function Input(props: InputProps) {
    const { title, multiline, style, error, ...rest } = props
    const animation = useSharedValue(0)

    const styleAnimdated = useAnimatedStyle(() => ({
        borderColor: interpolateColor(animation.value, [0, 100], [theme.colors.gray_5, theme.colors.gray_1]),
        height: multiline ? 120 : 48
    }))

    const handleBlur = () => {
        animation.value = withTiming(0)
    }

    const handleFocus = () => {
        animation.value = withTiming(100)
    }

    return (

        <View style={[styles.container, style]}>
            <Text style={styles.label}>{title}</Text>
            <Animated.View style={[styles.content, styleAnimdated]}>
                <TextInput
                    {...rest}
                    multiline={multiline}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                    cursorColor={theme.colors.gray_1}
                    selectionHandleColor={theme.colors.gray_1}
                    selectionColor={theme.colors.gray_1}
                    style={styles.input}
                />

                {error &&
                    <Text>{error}</Text>
                }
            </Animated.View>

        </View>

    )
}


export const styles = StyleSheet.create({
    container: {
        gap: 4,
    },
    content: {
        borderWidth: 1,
        minHeight: 48,
        borderRadius: 6,

        width: '100%',
    },
    label: {
        ...theme.texts.title_sx,
        color: theme.colors.gray_2
    },
    input: {
        flex: 1,
        padding: 14,
        color: theme.colors.gray_1,


    },

})
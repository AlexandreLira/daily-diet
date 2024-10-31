import { theme } from "@/src/theme";
import { StyleSheet, Text, View, ViewStyle } from "react-native";
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import RNDateTimePicker, { AndroidNativeProps, IOSNativeProps } from '@react-native-community/datetimepicker';
import { FC } from "react";


type DateTimePickerProps = AndroidNativeProps & IOSNativeProps & {
    title: string;
    error?: string;
    style: ViewStyle
}

export function DateTimePicker(props: DateTimePickerProps) {
    const { title, style, error, ...rest } = props
    const animation = useSharedValue(0)

    const styleAnimdated = useAnimatedStyle(() => ({
        borderColor: interpolateColor(animation.value, [0, 100], [theme.colors.gray_5, theme.colors.gray_1]),
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
                <RNDateTimePicker
                    {...rest}

                    // cursorColor={theme.colors.gray_1}
                    // selectionHandleColor={theme.colors.gray_1}
                    // selectionColor={theme.colors.gray_1}
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
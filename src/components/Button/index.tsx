import { theme } from "@/src/theme";
import { Image, StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";

interface ButtonProps extends TouchableOpacityProps {
    icon?: keyof typeof theme.icons;
    title: string;
    outline?: boolean;
}

export function Button(props: ButtonProps) {
    const {
        icon,
        title,
        outline = false,
        style,
        ...rest
    } = props;

    const styles = styling(outline)
    return (
        <TouchableOpacity style={[styles.container, style]} {...rest}>
            {icon &&
                <Image
                    source={theme.icons[icon]}
                    style={styles.icon}
                />
            }
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    )
}

const styling = (outline: boolean) => StyleSheet.create({
    container: {
        backgroundColor: outline ? 'transparent' : theme.colors.gray_2,
        minHeight: 50,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 20,
        borderWidth: outline ? 1 : 0,
        borderColor: theme.colors.gray_1
    },
    text: {
        ...theme.texts.title_sx,
        color: outline ? theme.colors.gray_1 : theme.colors.white
    },
    icon: {
        width: 18,
        aspectRatio: 1,
        tintColor: outline ? theme.colors.gray_1 : theme.colors.white
    }
})
import { theme } from "@/src/theme";
import { Image, StyleSheet, Text, View } from "react-native";

interface ButtonProps {
    icon?: keyof typeof theme.icons;
    title: string;
}

export function Button(props: ButtonProps) {
    const { icon , title} = props
    return (
        <View style={styles.container}>
            {icon &&
                <Image
                    source={theme.icons[icon]}
                    style={styles.icon}
                />
            }
            <Text style={styles.text}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.gray_2,
        width: '100%',
        minHeight: 50,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 20
    },
    text: {
        ...theme.texts.title_sx,
        color: theme.colors.white
    },
    icon: {
        width: 18,
        aspectRatio: 1,
        tintColor: theme.colors.white
    }
})
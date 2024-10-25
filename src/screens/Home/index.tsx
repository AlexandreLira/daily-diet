import { PercentCard } from "@/src/components/PercentCard";
import { theme } from "@/src/theme";
import { images } from "@/src/theme/images";
import { PHOTO_URL } from "@/src/utils/constants";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export function Home() {
    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.header}>
                <Image source={images.logo} />
                <Image
                    source={{ uri: PHOTO_URL }}
                    style={styles.profile}
                />
            </View>

            <PercentCard
                value={90.86}
            />

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: theme.colors.gray_7,
        gap: 24
    },
    header: {
        flexDirection: 'row', justifyContent: 'space-between'
    },
    profile: {
        width: 40,
        aspectRatio: 1,
        borderWidth: 2,
        borderColor: theme.colors.gray_2,
        borderRadius: 999,
        resizeMode: 'contain'
    }
})
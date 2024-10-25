import { theme } from "@/src/theme";
import { Text, View } from "react-native";

export function Home() {
    return (
        <View style={{ flex: 1 }}>

            <View style={{
                borderWidth: 1,
                borderRadius: 6,
                borderColor: theme.colors.gray_5
            }}>

                <Text style={{ fontFamily: theme.fonts.bold, fontSize: 16 }}>
                    20:00
                </Text>

                <Text style={{ fontFamily: theme.fonts.regular, fontSize: 16 }}>
                    X-tudo
                </Text>

            </View>

        </View>
    )
}
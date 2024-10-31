import { theme } from "@/src/theme";
import { Modal, ModalProps, StyleSheet, Text, View } from "react-native";
import { Button } from "../Button";


interface AlertModalProps extends ModalProps {
    title: string;
    confirmText: string;
    cancelText: string;

    onConfirm?: () => void;
    onCancel?: () => void;
}

export function AlertModal(props: AlertModalProps) {

    const {
        title,
        confirmText = 'Sim',
        cancelText = "Não",
        onCancel = () => { },
        onConfirm = () => { },
        ...rest
    } = props;

    return (
        <Modal transparent={true} animationType="fade" {...rest}>
            <View style={styles.container}>
                <View style={styles.card}>
                    <Text style={styles.title}>
                        {title}
                    </Text>
                    <View style={styles.buttonWrapper}>

                        <Button
                            onPress={onCancel}
                            title={cancelText}
                            outline
                            style={styles.button}
                        />

                        <Button
                            onPress={onConfirm}
                            title={confirmText}
                            style={styles.button}
                        />

                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.gray_1 + '50',
        flex: 1,
        paddingHorizontal: 24,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    card: {
        backgroundColor: theme.colors.white,
        padding: 24,
        width: '100%',
        borderRadius: 8,
        gap: 32
    },
    title: {
        ...theme.texts.title_s,
        textAlign: 'center'
    },
    buttonWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12
    },
    button: {
        flexGrow: 1
    }
})
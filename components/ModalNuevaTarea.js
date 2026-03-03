import React from 'react';
import { Modal, View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function ModalNuevaTarea({ visible, onClose, onAdd, valorActual, onChangeText }) {
    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <View style={styles.modalFondo}>
                <View style={styles.modalContenido}>
                    <TextInput
                        style={styles.input}
                        placeholder="Nueva tarea"
                        value={valorActual}
                        onChangeText={onChangeText}
                    />
                    <View style={styles.botonesFila}>
                        <TouchableOpacity
                            style={[styles.boton, { backgroundColor: '#835656' }]}
                            onPress={onClose}
                        >
                            <Text style={styles.botonTexto}>Cancelar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.boton, { backgroundColor: '#00796B' }]}
                            onPress={onAdd}
                        >
                            <Text style={styles.botonTexto}>Añadir</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalFondo: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)', // Fondo oscuro transparente
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContenido: {
        backgroundColor: 'white',
        width: '85%',
        padding: 25,
        borderRadius: 20,
        elevation: 10,
    },
    input: {
        borderBottomWidth: 2,
        borderColor: '#00796B',
        padding: 10,
        marginBottom: 25,
        fontSize: 16,
    },
    botonesFila: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    boton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        minWidth: 100,
        alignItems: 'center',
    },
    botonTexto: {
        color: 'white',
        fontWeight: 'bold',
    },
});
import React, { useState } from 'react';
import { Modal, View, TextInput, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';

export default function ModalNuevaLista({ visible, onClose, onAdd }) {
    // Estado específico para una Lista
    const [formLista, setFormLista] = useState({
        titulo: "",
        descripcion: "",
        color: "#00796B", // Color por defecto
        tareas: [] // Inicializamos la lista de tareas vacía
    });

    const coloresDisponibles = [
        "#00796B", // Verde (Tu color principal)
        "#0EA5E9", // Azul
        "#F43F5E", // Rosa/Rojo
        "#8B5CF6", // Morado
        "#F59E0B", // Naranja
        "#10B981", // Verde Esmeralda
    ];

    const handleGuardar = () => {
        if (formLista.titulo.trim().length > 0) {
            onAdd(formLista);
            // Limpiamos el formulario para la próxima
            setFormLista({
                titulo: "",
                descripcion: "",
                color: "#00796B",
                tareas: []
            });
            onClose();
        }
    };

    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <View style={styles.modalFondo}>
                <View style={styles.modalContenido}>
                    <Text style={styles.modalTitulo}>Crear Nueva Lista</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Ej. Compras del súper, Proyecto de React..."
                        value={formLista.titulo}
                        onChangeText={(t) => setFormLista({ ...formLista, titulo: t })}
                    />

                    <TextInput
                        style={[styles.input, { height: 60, textAlignVertical: 'top' }]}
                        placeholder="Descripción o propósito de la lista (opcional)..."
                        multiline
                        value={formLista.descripcion}
                        onChangeText={(t) => setFormLista({ ...formLista, descripcion: t })}
                    />

                    <Text style={styles.label}>Elige un color para tu lista</Text>
                    <View style={styles.scrollContainer}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {coloresDisponibles.map(color => (
                                <TouchableOpacity
                                    key={color}
                                    style={[
                                        styles.colorCircle,
                                        { backgroundColor: color },
                                        formLista.color === color && styles.colorActivo
                                    ]}
                                    onPress={() => setFormLista({ ...formLista, color: color })}
                                />
                            ))}
                        </ScrollView>
                    </View>

                    <View style={styles.botonesFila}>
                        <TouchableOpacity
                            style={[styles.boton, { backgroundColor: '#835656' }]}
                            onPress={onClose}
                        >
                            <Text style={styles.botonTexto}>Cancelar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.boton, { backgroundColor: formLista.color, opacity: formLista.titulo ? 1 : 0.5 }]}
                            onPress={handleGuardar}
                            disabled={!formLista.titulo}
                        >
                            <Text style={styles.botonTexto}>Crear Lista</Text>
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
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContenido: {
        backgroundColor: 'white',
        width: '90%',
        padding: 20,
        borderRadius: 20,
        elevation: 10,
    },
    modalTitulo: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
    },
    input: {
        borderWidth: 1,
        borderColor: '#E0E0E0',
        backgroundColor: '#F9F9F9',
        padding: 12,
        borderRadius: 10,
        marginBottom: 15,
        fontSize: 15,
    },
    label: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#666',
        marginBottom: 8,
    },
    scrollContainer: {
        marginBottom: 20,
    },
    colorCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 15,
        borderWidth: 3,
        borderColor: 'transparent',
    },
    colorActivo: {
        borderColor: '#333', // Resalta el color seleccionado con un borde oscuro
    },
    botonesFila: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    boton: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        minWidth: 120,
        alignItems: 'center',
    },
    botonTexto: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
    },
});
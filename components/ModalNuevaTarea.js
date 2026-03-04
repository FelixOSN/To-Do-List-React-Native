import React, { useState } from 'react';
import { Modal, View, TextInput, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';

export default function ModalNuevaTarea({ visible, onClose, onAdd }) {
    // Manejamos el estado del formulario internamente aquí
    const [formTarea, setFormTarea] = useState({
        titulo: "",
        descripcion: "",
        deadline: "",
        priority: "Importante/No Urgente",
        tag: "Personal",
        subtareas: []
    });

    const categorias = ["Personal", "Project", "Work"];
    const prioridades = [
        "No Importante/No Urgente",
        "No Importante/Urgente",
        "Importante/No Urgente",
        "Importante/Urgente"
    ];

    const handleGuardar = () => {
        if (formTarea.titulo.trim().length > 0) {
            // Le pasamos todo el objeto formTarea a App.js
            onAdd(formTarea);
            // Limpiamos el formulario para la próxima vez
            setFormTarea({
                titulo: "", descripcion: "", deadline: "",
                priority: "Importante/No Urgente", tag: "Personal", subtareas: []
            });
            onClose();
        }
    };

    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <View style={styles.modalFondo}>
                <View style={styles.modalContenido}>
                    <Text style={styles.modalTitulo}>Añadir Tarea</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Título de la tarea..."
                        value={formTarea.titulo}
                        onChangeText={(t) => setFormTarea({ ...formTarea, titulo: t })}
                    />

                    <TextInput
                        style={[styles.input, { height: 60, textAlignVertical: 'top' }]}
                        placeholder="Descripción u observaciones..."
                        multiline
                        value={formTarea.descripcion}
                        onChangeText={(t) => setFormTarea({ ...formTarea, descripcion: t })}
                    />

                    <Text style={styles.label}>Categoría (Etiqueta)</Text>
                    <View style={styles.scrollContainer}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {categorias.map(cat => (
                                <TouchableOpacity
                                    key={cat}
                                    style={[styles.opcionBoton, formTarea.tag === cat && styles.opcionActivaCat]}
                                    onPress={() => setFormTarea({ ...formTarea, tag: cat })}
                                >
                                    <Text style={[styles.opcionTexto, formTarea.tag === cat && styles.opcionTextoActivo]}>{cat}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>

                    <Text style={styles.label}>Prioridad (Matriz Eisenhower)</Text>
                    <View style={styles.scrollContainer}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                            {prioridades.map(pri => (
                                <TouchableOpacity
                                    key={pri}
                                    style={[styles.opcionBoton, formTarea.priority === pri && styles.opcionActivaPri]}
                                    onPress={() => setFormTarea({ ...formTarea, priority: pri })}
                                >
                                    <Text style={[styles.opcionTexto, formTarea.priority === pri && styles.opcionTextoActivo]}>{pri}</Text>
                                </TouchableOpacity>
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
                            style={[styles.boton, { backgroundColor: '#00796B', opacity: formTarea.titulo ? 1 : 0.5 }]}
                            onPress={handleGuardar}
                            disabled={!formTarea.titulo}
                        >
                            <Text style={styles.botonTexto}>Guardar Tarea</Text>
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
        color: '#00796B',
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
        marginBottom: 15,
    },
    opcionBoton: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        backgroundColor: '#F0F0F0',
        borderRadius: 20,
        marginRight: 10,
        borderWidth: 1,
        borderColor: 'transparent',
    },
    opcionActivaCat: {
        backgroundColor: '#0EA5E9', // Color para categorías activas
        borderColor: '#0284C7',
    },
    opcionActivaPri: {
        backgroundColor: '#F43F5E', // Color para prioridades activas
        borderColor: '#E11D48',
    },
    opcionTexto: {
        color: '#555',
        fontSize: 13,
        fontWeight: '500',
    },
    opcionTextoActivo: {
        color: '#FFFFFF',
        fontWeight: 'bold',
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
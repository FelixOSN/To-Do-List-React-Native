import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';


// Componente para representar cada tarea
const TaskItem = ({ text, completed }) => (
  <View style={styles.taskCard}>
    <View style={[styles.checkbox, completed && styles.checkboxCompleted]}>
      {completed && <Ionicons name="checkmark" size={16} color="white" />}
    </View>
    <Text style={[styles.taskText, completed && styles.taskTextDone]}>
      {text}
    </Text>
  </View>
);

export default function App() {
  //fechas
  const fecha = () => {
    const opciones = { weekday: 'long', day: 'numeric', month: 'long' };
    const hoy = new Date();
    return hoy.toLocaleDateString('en-US', opciones);
  };

//Estads para almacenar tareas
const [tareas, setTareas] = useState([
  { id: '1', texto: 'Tarea 1', completada: false },
  { id: '2', texto: 'Tarea 2', completada: true },
  { id: '3', texto: 'Tarea 3', completada: false },
]);

// Estado para el modal
const [estaVisible, setEstaVisible] = useState(false);
const [nuevoTexto, setNuevoTexto] = useState('');

// Función para añadir (El show en acción)
const addTask = (text) => {
  const newTask = { id: Date.now().toString(), texto: text, completada: false };
  setTareas([...tareas, newTask]); // "Copia las que había y añade la nueva"
};

// Modal
const guardarTarea = () => {
    if (nuevoTexto.trim().length > 0) {
      const nuevaTarea = { 
        id: Date.now().toString(), 
        texto: nuevoTexto, 
        completada: false 
      };
      setTareas([...tareas, nuevaTarea]);
      setNuevoTexto(''); // Limpia el buscador
      setEstaVisible(false); // Cierra la ventana
    }
  };

const deleteTask = (id) => {
  setTareas(tareas.filter((task) => task.id !== id));
};

const toggleTask = (id) => {
  const nuevasTareas = tareas.map(item => {
    if (item.id === id) {
      return { ...item, completada: !item.completada };
    }
    return item;
  });
  setTareas(nuevasTareas);
};

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />

      <View style={styles.cabecera}>
      <View>
        <Text style={styles.titulo}>To-Do List</Text>
        <Text style={styles.fecha}>{fecha()}</Text>
      </View>
        <TouchableOpacity 
        style={styles.addtask}
        onPress={() => setEstaVisible(true)} // <--- Llama a la función
        >
          <Text style={styles.addtasktext}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.contenido}>
        <FlatList
          data={tareas}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.contenedorTarea}>
            <TouchableOpacity 
              style={{ flex: 1 }} 
              onPress={() => toggleTask(item.id)}
            >
              <TaskItem text={item.texto} completed={item.completada} />
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={() => deleteTask(item.id)}
              style={styles.botonBorrar}
            >
              <Ionicons name="trash-outline" size={22} color="#835656" />
            </TouchableOpacity>
          </View>
          )}
          contentContainerStyle={{ padding: 20 }}
        />
      </View>

      <Modal visible={estaVisible} animationType="slide" transparent={true}>
        <View style={styles.modalFondo}>
          <View style={styles.modalContenido}>
            <TextInput
              style={styles.input}
              placeholder="Nueva tarea"
              value={nuevoTexto}
              onChangeText={setNuevoTexto}
            />
            <View style={styles.botonesFila}>
              <TouchableOpacity 
                style={[styles.boton, { backgroundColor: '#835656' }]} 
                onPress={() => setEstaVisible(false)}
              >
                <Text style={styles.botonTexto}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.boton, { backgroundColor: '#00796B' }]} 
                onPress={guardarTarea}
              >
                <Text style={styles.botonTexto}>Añadir</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F7FA',
  },
  cabecera: {
    height: '25%',
    justifyContent: 'center',
    paddingHorizontal: 25,
    flexDirection: 'row', // Alinea los elementos en fila
    alignItems: 'center', // Centra los elementos verticalmente
    justifyContent: 'space-between', // Espacio entre los elementos
  },
  contenido: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingTop: 20,
  },
  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#00796B',
  },
  fecha: {
    fontSize: 18,
    color: '#607D8B',
    marginTop: 5,
  },
  addtask: {
    backgroundColor: '#FFFF',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    
  },
  addtasktext: {
    fontSize: 30,
    color: '#00796B',
  },  
  cards:{
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
    marginHorizontal: 20,
    elevation: 3,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  taskCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#00796B',
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxCompleted: {
    backgroundColor: '#00796B',
  },
  taskText: {
    fontSize: 16,
    color: '#333',
  },
  taskTextDone: {
    textDecorationLine: 'line-through',
    color: '#AAA',
  },
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
  modalTitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
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
  contenedorTarea: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 15, // Espacio para que el icono no pegue al borde
  },
  botonBorrar: {
    marginLeft: 10,
    padding: 10, // Padding para que sea más fácil de tocar con el dedo
    justifyContent: 'center',
    alignItems: 'center',
  },

});

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Modal, TextInput, Button, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';

// --- NUESTRO COMPONENTE DE MODAL (IMPORTADO) --- 1HLyVSaPwxgHF7xu
import ModalNuevaTarea from './components/ModalNuevaTarea';
import ModalNuevaLista from './components/ModalNuevaLista';


// Componente para representar cada tarea
const TaskItem = ({ text, completed }) => (// funcion flecha que recibe dos parámetros text y completed
  <View style={styles.taskCard}>
    <View style={[styles.checkbox, completed && styles.checkboxCompleted]}>
      {completed && <Ionicons name="checkmark" size={96} color="white" />}
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
  const [tareas, setTareas] = useState([]);
  const [listas, setListas] = useState([]);

  // Lista que el usuario tiene seleccionada (por defecto 'Todas')
  const [listaSeleccionada, setListaSeleccionada] = useState('Todas');

  // Estado para el modal
  const [estaVisible, setEstaVisible] = useState("");
  const [nuevoTexto, setNuevoTexto] = useState('');

  // Estado para la barra de navegación inferior
  const [tabActivo, setTabActivo] = useState('Chats');

  // Modal
  const guardarTarea = (datosExtra = null) => {
    // 1. Si viene desde ModalNuevaTarea (datosExtra es un objeto con titulo, descripcion, etc.)
    const nuevaTarea = {
      id: Date.now().toString(),
      texto: datosExtra.titulo, // Guardamos el titulo como 'texto' para no romper tu FlatList
      descripcion: datosExtra.descripcion,
      deadline: datosExtra.deadline,
      prioridad: datosExtra.priority,
      categoria: datosExtra.tag,
      completada: false
    };
    setTareas([...tareas, nuevaTarea]);//
    setEstaVisible(""); // Cierra la ventana
  };

  const guardarLista = (info = null) => {
    // 1. Si viene desde ModalNuevaLista (datosExtra es un objeto con titulo, descripcion, etc.)
    const nuevaLista = {
      id: Date.now().toString(),
      titulo: info.titulo, // Guardamos el titulo como 'texto' para no romper tu FlatList
      descripcion: info.descripcion,
      color: info.color,
    };
    setListas([...listas, nuevaLista]);//
    setEstaVisible(""); // Cierra la ventana
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

  // --- PASO 1: CARGAR DATOS AL INICIAR ---
  useEffect(() => {
    const cargarTareas = async () => {
      try {
        const tareasGuardadas = await AsyncStorage.getItem('mis_tareas');
        if (tareasGuardadas !== null) {
          setTareas(JSON.parse(tareasGuardadas));
        }
      } catch (e) {
        console.error("Error cargando tareas", e);
      }
    };
    cargarTareas();
  }, []);

  // --- PASO 2: GUARDAR CADA VEZ QUE CAMBIEN ---
  useEffect(() => {
    const guardarTareas = async () => {
      try {
        await AsyncStorage.setItem('mis_tareas', JSON.stringify(tareas));
      } catch (e) {
        console.error("Error guardando tareas", e);
      }
    };
    guardarTareas();
  }, [tareas]); // Se ejecuta cada vez que 'tareas' cambie



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
          onPress={() => setEstaVisible("tarea")} // <--- Llama a la función
        >
          <Text style={styles.addtasktext}>+</Text>
        </TouchableOpacity>

      </View>

      <View style={styles.cabecera2}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.listaCategorias}
        >
          <TouchableOpacity
            style={[styles.tabBoton, listaSeleccionada === 'Todas' && styles.tabBotonActivo]}
            onPress={() => setListaSeleccionada('Todas')}
          >
            <Text style={[styles.tabTexto, listaSeleccionada === 'Todas' && styles.tabTextoActivo]}>Todas</Text>
          </TouchableOpacity>

          {/* Mapeando el array de listas */}
          {listas.map((lista) => (
            <TouchableOpacity
              key={lista.id}
              style={[
                styles.tabBoton,
                listaSeleccionada === lista.id && styles.tabBotonActivo,
                { borderColor: lista.color, borderWidth: listaSeleccionada === lista.id ? 0 : 1 }
              ]}
              onPress={() => setListaSeleccionada(lista.id)}
            >
              <Text style={[
                styles.tabTexto,
                listaSeleccionada === lista.id && styles.tabTextoActivo,
                listaSeleccionada !== lista.id && { color: lista.color }
              ]}>
                {lista.titulo}
              </Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.tabBoton} onPress={() => setEstaVisible("lista")}>
            <Text style={styles.tabTexto}>+ New List</Text>
          </TouchableOpacity>
        </ScrollView>
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
          contentContainerStyle={{ padding: 20, paddingBottom: 100 }} // Espacio extra abajo para que no tape la barra
        />
      </View>

      {/* --- BARRA DE NAVEGACIÓN INFERIOR (ESTILO TELEGRAM) --- */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={[styles.navItem, tabActivo === 'Chats' && styles.navItemActivo]}
          onPress={() => setTabActivo('Chats')}
        >
          <MaterialIcons name="checklist" size={24} color={tabActivo === 'Chats' ? '#00796B' : '#888'} />
          <Text style={[styles.navText, tabActivo === 'Chats' && styles.navTextActivo]}>To-Do</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navItem, tabActivo === 'Contacts' && styles.navItemActivo]}
          onPress={() => setTabActivo('Contacts')}
        >
          <AntDesign name="border-inner" size={24} color={tabActivo === 'Contacts' ? '#00796B' : '#888'} />
          <Text style={[styles.navText, tabActivo === 'Contacts' && styles.navTextActivo]}>Eisenhower</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navItem, tabActivo === 'Settings' && styles.navItemActivo]}
          onPress={() => setTabActivo('Settings')}
        >
          <MaterialCommunityIcons name="alarm-check" size={24} color={tabActivo === 'Settings' ? '#00796B' : '#888'} />
          <Text style={[styles.navText, tabActivo === 'Settings' && styles.navTextActivo]}>Pomodoro </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navItem, tabActivo === 'Profile' && styles.navItemActivo]}
          onPress={() => setTabActivo('Profile')}
        >
          <FontAwesome5 name="calendar-alt" size={24} color={tabActivo === 'Profile' ? '#00796B' : '#888'} />
          <Text style={[styles.navText, tabActivo === 'Profile' && styles.navTextActivo]}>Calendar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navItem, tabActivo === 'SettingsTab' && styles.navItemActivo]}
          onPress={() => setTabActivo('SettingsTab')}
        >
          <Ionicons name="settings" size={24} color={tabActivo === 'SettingsTab' ? '#00796B' : '#888'} />
          <Text style={[styles.navText, tabActivo === 'SettingsTab' && styles.navTextActivo]}>Settings</Text>
        </TouchableOpacity>
      </View>

      <ModalNuevaTarea
        visible={estaVisible === "tarea"}
        onClose={() => setEstaVisible("")}
        onAdd={guardarTarea}
      />

      <ModalNuevaLista
        visible={estaVisible === "lista"}
        onClose={() => setEstaVisible("")}
        onAdd={guardarLista}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F7FA',
  },
  cabecera: {
    paddingTop: 60, // Espacio para la barra de estado superior
    paddingBottom: 20, // Espacio inferior natural en lugar de un alto fijo
    paddingHorizontal: 25,
    flexDirection: 'row', // Alinea los elementos en fila
    alignItems: 'center', // Centra los elementos verticalmente
    justifyContent: 'space-between', // Espacio entre los elementos
  },
  cabecera2: {
    paddingVertical: 10, // Un poco de espacio arriba y abajo
    paddingLeft: 0,
  },
  listaCategorias: {
    paddingRight: 25, // Para que haya un margen al hacer scroll hasta el final
    paddingLeft: 25,
    alignItems: 'center',
  },
  tabBoton: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 20,
    backgroundColor: '#B2DFDB', // Color inactivo
    marginRight: 10, // Espacio entre cada botón
  },
  tabBotonActivo: {
    backgroundColor: '#00796B', // Color activo
  },
  tabTexto: {
    fontSize: 14,
    color: '#00796B',
    fontWeight: 'bold',
  },
  tabTextoActivo: {
    color: '#FFFFFF',
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
  cards: {
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
  taskTextDone: {
    textDecorationLine: 'line-through',
    color: '#AAA',
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
  // --- ESTILOS DE BARRA DE NAVEGACIÓN ---
  bottomNav: {
    position: 'absolute',
    bottom: 25, // Flota un poco por encima del borde inferior
    left: 10, // Ampliado para dejar más espacio interno
    right: 10, // Ampliado
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 5, // Reducido el borde interno general
    borderRadius: 35, // Curvatura pronunciada tipo Telegram
    elevation: 10, // Sombra en Android
    shadowColor: '#000', // Sombra en iOS
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
  navItem: {
    flex: 1, // Fuerza a que cada uno de los 5 botones mida exactamente lo mismo
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 2, // Reducido para que no empujen hacia los lados
    borderRadius: 25,
  },
  navItemActivo: {
    backgroundColor: '#E0F2F1', // Píldora de color de fondo al estar activo
  },
  navText: {
    fontSize: 10, // Reducido para que quepa una palabra larga como "Eisenhower"
    color: '#888',
    marginTop: 4,
    fontWeight: '500',
    textAlign: 'center',
  },
  navTextActivo: {
    color: '#00796B',
    fontWeight: 'bold',
  },
});

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';

export default function App() {


  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.cabecera}>
      <View>
        <Text style={styles.titulo}>To-Do List</Text>
        <Text style={styles.fecha}>Friday</Text>
      </View>

        <TouchableOpacity style={styles.addtask}>
          <Text style={styles.addtasktext}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.contenido}>
        <Text>Cargando </Text>

      </View>
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
  }

});

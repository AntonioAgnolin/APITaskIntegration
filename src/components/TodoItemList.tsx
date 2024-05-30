import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, Alert, Button, TextInput } from 'react-native';
import axios from 'axios';
import { useIsFocused, useFocusEffect } from '@react-navigation/native';
import TodoItemType from '../types/TodoItem';
import TodoItem from '../components/TodoItem';

type TodoItemProps = {
  onDelete: (item: TodoItemType) => void;
  onEdit: (item: TodoItemType) => void;
};

const TodoItemList = ({ onDelete, onEdit }: TodoItemProps) => {
  const [tasks, setTasks] = useState<TodoItemType[]>([]);
  const [novoTituloTarefa, setNovoTituloTarefa] = useState('');
  const isFocused = useIsFocused();

  const fetchTasks = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:3000/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível buscar as tarefas');
    }
  }, []);

  useEffect(() => {
    if (isFocused) {
      fetchTasks();
    }
  }, [isFocused, fetchTasks]);

  useFocusEffect( // Realiza a chamada para /tasks toda vez que a tela for carregada
    useCallback(() => {
      fetchTasks();
    }, [fetchTasks])
  );

  const handleDelete = useCallback(async (item: TodoItemType) => {
    try {
      await axios.delete(`http://localhost:3000/tasks/${item.id}`);
      fetchTasks();
      onDelete(item);
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível excluir a tarefa');
    }
  }, [fetchTasks, onDelete]);

  const handleEdit = useCallback(async (item: TodoItemType) => {
    try {
      await axios.put(`http://localhost:3000/tasks/${item.id}`, item);
      fetchTasks();
      onEdit(item);
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível editar a tarefa');
    }
  }, [fetchTasks, onEdit]);

  const adicionarTarefa = async (titulo: string) => {
    try {
      const response = await axios.post('http://localhost:3000/tasks', { title: titulo });
      fetchTasks(); // Atualiza a lista após adicionar
      setNovoTituloTarefa(''); // Limpa o campo de entrada
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível adicionar a tarefa');
    }
  };

  return (
    <View>
      <TextInput
        value={novoTituloTarefa}
        onChangeText={setNovoTituloTarefa}
        placeholder="Digite o título da tarefa"
      />
      <Button title="Adicionar Tarefa" onPress={() => adicionarTarefa(novoTituloTarefa)} />
      <FlatList
        style={{ width: '100%' }}
        data={tasks}
        renderItem={({ item }) => (
          <TodoItem todoItem={item} onDelete={() => handleDelete(item)} onEdit={() => handleEdit(item)} />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ gap: 5, marginTop: 5 }}
        ListFooterComponent={<View style={{ height: 20 }} />}
      />
    </View>
  );
};

export default React.memo(TodoItemList);

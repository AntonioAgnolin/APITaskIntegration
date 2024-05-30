import React from 'react'
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from '@react-navigation/native-stack'
import SquirtleScreen from '../screens/SquirtleScreen'
import PokemonScreen from '../screens/PokemonScreen'
import TodoListScreen from '../screens/TodoListScreen'
import LoginScreen from '../screens/LoginScreen'
import { useAsyncStorage } from '../hooks/useAsyncStorage'
import { loginTokenKey } from '../utils/constants'

// Tipagem para as rotas do Squirtle e Pokemon, com parmâmetros

export type PokemonStackParamList = {
  Squirtle: undefined
  Pokemon: {
    pokemon?: string
  }
}

const PokemonStack = createNativeStackNavigator<PokemonStackParamList>()

const pokemonScreenOptionStyle: NativeStackNavigationOptions = {
  headerStyle: {
    backgroundColor: '#007bff',
  },
  headerTintColor: 'white',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  headerTitleAlign: 'center',
}

// Main stack, rotas do Squirtle e Pokemon

const MainStackNavigator = () => {
  return (
    <PokemonStack.Navigator screenOptions={pokemonScreenOptionStyle}>
      <PokemonStack.Screen
        name="Squirtle"
        component={SquirtleScreen}
        options={{ title: 'Squirtle' }}
      />
      <PokemonStack.Screen
        name="Pokemon"
        component={PokemonScreen}
        options={({ route }) => ({ title: route.params.pokemon })}
      />
    </PokemonStack.Navigator>
  )
}

// Tipagem para as rotas da TodoList

export type ToDoStackParamList = {
  TodoList: undefined
  Login: { setToken: (token: string) => void }
}

const TodoStack = createNativeStackNavigator<ToDoStackParamList>()

const todoScreenOptionStyle: NativeStackNavigationOptions = {
  headerStyle: {
    backgroundColor: 'dimgrey',
  },
  headerTintColor: 'white',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  headerTitleAlign: 'center',
}

// TodoList Stack, rotas daTodoList

const ToDoListStackNavigator = () => {
  const [token, setToken] = useAsyncStorage<string>(loginTokenKey, '')

  return (
    <TodoStack.Navigator screenOptions={todoScreenOptionStyle}>
      {token == '' ? (
        <TodoStack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
          initialParams={{ setToken }}
        />
      ) : (
        <TodoStack.Screen
          name="TodoList"
          options={{ title: 'Todo List' }}
          component={TodoListScreen}
        />
      )}
    </TodoStack.Navigator>
  )
}

export { MainStackNavigator, ToDoListStackNavigator }

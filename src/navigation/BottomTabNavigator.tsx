import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AntDesign } from '@expo/vector-icons'
import { MainStackNavigator, ToDoListStackNavigator } from './StackNavigator'

export type TabParamList = {
  HomeTab: undefined
  TodoListTab: undefined
}

const Tab = createBottomTabNavigator<TabParamList>()

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      screenOptions={({ route }) => ({
        headerShown: false,
        // Customiza ícones da tab bar
        tabBarIcon: ({ color, size }) => {
          // Nomes dos ícones do ant design, disponíveis em: https://icons.expo.fyi/
          let iconName: 'home' | 'form' | undefined

          // Caso o nome da rota seja 'HomeTab', o ícone será 'home'
          if (route.name === 'HomeTab') {
            iconName = 'home'
          }

          if (route.name === 'TodoListTab') {
            iconName = 'form'
          }

          return <AntDesign name={iconName} size={size} color={color} />
        },
        tabBarStyle: {
          paddingBottom: 5,
        },
      })}
    >
      <Tab.Screen
        name="HomeTab"
        options={{ title: 'Squirtle' }}
        component={MainStackNavigator}
      />
      <Tab.Screen
        name="TodoListTab"
        options={{ title: 'Todo' }}
        component={ToDoListStackNavigator}
      />
    </Tab.Navigator>
  )
}

export default BottomTabNavigator

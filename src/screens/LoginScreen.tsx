import React from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ToDoStackParamList } from '../navigation/StackNavigator'

const LoginScreen = ({
  route,
}: NativeStackScreenProps<ToDoStackParamList, 'Login'>) => {
  const [user, setUser] = React.useState('')
  const [password, setPassword] = React.useState('')
  const { setToken } = route.params

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Usuário"
        placeholderTextColor="#888"
        onChangeText={setUser}
        value={user}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#888"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => setToken(user + password)}
      >
        <Text style={styles.buttonText}>Logar</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    color: '#333',
    marginBottom: 40,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#f0f0f0',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 18,
    color: '#333',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  button: {
    width: '100%',
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2196F3',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
  },
})

export default LoginScreen

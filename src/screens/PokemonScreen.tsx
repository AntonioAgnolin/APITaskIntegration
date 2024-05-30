import React from 'react'
import { View, Image, StyleSheet, ActivityIndicator } from 'react-native'
import { Pokemon } from '../types/pokeapi/pokemon'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { PokemonStackParamList } from '../navigation/StackNavigator'

// Tipagem para as props da tela Pokemon, com as props de navegação 
type PokemonProps = NativeStackScreenProps<PokemonStackParamList, 'Pokemon'>

const PokemonScreen = ({ route }: PokemonProps) => {
  const { pokemon } = route.params
  const [pokemonData, setPokdemonData] = React.useState<Pokemon | null>(null)
  const [loading, setLoading] = React.useState(true)

  // Busca dados do Pokemon na API
  const fetchPokemonData = async () => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon?.toLowerCase()}`

    try {
      const response = await fetch(url)
      const data = await response.json()
      setPokdemonData(data)
    } catch (error) {
      console.error('Erro ao buscar dados do Pokemon:', error)
    } finally {
      setLoading(false)
    }
  }

  // Dispara a busca dos dados do Pokemon ao montar o componente
  React.useEffect(() => {
    fetchPokemonData()
  }, [])

  return (
    <View style={styles.container}>
      {loading && (
        <View>
          <ActivityIndicator size="large" color="#007bff" />
        </View>
      )}
      {pokemonData && (
        <Image
          style={styles.image}
          source={{ uri: pokemonData.sprites.front_default }}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 100,
  },
})

export default PokemonScreen

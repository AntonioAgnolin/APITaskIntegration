import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'


export const useAsyncStorage = <T>(
  key: string,
  initialValue: T
): [lsItem: T, setLsItem: (v: T) => void] => {
  const [localStorageState, setLocalStorageState] = React.useState<T>(initialValue)

  const getLsItem = async () => {
    try {
      const item = await AsyncStorage.getItem(key)
      const parsedItem = item ? JSON.parse(item) : initialValue
      setLocalStorageState(parsedItem)
    } catch (e) {
      console.log('getItem', e)
    }
  }

  const setLocalStorage = async (value: T) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value))
      setLocalStorageState(value)
    } catch (e) {
      console.log('setLocalStorage', e)
    }
  }

  React.useEffect(() => {
    getLsItem()
  }, [key])

  return [localStorageState, setLocalStorage]
}

import React from 'react'
import { View, Text, StyleSheet, ViewStyle, StyleProp } from 'react-native'

type CardProps = {
  title: string
  style?: StyleProp<ViewStyle>
  children: JSX.Element | Array<JSX.Element>
}

const Card = ({ title, style, children }: CardProps) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f4f4f4',
    marginBottom: 20,
    padding: 20,
    gap: 10,

    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.17,
    shadowRadius: 3.05,
    elevation: 4,
    borderRadius: 5,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 8,
    fontWeight: '800',
    alignSelf: 'flex-start',
  },
})

export default Card

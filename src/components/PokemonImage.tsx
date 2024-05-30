import React from 'react';
import { Image, StyleSheet } from 'react-native';

type PokemonImageProps = {
  uri: string,
  style?: React.CSSProperties
}

const PokemonImage = ({uri, style}: PokemonImageProps) => {
  return (
    <Image
      source={{
        uri,
      }}
      style={[styles.evolutionImage, style]}
    />
  );
};

export default PokemonImage;

const styles = StyleSheet.create({
  evolutionImage: {
    width: 150,
    height: 150,
    borderRadius: 40,
  },
});

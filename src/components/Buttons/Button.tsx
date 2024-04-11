import {Text, StyleSheet, Pressable} from 'react-native';
import React from 'react';

interface ButtonProps {
  onPress: () => void;
  text: string;
  type: 'PRIMARY' | 'FORGOT';
  bgColor?: string;
  fgColor?: string;
}

const Button: React.FC<ButtonProps> = ({
  onPress,
  text,
  type,
  bgColor,
  fgColor,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        styles[`container_${type}`],
        bgColor ? {backgroundColor: bgColor} : {},
      ]}>
      <Text style={[styles.text, fgColor ? {color: fgColor} : {}]}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    padding: 15,
    marginVertical: 15,
    marginHorizontal: 15,

    alignItems: 'center',
    borderRadius: 5,
  },
  container_PRIMARY: {
    backgroundColor: '#4CAF50',
  },
  container_FORGOT: {
    backgroundColor: 'white',
  },
  text: {
    fontWeight: 'bold',
    color: 'white',
  },
  text_FORGOT: {
    color: 'grey',
  },
});

export default Button;

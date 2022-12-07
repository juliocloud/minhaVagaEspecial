import React from 'react';
import { Text, Pressable } from 'react-native';
import { styles } from './styles';

export function MainButton(props){
     return(
          <Pressable style={styles.container}>
               <Text style={styles.title}>
                    { props.title }
               </Text>
          </Pressable>
     )
}
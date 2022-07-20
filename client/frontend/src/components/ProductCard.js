import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Card } from 'react-native-paper';
import { Feather } from '@expo/vector-icons';

const Button = ({ onPress, style, icon }) => (
  <TouchableOpacity style={style} onPress={onPress}>
    <Feather name={icon} size={24} />
  </TouchableOpacity>
)

export default function PostCardItem({ name, price, onEdit, onDelete }) {
// console.log(name)
  return (
    <Card style={styles.item}>
      <View style={styles.rowView}>
        
          <Text style={styles.name}>{name}</Text>
          <Text>Price: {price}</Text>
        
        {/* <View style={styles.rowView}>
          <Button
            onPress={onEdit}
            icon="edit"
            style={{color:"steelblue", marginHorizontal: 16 }} />
          <Button onPress={onDelete} icon='trash-2' />
        </View> */}
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
  rowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  item: {
    padding: 26,
    margin: 16,
    elevation: 4,
    borderRadius: 10
  },
  name: {
	fontWeight: 'bold',
	textTransform: 'capitalize',
    alignItems: 'center',
	color:"steelblue",
    fontSize: 25,
  },
})
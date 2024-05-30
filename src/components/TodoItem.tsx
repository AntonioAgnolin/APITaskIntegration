import { AntDesign } from '@expo/vector-icons'
import React from 'react'
import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import { Swipeable } from 'react-native-gesture-handler'
import TodoItemType from '../types/TodoItem'

const RightSwipeActions = ({
  item,
  onDelete,
  onEdit,
  progress,
}: {
  item: TodoItemType
  onDelete: (item: TodoItemType) => void
  onEdit: (item: TodoItemType) => void
  progress: Animated.AnimatedInterpolation<number>
}) => {
  const transform = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [20, 0],
  })

  return (
    <View style={{ flexDirection: 'row', width: 80 }}>
      <Animated.View
        style={{
          transform: [{ translateX: transform }],
        }}
      >
        <TouchableOpacity
          onPress={() => onEdit(item)}
          style={[
            styles.item,
            {
              backgroundColor: 'lightgreen',
            },
          ]}
        >
          <AntDesign name="edit" size={18} color="black" />
        </TouchableOpacity>
      </Animated.View>
      <Animated.View
        style={{
          transform: [{ translateX: transform }],
        }}
      >
        <TouchableOpacity
          onPress={() => onDelete(item)}
          style={[
            styles.item,
            {
              backgroundColor: 'lightcoral',
            },
          ]}
        >
          <AntDesign name="delete" size={18} color="black" />
        </TouchableOpacity>
      </Animated.View>
    </View>
  )
}

const TodoItem = ({
  todoItem,
  onDelete,
  onEdit,
}: {
  todoItem: TodoItemType
  onEdit: (item: TodoItemType) => void
  onDelete: (item: TodoItemType) => void
}) => {
  return (
    <Swipeable
      renderRightActions={(
        progressAnimatedValue: Animated.AnimatedInterpolation<string | number>
      ) => (
        <RightSwipeActions
          item={todoItem}
          onDelete={onDelete}
          onEdit={onEdit}
          progress={progressAnimatedValue}
        />
      )}
    >
      <View style={styles.item}>
        <Text style={styles.itemText} numberOfLines={1} selectable>
          {todoItem.description}
        </Text>
      </View>
    </Swipeable>
  )
}

const styles = StyleSheet.create({
  item: {
    borderColor: '#ccc',
    borderWidth: 1,
    backgroundColor: 'white',
    height: 40,
    padding: 10,
    borderRadius: 5,
  },
  itemText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
})

export default TodoItem

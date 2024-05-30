import React from 'react'
import {
  Modal as RNModal,
  Platform,
  Pressable,
  View,
  Text,
  KeyboardAvoidingView,
  StyleSheet,
} from 'react-native'
import { AntDesign } from '@expo/vector-icons'

type ModalProps = {
  modalVisible: boolean
  title: string
  onCloseModal: () => void
  children: JSX.Element | Array<JSX.Element>
}

const Modal = ({ modalVisible, title, onCloseModal, children }: ModalProps) => {
  return (
    <RNModal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={onCloseModal}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.centeredView}
      >
        <View style={styles.modalView}>
          <Pressable
            onPress={onCloseModal}
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: 40,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <AntDesign name="close" size={18} color="black" />
          </Pressable>
          <Text style={styles.modalText}>{title}</Text>

          {children}
        </View>
      </KeyboardAvoidingView>
    </RNModal>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  modalView: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    elevation: 5,
  },
  modalText: {
    marginBottom: 10,
    fontWeight: 'bold',
  },
})

export default Modal

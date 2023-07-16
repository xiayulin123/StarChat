import { useContext, useEffect, useLayoutEffect } from "react"
import {
  FlatList,
  ImageBackground,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native"
import { GlobalContext } from "../context"
import Messagecomponent from "../components/Messagecomponent"
import { socket } from "../utils/index"
import chatpng from '../assets/chat.jpeg'

export default function Messagescreen ({ navigation, route }) {
  const { currentGroupName, currentGroupID } = route.params
  const {
    allChatMessages,
    setAllChatMessages,
    currentUser,
    currentChatMessage,
    setCurrentChatMessage,
  } = useContext(GlobalContext)

  function handleAddNewMessage () {
    const timeData = {
      hr:
        new Date().getHours() < 10
          ? `0${new Date().getHours()}`
          : new Date().getHours(),
      mins:
        new Date().getMinutes() < 10
          ? `0${new Date().getMinutes()}`
          : new Date().getMinutes(),
    }

    if (currentUser) {
      socket.emit("newChatMessage", {
        currentChatMessage,
        groupIdentifier: currentGroupID,
        currentUser,
        timeData,
      })

      setCurrentChatMessage("")
      Keyboard.dismiss()
    }
  }


  useEffect(() => {
    socket.emit('findGroup', currentGroupID)
    socket.on('foundGroup', (allChats) => setAllChatMessages(allChats))
  }, [socket])


  return (
    <View style={styles.wrapper}>
      <ImageBackground source={chatpng} style={styles.homeImage}>
        <View
          style={[styles.wrapper, { paddingVertical: 15, paddingHorizontal: 10 }]}
        >
          {allChatMessages && allChatMessages[0] ? (
            <FlatList
              data={allChatMessages}
              renderItem={({ item }) => (
                <Messagecomponent item={item} currentUser={currentUser} />
              )}
              keyExtractor={(item) => item.id}
            />
          ) : (
            ""
          )}
        </View>
        <View style={styles.messageInputContainer}>

          <TextInput
            style={styles.messageInput}
            value={currentChatMessage}
            onChangeText={(value) => setCurrentChatMessage(value)}
            placeholder="Enter your message"
            placeholderTextColor='white'
          />

          <Pressable onPress={handleAddNewMessage} style={styles.button}>
            <View>
              <Text style={styles.buttonText}>SEND</Text>
            </View>
          </Pressable>

        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,


  },
  homeImage: {
    width: "100%",
    flex: 4,
    justifyContent: "center",
  },
  messageInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  messageInput: {
    flex: 1,
    marginRight: 10,
    height: 40,
    color: 'white'
  },
  button: {
    width: 60,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
})

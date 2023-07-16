import {
  Alert,
  ImageBackground,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native"
import homeImage from "../assets/star.jpg"
import { useContext, useEffect } from "react"
import { GlobalContext } from "../context"

export default function Homescreen ({ navigation }) {
  const {
    showLoginView,
    setShowLoginView,
    currentUserName,
    setCurrentUserName,
    currentUser,
    setCurrentUser,
    allUsers,
    setAllUsers,
  } = useContext(GlobalContext)

  function handleRegisterAndSignIn (isLogin) {
    if (currentUserName.trim() !== "") {
      const index = allUsers.findIndex(
        (userItem) => userItem === currentUserName
      )

      if (isLogin) {
        if (index === -1) {
          Alert.alert("Please register first")
        } else {
          setCurrentUser(currentUserName)
        }
      } else {
        if (index === -1) {
          allUsers.push(currentUserName)
          setAllUsers(allUsers)
          setCurrentUser(currentUserName)
        } else {
          Alert.alert("Already registered ! Please login")
        }
      }

      setCurrentUserName("")
    } else {
      Alert.alert("User name field is empty")
    }

    Keyboard.dismiss()
  }

  useEffect(() => {
    if (currentUser.trim() !== "") navigation.navigate("Chatscreen")
  }, [currentUser])

  console.log(allUsers, currentUser)

  return (
    <View style={styles.mainWrapper}>
      <ImageBackground source={homeImage} style={styles.homeImage}>
        <View style={styles.content}>
          {showLoginView ? (
            <View style={styles.infoBlock}>
              <View style={styles.loginInputContainer}>
                <Text style={styles.travelHeading}>Traveler, What's Your Name?</Text>
                <TextInput
                  autoCorrect={false}
                  placeholder="Enter your user name"
                  placeholderTextColor="white"
                  style={styles.loginInput}
                  onChangeText={(value) => setCurrentUserName(value)}
                  value={currentUserName}
                />
              </View>
              <View style={styles.buttonWrapper}>
                <Pressable
                  onPress={() => handleRegisterAndSignIn(false)}
                  style={styles.button}
                >
                  <View>
                    <Text style={styles.buttonText}>Register</Text>
                  </View>
                </Pressable>
                <Pressable
                  onPress={() => handleRegisterAndSignIn(true)}
                  style={styles.button}
                >
                  <View>
                    <Text style={styles.buttonText}>Login</Text>
                  </View>
                </Pressable>
              </View>
            </View>
          ) : (
            <View style={styles.infoBlock}>
              <Text style={styles.heading}>
                <Text style={styles.headingText}>Search of You</Text>{" "}
                <Text style={styles.starsText}>Across the Stars</Text>
              </Text>

              <Pressable
                style={styles.button}
                onPress={() => setShowLoginView(true)}
              >
                <View>
                  <Text style={styles.buttonText}>Travel</Text>
                </View>
              </Pressable>
            </View>
          )}
        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
  },
  homeImage: {
    width: "100%",
    flex: 3,
    justifyContent: "center",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0)"
  },
  infoBlock: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  travelHeading: {

    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,

  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },
  headingText: {
    color: "#fff",
    textShadowColor: "#000",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
  },
  starsText: {
    color: "rgba(81,73,225,1)",
    textShadowColor: "#000",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
  },
  userNameHeading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  subHeading: {
    fontSize: 15,
    color: "#acacac",
    marginBottom: 15,
  },
  loginInput: {
    borderRadius: 50,
    borderWidth: 1,
    alignSelf: "center",
    width: 250,
    color: 'white',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 8,
  },
  button: {
    backgroundColor: "black",
    padding: 15,
    marginVertical: 10,
    width: "34%",
    elevation: 1,
    borderRadius: 50,
  },
  buttonWrapper: {
    flexDirection: "row",
    gap: 10,
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
})

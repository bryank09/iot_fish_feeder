// import React, { useState, useEffect } from 'react'
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import { Text, View, StyleSheet, TextInput, TouchableOpacity, Dimensions, Image } from 'react-native';
// const { width, height } = Dimensions.get('window');
// import database from '@react-native-firebase/database';
// import auth from '@react-native-firebase/auth';

// import {
//   Colors,
// } from 'react-native/Libraries/NewAppScreen';

// function App(): JSX.Element {
//   const [state, setState] = useState({ email: '', password: '', });

//   // Set an initializing state whilst Firebase connects
//   const [initializing, setInitializing] = useState(true);
//   const [user, setUser] = useState();

//   // Handle user state changes
//   function onAuthStateChanged(user) {
//     setUser(user);
//     if (initializing) setInitializing(false);
//   }

//   useEffect(() => {
//     const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
//     return subscriber; // unsubscribe on unmount
//   }, []);

//   if (initializing) return null;

//   const onPressLogin = async () => {
//     try {
//       const { email, password } = state;
//       console.log(email, password);
//       await auth().signInWithEmailAndPassword(email, password);
//     } catch (error) {
//       console.error('Login failed:', error);
//     }
//   };

//   const onPressSignOut = async () => {
//     try {
//       await auth().signOut();
//     } catch (error) {
//       console.error('Sign out failed:' + error);
//     }
//   };

//   const onPressForgotPassword = () => {
//     // Do something about forgot password operation
//   };
//   const onPressSignUp = () => {
//     // Do something about signup operation
//   };
  
//   if (!user) {
//     return (
//       <View style={styles.container}>
//         <Image source={require('./logo.png')} />
//         {/* <Text style={styles.title}>AQUA CONNECT</Text> */}
//         <View style={styles.inputView}>
//           <TextInput style={styles.inputText}
//             placeholder="Email"
//             placeholderTextColor="#003f5c"
//             onChangeText={text => setState({ ...state, email: text })} />
//         </View>
//         <View style={styles.inputView}>
//           <TextInput style={styles.inputText}
//             secureTextEntry
//             placeholder="Password"
//             placeholderTextColor="#003f5c"
//             onChangeText={text => setState({ ...state, password: text })} />
//         </View>
//         <TouchableOpacity onPress={onPressForgotPassword}>
//           <Text style={styles.forgot}>Forgot Password?</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={onPressLogin} style={styles.loginBtn}>
//           <Text style={styles.loginText}>LOGIN </Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={onPressSignUp}>
//           <Text style={styles.inputText}>Signup</Text>
//         </TouchableOpacity>
//       </View>
//     )
//   }
//   return (
//     <View>
//       <Text>Welcome {user.email}</Text>
//       <TouchableOpacity onPress={onPressSignOut}>
//         <Text style={styles.inputText}>Signup</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#75b1f0',
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: height * 1,
//   },
//   title: {
//     fontWeight: "bold",
//     fontSize: 50,
//     color: "#fb5b5a",
//     marginBottom: 40,
//   },
//   inputView: {
//     width: "80%",
//     backgroundColor: "#FFFFFF",
//     borderRadius: 25,
//     height: 50,
//     marginBottom: 20,
//     justifyContent: "center",
//     padding: 20
//   },
//   inputText: {
//     height: 50,
//     color: "black"
//   },
//   forgotAndSignUpText: {
//     color: "white",
//     fontSize: 11
//   },
//   forgot: {
//     color: "#fb5b5a"
//   },
//   loginText: {
//     color: "white",
//   },
//   loginBtn: {
//     width: "80%",
//     backgroundColor: "#1c2ca5",
//     borderRadius: 25,
//     height: 50,
//     alignItems: "center",
//     justifyContent: "center",
//     marginTop: 40,
//     marginBottom: 10
//   },
// })

// export default App;
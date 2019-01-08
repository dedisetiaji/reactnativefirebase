import React from 'react'
import {View,Text} from 'react-native'
import { GoogleSignin,GoogleSigninButton } from 'react-native-google-signin';
import firebase from 'react-native-firebase'

// Calling this function will open Google for login.

class Login extends React.Component
{
    static navigationOptions = {
        header: null,
    };
    constructor(props)
    {
       super(props)
       this.state=
       {
           isDisabled:false,
       }
    }
    _signIn= async ()=>{
        
            try {
              // Add any configuration settings here:
              await GoogleSignin.configure();
          
              const data = await GoogleSignin.signIn();
          
              // create a new firebase credential with the token
              const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken)
              // login with credential
              const currentUser = await firebase.auth().signInWithCredential(credential);
          
            //   alert(JSON.stringify(currentUser.user.toJSON()));
            this.props.navigation.navigate("Form")
              
            } catch (e) {
              console.error(e);
              
            }
          
    }
    render()
    {
        return(
            <View style={{display:"flex",justifyContent:"center",alignItems:"center",flex:1}}>
            <Text>
                Please login using this button
            </Text>
            <GoogleSigninButton
            style={{ width: 312, height: 48 }}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={this._signIn}
            disabled={this.state.isDisabled}
            />
       </View>
        )
    }
}


export default Login
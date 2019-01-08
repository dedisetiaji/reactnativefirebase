import React from 'react'
import {View,Text,Button,TextInput,FlatList,TouchableNativeFeedback} from 'react-native'
import firebase from 'react-native-firebase'

class Form extends React.Component
{
    constructor()
    {
        super()
        this.state=
        {
            text:"",
            action:"add",
            id:"",
            data:[]
        }
    }
    componentDidMount()
    {
        itemsRef=firebase.database().ref("Text")
        itemsRef.on('value', (snap) => {
            var items = [];
            snap.forEach((child) => {
               
              items.push({
                id: child.key,
                text: child.val().text,
                
              });
            });
        
            this.setState({data: items });
          });
       
    }
    _action=()=>{
        let data=
        {
           text:this.state.text,
        }
        if(this.state.action=="add")
        {
            firebase.database().ref('Text').push(data).key;
        }
        else
        {
            firebase.database().ref('Text/'+this.state.id).update(data)
        }
        
    }
    _edit=(text,id)=>
    {
        this.setState({
            text:text,
            id:id,
            action:"update"
        })
    }
    render()
    {
        return(<View>
            <Text>FORM CRUD</Text>
            <TextInput 
                onChangeText={(text)=>this.setState({text:text})}
                style={{backgroundColor:"#fff",borderBottomColor:"#000",borderBottomWidth:1}}
                placeholder="Masukkan nama barang"
                value={this.state.text}
            />
            <Button
                title="SAVE"
                onPress={this._action}
            />
            <FlatList 
                 data={this.state.data}
                 keyExtractor={item=>String(item.id)}
                 renderItem={({item,id})=>
                    <View style={{flexDirection:"row",padding:5}}>
                       <TouchableNativeFeedback
                        onPress={()=>this._edit(item.text,item.id)}
                       >
                            <View style={{flex:1}}>
                                <Text>{id+1}{item.text}</Text>
                            </View>
                       </TouchableNativeFeedback> 
                    </View>
                }
            />

        </View>)
    }
}
export default Form
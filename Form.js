import React from 'react'
import {View,Text,Button,TextInput,FlatList,TouchableNativeFeedback,ToastAndroid} from 'react-native'
import firebase from 'react-native-firebase'

class Form extends React.Component
{
    static navigationOptions = {
        header: null,
    };
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
            ToastAndroid.show('Data is added!', ToastAndroid.SHORT);
        }
        else
        {
            firebase.database().ref('Text/'+this.state.id).update(data)
            ToastAndroid.show('Data is updated!', ToastAndroid.SHORT);
        }
        this.setState({
            text:""
        })
        
    }
    _edit=(text,id)=>
    {
        this.setState({
            text:text,
            id:id,
            action:"update"
        })
    }
    _hapus=(id)=>
    {
        firebase.database().ref('Text/'+id).remove()
        ToastAndroid.show('A data has been deleted!', ToastAndroid.SHORT);
    }
    render()
    {
        return(<View style={{padding:10}}>
            <Text>FORM CRUD</Text>
            <TextInput 
                onChangeText={(text)=>this.setState({text:text})}
                style={{backgroundColor:"#fff",borderColor:"#000",borderWidth:1}}
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
                 renderItem={({item,index})=>
                    <View style={{flexDirection:"row",padding:5}}>
                       <TouchableNativeFeedback
                        onPress={()=>this._edit(item.text,item.id)}
                       >
                            <View style={{flex:4}}>
                                <Text>{index+1} {item.text}</Text>
                            </View>
                        </TouchableNativeFeedback> 
                            <View style={{flex:1}}>
                                <Button 
                                    title="x"
                                    onPress={()=>this._hapus(item.id)}
                                    color="red"
                                />
                            </View>
                      
                    </View>
                }
            />

        </View>)
    }
}
export default Form
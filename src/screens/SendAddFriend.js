import React, { Component } from 'react';
import {View,StyleSheet} from 'react-native';
import { Container,Header,Title,Text, Content, Button, Icon ,Left,Body,Right,Item,Form,Label,Input} from 'native-base';
import NIM from 'react-native-netease-im';
import Toast from 'react-native-simple-toast';

export default class SendAddFriend extends Component {
    static navigatorStyle = {
        statusBarColor: '#fc513a',
        tabBarHidden: true,
        navBarBackgroundColor:"#fc513a",
        navBarButtonColor:"#fff",
        navBarTextColor:"#fff"
    };
    static navigatorButtons = {
        rightButtons:[{
            id:'ver-add',
            buttonColor:'#fff',
            title:'发送'
        }]
    };
    constructor(props) {
        super(props);
        this.state = {
            remark:  "我是"+props.user.name || ''
        };
        this.props.navigator.setOnNavigatorEvent(this._onNavigatorEvent.bind(this));
    }
    _onNavigatorEvent(event){

        if (event.type == 'NavBarButtonPress') {
            if (event.id == 'ver-add') {
                this.submit();
            }
        }
    }
    submit() {
        const {friendData={}} = this.props;
        if(!(/^[\u4e00-\u9fa5a-zA-Z0-9_]+$/).test(this.state.remark)){
            Toast.show('不能包含特殊字符');
            return;
        }
        NIM.addFriend(friendData.contactId,this.state.remark).then((res)=>{
            Toast.show('已发送请求');
            this.props.navigator.pop();
        },(err)=>{
            Toast.show(err);
        });

    }
    render() {
        return (
            <Container style={{backgroundColor:"#f7f7f7"}}>
                <Content>
                    <Form style={{backgroundColor:'#fff'}}>
                        <View style={{backgroundColor:"#f7f7f7",padding:12}}><Text note>你需要发送的请求,等对方通过</Text></View>
                        <Item inlineLabel last>
                            <Input
                                value={this.state.remark}
                                autoCapitalize="none"
                                autoCorrect={false}
                                clearButtonMode="while-editing"
                                onChangeText={remark => {
                                    this.setState({remark});
                                }}
                            />
                        </Item>
                    </Form>
                </Content>
            </Container>
        );
    }
}


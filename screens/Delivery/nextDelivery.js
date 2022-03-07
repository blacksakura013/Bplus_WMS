import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Dimensions,
    Text,
    View,
    Image,
    ImageBackground,
    TextInput,
    KeyboardAvoidingView,
    ActivityIndicator,
    Alert,
    Platform,
    BackHandler,
    StatusBar,

    ScrollView,
    TouchableNativeFeedback,
    TouchableOpacity,
} from 'react-native';

import CheckBox from '@react-native-community/checkbox';
import DeviceInfo from 'react-native-device-info';
import { NetworkInfo } from "react-native-network-info";
import FontAwesome from 'react-native-vector-icons/FontAwesome';


import { SafeAreaView } from 'react-native-safe-area-context';


import { useStateIfMounted } from 'use-state-if-mounted';


import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';


import { useSelector, connect, useDispatch } from 'react-redux';



import { Language, changeLanguage } from '../../translations/I18n';
import { FontSize } from '../../components/FontSizeHelper';


import * as loginActions from '../../src/actions/loginActions';
import * as registerActions from '../../src/actions/registerActions';
import * as databaseActions from '../../src/actions/databaseActions';

import Colors from '../../src/Colors';
import { borderColor, fontSize, fontWeight } from 'styled-system';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const nextDelivery = ({ route }) => {

    const dispatch = useDispatch();
    const navigation = useNavigation();

    const registerReducer = useSelector(({ registerReducer }) => registerReducer);
    const loginReducer = useSelector(({ loginReducer }) => loginReducer);
    const databaseReducer = useSelector(({ databaseReducer }) => databaseReducer);
    const {
        container2,
        container1,
        button,
        textButton,
        topImage,
        tabbar,
        buttonContainer,
    } = styles;



    const [GUID, setGUID] = useStateIfMounted('');

    const [isSelected, setSelection] = useState(loginReducer.userloggedIn == true ? loginReducer.userloggedIn : false);
    const [isSFeatures, setSFeatures] = useState(loginReducer.isSFeatures == true ? loginReducer.isSFeatures : false);

    const [loading, setLoading] = useStateIfMounted(false);
    const [loading_backG, setLoading_backG] = useStateIfMounted(true);

    const [resultJson, setResultJson] = useState([]);
    const [marker, setMarker] = useState(false);
    const [username, setUsername] = useState(loginReducer.userloggedIn == true ? loginReducer.userNameED : '');
    const [password, setPassword] = useState(loginReducer.userloggedIn == true ? loginReducer.passwordED : '');

    const [pageData, setPagedata] = useState({});
    const [data, setData] = useStateIfMounted({
        secureTextEntry: true,
    });


    useEffect(() => {

        //backsakura013
    }, [route.params?.data]);
    useEffect(() => {
        console.log('>> machineNum :', registerReducer.machineNum + '\n\n\n\n')
    }, [registerReducer.machineNum]);

    const closeLoading = () => {
        setLoading(false);
    };
    const letsLoading = () => {
        setLoading(true);
    };

    const logOut = async () => {
        setLoading(true)
        await fetch(databaseReducer.Data.urlser + '/DevUsers', {
            method: 'POST',
            body: JSON.stringify({
                'BPAPUS-BPAPSV': loginReducer.serviceID,
                'BPAPUS-LOGIN-GUID': '',
                'BPAPUS-FUNCTION': 'UnRegister',
                'BPAPUS-PARAM':
                    '{"BPAPUS-MACHINE": "' +
                    registerReducer.machineNum +
                    '" }',
            }),
        })
            .then((response) => response.json())
            .then((json) => {
                setLoading(false)
                if (json && json.ResponseCode == '635') {
                    Alert.alert(
                        Language.t('alert.errorTitle'),
                        Language.t('alert.errorDetail'), [{ text: Language.t('alert.ok'), onPress: () => console.log('OK Pressed') }]);
                    console.log('NOT FOUND MEMBER');
                } else if (json && json.ResponseCode == '629') {
                    Alert.alert(
                        Language.t('alert.errorTitle'),
                        'Function Parameter Required', [{ text: Language.t('alert.ok'), onPress: () => console.log('OK Pressed') }]);
                } else if (json && json.ResponseCode == '200') {

                    navigation.dispatch(
                        navigation.replace('LoginScreen')
                    )
                } else {
                    Alert.alert(
                        Language.t('alert.errorTitle'),
                    );
                }
            })
            .catch((error) => {
                console.error('ERROR at _fetchGuidLogin' + error);
                setLoading(false)
                if (databaseReducer.Data.urlser == '') {
                    Alert.alert(
                        Language.t('alert.errorTitle'),
                        Language.t('selectBase.error'), [{ text: Language.t('alert.ok'), onPress: () => console.log('OK Pressed') }]);
                } else {
                    Alert.alert(
                        Language.t('alert.errorTitle'),
                        Language.t('alert.internetError'), [{ text: Language.t('alert.ok'), onPress: () => console.log('OK Pressed') }]);
                }
            });

    };

    return (
        <>
            <StatusBar hidden={true} />

            <View style={tabbar}>
                <View style={{ flexDirection: 'row' }}>

                    <Text
                        style={{
                            marginLeft: 12,
                            fontSize: FontSize.medium,
                            fontWeight: 'bold',
                            color: Colors.backgroundLoginColorSecondary,
                        }}> {route.params.name && (`${route.params.name}`)}</Text>
                </View>
                <View>
                    <TouchableNativeFeedback
                        onPress={() => navigation.goBack()}>
                        <View
                            style={{
                                borderRadius: 20,
                                flexDirection: 'column',
                                padding: 5,
                                backgroundColor: 'red',
                                width: deviceWidth / 6,
                            }}>
                            <Text
                                style={{
                                    color: Colors.buttonTextColor,
                                    alignSelf: 'center',
                                    fontSize: FontSize.medium,
                                    fontWeight: 'bold',
                                }}>
                                {'ย้อนกลับ'}
                            </Text>
                        </View>
                    </TouchableNativeFeedback>
                </View>
            </View>
            <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
                <ScrollView>
                    < View style={container1} >
                        <View width={deviceWidth / 2} style={{
                            alignSelf: 'center',
                            justifyContent: 'center',
                            alignContent: 'center',
                        }}>
                            <View style={{
                                paddingTop: 10,
                                justifyContent: 'space-between',
                                flexDirection: 'row',
                            }}>
                                <View width={deviceWidth / 6}>
                                    <View style={{ padding: 10, }}>
                                        <Text style={styles.textTitle}>
                                            ตำแหน่งเก็บ :
                                        </Text>
                                    </View>
                                </ View>
                                < View width={deviceWidth / 3}>
                                    <View style={{}}>
                                        <View style={{ flexDirection: 'row' }}>
                                            <TextInput
                                                width={deviceWidth / 3.5}
                                                style={{
                                                    borderBottomColor: Colors.buttonColorPrimary,
                                                    color: Colors.fontColor,
                                                    fontSize: FontSize.medium,
                                                    borderBottomWidth: 0.7,
                                                }}
                                                placeholderTextColor={Colors.fontColorSecondary}
                                                placeholder={'ตำแหน่งเก็บ ..'}
                                                value={''}
                                                onChangeText={(val) => {
                                                    console.log(val)
                                                }}></TextInput>
                                            <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => navigation.navigate('ScanScreen', { route: 'SelectScreen' })}>
                                                <FontAwesome
                                                    name="qrcode"
                                                    size={FontSize.medium * 2}
                                                    color={Colors.buttonColorPrimary}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View >
                            </View>
                            <View style={{
                                paddingTop: 10,
                                justifyContent: 'space-between',
                                flexDirection: 'row',
                            }}>
                                <View width={deviceWidth / 6}>
                                    <View style={{ padding: 10, borderColor: Colors.buttonColorPrimary, borderWidth: 1 }}>
                                        <Text style={styles.textTitle}>
                                            บล๊อค
                                        </Text>
                                    </View>
                                    <View style={{ padding: 10, borderColor: Colors.buttonColorPrimary, borderWidth: 1 }}>
                                        <Text style={styles.textTitle}>
                                            xxx
                                        </Text>
                                    </View>
                                </ View>
                                < View width={deviceWidth / 6}>
                                    <View style={{ padding: 10, borderColor: Colors.buttonColorPrimary, borderWidth: 1 }}>
                                        <Text style={styles.textTitle}>
                                            แถว
                                        </Text>
                                    </View>
                                    <View style={{ padding: 10, borderColor: Colors.buttonColorPrimary, borderWidth: 1 }}>
                                        <Text style={styles.textTitle}>
                                            xxx
                                        </Text>
                                    </View>
                                </View >
                                < View width={deviceWidth / 6}>
                                    <View style={{ padding: 10, borderColor: Colors.buttonColorPrimary, borderWidth: 1 }}>
                                        <Text style={styles.textTitle}>
                                            ชั้น
                                        </Text>
                                    </View>
                                    <View style={{ padding: 10, borderColor: Colors.buttonColorPrimary, borderWidth: 1 }}>
                                        <Text style={styles.textTitle}>
                                            xxx
                                        </Text>
                                    </View>
                                </View >
                            </View>
                            <View style={{
                                paddingTop: 10,
                                justifyContent: 'space-between',
                                flexDirection: 'row', borderColor: Colors.buttonColorPrimary, borderWidth: 1
                            }}>
                                <View width={deviceWidth / 6}>
                                    <View style={{ padding: 10, }}>
                                        <Text style={styles.textTitle}>
                                            รหัสสินค้า :
                                        </Text>
                                    </View>
                                </ View>
                                < View width={deviceWidth / 3}>
                                    <View style={{ padding: 10, }}>
                                        <Text style={styles.textTitle}>
                                            xxxxx
                                        </Text>
                                    </View>
                                </View >
                            </View>
                            <View style={{
                                paddingTop: 10,
                                justifyContent: 'space-between',
                                flexDirection: 'row', borderColor: Colors.buttonColorPrimary, borderWidth: 1
                            }}>
                                <View width={deviceWidth / 6}>
                                    <View style={{ padding: 10, }}>
                                        <Text style={styles.textTitle}>
                                            ชื่อสินค้า :
                                        </Text>
                                    </View>
                                </ View>
                                < View width={deviceWidth / 3}>
                                    <View style={{ padding: 10, }}>
                                        <Text style={styles.textTitle}>
                                            xxxxxx
                                        </Text>
                                    </View>
                                </View >
                            </View>
                        </View>
                        <View style={{
                            justifyContent: 'space-between',
                            flexDirection: 'row',
                        }}>
                            <View width={deviceWidth / 4} >
                                <View style={{ padding: 10, borderColor: Colors.buttonColorPrimary, borderWidth: 1 }}>
                                    <Text style={styles.textTitle}>
                                        หน่วย
                                    </Text>
                                </View>
                                <View style={{ padding: 10, borderColor: Colors.buttonColorPrimary, borderWidth: 1 }}>
                                    <Text style={styles.textTitle}>
                                        xxxx
                                    </Text>
                                </View>
                            </ View>
                            < View width={deviceWidth / 4}>
                                <View style={{ padding: 10, borderColor: Colors.buttonColorPrimary, borderWidth: 1 }}>
                                    <Text style={styles.textTitle}>
                                        จำนวน
                                    </Text>
                                </View>
                                <View style={{ padding: 10, borderColor: Colors.buttonColorPrimary, borderWidth: 1 }}>
                                    <Text style={styles.textTitle}>
                                        xxxxx
                                    </Text>
                                </View>
                            </View >
                        </View>
                    </View>
                </ScrollView>
                <View style={{     alignItems:'center',}}>
                <View style={{
                    flexDirection: 'row',
               
                    justifyContent: 'space-between',
                  width:deviceWidth/2,
                 

                    marginTop: 20,
                }}>
                <View style={{  flexDirection: 'row'}}>
                <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => navigation.navigate('ScanScreen', { route: 'SelectScreen' })}>
                        <FontAwesome
                            name="caret-left"
                            size={deviceWidth / 8}
                            color={Colors.fontColor}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => navigation.navigate('ScanScreen', { route: 'SelectScreen' })}>
                        <FontAwesome
                            name="caret-right"
                            size={deviceWidth / 8}
                            color={Colors.fontColor}
                        />
                    </TouchableOpacity>
                </View>
               
                    <TouchableNativeFeedback
                        style={{
                            marginRight: 20,
                            marginBottom: 20,
                            borderRadius: deviceWidth / 6,
                            padding: 10,
                            width: deviceWidth / 6,
                            height: deviceWidth / 6
                        }}
                        onPress={() => navigation.navigate('saveDeliveryInfo', { name: 'บันทึกรายละเอียดงานส่งมอบ', data: {} })}>
                        <View
                            style={{
                                width: deviceWidth / 4,
                                height: deviceWidth / 12,
                                justifyContent: 'center',
                                margin: 10,
                                borderRadius: 20,
                                flexDirection: 'column',
                                padding: 10,
                                backgroundColor: Colors.buttonColorPrimary,
                            }}>
                            <Text
                                style={{
                                    color: Colors.buttonTextColor,
                                    alignSelf: 'center',
                                    fontSize: FontSize.large,
                                    fontWeight: 'bold',
                                }}>
                                {'รับงาน'}
                            </Text>
                        </View>
                    </TouchableNativeFeedback>
                </View>
                </View>
             
                {loading && (
                    <View
                        style={{
                            width: deviceWidth,
                            height: deviceHeight,
                            opacity: 0.5,
                            backgroundColor: 'black',
                            alignSelf: 'center',
                            justifyContent: 'center',
                            alignContent: 'center',
                            position: 'absolute',
                        }}>
                        <ActivityIndicator
                            style={{
                                borderRadius: 15,
                                backgroundColor: null,
                                width: 100,
                                height: 100,
                                alignSelf: 'center',
                            }}
                            animating={loading}
                            size="large"
                            color={Colors.lightPrimiryColor}
                        />
                    </View>
                )}
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    container1: {
        backgroundColor: '#fff',
        alignItems: 'center',
        flex: 1,
        flexDirection: 'column',
    },
    image: {
        flex: 1,
        justifyContent: "center"
    },
    container2: {
        width: deviceWidth,
        height: '100%',
        position: 'absolute',
        backgroundColor: 'white',
        flex: 1,
    },
    tabbar: {
        height: 70,
        padding: 12,
        paddingLeft: 20,
        alignItems: 'center',
        backgroundColor: Colors.backgroundLoginColor,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    textTitle: {
        fontSize: FontSize.medium,
        fontWeight: 'bold',
        color: Colors.fontColor,
    },
    imageIcon: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    topImage: {
        height: deviceHeight / 2.6,
        width: deviceWidth,
    },
    button: {
        marginTop: 10,
        marginBottom: 25,
        padding: 5,
        alignItems: 'center',
        backgroundColor: Colors.buttonColorPrimary,
        borderRadius: 10,
    },
    textButton: {
        fontSize: FontSize.large,
        color: Colors.fontColor2,
    },
    buttonContainer: {
        marginTop: 10,
    },
    checkboxContainer: {
        flexDirection: "row",
        marginTop: 10,
        marginLeft: 10,
        marginBottom: 20,
    },
    checkbox: {
        alignSelf: "center",
        borderBottomColor: Colors.fontColor,
        color: Colors.fontColor,
    },
    label: {
        margin: 8,
        color: Colors.fontColor,
    },
});

export default nextDelivery;

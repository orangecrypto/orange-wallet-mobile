import CommonButton from '@components/CommonButton';
import { goBack } from '@routes/Navigator';
import { strings } from '@strings/i18n';
import { Responsive } from '@utils/Responsive';
import { Color} from "@values/color";
import { Fonts } from '@values/fonts';
import { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const AddAddress = () => {

    const [data, setData] = useState([
        { id: '1', primary: '2AbC...3xTY', secondary: 'ST5Z...EOTW' },
    ]);

    const generateText = () => {
        const randomPrimary = `2AbC${Math.random().toString(36).substring(2, 6)}...${Math.random().toString(36).substring(2, 6)}`;
        const randomSecondary = `ST5Z${Math.random().toString(36).substring(2, 6)}...${Math.random().toString(36).substring(2, 6)}`;
        return { primary: randomPrimary, secondary: randomSecondary };
    };

    const addItem = () => {
        const newItem = {
            id: (data.length + 1).toString(),
            ...generateText(),
        };
        setData([...data, newItem]);
    };

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Text style={styles.text}>
                <Text style={styles.primaryText}>{item.primary}</Text> /{' '}
                <Text style={styles.secondaryText}>{item.secondary}</Text>
            </Text>
        </View>
    );
    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => goBack()} >
                    <Text style={styles.buttonText}>{strings.back}</Text>
                </TouchableOpacity>
                <Text style={styles.addAddress}>{strings.addAddress}</Text>
                <Text style={styles.addAddressMessage}>{strings.addAddressMessage}</Text>

                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem} />

                <TouchableOpacity style={styles.addAddressButton} onPress={() => { addItem() }}>
                    <Text style={styles.addAddressButtonText}>{strings.addNewAddress}</Text>
                </TouchableOpacity>
            </View>

          
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.black,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        marginHorizontal: Responsive.size18
    },
    buttonContainer: {
        width: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingHorizontal: Responsive.size20,
        marginBottom: Responsive.size20,
    },
    button: {
        backgroundColor: Color.backbackgroundbg,
        width: Responsive.size70,
        justifyContent: 'center',
        alignItems: 'center',
        padding: Responsive.size10,
        borderRadius: Responsive.size8,
        marginTop: Responsive.size50
    },
    buttonText: {
        color: Color.white,
        fontSize: Responsive.size16,
        fontFamily: Fonts.regular
    },
    addAddress: {
        color: Color.orangeButton,
        fontSize: Responsive.size24,
        fontFamily: Fonts.bold,
        marginTop: Responsive.size20
    },
    addAddressMessage: {
        color: Color.white,
        fontSize: Responsive.size18,
        fontFamily: Fonts.regular,
        lineHeight: Responsive.size24
    },
    addAddressButtonText: {
        fontSize: Responsive.size12,
        fontFamily: Fonts.regular,
        color: Color.orangeButton,
    },

    addAddressButton: {
        backgroundColor: Color.orangeOpacityBg,
        borderColor: Color.orangeButton,
        borderWidth: Responsive.size1,
        borderRadius: Responsive.size20,
        alignSelf: 'center',
        marginVertical: Responsive.size50,
        paddingHorizontal: Responsive.size10,
        paddingVertical: Responsive.size6,

    },

    item: {
        padding: Responsive.size16,
        backgroundColor: Color.backgroundbg,
        borderRadius: Responsive.size10,
        marginTop: Responsive.size18,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: Responsive.size1,
        borderColor: Color.grey
    },

    primaryText: {
        fontSize: Responsive.size16,
        fontFamily: Fonts.regular,
        color: Color.white
    },
    secondaryText: {
        fontSize: Responsive.size16,
        fontFamily: Fonts.regular,
        color: Color.nftcategoryText
    },
    text: {
        fontSize: Responsive.size16,
        fontFamily: Fonts.regular,
        color: Color.white

    },
});

export default AddAddress;

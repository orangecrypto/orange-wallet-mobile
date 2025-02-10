import { goBack } from '@routes/Navigator';
import { strings } from '@strings/i18n';
import { useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { styles } from './styles';

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

export default AddAddress;
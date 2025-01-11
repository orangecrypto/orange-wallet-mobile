import { FlatList, StyleSheet, Text, View } from "react-native";
import { black, orangeButton, white } from "../../resources/values/color";
import { Responsive } from "../../utils/Responsive";
import { strings } from "../../resources/locale/i18n";

const SeedPhraseView = () => {


    const data = [
        { id: '1', word: 'rocket' },
        { id: '2', word: 'asset' },
        { id: '3', word: 'glimpse' },
        { id: '4', word: 'harvest' },
        { id: '5', word: 'warfare' },
        { id: '6', word: 'swallow' },
        { id: '7', word: 'code' },
        { id: '8', word: 'exclude' },
        { id: '9', word: 'episode' },
        { id: '10', word: 'proof' },
        { id: '11', word: 'emerge' },
        { id: '12', word: 'motion' },
    ];

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item.id}. {item.word}</Text>
        </View>
    );
    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <Text style={styles.title}>{strings.speedPhrase}</Text>
                <Text style={styles.reviewText}>{strings.speedPhraseVerificationDes} </Text>

                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    numColumns={3}
                    contentContainerStyle={styles.flatListContainer}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: black,
    },

    title: {
        fontSize: Responsive.size22,
        color: orangeButton,
        fontWeight: '600',

    },
    contentContainer: {
        flex: 1,
        justifyContent: 'flex-start',

    },


    reviewText: {
        marginTop: Responsive.size10,
        fontSize: Responsive.size18,
        color: white,
        fontWeight: '400',
    },

    orangeText: {
        fontSize: Responsive.size18,
        color: orangeButton,
        fontWeight: '400',
    },
    flatListContainer: {
        paddingHorizontal: 16,
        marginTop: Responsive.size20,
        backgroundColor: black,
        borderRadius: 10,
        borderWidth: Responsive.size2,
        borderColor: '#0D0E1233',
    },
    itemContainer: {
        flex: 1,
        margin: 8,

        paddingVertical: 16,
        alignItems: 'center',
        justifyContent: 'center',

    },
    itemText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '500',
    },


});

export default SeedPhraseView;

import { FlatList, StyleSheet, Text, View } from "react-native";
import { Color} from "@values/color";
import { Responsive } from '@utils/Responsive';
import { strings } from "@strings/i18n";
import { Fonts } from '@values/fonts';

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
        backgroundColor: Color.black,
    },

    title: {
        fontSize: Responsive.size22,
        color: Color.orangeButton,
        fontFamily: Fonts.semibold,

    },
    contentContainer: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    reviewText: {
        marginTop: Responsive.size10,
        fontSize: Responsive.size18,
        color: Color.white,
        fontFamily: Fonts.regular,
        lineHeight: Responsive.size22,
    },

    orangeText: {
        fontSize: Responsive.size18,
        color: Color.orangeButton,
        fontFamily: Fonts.semibold,
    },
    flatListContainer: {
       
        marginTop: Responsive.size20,
        backgroundColor: Color.black,
        borderRadius: Responsive.size10,
        borderWidth: Responsive.size2,
        borderColor: Color.listBordercolor,
    },
    itemContainer: {
        flex: 1,
        margin: Responsive.size12,
        width: '30%', 
        height: Responsive.size45, 
        backgroundColor: Color.black,
        borderRadius: Responsive.size12,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: Color.borderLineSeedphrase,
        borderWidth: Responsive.size1,

    },
    itemText: {
        color: Color.white,
        fontSize: Responsive.size14,
        fontFamily: Fonts.semibold,
        textAlign: 'center',
        width: '100%',
    },


});

export default SeedPhraseView;

import { localAssets } from '@assets/assets';
import { push } from '@routes/Navigator';
import { INCRIPTIONDETAILS, TRANSFER } from '@routes/RouteType';
import { strings } from '@strings/i18n';
import { Responsive } from '@utils/Responsive';
import { black, grey, nftcategoryText, orangeButton, transactionListBackground, viewbutton, white } from "@values/color";
import { Fonts } from '@values/fonts';
import { Dimensions, FlatList, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
const { width } = Dimensions.get('window');
const numColumns = 2;
const Nft = () => {

    const data = [
        { id: '1', image: localAssets.samplenft, title: 'Ordinal Punk #78', subtype: 'Ordinal Punks' },
        { id: '2', image: localAssets.samplenft, title: 'Timechain #9', subtype: 'Timechain Collect...' },
        { id: '3', image: localAssets.samplenft, title: 'Ordinal Punk #78', subtype: 'Ordinal Punks' },
        { id: '4', image: localAssets.samplenft, title: 'Timechain #9', subtype: 'Timechain Collect...' },
    ];

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.itemContainer} onPress={() => push(INCRIPTIONDETAILS)}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtype}>{item.subtype}</Text>
        </TouchableOpacity>
    );
    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <ImageBackground
                    source={localAssets.walletbg}
                    style={styles.walletBackground}
                    borderRadius={12}>
                    <View style={styles.balanceView}>
                        <Image source={localAssets.nftwallet} style={styles.balanceIcon} />
                        <View>
                            <Text style={styles.walletText}>$2,408.83</Text>
                            <View style={styles.walletTextView}>
                                <Text style={styles.walletTextCurrencyView}>24 NFTs</Text>
                                <Text style={styles.walletTextCurrencyView}>USD</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.horizontalButtons}>
                        <TouchableOpacity style={styles.addCoinView} onPress={() => { push(TRANSFER) }}>
                            <Image style={styles.addCoinIcon} source={localAssets.transferarrow} />
                            <Text style={styles.addCoinText}>{strings.transfer}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.addCoinView} onPress={() => { console.log('Open') }}>
                            <Image style={styles.addCoinIcon} source={localAssets.transactionarrow} />
                            <Text style={styles.addCoinText}>{strings.receive}</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>

            </View>
           
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    numColumns={numColumns}
                    style={styles.listConatiner}
                    columnWrapperStyle={styles.columnWrapper} />
          
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: black,
        alignItems: 'center'
    },
    contentContainer: {
        justifyContent: 'flex-start',
    },
    password: {
        fontSize: Responsive.size22,
        fontFamily: Fonts.bold,
        color: orangeButton,
        marginTop: Responsive.size22,
    },

    walletBackground: {
        width: Dimensions.get('window').width - 40,
        marginHorizontal: Responsive.size16,
        padding: Responsive.size24,
    },
    walletText: {
        fontSize: Responsive.size22,
        color: white,
        fontFamily: Fonts.semibold,
    },
    walletTextView: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
        marginTop: Responsive.size5,
    },
    walletTextCurrencyView: {
        backgroundColor: viewbutton,
        borderRadius: Responsive.size20,
        fontFamily: Fonts.regular,
        fontSize: Responsive.size9,
        color: white,
        padding: Responsive.size4,
        marginLeft: Responsive.size10,
    },
    balanceView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    balanceIcon: {
        height: Responsive.size56,
        width: Responsive.size56,
    },

    horizontalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: Responsive.size20,
        marginTop: Responsive.size28,
    },
    addCoinView: {
        backgroundColor: viewbutton,
        borderRadius: Responsive.size20,
        alignContent: 'center',
        justifyContent: 'center',
        paddingVertical: Responsive.size10,
        width: Responsive.size110,
        flexDirection: 'row',
        alignSelf: 'center',

    },
    addCoinIcon: {
        height: Responsive.size18,
        width: Responsive.size18,
    },
    addCoinText: {
        fontFamily: Fonts.light,
        fontSize: Responsive.size14,
        color: white,
        marginLeft: Responsive.size5,
    },
    columnWrapper: {
        justifyContent: 'space-between',
        marginHorizontal: Responsive.size5,
        marginTop: Responsive.size25

    },
    itemContainer: {
        width: (width - 30) / numColumns,
        marginBottom: Responsive.size10,
        marginRight: Responsive.size10,
        padding: Responsive.size15,
        borderRadius: Responsive.size8,
        borderWidth: Responsive.size1,
        borderColor: grey,
    },
    image: {
        width: '100%',
        height: Responsive.size140,
        borderRadius: Responsive.size8,
    },
    title: {
        fontSize: Responsive.size16,
        fontFamily: Fonts.regular,
        marginTop: Responsive.size10,
        color: white
    },
    subtype: {
        fontSize: Responsive.size12,
        fontFamily: Fonts.regular,
        marginTop: Responsive.size4,
        color: nftcategoryText
    },

    listConatiner: {
        paddingTop: Responsive.size6,
        backgroundColor: transactionListBackground,
        borderTopLeftRadius: Responsive.size20,
        borderTopRightRadius: Responsive.size20,
        marginTop: Responsive.size15,
    }
});

export default Nft;

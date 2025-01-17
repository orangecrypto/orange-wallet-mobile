import { Responsive } from '@utils/Responsive';
import { black, blackBorder, gray, grayText, grey, listBordercolor, nftcategoryText, orangeButton, orangeOpacityBg, selectedCategory, transactionListBackground, white } from "@values/color";
import { Fonts } from '@values/fonts';
import { useState } from 'react';
import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import RenderCardItem from './RenderCardItem';
import RenderTransactions from './RenderTransactions';
import { strings } from '@strings/i18n';


const Wallet = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("All"); 

    const categories = ["All", "BRC20", "Runes", "Stacks"];

    const cryptoArray = [
        { id: 1, category: "BTC", name: "Bitcoin", quantity: "2.9841", value: "$140,298.12" },
        { id: 2, category: "BRC20", name: "Wrapped BTC", quantity: ".932", value: "$26,452.07" },
        { id: 3, category: "Stacks", name: "Stacks", quantity: "10", value: "$100.00" },
        { id: 4, category: "Runes", name: "Stacks", quantity: "10", value: "$100.00" },
    ];

    const totalSteps = cryptoArray.length;
    const progressPercentage = (currentStep / totalSteps) * 100;

    const handleScroll = (event) => {
        const screenWidth = Dimensions.get("window").width;
        const currentIndex = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
        setCurrentStep(currentIndex + 1);
        setSelectedItem(filteredCryptoArray[currentIndex]); // Synchronize selection
    };

    const filteredCryptoArray = selectedCategory === "All"
        ? cryptoArray
        : cryptoArray.filter((item) => item.category === selectedCategory);

    const renderCategory = (category) => (
        <TouchableOpacity
            key={category}
            onPress={() => setSelectedCategory(category)} // Update the selected category
            style={[
                styles.categoryButton,
                selectedCategory === category && styles.selectedCategory,
            ]}>
            <Text
                style={[
                    styles.categoryText,
                    selectedCategory === category && styles.selectedCategoryText,
                ]}>
                {category}
            </Text>
        </TouchableOpacity>
    );

    const handleItemClick = (item) => {
        setSelectedItem(item); // Only update selected item for highlight, not category
        const itemIndex = filteredCryptoArray.findIndex((crypto) => crypto.id === item.id);
        setCurrentStep(itemIndex + 1);
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={cryptoArray}
                horizontal
                style={styles.flatList}
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <RenderCardItem item={item} selectedItem={selectedItem} />}   />

            <View style={styles.progressBarContainer}>
                <View style={[styles.progressBar, { width: `${progressPercentage}%` }]} />
            </View>

            <View style={styles.contentArea}>
                <View style={styles.categoryContainer}>
                    {categories.map((category) => renderCategory(category))}
                </View>
                <View style={styles.headerTitleContainer}>
                        <Text style={styles.headerTitle}>{strings.assets}</Text>
                        <Text style={styles.headerTitle}>{strings.quantity}</Text>
                </View>
                <FlatList
                    data={filteredCryptoArray}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <RenderTransactions item={item} selectedItem={selectedItem} handleItemClick={handleItemClick} />}
                    contentContainerStyle={styles.listContainer}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: black,
        alignItems: 'center',
        paddingBottom: Responsive.size62,
        flex:1
    },
    flatList: {
        marginTop: Responsive.size20,
        alignContent:'center'
    },
    contentContainer: {
        justifyContent: 'center',
        paddingHorizontal: 0,
    },
   
    progressBarContainer: {
        height: Responsive.size5,
        width: "30%",
        backgroundColor: grey,
        borderRadius: Responsive.size5,
        overflow: "hidden",
        alignSelf: "center",
        marginTop: Responsive.size20,
    },
    progressBar: {
        height: "100%",
        backgroundColor: orangeButton,
    },
    contentArea: {
        marginTop: Responsive.size15,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: Responsive.size20,
        height: '60%',
        width: '100%',
        paddingTop: Responsive.size16,
        backgroundColor: transactionListBackground,
        borderTopLeftRadius:Responsive.size20,
        borderTopRightRadius: Responsive.size20
    },
    contentText: {
        fontSize: Responsive.size18,
        fontFamily: Fonts.semibold,
        color: white,
    },
    balanceView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    stepImage: {
        width: Responsive.size100,
        height: Responsive.size100,
        marginTop: Responsive.size10,
    },
    categoryContainer: {
        flexDirection: "row",
        marginBottom: Responsive.size16,
        width: '100%',
        justifyContent: 'space-between'
    },
    categoryButton: {
        paddingHorizontal: Responsive.size12,
        paddingVertical: Responsive.size8,
        backgroundColor: orangeOpacityBg,
        borderRadius: Responsive.size16,
        marginRight: Responsive.size8,
    },
    selectedCategory: {
        backgroundColor: selectedCategory,
    },
    categoryText: {
        color: orangeButton,
        fontSize: Responsive.size14,
        fontFamily: Fonts.regular
    },
    selectedCategoryText: {
        color: white,
        fontFamily: Fonts.semibold
    },
    listContainer: {
        paddingBottom: Responsive.size16,
       
    },
    listItem: {
        width: '100%',
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: transactionListBackground,
        borderBottomColor: gray,
        borderBottomWidth: Responsive.size1,
        paddingVertical: Responsive.size10
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: Responsive.size10,
        paddingHorizontal: Responsive.size8,
        width: '100%',
        marginTop:Responsive.size8,
        
    },
    headerText: {
        color: grayText,
        fontSize: Responsive.size14,
        fontFamily: Fonts.bold,
    },

    headerTitleContainer :{
        width: '100%',
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: Responsive.size1,
        borderColor:transactionListBackground
    },

    headerTitle:{
        color: nftcategoryText,
        fontFamily: Fonts.semibold,
        fontSize: Responsive.size14
    }
});

export default Wallet;

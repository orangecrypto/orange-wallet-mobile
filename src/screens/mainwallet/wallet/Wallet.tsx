import { localAssets } from '@assets/assets';
import { strings } from '@strings/i18n';
import { Responsive } from '@utils/Responsive';
import { black, orangeButton, viewbutton, white } from "@values/color";
import { Fonts } from '@values/fonts';
import { useState } from 'react';
import { Dimensions, FlatList, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";

// Components for each step
const StepOneComponent = () => (
    <Text style={styles.contentText}>Step 1: All transactions</Text>
);

const StepTwoComponent = () => (
    <View>
        <Text style={styles.contentText}>Step 2: Orange transactions</Text>
    </View>
);

const StepThreeComponent = () => (
    <View>
        <Text style={styles.contentText}>Step 3: Bitcoin Transactions</Text>
    </View>
);

const StepFourComponent = () => (
    <View>
        <Text style={styles.contentText}>Step 4: Stacks Transactions</Text>
    </View>
);

const Wallet = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 4;
    const progressPercentage = (currentStep / totalSteps) * 100;

    const handleScroll = (event) => {
        const screenWidth = Dimensions.get("window").width;
        const currentIndex = Math.round(event.nativeEvent.contentOffset.x / screenWidth) + 1;
        setCurrentStep(currentIndex);
    };

    const renderContentBelowSlider = () => {
        switch (currentStep) {
            case 1:
                return <StepOneComponent />;
            case 2:
                return <StepTwoComponent />;
            case 3:
                return <StepThreeComponent />;
            case 4:
                return <StepFourComponent />;
            default:
                return null;
        }
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={Array.from({ length: totalSteps })}
                horizontal
                style={styles.flatList}
                contentContainerStyle={styles.contentContainer}
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
                keyExtractor={(_, index) => index.toString()}
                renderItem={() => (
                    <View>
                        <ImageBackground
                            source={localAssets.walletbg}
                            style={styles.walletBackground}
                            borderRadius={12}>
                            <View style={styles.balanceView}>
                                <Image source={localAssets.walletbalance} style={styles.balanceIcon} />
                                <View>
                                    <Text style={styles.walletText}>$284,408.83</Text>
                                    <View style={styles.walletTextView}>
                                        <Text style={styles.walletTextCurrencyView}>5 Assets</Text>
                                        <Text style={styles.walletTextCurrencyView}>USD</Text>
                                    </View>
                                </View>
                            </View>

                            <TouchableOpacity style={styles.addCoinView} onPress={() => { console.log('Open') }}>
                                <Image style={styles.addCoinIcon} source={localAssets.addcoin} />
                                <Text style={styles.addCoinText}>{strings.addCoin}</Text>
                            </TouchableOpacity>
                        </ImageBackground>
                    </View>
                )}
            />

            <View style={styles.progressBarContainer}>
                <View style={[styles.progressBar, { width: `${progressPercentage}%` }]} />
            </View>

            <View style={styles.contentArea}>
                {renderContentBelowSlider()}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: black,
        alignItems: 'center',
        paddingBottom: Responsive.size62,
    },
    flatList: {
        marginTop: Responsive.size20,
        width: '100%',
    },
    contentContainer: {
        justifyContent: 'center',
        paddingHorizontal: 0,
    },
    walletBackground: {
        height: Responsive.size170,
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
    progressBarContainer: {
        height: Responsive.size5,
        width: "30%",
        backgroundColor: "grey",
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
        marginTop: Responsive.size20,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: Responsive.size20,
        height: '60%',
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
    balanceIcon: {
        height: Responsive.size56,
        width: Responsive.size56,
    },
    addCoinView: {
        backgroundColor: viewbutton,
        borderRadius: Responsive.size20,
        alignContent: 'center',
        justifyContent: 'center',
        paddingVertical: Responsive.size10,
        width: Responsive.size147,
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: Responsive.size28,
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
    stepImage: {
        width: Responsive.size100,
        height: Responsive.size100,
        marginTop: Responsive.size10,
    },
});

export default Wallet;

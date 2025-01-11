import { useState } from "react";
import { Dimensions, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import CommonButton from "@components/CommonButton";
import { strings } from "@strings/i18n";
import { black, orangeBorder, orangeButton, white } from "@values/color";
import { push } from "@routes/Navigator";
import { LOGIN } from "@routes/RouteType";
import { Responsive } from '@utils/Responsive';
import { localAssets } from "@assets/assets";
import { Fonts } from '@values/fonts';

const Success = () => {
    const contentArray = [
        {
            id: 1,
            icon: localAssets.congratulation,
            title: strings.congratulations,
            description: strings.congratulationsDescription,
        },
        {
            id: 2,
            icon: localAssets.selfcustody,
            title: strings.selfCustody,
            description: strings.selfCustodyDescription,
        },
        {
            id: 3,
            icon: localAssets.private,
            title: strings.private,
            description: strings.privateDescription,
        },
        {
            id: 4,
            icon: localAssets.anonymus,
            title: strings.anonymous,
            description: strings.anonymousDescription,
        },
        {
            id: 5,
            icon: localAssets.decentralized,
            title: strings.decentralized,
            description: strings.decentralizedDescription,
        },
    ];

    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = contentArray.length;
    const progressPercentage = (currentStep / totalSteps) * 100;

    // Handle swipe event
    const handleScroll = (event) => {
        const screenWidth = Dimensions.get("window").width;
        const currentIndex = Math.round(event.nativeEvent.contentOffset.x / screenWidth) + 1;
        setCurrentStep(currentIndex);
    };

    return (
        <View style={styles.container}>
            <ScrollView
                horizontal
                pagingEnabled
                onScroll={handleScroll}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                contentContainerStyle={styles.scrollViewContainer} >
                {contentArray.map((item) => (
                    <View key={item.id} style={styles.contentPage}>
                        <Image source={item.icon} style={styles.icon} resizeMode="contain" />
                        <Text style={styles.contentTitle}>{item.title}</Text>
                        <Text style={styles.contentDescription}>{item.description}</Text>
                    </View>
                ))}
            </ScrollView>

            <View style={styles.progressBarContainer}>
                <View style={[styles.progressBar, { width: `${progressPercentage}%` }]} />
            </View>

            <View style={styles.buttonContainer}>
                <CommonButton
                    title={strings.complete}
                    onPress={() => push(LOGIN)}
                    backgroundColor={orangeButton}
                    textColor={white}
                    borderColor={orangeBorder}
                    width={"100%"}
                    height={Responsive.size45}
                />
            </View>
        </View>
    );
};

export default Success;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: black,
    },
    scrollViewContainer: {
        flexGrow: 1,
    },
    contentPage: {
        width: Dimensions.get("window").width,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: Responsive.size20,
    },
    icon: {
        width: Responsive.size156,
        height: Responsive.size156,
        marginBottom: Responsive.size10,
    },
    contentTitle: {
        fontSize: Responsive.size24,
        fontFamily:Fonts.bold,
        color: orangeButton,
        textAlign: "center",
        marginBottom: Responsive.size10,
    },
    contentDescription: {
        fontSize: Responsive.size16,
        color: white,
        textAlign: "center",
        fontFamily: Fonts.regular,
        lineHeight: Responsive.size22,
    },
    progressBarContainer: {
        height: Responsive.size5,
        width: "40%",
        backgroundColor: "grey",
        borderRadius: Responsive.size5,
        overflow: "hidden",
        alignSelf: "center",
        marginVertical: Responsive.size40,
    },
    progressBar: {
        height: "100%",
        backgroundColor: orangeButton,
    },
    buttonContainer: {
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: Responsive.size20,
        marginHorizontal: Responsive.size24
    },
});

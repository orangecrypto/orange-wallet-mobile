import { localAssets } from "@assets/assets";
import CommonButton from "@components/CommonButton";
import { resetNavigation } from "@routes/Navigator";
import { RouteType } from "@routes/RouteType";
import { strings } from "@strings/i18n";
import { Responsive } from '@utils/Responsive';
import { Color } from "@values/color";
import { useEffect, useRef, useState } from "react";
import { Animated, Dimensions, Image, ScrollView, Text, View } from "react-native";
import { styles } from "./styles";

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
            icon: localAssets.decentralized_success,
            title: strings.decentralized,
            description: strings.decentralizedDescription,
        },
    ];

    const scrollViewRef = useRef(null);
    const [currentStep, setCurrentStep] = useState(1);
    const [progressPercentage, setProgressPercentage] = useState(0);
    const animatedValue = useRef(new Animated.Value(0)).current;
    const [progressBarWidth, setProgressBarWidth] = useState(0);
    const indicatorWidth = Responsive.size30;

    const totalSteps = contentArray.length;

    // Update percentage when currentStep changes
    useEffect(() => {
        const progressPercentage =
            totalSteps > 1 ? ((currentStep - 1) / (totalSteps - 1)) * 100 : 0;
        setProgressPercentage(progressPercentage);
    }, [currentStep]);

    // Animate when percentage changes
    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: progressPercentage,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }, [progressPercentage]);

    const translateX = animatedValue.interpolate({
        inputRange: [0, 100],
        outputRange: [0, progressBarWidth - indicatorWidth],
    });

    const handleScroll = (event) => {
        const screenWidth = Dimensions.get("window").width;
        const currentIndex = Math.round(event.nativeEvent.contentOffset.x / screenWidth) + 1;
        setCurrentStep(currentIndex);
    };

    const handleButtonPress = () => {
        if (currentStep < totalSteps) {
            const screenWidth = Dimensions.get("window").width;
            scrollViewRef.current?.scrollTo({ x: screenWidth * currentStep, animated: true });
            // currentStep will auto-increment via handleScroll onScrollEnd
        } else {
            resetNavigation(RouteType.WALLETBALANCE);
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView
                ref={scrollViewRef}
                horizontal
                pagingEnabled
                onScroll={handleScroll}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
                contentContainerStyle={styles.scrollViewContainer}
            >
                {contentArray.map((item) => (
                    <View key={item.id} style={styles.contentPage}>
                        <Image source={item.icon} style={styles.icon} resizeMode="contain" />
                        <Text style={styles.contentTitle}>{item.title}</Text>
                        <Text style={styles.contentDescription}>{item.description}</Text>
                    </View>
                ))}
            </ScrollView>

            <View
                style={styles.progressBarContainer}
                onLayout={(event) => {
                    setProgressBarWidth(event.nativeEvent.layout.width);
                }}
            >
                {progressBarWidth > 0 && (
                    <Animated.View
                        style={{
                            width: indicatorWidth,
                            height: "100%",
                            backgroundColor: Color.orangeButton,
                            borderRadius: 5,
                            position: "absolute",
                            left: 0,
                            transform: [{ translateX }],
                        }}
                    />
                )}
            </View>
            <View style={styles.horizontalButtonContainer}>
                <CommonButton
                    title={strings.skip}
                    onPress={() => resetNavigation(RouteType.WALLETBALANCE)}
                    backgroundColor={Color.backgroundbg}
                    textColor={Color.white}
                    borderColor={Color.blackBorder}
                    width={"45%"}
                    height={Responsive.size50} />
                <CommonButton
                    title={currentStep === totalSteps ? strings.complete : strings.next}
                    onPress={() => handleButtonPress()}
                    backgroundColor={Color.orangeButton}
                    textColor={Color.white}
                    width={"45%"}
                    height={Responsive.size50} />
            </View>
        </View>
    );
};

export default Success;

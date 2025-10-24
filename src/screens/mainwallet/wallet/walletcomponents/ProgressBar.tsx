import { View, Animated } from "react-native";
import { useEffect, useRef, useState } from "react";
import { styles } from "../styles";
import { Color } from "@values/color";

const ProgressBar = ({ progressPercentage }) => {
    const animatedValue = useRef(new Animated.Value(0)).current;
    const [progressBarWidth, setProgressBarWidth] = useState(0);
    const indicatorWidth = 40; // Moving block width

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

    return (
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
    );
};

export default ProgressBar;

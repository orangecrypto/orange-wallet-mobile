import { View } from "react-native";
import { styles } from "../styles";

const ProgressBar = ({ progressPercentage }) => {
    return (
        <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { width: `${progressPercentage}%` }]} />
        </View>
    );
};

export default ProgressBar;
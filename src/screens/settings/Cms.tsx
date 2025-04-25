import React from "react";
import { WebView } from "react-native-webview";
import { styles } from "./styles";
import { strings } from "@strings/i18n";
import { goBack } from "@routes/Navigator";
import { Text, TouchableOpacity, View } from "react-native";
import { Responsive } from "@utils/Responsive";

const Cms = ({ route }) => {
    const { url } = route.params;

   
    return (
        <View style={styles.cmsContainer}>
                <TouchableOpacity style={styles.cmsButton} onPress={() => goBack()}>
                    <Text style={styles.cmsButtonText}>{strings.back}</Text>
                </TouchableOpacity>
            <WebView
                source={{ uri: url }}
                style={{ flex: 1 , marginTop: Responsive.size10}}
                startInLoadingState={true}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                allowFileAccess={true}
                mixedContentMode="always"
            />
        </View>
    );
};

export default Cms;

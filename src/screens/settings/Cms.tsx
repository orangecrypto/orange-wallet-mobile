import React from "react";
import { WebView } from "react-native-webview";

const Cms = ({ route }) => {
    const { url } = route.params;

   
    return (
        
            <WebView
                source={{ uri: url }}
                style={{ flex: 1 }}
                startInLoadingState={true}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                allowFileAccess={true}
                mixedContentMode="always"
            />
        
    );
};

export default Cms;

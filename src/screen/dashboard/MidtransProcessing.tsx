import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

const MidtransProcessing = ({ route }: any) => {
    const { redirectUrl } = route.params;

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <WebView source={{ uri: redirectUrl }} />
        </SafeAreaView>
    );
};

export default MidtransProcessing;

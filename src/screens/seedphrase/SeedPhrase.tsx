import { useEffect, useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    KeyboardAvoidingView,
    Platform
} from "react-native";
import CommonButton from "@components/CommonButton";
import { strings } from "@strings/i18n";
import { black, grey, orangeBorder, orangeButton, white } from "@values/color";
import { Responsive } from '@utils/Responsive';
import SeedPhraseView from "@screens/seedphrase/SeedPhraseView";
import SeedPhraseVerification from "@screens/seedphrase/SeedPhraseVerification";
import EnterPassword from "@screens/seedphrase/EnterPassword";
import ConfirmPassword from "@screens/seedphrase/ConfirmPassword";
import { goBack, push } from "@routes/Navigator";
import { SUCCESS } from "@routes/RouteType";

const SeedPhrase = ({ route }) => {
    const [currentStep, setCurrentStep] = useState(route?.params?.backupLatter ? 3:1);
    const totalSteps = 4;

    const handleNextStep = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
        }
        if(currentStep ==4 ){
            push(SUCCESS)
        }
        
    };

    const handlePreviousStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        } else {
            goBack();
        }
    };

    useEffect(()=>{
        console.log('Useeffect', route?.params?.backupLatter)
    })

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container} >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
                <View style={styles.contentContainer}>
                    <View style={styles.stepContainer}>
                        <Text style={styles.stepText}>Step {currentStep}</Text>
                        <View style={styles.progressBarContainer}>
                            <View
                                style={[styles.progressBar, { width: `${(currentStep / totalSteps) * 100}%` }]}
                            />
                        </View>
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[styles.button, currentStep === 1 && styles.disabledButton]}
                            onPress={handlePreviousStep}
                        >
                            <Text style={styles.buttonText}>Back</Text>
                        </TouchableOpacity>
                    </View>

                    {currentStep == 1 ? (
                        <SeedPhraseView />
                    ) : currentStep == 2 ? (
                        <SeedPhraseVerification />
                    ) : currentStep == 3 ? (
                        <EnterPassword />
                    ) : currentStep == 4 ? (
                        <ConfirmPassword />
                    ) : null}
                </View>
            </ScrollView>
            <View style={styles.buttonContainerConitnue}>
                <CommonButton
                    title={strings.continue}
                    onPress={handleNextStep}
                    backgroundColor={orangeButton}
                    textColor={white}
                    borderColor={orangeBorder}
                    width={"100%"}
                    height={Responsive.size45}
                />
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: black,
        padding: Responsive.size20,
    },
    contentContainer: {
        flex: 1,
        justifyContent: "flex-start",
    },
    title: {
        fontSize: Responsive.size18,
        color: white,
        textAlign: "center",
    },
    stepContainer: {
        flexDirection: "row",
        alignContent: "center",
        backgroundColor: "#A8B9F41A",
        width: "100%",
        paddingHorizontal: Responsive.size10,
        paddingVertical: Responsive.size8,
        borderRadius: Responsive.size10,
        justifyContent: "space-between",
    },
    stepText: {
        fontSize: Responsive.size16,
        color: white,
    },
    progressBarContainer: {
        height: Responsive.size8,
        width: "20%",
        backgroundColor: grey,
        borderRadius: Responsive.size5,
        overflow: "hidden",
        alignSelf: "center",
    },
    progressBar: {
        height: "100%",
        backgroundColor: orangeButton,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "60%",
        marginTop: 50,
    },
    button: {
        paddingVertical: Responsive.size5,
        paddingHorizontal: Responsive.size10,
        backgroundColor: orangeButton,
        borderRadius: Responsive.size5,
        marginBottom: Responsive.size10,
    },
    buttonText: {
        color: white,
        fontSize: Responsive.size16,
    },
    disabledButton: {
        backgroundColor: grey,
    },
    buttonContainerConitnue: {
        justifyContent: "flex-end",
        alignItems: "center",
        marginBottom: Responsive.size20,
    },
});

export default SeedPhrase;

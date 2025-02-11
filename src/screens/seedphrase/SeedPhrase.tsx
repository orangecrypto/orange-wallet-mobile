import CommonButton from "@components/CommonButton";
import useSeedVault from '@hooks/useSeedVault';
import { str2buf } from "@orangecryptohq/orangeseed";
import { setAccount, setIsWalletCreated, setWallet } from "@redux/slice/appReducer";
import { clearSeedPhraseReducer, seedPhraseReducerType, setIsRestoreWallet } from "@redux/slice/SeedPhraseReducer";
import { useAppDispatch } from "@redux/store";
import { Dispatch } from "@reduxjs/toolkit";
import { goBack, resetNavigation } from "@routes/Navigator";
import { RouteType } from "@routes/RouteType";
import SeedPhraseVerification from "@screens/seedphrase/SeedPhraseVerification";
import SeedPhraseView from "@screens/seedphrase/SeedPhraseView";
import { strings } from "@strings/i18n";
import { Responsive } from '@utils/Responsive';
import { Color } from "@values/color";
import 'fast-text-encoding';
import { useEffect, useMemo, useState } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import EnterPassword from "./EnterPassword";
import { createWallet, restoreWallet, validateCurrentStep } from "./SeedPhraseUtils";
import { styles } from './styles';
import { Step } from "./Steps";
import Loader from "@components/Loader";

const SeedPhrase = ({ route }) => {
    const { getSeed, changePassword, hasSeed, clearVaultStorage, storeSeed, init } = useSeedVault();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [backupLatter, setBackupLatter] = useState(route?.params?.backupLatter || false);
    const { isSeedPhraseVerified, disabled, isRestoreWallet } = useSelector((state: { seedPhraseReducer: seedPhraseReducerType }) => state.seedPhraseReducer);
    const [currentStepIndex, setCurrentStepIndex] = useState(route?.params?.backupLatter ? 2 : route?.params?.restoreWallet ? 1 : 0);
    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch: Dispatch = useAppDispatch();

    dispatch(setIsRestoreWallet(route?.params?.restoreWallet || false));

    useEffect(() => {
        const handleKeyboardShow = () => setIsKeyboardVisible(true);
        const handleKeyboardHide = () => setIsKeyboardVisible(false);
        const showSubscription = Keyboard.addListener("keyboardDidShow", handleKeyboardShow);
        const hideSubscription = Keyboard.addListener("keyboardDidHide", handleKeyboardHide);

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    const steps = useMemo(() => [
        { id: 1, component: SeedPhraseView },
        { id: 2, component: SeedPhraseVerification },
        { id: 3, component: () => <EnterPassword type="enter" onPasswordChange={setPassword} /> },
        { id: 4, component: () => <EnterPassword type="confirm" onPasswordChange={setConfirmPassword} /> },
    ], []);

    const handleNextStep = async () => {
        if (!validateCurrentStep(currentStepIndex, isSeedPhraseVerified, password, confirmPassword)) {
            return;
        }
        if (currentStepIndex === Step.CONFIRM_PASSWORD) {
            await handleWallet();
            return;
        }
        currentStepIndex < 3 && setCurrentStepIndex((prevIndex) => prevIndex + 1);
    };

    const handleWallet = async () => {
        setIsLoading(true)
        const words = await getSeed();
        if (isRestoreWallet) {
            await restoreAndStoreWallet(words);
            return;
        }
        await createAndStoreWallet(words);
    };

    const restoreAndStoreWallet = async (words) => {
        try {
            const { account, wallet } = await restoreWallet(words);
            (await hasSeed()) && (await clearVaultStorage());
            await init(str2buf(confirmPassword));
            await storeSeed(words);
            updateWalletState(account, wallet);
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
        }
    };

    const createAndStoreWallet = async (words) => {
        try {
            const { account, wallet } = await createWallet(words);
            const encoder = new TextEncoder();
            await changePassword(str2buf(''), encoder.encode(confirmPassword));
            updateWalletState(account, wallet);
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
        }
    };

    const updateWalletState = (account, wallet) => {
        dispatch(setAccount(account));
        dispatch(setWallet(wallet));
        dispatch(clearSeedPhraseReducer());
        dispatch(setIsWalletCreated(true));
        resetNavigation( isRestoreWallet?RouteType.WALLETRESTORED : RouteType.SUCCESS);
    };

    const handlePreviousStep = () => {
        if ((backupLatter && currentStepIndex === Step.ENTER_PASSWORD) || (isRestoreWallet && currentStepIndex === Step.SEEDPHRASE_VERIFICATION)) {
            goBack();
            return;
        }
        setCurrentStepIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : (goBack(), prevIndex)));
    };

    const CurrentStepComponent = steps[currentStepIndex]?.component;

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.seePhrasecontainer}>
            {isLoading && <Loader loading={isLoading} />}
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}>
                <View style={styles.contentContainer}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[styles.button, currentStepIndex >= 0 && styles.disabledButton]}
                            onPress={handlePreviousStep}>
                            <Text style={styles.buttonText}>{strings.back}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.stepContainer}>
                        <Text style={styles.stepText}>
                            Step {backupLatter
                                ? currentStepIndex - 1
                                : isRestoreWallet
                                    ? currentStepIndex
                                    : currentStepIndex + 1}
                        </Text>
                        <View style={styles.progressBarContainer}>
                            <View style={[styles.progressBar, {
                                width: `${(backupLatter
                                    ? (currentStepIndex - 1) / 2
                                    : isRestoreWallet
                                        ? currentStepIndex / 3
                                        : (currentStepIndex + 1) / 4) * 100}%`
                            }]} />
                        </View>
                    </View>
                    {CurrentStepComponent && <CurrentStepComponent />}
                </View>
            </ScrollView>
            {!isKeyboardVisible && (
                <View style={styles.buttonContainerConitnue}>
                    <CommonButton
                        title={strings.continue}
                        onPress={handleNextStep}
                        backgroundColor={Color.orangeButton}
                        textColor={Color.white}
                        borderColor={Color.orangeBorder}
                        width={"100%"}
                        disabled={disabled}
                        height={Responsive.size50}
                    />
                </View>
            )}
        </KeyboardAvoidingView>
    );
};
export default SeedPhrase;
import CommonButton from "@components/CommonButton";
import { goBack, push } from "@routes/Navigator";
import { SENDCONFIRMATION } from "@routes/RouteType";
import { strings } from "@strings/i18n";
import { Responsive } from "@utils/Responsive";
import { orangeButton, white } from "@values/color";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import CustomTextInput from "@components/CustomTextInput";

const EditNonce = () => {
    const [value, setValue] = useState('');
    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <TouchableOpacity style={styles.button} onPress={() => goBack()}>
                    <Text style={styles.buttonText}>{strings.back}</Text>
                </TouchableOpacity>
                <Text style={styles.title}>{strings.editNonce}</Text>
                <Text style={styles.description}>{strings.editNonceMessage}</Text>

                <View style={[styles.inputContainer, { marginTop: Responsive.size50 }]}>
                    <Text style={styles.description}>{strings.enterNonce}</Text>
                    <CustomTextInput
                        placeholder={'0'}
                        value={value}
                        onChangeText={setValue}
                        style={[styles.input, {}]}
                        onRightTextPress={() => console.log('Text clicked')} />

                </View>
            </View>

            <View style={styles.buttonContainer}>
                <CommonButton
                    title={strings.apply}
                    onPress={() => goBack()}
                    backgroundColor={orangeButton}
                    textColor={white}
                    width={'100%'}
                    height={Responsive.size45} />
            </View>
        </View>
    );
};

export default EditNonce;

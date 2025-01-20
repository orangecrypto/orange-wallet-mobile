import CommonButton from "@components/CommonButton";
import { goBack, push } from "@routes/Navigator";
import { SENDCONFIRMATION } from "@routes/RouteType";
import { strings } from "@strings/i18n";
import { Responsive } from "@utils/Responsive";
import { orangeButton, white } from "@values/color";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

const EditFees = () => {

    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <TouchableOpacity style={styles.button} onPress={() => goBack()}>
                    <Text style={styles.buttonText}>{strings.back}</Text>
                </TouchableOpacity>
                <Text style={styles.title}>{strings.editFees}</Text>
                <Text style={styles.description}>{strings.editFeesMessage}</Text>
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

export default EditFees;

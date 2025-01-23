import CommonButton from "@components/CommonButton";
import CustomTextInput from "@components/CustomTextInput";
import { goBack } from "@routes/Navigator";
import { strings } from "@strings/i18n";
import { Responsive } from "@utils/Responsive";
import { Color } from "@values/color";
import React, { useEffect, useState } from "react";
import { Keyboard, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

const EditFees = () => {
    const [value, setValue] = useState('');
    const [selectedCategory, setSelectedCategory] = useState("All");

 const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setIsKeyboardVisible(true);
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setIsKeyboardVisible(false);
        });
        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    const categories = ["Regular", "Fast", "Custom"];
    const renderCategory = (category) => (
        <TouchableOpacity
            key={category}
            onPress={() => setSelectedCategory(category)} // Update the selected category
            style={[
                styles.categoryButton,
                selectedCategory === category && styles.selectedCategory,
            ]}
        >
            <Text
                style={[
                    styles.categoryText,
                    selectedCategory === category && styles.selectedCategoryText,
                ]}
            >
                {category}
            </Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <TouchableOpacity style={styles.button} onPress={() => goBack()}>
                    <Text style={styles.buttonText}>{strings.back}</Text>
                </TouchableOpacity>
                <Text style={styles.title}>{strings.editFees}</Text>
                <Text style={styles.description}>{strings.editFeesMessage}</Text>
                <View style={[styles.inputContainer, { marginTop: Responsive.size50 }]}>
                    <Text style={styles.description}>{strings.enterFeesAmount}</Text>
                    <CustomTextInput
                        placeholder={'0'}
                        value={value}
                        onChangeText={setValue}
                        rightText={'8.232 Sats'}
                        rightText1={'~ $ 2.84 USD'}
                        style={[styles.input, {}]}
                        keyboardType={'numeric'}
                        rightTextStyle={styles.feesTextRight}
                        rightTextStyle1={styles.feesTextRight1}
                        />
                </View>

                <View style={styles.categoryContainer}>
                    {categories.map((category) => renderCategory(category))}
                </View>
            </View>
            {!isKeyboardVisible && ( <View style={styles.buttonContainer}>
                <CommonButton
                    title={strings.apply}
                    onPress={() => goBack()}
                    backgroundColor={Color.orangeButton}
                    textColor={Color.white}
                    width={'100%'}
                    height={Responsive.size50} />
            </View>)}
        </View>
    );
};

export default EditFees;

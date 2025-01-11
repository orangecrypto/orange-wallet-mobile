import * as React from "react";
import {
    View,
    Image,
    Text,
    StyleProp,
    ViewStyle,
    TextStyle,
    ImageStyle,
    TouchableOpacity,
    ImageSourcePropType,
    StyleSheet,
} from "react-native";
import { fontTextMedium, Style } from "../resources/styles";
import { Responsive } from "../utils/Responsive";
import { localAssets } from "../resources/assets/assets";


interface Style {
    container: ViewStyle;
    iconImageStyle: ImageStyle;
    textContainer: ViewStyle;
    textStyle: TextStyle;
}

const styles = StyleSheet.create<Style>({
    container: {
        height: Responsive.size40,
        borderRadius: Responsive.size8,
        width: Style.DEVICE_WIDTH * 0.9,
        paddingLeft: Style.DEVICE_WIDTH * 0.2,
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: "#e9eef4",
    },
    iconImageStyle: {
        width: Responsive.size20,
        height: Responsive.size20,
    },
    textContainer: {
        marginLeft: Responsive.size16,
    },
    textStyle: {
        color: "#315092",
        ...fontTextMedium()
    },
});


type CustomStyleProp = StyleProp<ViewStyle> | Array<StyleProp<ViewStyle>>;
type CustomImageStyleProp =
    | StyleProp<ImageStyle>
    | Array<StyleProp<ImageStyle>>;
type CustomTextStyleProp = StyleProp<TextStyle> | Array<StyleProp<TextStyle>>;

export interface ISocialButtonProps {
    text: string;
    style?: CustomStyleProp;
    textStyle?: CustomTextStyleProp;
    imageSource?: ImageSourcePropType;
    textContainerStyle?: CustomStyleProp;
    iconImageStyle?: CustomImageStyleProp;
    TouchableComponent?: any;
    onPress: () => void;
}

const SocialButton: React.FC<ISocialButtonProps> = ({
    style,
    text,
    textStyle,
    iconImageStyle,
    textContainerStyle,
    TouchableComponent = TouchableOpacity,
    imageSource = localAssets.facebook,
    onPress,
}) => {
    return (
        <TouchableComponent style={[styles.container, style]} onPress={onPress}>
            <Image
                resizeMode="contain"
                source={imageSource}
                style={[styles.iconImageStyle, iconImageStyle]}
            />
            <View style={[styles.textContainer, textContainerStyle]}>
                <Text style={[styles.textStyle, textStyle]}>{text}</Text>
            </View>
        </TouchableComponent>
    );
};

export default SocialButton;

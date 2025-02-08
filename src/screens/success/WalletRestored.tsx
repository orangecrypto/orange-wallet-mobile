import { localAssets } from "@assets/assets";
import CommonButton from "@components/CommonButton";
import { push, resetNavigation } from "@routes/Navigator";
import { RouteType } from "@routes/RouteType";
import { strings } from "@strings/i18n";
import { Responsive } from '@utils/Responsive';
import { Color } from "@values/color";
import { Image, Text, View } from "react-native";
import { styles } from "./styles";

const WalletRestored = () => {

    return (
        <View style={styles.container}>
            <View style={styles.contentPage}>
                <Image source={localAssets.congratulation} style={styles.icon} resizeMode="contain" />
                <Text style={styles.contentTitle}>{strings.walletRestored}</Text>
                <Text style={styles.contentDescription}>{strings.walletRestoredMessage}</Text>
            </View>
            <View style={styles.buttonContainer}>
                <CommonButton
                    title={strings.next}
                    onPress={() => resetNavigation(RouteType.WALLETBALANCE)}
                    backgroundColor={Color.orangeButton}
                    textColor={Color.white}
                    borderColor={Color.orangeBorder}
                    width={"100%"}
                    height={Responsive.size50}/>
            </View>
        </View>
    );
};
export default WalletRestored;

import { localAssets } from '@assets/assets'; // Make sure this import path is correct
import { Responsive } from '@utils/Responsive';
import { Color } from '@values/color';
import { Image } from 'react-native';

const TabNavigatorConfig = {
    tabBarStyle: {
        backgroundColor: Color.black,
        borderTopLeftRadius: Responsive.size30,
        borderTopRightRadius: Responsive.size30,
        height: Responsive.size70,
        paddingBottom: Responsive.size10,
        position: 'absolute',
    },
    tabBarIcon: ({ focused, route }) => {
        let iconSize = { width: Responsive.size24, height: Responsive.size24 };

        let iconSource;
        switch (route.name) {
            case 'Wallet':
                iconSource = focused ? localAssets.eye : localAssets.bottomwallet; 
                break;
            case 'Market':
                iconSource = focused ? localAssets.marketbottom : localAssets.marketbottom;
                break;
            case 'NFT':
                iconSource = focused ? localAssets.bottomnft : localAssets.bottomnft;
                break;
            case 'Assistant':
                iconSource = focused ? localAssets.bottomassitant : localAssets.bottomassitant;
                break;
            default:
                iconSource = null;
                break;
        }
        return iconSource ? <Image source={localAssets.eyeoff} style={iconSize} /> : null;
    },
    tabBarActiveTintColor: 'red',
    tabBarInactiveTintColor: 'gray',
    tabBarShowLabel: false, 
    tabBarIconStyle: {
        padding: Responsive.size100,
        borderRadius: Responsive.size20,
        backgroundColor: '#fff', 
    },
};
export default TabNavigatorConfig;
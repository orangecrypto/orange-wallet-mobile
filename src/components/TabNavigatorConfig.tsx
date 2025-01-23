import { localAssets } from '@assets/assets'; // Make sure this import path is correct
import { Responsive } from '@utils/Responsive';
import { Color } from '@values/color';
import { Image } from 'react-native';

const TabNavigatorConfig = {
    tabBarStyle: {
        backgroundColor: Color.black,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        height: 70,
        paddingBottom: 10,
        position: 'absolute',
    },
    tabBarIcon: ({ focused, route }) => {
        let iconSize = { width: Responsive.size24, height: Responsive.size24 };

        // Set the appropriate icon for the focused state
        let iconSource;
        switch (route.name) {
            case 'Wallet':
                iconSource = focused ? localAssets.eye : localAssets.bottomwallet; // Change to your desired icon for active/inactive
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

        // Render the icon for each tab
        return iconSource ? <Image source={localAssets.eyeoff} style={iconSize} /> : null;
    },
    tabBarActiveTintColor: 'red',
    tabBarInactiveTintColor: 'gray',
    tabBarShowLabel: false, // Hide text labels
    tabBarIconStyle: {
        padding: 100,
        borderRadius: 20,
        backgroundColor: '#fff', // Optional background color around icons
    },
};

export default TabNavigatorConfig;

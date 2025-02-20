import { appReducerType, setAccountList, setSelectedAccount } from '@redux/slice/appReducer';
import { goBack, resetNavigation } from '@routes/Navigator';
import { strings } from '@strings/i18n';
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from 'react-redux';
import { styles } from './styles';
import { truncateAddress } from '@utils/Convert';
import useSeedVault from '@hooks/useSeedVault';
import { createWalletAccount, StacksMainnet } from '@orangecryptohq/orangeseed';
import { store, useAppDispatch } from '@redux/store';
import { useState } from 'react';
import Loader from '@components/Loader';
import Toast from 'react-native-toast-message';
import { Dispatch } from '@reduxjs/toolkit';
import { RouteType } from '@routes/RouteType';
import useSelectedNetwork from '@hooks/useSelectedNetwork';

const AddAddress = () => {
    const { getSeed }= useSeedVault()
    const { accountList } = useSelector((state: { seedPhraseReducer: appReducerType }) => state.appReducer);
    const network =store.getState().appReducer?.network
    const selectedNetwork= useSelectedNetwork()
    
    const dispatch: Dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const addAddress =async () => {
        try
        {
            setIsLoading(true)
            const seedPhrase = await getSeed();
            const newAccountsList = await createWalletAccount(
            seedPhrase,
            network,
            selectedNetwork,
            accountList,
            );
            console.log('newAccountsList : ',newAccountsList)
            dispatch(setAccountList(newAccountsList))
        }catch(error){
            setIsLoading(false)
            console.log('addAddress : ',error)    
             Toast.show({ type: 'error', text1: error.message });
        }
        setIsLoading(false)
       
    };

    const selectAccount = async (item)=>{
        dispatch(setSelectedAccount(item))
        resetNavigation(RouteType.WALLETBALANCE)
    }

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.item} onPress={()=>selectAccount(item)}>
            <Text style={styles.text}>
                <Text style={styles.primaryText}>{truncateAddress(item.btcAddress)}</Text> /{' '}
                <Text style={styles.secondaryText}>{truncateAddress(item.stxAddress)}</Text>
            </Text>
        </TouchableOpacity>
    );
    return (
        <View style={styles.container}>
             {isLoading && <Loader loading={isLoading} />}
            <View style={styles.contentContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => goBack()} >
                    <Text style={styles.buttonText}>{strings.back}</Text>
                </TouchableOpacity>
                <Text style={styles.addAddress}>{strings.addAddress}</Text>
                <Text style={styles.addAddressMessage}>{strings.addAddressMessage}</Text>

                <FlatList
                    data={accountList}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem} />

                <TouchableOpacity style={styles.addAddressButton} onPress={() => { addAddress() }}>
                    <Text style={styles.addAddressButtonText}>{strings.addNewAddress}</Text>
                </TouchableOpacity>
            </View>          
        </View>
    );
};

export default AddAddress;
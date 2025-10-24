import { useEffect } from 'react';
import { Alert, Linking } from 'react-native';

export const useHandleDeepLink = () => {

  useEffect(() => {
    const handleUrl = (event: { url: string }) => {
      const parsed = new URL(event.url);
      const screen = parsed.searchParams.get('screen');
      const userId = parsed.searchParams.get('userId');
      console.log('useHandleDeepLink', `screen : ${screen}`)
      if (screen === 'walletbalance') {
        //navigation.navigate('WalletBalance', { userId });
        console.log('useHandleDeepLink', `userId : ${userId}`)
        Alert.alert(
          'Connection Request',
          `User ID: ${userId} is requesting to connect.\nDo you want to proceed?`,
          [
            {
              text: 'Cancel',
              style: 'cancel',
              onPress: () => {
                console.log('Connection cancelled');
                const callbackUrl = `http://192.168.0.101:5173/homepage?status=cancelled&userId=${userId}`;

                Linking.openURL(callbackUrl).catch((err) => {
                  console.warn('Failed to open callback URL:', err);
                });
              },
            },
            {
              text: 'OK',
              onPress: () => {
                console.log('Connection approved');
                const callbackUrl = `http://192.168.0.101:5173/homepage?status=approved&userId=${userId}`

                Linking.openURL(callbackUrl).catch((err) => {
                  console.warn('Failed to open callback URL:', err);
                });
              },
            },
          ],
          { cancelable: false }
        );
      }
    };

    // Listen to incoming links
    const subscription = Linking.addEventListener('url', handleUrl);

    // Also handle the initial URL (if app opened from closed state)
    Linking.getInitialURL().then((url) => {
      if (url) handleUrl({ url });
    });

    return () => {
      subscription.remove();
    };
  }, []);
};

import { store } from '@redux/store';
import { useState, useEffect } from 'react';
import { fetchStxAddressData } from '@orangecryptohq/orangeseed';
import useSelectedNetwork from './useSelectedNetwork';

const useStxData = () => {
    const stxAddress = store.getState().appReducer.selectedAccount?.stxAddress;
    const network = useSelectedNetwork();
    const offset = 0, paginationLimit = 10;
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            const data = await fetchStxAddressData(stxAddress, network, offset, paginationLimit);
            setData(data);
        } catch (err) {
            console.error("Error fetching STX data:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (stxAddress && network) {
            fetchData();
        }
    }, [stxAddress, network]);

    return { data, loading };
};

export default useStxData;

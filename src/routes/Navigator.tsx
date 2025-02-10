
import * as React from 'react';
import { CommonActions, NavigationContainerRef, StackActions } from '@react-navigation/native';

export const navigationRef: React.RefObject<NavigationContainerRef<any>> = React.createRef<NavigationContainerRef<any>>();


const navigate = (name: string, params?: object | undefined) => {
    navigationRef.current?.navigate(name, params);
};

const push = (name: string, params?: object | undefined) => {
    navigationRef.current?.dispatch(
        StackActions.push(name, params)
    );
};

const replace = (name: string, params?: object | undefined) => {
    navigationRef.current?.dispatch(
        StackActions.replace(name, params)
    );
}
const popToTop = () => {
    navigationRef.current?.dispatch(
        StackActions.popToTop()
    )
}

const getRoute = () => {
    return navigationRef.current?.getCurrentRoute()
};

const goBack = () => {
    
    navigationRef.current?.goBack()
}

const resetNavigation = (name: string, params?: object | undefined) => {
    navigationRef.current?.dispatch(
        CommonActions.reset({
            index: 1,
            routes: [{ name, params },],
        })
    );
};

export {
    resetNavigation,
    goBack,
    getRoute,
    popToTop,
    replace,
    push,
    navigate
}


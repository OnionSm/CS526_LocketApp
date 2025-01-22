import NetInfo from '@react-native-community/netinfo';

export class networkService
{
    static checkNetwork = async (): Promise<boolean> => {
        const state = await NetInfo.fetch();
        return state.isConnected ?? false;
    };
}



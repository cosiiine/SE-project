import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
    // 整體比例, 標題框, 灰框
    container: {
        backgroundColor: '#fcfcfd',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    appbar: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#ccc',
        flexDirection: 'row',
        alignItems: 'center',
        width: '95%',
        flex: 1,
        marginTop: 20,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    allContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '95%',
        flex: 9,
    },
    frame: {
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 20,
        padding: 20,
        borderColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
        width: '95%',
    },
    // 各區比例
    drawer: {
        width: '8%',
    },
    member: {
        justifyContent: 'flex-start',
        width: '25%',
    },
    content: {
        width: '65%',
    },
    // 主題色, 字體設定
    color: {
        color: '#6D53F1',
    },
    titleText: {
        color: '#333',
        fontWeight: 'bold',
        fontSize: 26,
        margin: 10,
        letterSpacing: 1,
    },
    contentText: {
        color: '#333',
        fontSize: 18,
        letterSpacing: 1,
    },
    // 輸入框, 按鈕設定
    input: {
        borderWidth: 1,
        borderRadius: 5,
        height: 40,
        width: 200,
        margin: 10,
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: '#6D53F1',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        width: 200,
        margin: 10,
    },
    drawerButton: {
        color: '#333',
        fontSize: 45,   
        marginVertical: 10,      
    },
    // 頭像圓框
    circle: {
        width: 40,
        height: 40,
        marginRight: 15,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E1DEFC',
    }
});
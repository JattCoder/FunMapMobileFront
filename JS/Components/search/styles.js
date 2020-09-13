import { StyleSheet } from 'react-native'

export default Styles = StyleSheet.create({
    Page: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
    },
    Clear: {
        borderRadius: 25,
        height: 20,
        width: 20,
        backgroundColor: 'rgba(0,0,0,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10
    },
    Input: {
        paddingHorizontal: 15,
        width: '100%',
    },
    List: {
        width: 300,
        borderRadius: 10,
        borderWidth: 1,
        marginTop: '6%',
        backgroundColor: 'rgba(0,0,0,0.2)',
        position: 'absolute',
        maxHeight: 400,
        minHeight: 110
    }
})
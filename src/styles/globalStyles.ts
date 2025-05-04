import { StyleSheet } from "react-native";
import { appColors } from "../contants/appColors";
import { fontFamilies } from "../contants/fontFamilies";

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: appColors.background,
    },
    text: {
        fontFamily: fontFamilies.regular,
        fontSize: 14,
        color: appColors.white,
    }
})
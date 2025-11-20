import React from "react";
import { Image } from "react-native";
import roomDetailStyles from "../../styles/roomDetail";

const RoomDetailImage = ({ image }: any) => {
    return <Image source={image} style={roomDetailStyles.roomImage} />;
};

export default RoomDetailImage;

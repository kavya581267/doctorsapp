// Spacer.tsx
import React from 'react';
import { View } from 'react-native';

type props = {
    height: number
}

const Spacer = (props: props) => {
    return <View style={
        { height:props.height}
    } />;
};

export default Spacer;


import React, { useState } from 'react';

import { View, TouchableOpacity} from "react-native";

function RadioBulgeDistance(props) {
    return (
        <TouchableOpacity onPress={props.onPress}>
        <View style={[{
          height: props.selected?30:20,
          width: props.selected?30:20,
          borderRadius: props.selected?15:10,
          borderWidth: 2,
          borderColor: 'green',
          alignItems: 'center',
          justifyContent: 'center',
        }, props.style]}>
          {
            props.selected ?
              <View style={{
                height: 12,
                width: 12,
                borderRadius: 6,
                backgroundColor: 'green',
              }}/>
              : null
          }
        </View></TouchableOpacity>
    );
  }

  export default RadioBulgeDistance;

import React, { useState } from 'react';

import { View, TouchableOpacity} from "react-native";

function RadioButton(props) {
    return (
        <TouchableOpacity onPress={props.onPress}>
        <View style={[{
          height: 24,
          width: 24,
          borderRadius: 12,
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

  export default RadioButton;
/* eslint-disable react-native/no-inline-styles */
import React, { memo } from 'react';
import { View } from 'react-native';
import { Select, Text } from 'native-base';

const SelectInput = ({ placeholder, label, list, ...props }: any) => (
  <View style={{ marginTop: 20, width: '100%' }}>
    {label && (
      <Text style={{ marginBottom: 10, fontWeight: '700', fontSize: 15 }}>
        {label}
      </Text>
    )}
    <Select variant="filled" placeholder={placeholder} {...props}>
      {list.map((el: any, index: number) => {
        return <Select.Item key={index} label={el.label} value={el.value} />;
      })}
    </Select>
  </View>
);

export default memo(SelectInput);

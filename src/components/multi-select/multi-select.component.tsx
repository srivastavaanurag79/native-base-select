/* eslint-disable react-native/no-inline-styles */
import React, { memo, useState, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Actionsheet, Text, useDisclose, ScrollView } from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';

const MultiSelectInput = ({
  label,
  list,
  onSelection,
  value,
  selectedList,
  placeholder,
}: any) => {
  const [arrayList, setArrayList] = useState([...list]);
  const { isOpen, onOpen, onClose } = useDisclose();
  const [selectedValues, setSelectedValues] = useState([...selectedList]); // selected values

  useEffect(() => {
    setArrayList([...list]);
    setSelectedValues([...selectedList]);
  }, [value, list, selectedList]);

  const _onClose = () => {
    var data = [...arrayList];
    var selectedData = [...selectedValues];
    let _temp: Array<any> = [];
    selectedData.forEach((val) => {
      data.forEach((el) => {
        if (val.name === el.name) {
          _temp.push(el.name);
        }
      });
    });
    value = _temp.join();
    onSelection({ text: _temp.join(), selectedList: selectedData });
    // selectInputRef.current.blur();
    onClose();
  };

  const _onFocus = () => {
    setArrayList([...list]);
    setSelectedValues([...selectedList]);
    onOpen();
  };
  const _onClick = (item: any) => {
    const selectedData = [...selectedValues];
    const indexSelected = selectedData.indexOf(item);
    if (indexSelected > -1) {
      selectedData.splice(indexSelected, 1);
    } else {
      selectedData.push(item);
    }
    setSelectedValues(selectedData);
  };
  const _exists = (item: any) => {
    return selectedValues.indexOf(item) > -1 ? true : false;
  };
  return (
    <View style={{ marginTop: 20, width: '100%' }}>
      {label && (
        <Text style={{ marginBottom: 10, fontWeight: '700', fontSize: 15 }}>
          {label}
        </Text>
      )}
      <TouchableOpacity onPress={() => _onFocus()}>
        <View
          style={{
            flexDirection: 'row',
            flexGrow: 1,
            paddingHorizontal: 14,
            paddingVertical: 12,
            backgroundColor: '#e5e5e5',
            borderRadius: 6,
            flexWrap: 'wrap',
            minHeight: 45,
            height: 'auto',
          }}
        >
          {selectedList.length === 0 ? (
            <Text style={{ color: 'gray', fontSize: 12 }}>{placeholder}</Text>
          ) : (
            selectedList.map((el: any, index: number) => {
              return (
                <Text
                  key={index}
                  style={{
                    fontSize: 14,
                    backgroundColor: 'silver',
                    padding: 5,
                    borderRadius: 6,
                    margin: 3,
                  }}
                >
                  {el.name}
                </Text>
              );
            })
          )}
        </View>
      </TouchableOpacity>

      <Actionsheet
        isOpen={isOpen}
        hideDragIndicator={true}
        onClose={() => {
          _onClose();
        }}
        size="full"
      >
        <Actionsheet.Content>
          <ScrollView style={{ width: '100%' }}>
            {arrayList.map((el, index) => {
              return (
                <Actionsheet.Item
                  onPress={() => _onClick(el)}
                  key={index}
                  startIcon={
                    _exists(el) ? (
                      <Icon
                        name="md-checkmark-circle"
                        size={24}
                        color="black"
                      />
                    ) : (
                      <View style={{ paddingHorizontal: 12 }} />
                    )
                  }
                >
                  <Text key={index}>{el.name}</Text>
                </Actionsheet.Item>
              );
            })}
          </ScrollView>
        </Actionsheet.Content>
      </Actionsheet>
    </View>
  );
};

export default memo(MultiSelectInput);

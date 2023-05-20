/* eslint-disable react-native/no-inline-styles */
import React, { memo, useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Platform,
  TextInput,
} from 'react-native';
import {
  Actionsheet,
  Text,
  useDisclose,
  ScrollView,
  KeyboardAvoidingView,
} from 'native-base';
import type { Select } from 'src/interface/select.interface';

const BTMultiSelect = ({
  label,
  list,
  onSelection,
  selectedList,
  placeholder,
  pillStyle,
  placeHolderStyle,
  labelStyle,
  selectInputStyle,
  errorText,
  errorStyle,
  listTextStyle,
  actionSheetBackgroundColor,
  searchStyle,
}: Select) => {
  const [arrayList, setArrayList] = useState([...list]);
  const [arrayHolder, setArrayHolder] = useState([...list]);
  const { isOpen, onOpen, onClose } = useDisclose();
  const [selectedValues, setSelectedValues] = useState([...selectedList]); // selected values
  const [search, setSearch] = useState('');

  useEffect(() => {
    setArrayList([...list]);
    setSelectedValues([...selectedList]);
  }, [list, selectedList]);

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
    onSelection({ text: _temp.join(), selectedList: selectedData });
    // selectInputRef.current.blur();
    setSearch('');
    onClose();
  };

  const _onFocus = () => {
    setArrayList([...list]);
    setArrayHolder([...list]);
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
    const existingData = [...selectedValues];
    return existingData.map(e => e._id).indexOf(item._id) > -1 ? true : false;
  };

  const _filterFunction = (text: string) => {
    setSearch(text);
    const newData = arrayHolder.filter((item) =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );
    setArrayList(newData);
  };
  return (
    <View style={{ marginTop: 20, width: '100%' }}>
      {label && (
        <Text
          style={{
            marginBottom: 10,
            fontWeight: labelStyle?.fontWeight || '700',
            fontSize: labelStyle?.fontSize || 15,
            color: labelStyle?.textColor || '#000',
          }}
        >
          {label}
        </Text>
      )}
      <TouchableOpacity onPress={() => _onFocus()}>
        <View
          style={{
            flexDirection: 'row',
            flexGrow: 1,
            paddingHorizontal: selectInputStyle?.paddingHorizontal || 14,
            paddingVertical: selectInputStyle?.paddingVertical || 12,
            backgroundColor: selectInputStyle?.backgroundColor || '#e5e5e5',
            borderRadius: selectInputStyle?.borderRadius || 6,
            flexWrap: 'wrap',
            minHeight: 45,
            height: 'auto',
          }}
        >
          {selectedList.length === 0 ? (
            <Text
              style={{
                color: placeHolderStyle?.textColor || 'gray',
                fontSize: placeHolderStyle?.fontSize || 12,
                fontWeight: placeHolderStyle?.fontWeight || '400',
              }}
            >
              {placeholder}
            </Text>
          ) : (
            selectedList.map((el: any, index: number) => {
              return (
                <Text
                  key={index}
                  style={{
                    fontSize: pillStyle?.fontSize || 14,
                    backgroundColor: pillStyle?.backgroundColor || 'silver',
                    color: pillStyle?.textColor || '#000',
                    padding: 8,
                    borderRadius: pillStyle?.borderRadius || 6,
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
        <View
          style={{
            justifyContent: 'center',
            alignContent: 'center',
            alignSelf: 'center',
            alignItems: 'center',
            top: -20,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              _onClose();
            }}
            style={{ borderRadius: 50, backgroundColor: 'white', padding: 3 }}
          >
            <Image
              source={require('../../assets/cancel.png')}
              resizeMode="contain"
              resizeMethod="auto"
              style={{
                width: 50,
                height: 50,
                justifyContent: 'center',
                alignSelf: 'center',
              }}
            />
          </TouchableOpacity>
        </View>
        <Actionsheet.Content
          style={{ backgroundColor: actionSheetBackgroundColor || '#f5f5f5' }}
        >
          <KeyboardAvoidingView
            style={{ width: '100%', maxHeight: 350 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          >
            <TextInput
              placeholder="Search"
              inlineImageLeft="search_icon"
              onChangeText={(text: string) => _filterFunction(text)}
              value={search}
              style={{
                height: 40,
                borderRadius: searchStyle?.borderRadius || 20,
                fontSize: 12,
                paddingLeft: 10,
                paddingRight: 10,
                borderColor: searchStyle?.borderColor || '#e5e5e5',
                borderWidth: 1,
                backgroundColor: searchStyle?.backgroundColor || '#e5e5e5',
                marginVertical: 10,
                marginHorizontal: 8,
                color: searchStyle?.textColor || '#000',
              }}
            />
            <ScrollView
              persistentScrollbar={true}
              showsVerticalScrollIndicator={true}
              style={{ width: '100%', marginBottom: 20 }}
            >
              {arrayList.map((el, index) => {
                return (
                  <Actionsheet.Item
                    onPress={() => _onClick(el)}
                    key={index}
                    startIcon={
                      _exists(el) ? (
                        <Image
                          source={require('../../assets/check.png')}
                          resizeMode="contain"
                          resizeMethod="auto"
                          style={{
                            width: 24,
                            height: 24,
                            justifyContent: 'center',
                            alignSelf: 'center',
                          }}
                        />
                      ) : (
                        <Image
                          source={require('../../assets/uncheck.png')}
                          resizeMode="contain"
                          resizeMethod="auto"
                          style={{
                            width: 20,
                            height: 20,
                            justifyContent: 'center',
                            alignSelf: 'center',
                          }}
                        />
                      )
                    }
                  >
                    <Text key={index} style={listTextStyle}>
                      {el.name}
                    </Text>
                  </Actionsheet.Item>
                );
              })}
            </ScrollView>
          </KeyboardAvoidingView>
        </Actionsheet.Content>
      </Actionsheet>
      {errorText.length > 0 ? (
        <Text
          style={{
            marginBottom: 10,
            fontWeight: errorStyle?.fontWeight || '500',
            fontSize: errorStyle?.fontSize || 12,
            color: errorStyle?.textColor || 'red',
          }}
        >
          {errorText}
        </Text>
      ) : (
        <View style={{ margin: 0 }} />
      )}
    </View>
  );
};

export default memo(BTMultiSelect);

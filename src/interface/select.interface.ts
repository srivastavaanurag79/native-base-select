import type { ViewStyle, TextStyle } from 'react-native';

export interface list {
  _id: string;
  name: string;
}

export interface Select {
  list: Array<list>;
  label: string;
  onSelection: (item: any) => void;
  selectedList: list[];
  placeholder: string;
  selectInputStyle?: {
    paddingHorizontal?: number;
    paddingVertical?: number;
    backgroundColor?: ViewStyle['backgroundColor'];
    borderRadius?: number;
  };
  pillStyle?: {
    backgroundColor?: ViewStyle['backgroundColor'];
    textColor?: TextStyle['color'];
    fontSize?: TextStyle['fontSize'];
    fontWeight?: TextStyle['fontWeight'];
    borderRadius?: number;
  };
  placeHolderStyle?: {
    textColor?: TextStyle['color'];
    fontSize?: TextStyle['fontSize'];
    fontWeight?: TextStyle['fontWeight'];
  };
  labelStyle?: {
    textColor?: TextStyle['color'];
    fontSize?: TextStyle['fontSize'];
    fontWeight?: TextStyle['fontWeight'];
  };
  errorStyle?: {
    textColor?: TextStyle['color'];
    fontSize?: TextStyle['fontSize'];
    fontWeight?: TextStyle['fontWeight'];
  };
  selectedIconStyle?: {
    color?: TextStyle['color'];
    size?: number;
  };
  errorText: string;
  listTextStyle?: TextStyle;
  actionSheetBackgroundColor?: ViewStyle['backgroundColor'];
  searchStyle?: {
    backgroundColor?: ViewStyle['backgroundColor'];
    textColor?: TextStyle['color'];
    borderRadius?: number;
    borderColor: ViewStyle['borderColor'];
  };
}

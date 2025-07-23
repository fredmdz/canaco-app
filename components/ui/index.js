import ViewScrollParent from "./view/scroll/ViewScrollParent";
import ViewScrollParentFull from "./view/scroll/ViewScrollParentFull";
// parent
import ViewParent from "./view/ViewParent";
import ViewChild from "./view/ViewChild";

import BackgroundColor from "./background/BackgroundColor";
import BackgroundImage from "./background/BackgroundImage";

import FormImage from "./form/FormImage";
import FormInput from "./form/FormInput";
import FormPickerDate from "./form/FormPickerDate";
import FormPicker from "./form/FormPicker";
import FormPickerItem from "./form/FormPickerItem";

import ListEmpty from "./lists/ListEmpty";
import ListHeader from "./lists/ListHeader";
import ListItem from "./lists/ListItem";
import ListParent from "./lists/ListParent";

import PreLoader from "./PreLoader";

const View = {
  Scroll: {
    Parent: ViewScrollParent,
    ParentFull: ViewScrollParentFull,
  },
  Parent: ViewParent,
  Child: ViewChild,
};

const Background = {
  Color: BackgroundColor,
  Image: BackgroundImage,
};

const Form = {
  Input: FormInput,
  PickerDate: FormPickerDate,
  Picker: FormPicker,
  PickerItem: FormPickerItem,
  Image: FormImage,
};

const List = {
  Empty: ListEmpty,
  Header: ListHeader,
  Item: ListItem,
  Parent: ListParent,
};

export { View, Background, Form, List, PreLoader };

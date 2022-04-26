/* eslint-disable react/prop-types */
import React, {useState} from "react";
import {useCombobox, useMultipleSelection} from "downshift";
import {
  AllComboboxWrapper,
  MenuMultiple,
  Combobox,
  ComboboxWrapper,
  SelectedItem,
  SelectedItemIcon,
  ShowTagOptions,
  TagTitle,
  SearchTagInput,
} from "../styles/MultipleCombobox.modul";
import {useEffect} from "react";
import { items } from "../const";

function MultipleCombobox(props) {
  const [inputValue, setInputValue] = useState("");

// ==============================
// make sure it wont cause infinite loop
  useEffect(() => {
    // set limits for selectedItems
    props.setPinTags(selectedItems);
  },[selectedItems]);

  // const items = [
  //   "Animal",
  //   "Black & Gray",
  //   "Blackwork",
  //   "Chicano",
  //   "Classic Americana",
  //   "Dark Art",
  //   "Dotwork",
  //   "Fineline",
  //   "Funny",
  //   "Geometric",
  //   "Hand-Poked",
  //   "Illustrative",
  //   "Japanese",
  //   "Lettering",
  //   "Nature",
  //   "Neo Traditional",
  //   "New School Americana",
  //   "Portraiture",
  //   "Realism",
  //   "Pet",
  //   "Flora",
  //   "Tribal",
  //   "Vintage",
  //   "Watercolor",
  // ];

  const {
    getSelectedItemProps,
    getDropdownProps,
    addSelectedItem,
    removeSelectedItem,
    selectedItems,
    //   } = useMultipleSelection({initialSelectedItems: [items[0], items[1]]});
  } = useMultipleSelection({initialSelectedItems: []});

  const getFilteredItems = (items) =>
    items.filter(
      (item) =>
        selectedItems.indexOf(item) < 0 &&
        item.toLowerCase().startsWith(inputValue.toLowerCase())
    );

  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
    selectItem,
  } = useCombobox({
    inputValue,
    items: getFilteredItems(items),
    onStateChange: ({inputValue, type, selectedItem}) => {
      switch (type) {
        case useCombobox.stateChangeTypes.InputChange:
          setInputValue(inputValue);
          break;
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
        case useCombobox.stateChangeTypes.InputBlur:
          if (selectedItem) {
            setInputValue("");
            addSelectedItem(selectedItem);
            selectItem(null);
          }

          break;
        default:
          break;
      }
    },
  });

  return (
    <AllComboboxWrapper>
      <TagTitle {...getLabelProps()}>Choose some tags:</TagTitle>
      <ComboboxWrapper>
        {selectedItems.map((selectedItem, index) => (
          <SelectedItem
            key={`selected-item-${index}`}
            {...getSelectedItemProps({selectedItem, index})}>
            {selectedItem}
            <SelectedItemIcon onClick={() => removeSelectedItem(selectedItem)}>
              &#10005;
            </SelectedItemIcon>
          </SelectedItem>
        ))}
        <Combobox {...getComboboxProps()}>
          <SearchTagInput
            {...getInputProps(getDropdownProps({preventKeyAction: isOpen}))}
          />
          <ShowTagOptions
            {...getToggleButtonProps()}
            aria-label={"toggle menu"}>
            see more
          </ShowTagOptions>
        </Combobox>
      </ComboboxWrapper>
      <MenuMultiple {...getMenuProps()}>
        {isOpen &&
          getFilteredItems(items).map((item, index) => (
            <li
              style={
                highlightedIndex === index ? {backgroundColor: "#bde4ff"} : {}
              }
              key={`${item}${index}`}
              {...getItemProps({item, index})}>
              {item}
            </li>
          ))}
      </MenuMultiple>
    </AllComboboxWrapper>
  );
}

export default MultipleCombobox;

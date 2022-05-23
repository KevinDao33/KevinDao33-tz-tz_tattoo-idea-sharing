import {useState, useEffect} from "react";
import {useCombobox, useMultipleSelection} from "downshift";
import PropTypes from "prop-types";
import {items} from "../config";

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
  SelectedItemWrapper,
} from "../styles/MultipleCombobox.modul";

function MultipleCombobox({setPinTags}) {
  const [inputValue, setInputValue] = useState("");

  const {
    getSelectedItemProps,
    getDropdownProps,
    addSelectedItem,
    removeSelectedItem,
    selectedItems,
  } = useMultipleSelection({initialSelectedItems: []});

  useEffect(() => {
    setPinTags(selectedItems);
  }, [selectedItems]);

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
      <TagTitle {...getLabelProps()}>Tags:</TagTitle>
      <ComboboxWrapper>
        <Combobox {...getComboboxProps()}>
          <SearchTagInput
            {...getInputProps(getDropdownProps({preventKeyAction: isOpen}))}
          />
          <ShowTagOptions
            {...getToggleButtonProps()}
            aria-label={"toggle menu"}>
            {"+"}
          </ShowTagOptions>
        </Combobox>
        <SelectedItemWrapper>
          {selectedItems.map((selectedItem, index) => (
            <SelectedItem
              key={`selected-item-${index}`}
              {...getSelectedItemProps({selectedItem, index})}>
              {selectedItem}
              <SelectedItemIcon
                onClick={() => removeSelectedItem(selectedItem)}>
                &#10005;
              </SelectedItemIcon>
            </SelectedItem>
          ))}
        </SelectedItemWrapper>
      </ComboboxWrapper>
      <MenuMultiple {...getMenuProps()}>
        {isOpen &&
          getFilteredItems(items).map((item, index) => (
            <li
              style={
                highlightedIndex === index
                  ? {backgroundColor: "snow", color: "black"}
                  : {}
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

MultipleCombobox.propTypes = {
  setPinTags: PropTypes.func,
};

export default MultipleCombobox;

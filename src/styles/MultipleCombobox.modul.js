import styled from "styled-components";

const AllComboboxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 100%;
  min-height: 150px;
  margin: 20px auto;
  padding-bottom: 110px;
  position: relative;
`;

const MenuMultiple = styled.ul`
  border-radius: 20px;
  max-height: 100px;
  overflow-y: auto;
  width: 200px;
  margin: 0;
  border-top: 0;
  background: white;
  position: absolute;
  z-index: 1000;
  list-style: none;
  padding: 0 0 0 20px;
  left: 35px;
  bottom: 0;
`;

const Combobox = styled.div`
  display: inline-block;
  margin-left: 5px;
`;

const ComboboxWrapper = styled.div`
  display: inline-flex;
  flex-wrap: wrap;
`;

const SelectedItem = styled.span`
  margin: 5px 0 5px 20px;
  padding: 5px;
  background-color: aliceblue;
  border-radius: 10px;
  cursor: default;
`;

const SelectedItemIcon = styled.span`
  margin-left: 3px;
  cursor: pointer;
  color: gray;
`;

const ShowTagOptions = styled.button`
  color: white;
  /* width: 90px; */
  height: 40px;
  background-color: gray;
  border: none;
  margin: 20px 0 0 0;
  border-radius: 0 30px 30px 0;
  padding: 3px 5px;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  font-size: 1.5rem;
  -webkit-filter: drop-shadow(12px 12px 7px rgba(0, 0, 0, 0.2));
  filter: drop-shadow(5px 5px 2px rgba(0, 0, 0, 0.2));
`;

const TagTitle = styled.label`
  font-size: 1.5rem;
  margin: 20px auto 20px 20px;
`;

const SearchTagInput = styled.input`
  width: 260px;
  /* min-width: 90px; */
  height: 40px;
  border-radius: 30px 0 0 30px;
  border: none;
  margin: 20px 0 0 20px;
  background-color: white;
  padding-left: 20px;
  cursor: text;
  -webkit-filter: drop-shadow(12px 12px 7px rgba(0, 0, 0, 0.2));
  filter: drop-shadow(5px 5px 2px rgba(0, 0, 0, 0.2));
  font-size: 1.5rem;
`;

export {
  AllComboboxWrapper,
  MenuMultiple,
  Combobox,
  ComboboxWrapper,
  SelectedItem,
  SelectedItemIcon,
  ShowTagOptions,
  TagTitle,
  SearchTagInput,
};

import styled from "styled-components";

const AllComboboxWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  margin: 20px auto;
  position: relative;
`;

const MenuMultiple = styled.ul`
  border-radius: 20px;
  max-height: 200px;
  overflow-y: auto;
  width: 260px;
  margin: 0;
  border-top: 0;
  background: #5a5a5a;
  color: white;
  font-size: 1.25rem;
  position: absolute;
  z-index: 1000;
  list-style: none;
  padding: 0 0 0 20px;
  right: 75px;
  top: 70px;
  z-index: 1000;
`;

const Combobox = styled.div`
  width: 100%;
  display: inline-block;
  margin: 0 0 10px 0;
`;

const ComboboxWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  width: 60%;
`;

const SelectedItemWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
`;

const SelectedItem = styled.span`
  margin: 5px 0 5px 20px;
  padding: 5px;
  background-color: #f68535;
  color: snow;
  border-radius: 10px;
  cursor: default;
`;

const SelectedItemIcon = styled.span`
  margin-left: 3px;
  cursor: pointer;
  color: lightgrey;
`;

const ShowTagOptions = styled.button`
  color: gray;
  width: 10%;
  height: 40px;
  background-color: snow;
  border: none;
  margin: 20px 0 0 0;
  border-radius: 10px 30px 30px 10px;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  font-size: 1.5rem;
  -webkit-filter: drop-shadow(12px 12px 7px rgba(0, 0, 0, 0.2));
  filter: drop-shadow(5px 5px 2px rgba(0, 0, 0, 0.2));
  transition: 0.4s;

  &:hover {
    transform: scale(0.97);
    box-shadow: inset 0 4px 10px rgba(0, 0, 0, 0.3);
  }
`;

const TagTitle = styled.label`
  font-size: 1.5rem;
  margin: 20px 0 20px 20px;
  width: 33%;
  color: snow;

  @media (max-width: 1250px) {
    font-size: 1.5rem;
  }
  @media (max-width: 900px) {
    font-size: 1.4rem;
  }
  @media (max-width: 750px) {
    font-size: 1.3rem;
  }
  @media (max-width: 600px) {
    font-size: 1.2rem;
  }
  @media (max-width: 500px) {
    font-size: 1rem;
  }
`;

const SearchTagInput = styled.input`
  width: 72%;
  height: 40px;
  border-radius: 10px;
  border: none;
  margin: 20px 3px 0 20px;
  background-color: snow;
  color: #7e7e7e;
  padding-left: 20px;
  cursor: text;
  -webkit-filter: drop-shadow(12px 12px 7px rgba(0, 0, 0, 0.2));
  filter: drop-shadow(5px 5px 2px rgba(0, 0, 0, 0.2));
  font-size: 1.5rem;
  transition: 0.4s;

  :focus {
    outline: none;
    transform: scale(0.97);
    box-shadow: inset 0 4px 10px rgba(0, 0, 0, 0.3);
  }
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
  SelectedItemWrapper,
};

import Dropdown from "../components/Dropdown";
import { useState } from "react";

export default {
  title: "Dropdown",
  component: Dropdown,
};

const Template = (args) => {
  const [selected, setSelected] = useState([]);

  const options = [
    { label: "Option 1", value: "1" },
    { label: "Option 2", value: "2" },
    { label: "Option 3", value: "3" },
    { label: "Option 4", value: "4" },
    { label: "Option 5", value: "5" },
  ];

  return (
    <Dropdown
      width="300px"
      options={options}
      selected={selected}
      {...args}
      handleSelected={(newSelected) => setSelected(newSelected)}
    />
  );
};



export const SingleSelect = Template.bind({});
SingleSelect.args = {
  title: "Select one item",
  multiple: false,
};

export const MultipleSelect = Template.bind({});
MultipleSelect.args = {
  title: "Select items",
  multiple: true,
};

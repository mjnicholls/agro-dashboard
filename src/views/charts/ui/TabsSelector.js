import React from 'react';
import classNames from "classnames";
import {
  Button,
  ButtonGroup,
} from "reactstrap";
import Select from "react-select";


const TabsSelector = ({activeTab, setActiveTab, options}) => {

  const customStyles = {
    menu: (provided, state) => ({
      ...provided,
      minHeight: "230px",
    }),
    menuList: (provided, state) => ({
      ...provided,
      minHeight: "210px",
    }),
    input: (provided, state) => ({
      ...provided,
      minWidth: "200px",
      maxWidth: "250px",
    })
  };

  return (
    <>
      <ButtonGroup
        className=" btn-group-toggle d-none d-lg-block float-right"
        data-toggle="buttons"
      >
        {options.map((option) => <Button
          color="github" id={option.id} size="sm" tag="label" key={option.id}
          className={classNames("btn-simple", {
            active: activeTab.id === option.id,
          })}
          onClick={() => setActiveTab(option)}
          style={{padding: "5px 10px"}}
        >
          <span>{option.id}</span>
        </Button>)}
      </ButtonGroup>

      <Select
        className="react-select info d-lg-none float-right"
        classNamePrefix="react-select"
        name="singleSelect"
        value={activeTab.label}
        onChange={(tab) => setActiveTab(tab)}
        options={options}
        placeholder={activeTab.id}
        styles={customStyles}
      />
    </>
  )
}

export default TabsSelector;
"use client"

import React from 'react'
import Select, { MultiValue, ActionMeta } from 'react-select'

interface OptionType {
    value: string;
    label: string;
  }

interface SelectComponentProps {
    options: OptionType[], // Define the type of your options object
    onChange: (selectedOptions:MultiValue<OptionType>, actionMeta: ActionMeta<OptionType>) => void;
    }
  
const SelectComponent = ({ options, onChange }: SelectComponentProps) => {

    return (
    <>
            <Select 
            isMulti
            className="basic-multi-select"
            options={options}
            onChange={(selectedOptions, actionMeta) => {
              console.log('Selected options:', selectedOptions);
              onChange(selectedOptions, actionMeta);
          }}  />
    </>)
}
export default SelectComponent
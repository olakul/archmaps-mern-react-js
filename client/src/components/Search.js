
import React from 'react';
import usePlacesAutocomplete, {getGeocode, getLatLng} from 'use-places-autocomplete';
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
  ComboboxOptionText,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import searchStyles from './searchStyles.css';
import panTo from './Map';
//
export default function Search({panTo}) {
  
  const {
    ready, 
    value, 
    suggestions: {status, data}, 
    setValue, 
    clearSuggestions
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () =>  52.52, lng: () => 13.40 },
      radius: 15 * 1000,
    },
  }); 
  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();
    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      panTo({ lat, lng });
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  
  return (
    <div className='search' key='search'>
      <Combobox onSelect={handleSelect}>
      <ComboboxInput 
      value={value} 
      onChange={handleInput}
      disabled={!ready}
      placeholder="Enter an address"
      key="combobox"
      />
        <ComboboxPopover>
              <ComboboxList>
                {status === "OK" &&
                  data.map(({ id, description }) => (
                    <ComboboxOption key={id} value={description} />
                  ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  )
}

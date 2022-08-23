import React from 'react'
import { useAddHouse } from '../hooks/useHouses'
import { House } from '../types/house';
import ValidationSummary from '../validations/ValidationSummary';
import HouseForm from './HouseForm';

const HouseAdd = () => {
  const addHouse = useAddHouse();

  const house: House = {
    address: '',
    country: '',
    description: '',
    photo: '',
    price: 0,
    id: 0,
  }

  return (
    <>
      {addHouse.isError && (
        <ValidationSummary error={addHouse.error} />
      )}
      <HouseForm
        house={house}
        submitted={(h) => addHouse.mutate(h)}
      />
    </>
  )
}

export default HouseAdd
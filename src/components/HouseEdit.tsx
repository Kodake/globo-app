import React from 'react'
import { useParams } from 'react-router-dom';
import ApiStatus from '../api/ApiStatus';
import { useFetchHouse, useUpdateHouse } from '../hooks/useHouses';
import ValidationSummary from '../validations/ValidationSummary';
import HouseForm from './HouseForm';

const HouseEdit = () => {

    const { id } = useParams();
    if (!id)
        throw new Error('Need a house id');

    const houseId = parseInt(id);

    const { data, status, isSuccess } = useFetchHouse(houseId);
    const updateHouse = useUpdateHouse();

    if (!isSuccess)
        return <ApiStatus status={status} />

    return (
        <>
            {updateHouse.isError && (
                <ValidationSummary error={updateHouse.error} />
            )}
            <HouseForm
                house={data}
                submitted={h => updateHouse.mutate(h)}
            />
        </>
    )
}

export default HouseEdit
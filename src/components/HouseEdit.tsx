import React from 'react'
import { useParams } from 'react-router-dom';
import ApiStatus from '../api/ApiStatus';
import { useFetchHouse, useUpdateHouse } from '../hooks/useHouses';
import HouseForm from './HouseForm';

const HouseEdit = () => {

    const { id } = useParams();
    if (!id)
        throw new Error('Need a house id');

    const houseId = parseInt(id);

    const { data, status, isSuccess } = useFetchHouse(houseId);
    const updateHoue = useUpdateHouse();

    if (!isSuccess)
        return <ApiStatus status={status} />

    return (
        <HouseForm
            house={data}
            submitted={h => updateHoue.mutate(h)}
        />
    )
}

export default HouseEdit
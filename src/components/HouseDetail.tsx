import React from 'react'
import { Link, useParams } from 'react-router-dom'
import ApiStatus from '../api/ApiStatus';
import { currencyFormatter } from '../config';
import { useDeleteHouse, useFetchHouse } from '../hooks/useHouses';
import Bids from './Bids';
import defaultPhoto from './defaultPhoto';

const HouseDetail = () => {
    const { id } = useParams();
    if (!id) throw Error('House id is not found');
    const houseId = parseInt(id);

    const { data, status, isSuccess } = useFetchHouse(houseId);

    const deleteHouse = useDeleteHouse();

    if (!isSuccess) return <ApiStatus status={status} />
    if (!data) return <div>House not found</div>

    return (
        <>
            <div className="row">
                <div className="col-6">
                    <div className="row">
                        <img
                            className="img-fluid"
                            src={data.photo ? data.photo : defaultPhoto}
                            alt="House pic"
                        />
                    </div>
                    <div className="row mt-3 d-grid gap-2 d-md-flex justify-content-md-end p-2">
                        <Link
                            className="btn btn-primary btn-sm"
                            to={`/house/edit/${data.id}`}
                        >
                            Edit
                        </Link>
                        <button
                            className="btn btn-danger btn-sm"
                            onClick={() => {
                                if (window.confirm("Are you sure?"))
                                    deleteHouse.mutate(data);
                            }}
                        >
                            Delete
                        </button>
                    </div>
                </div>

                <div className="col-6">
                    <div className="row mt-2">
                        <h5 className="col-12">{data.country}</h5>
                    </div>
                    <div className="row">
                        <h3 className="col-12">{data.address}</h3>
                    </div>
                    <div className="row">
                        <h2 className="themeFontColor col-12">
                            {currencyFormatter.format(data.price)}
                        </h2>
                    </div>
                    <div className="row">
                        <div className="col-12 mt-3">{data.description}</div>
                    </div>
                    <Bids house={data} />
                </div>
            </div>
        </>
    )
}

export default HouseDetail
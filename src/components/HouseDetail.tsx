import React from 'react'
import Image from 'react-bootstrap/esm/Image';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import { Link, useParams } from 'react-router-dom'
import ApiStatus from '../api/ApiStatus';
import { currencyFormatter } from '../config';
import { useDeleteHouse, useFetchHouse } from '../hooks/useHouses';
import Bids from './Bids';
import defaultPhoto from './defaultPhoto';
import Button from 'react-bootstrap/esm/Button';

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
            <Row>
                <Col lg={6}>
                    <Row>
                        <Image
                            className='img-fluid'
                            src={data.photo ? data.photo : defaultPhoto}
                            alt='House pic'
                        />
                    </Row>
                    <Row className='mt-3 d-grid gap-2 d-md-flex justify-content-md-end p-2'>
                        <Link
                            className='btn btn-primary btn-sm'
                            to={`/house/edit/${data.id}`}
                        >
                            Edit
                        </Link>
                        <Button
                            variant='danger'
                            size='sm'
                            onClick={() => {
                                if (window.confirm('Are you sure?'))
                                    deleteHouse.mutate(data);
                            }}
                        >
                            Delete
                        </Button>
                    </Row>
                </Col>

                <Col lg={6}>
                    <Row className='mt-2'>
                        <h5 className='col-12'>
                            {data.country}
                        </h5>
                    </Row>
                    <Row>
                        <h3 className='col-12'>
                            {data.address}
                        </h3>
                    </Row>
                    <Row>
                        <h2 className='themeFontColor col-12'>
                            {currencyFormatter.format(data.price)}
                        </h2>
                    </Row>
                    <Row>
                        <div className='col-12 mt-3'>
                            {data.description}
                        </div>
                    </Row>
                    <Bids house={data} />
                </Col>
            </Row>
        </>
    )
}

export default HouseDetail
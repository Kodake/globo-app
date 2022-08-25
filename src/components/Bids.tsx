import { House } from '../types/house';
import { useState } from 'react'
import { useAddBids, useFetchBids } from '../hooks/useBids';
import { Bid } from '../types/bid';
import ApiStatus from '../api/ApiStatus';
import { currencyFormatter } from '../config';
import Table from 'react-bootstrap/esm/Table';
import Form from 'react-bootstrap/esm/Form';
import Button from 'react-bootstrap/esm/Button';
import Row from 'react-bootstrap/esm/Row';
import InputGroup from 'react-bootstrap/esm/InputGroup';
import Col from 'react-bootstrap/esm/Col';

type Args = {
    house: House;
}

const Bids = ({ house }: Args) => {
    const { data, status, isSuccess } = useFetchBids(house.id);
    const addBid = useAddBids();

    const emptyBid = {
        id: 0,
        houseId: house.id,
        bidder: '',
        amount: 0,
    };

    const [bid, setBid] = useState<Bid>(emptyBid);

    if (!isSuccess) return <ApiStatus status={status} />

    const onBidSubmitClick = () => {
        addBid.mutate(bid);
        setBid(emptyBid);
    }

    return (
        <>
            <Row xs={2} md={4} lg={6} className='mt-4'>
                <Col xs={12} md={12} lg={12}>
                    <Table className='table table-sm'>
                        <thead>
                            <tr>
                                <th>Bidder</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data &&
                                data.map((b) => (
                                    <tr key={b.id}>
                                        <td>{b.bidder}</td>
                                        <td>{currencyFormatter.format(b.amount)}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <Row xs={2} md={4} lg={6}>
                <InputGroup className='input-group mb-3'>
                    <Form.Control
                        id='bidder'
                        type='text'
                        className='form-control'
                        placeholder='Bidder'
                        aria-label='Bidder'
                        value={bid.bidder}
                        onChange={(e) => setBid({ ...bid, bidder: e.target.value })} />

                    <Form.Control
                        id='amount'
                        type='number'
                        className='form-control'
                        placeholder='Amount'
                        aria-label='Amount'
                        value={bid.amount}
                        onChange={(e) => setBid({ ...bid, amount: parseInt(e.target.value) })} />

                    <Button className='btn btn-primary' onClick={() => onBidSubmitClick()}>Add</Button>
                </InputGroup >
            </Row>
        </>
    )
}

export default Bids;
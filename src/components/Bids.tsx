import { House } from '../types/house';
import { useState } from 'react'
import { useAddBids, useFetchBids } from '../hooks/useBids';
import { Bid } from '../types/bid';
import ApiStatus from '../api/ApiStatus';
import { currencyFormatter } from '../config';

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
            <div className='row mt-4'>
                <div className='col-12'>
                    <table className='table table-sm'>
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
                    </table>
                </div>
            </div>
            <div className='row'>
                <div className='input-group mb-3'>
                    <input
                        id='bidder'
                        type='text'
                        className='form-control'
                        placeholder='Bidder'
                        aria-label='Bidder'
                        value={bid.bidder}
                        onChange={(e) => setBid({ ...bid, bidder: e.target.value })} />

                    <input
                        id='amount'
                        type='number'
                        className='form-control'
                        placeholder='Amount'
                        aria-label='Amount'
                        value={bid.amount}
                        onChange={(e) => setBid({ ...bid, amount: parseInt(e.target.value) })} />

                    <button className='btn btn-primary' onClick={() => onBidSubmitClick()}>Add</button>
                </div>
            </div>
        </>
    )
}

export default Bids;
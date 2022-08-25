import Container from 'react-bootstrap/esm/Container';
import Table from 'react-bootstrap/esm/Table';
import { Link, useNavigate } from 'react-router-dom';
import ApiStatus from '../api/ApiStatus';
import { currencyFormatter } from '../config';
import useHouses from '../hooks/useHouses';
import useFetchUser from '../hooks/useUsers';

const HouseList = () => {
    const nav = useNavigate();
    const { data, status, isSuccess } = useHouses();
    const { data: userClaims } = useFetchUser();

    if (!isSuccess)
        return <ApiStatus status={status} />

    return (
        <Container>
            <div className='row mb-2'>
                <h5 className='themeFontColor text-center'>
                    Houses currently on the market
                </h5>
            </div>
            <Table className='table table-hover'>
                <thead>
                    <tr>
                        <th>Address</th>
                        <th>Country</th>
                        <th>Asking Price</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.map((h) => (
                        <tr key={h.id} onClick={() => nav(`/house/${h.id}`)}>
                            <th>{h.address}</th>
                            <th>{h.country}</th>
                            <th>{currencyFormatter.format(h.price)}</th>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {userClaims &&
                userClaims.find((c) => c.type === "role" && c.value === "Admin") && (
                    <Link className='btn btn-primary' to='/house/add'>
                        Add
                    </Link>
                )}
        </Container>
    )
}

export default HouseList
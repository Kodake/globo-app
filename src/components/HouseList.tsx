import useHouses from '../hooks/useHouses';

const HouseList = () => {

    const houses = useHouses();

    return (
        <div>
            <div className="row mb-2">
                <h5 className="themeFontColor text-center">
                    Houses currently on the market
                </h5>
            </div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Address</th>
                        <th>Country</th>
                        <th>Asking Price</th>
                    </tr>
                </thead>
                <tbody>
                    {houses.map((h) => (
                        <tr key={h.id}>
                            <th>{h.address}</th>
                            <th>{h.country}</th>
                            <th>{h.price}</th>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default HouseList
import CardHeader from 'react-bootstrap/esm/CardHeader';
import { Link } from 'react-router-dom';
import useFetchUser from '../hooks/useUsers';
import logo from '../logo.svg';

type Props = {
    subtitle: string;
}

const Header = ({ subtitle }: Props) => {
    const { data: userClaims } = useFetchUser();
    
    return (
        <CardHeader className="row mb-4">
            <div className="col-5">
                {userClaims &&
                    userClaims.find((c) => c.type === "role" && c.value === "Admin") && (
                        <Link to='/'>
                            <img src={logo} alt="logo" className="logo" />
                        </Link>
                    )}
            </div>
            <div className="col-7 mt-5 subtitle">{subtitle}</div>
        </CardHeader>
    )
}

export default Header
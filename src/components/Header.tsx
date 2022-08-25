import Image from 'react-bootstrap/esm/Image';
import CardHeader from 'react-bootstrap/esm/CardHeader';
import { Link } from 'react-router-dom';
import useFetchUser from '../hooks/useUsers';
import logo from '../logo.svg';
import Col from 'react-bootstrap/esm/Col';

type Props = {
    subtitle: string;
}

const Header = ({ subtitle }: Props) => {
    const { data: userClaims } = useFetchUser();
    
    return (
        <CardHeader className="row mb-4">
            <Col xs={5} md={5} lg={5}>
            {userClaims &&
                    userClaims.find((c) => c.type === "role" && c.value === "Admin") && (
                        <Link to='/'>
                            <Image src={logo} alt="logo" className="logo" />
                        </Link>
                    )}
            </Col>
            <Col xs={7} md={7} lg={7} className="mt-5 subtitle">{subtitle}</Col>
        </CardHeader>
    )
}

export default Header
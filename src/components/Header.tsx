import CardHeader from 'react-bootstrap/esm/CardHeader';
import logo from '../logo.svg';

type Props = {
    subtitle: string;
}

const Header = ({ subtitle }: Props) => {
    return (
        <CardHeader className="row mb-4">
            <div className="col-5">
                <img src={logo} alt="logo" className="logo" />
            </div>
            <div className="col-7 mt-5 subtitle">{subtitle}</div>
        </CardHeader>
    )
}

export default Header
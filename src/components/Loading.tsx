import { Spinner } from 'react-bootstrap';
import Container from 'react-bootstrap/esm/Container';

const Loading = () => {
    return (
        <Container
            style={{
                position: 'fixed',
                left: '50%',
                top: '50%',
                zIndex: 999999
            }}>

            <Spinner animation='grow' variant='primary' />

            <Spinner animation='grow' variant='success' />

            <Spinner animation='grow' variant='danger' />
        </Container>
    )
}

export default Loading;
import { useState } from 'react';
import Image from 'react-bootstrap/esm/Image';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/esm/Form';
import { House } from '../types/house';
import toBase64 from '../utils/toBae64';
import Row from 'react-bootstrap/esm/Row';

type Args = {
    house: House;
    submitted: (house: House) => void;
}

const HouseForm = ({ house, submitted }: Args) => {
    const [houseState, setHouseState] = useState({ ...house });

    const onSubmit: React.MouseEventHandler<HTMLButtonElement> =
        async (e) => {
            e.preventDefault();
            submitted(houseState);
        }

    const onFileSelected = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
        e.preventDefault();
        e.target.files &&
            e.target.files[0] &&
            setHouseState({
                ...houseState,
                photo: await toBase64(e.target.files[0]),
            });
    };

    return (
        <Form className='mt-2'>
            <Form.Group>
                <Form.Label htmlFor='address'>Address</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Address'
                    value={houseState.address}
                    onChange={(e) =>
                        setHouseState({ ...houseState, address: e.target.value })
                    }
                />
            </Form.Group>
            <Form.Group className='mt-2'>
                <Form.Label htmlFor='country'>Country</Form.Label>
                <Form.Control
                    type='text'
                    placeholder='Country'
                    value={houseState.country}
                    onChange={(e) =>
                        setHouseState({ ...houseState, country: e.target.value })
                    }
                />
            </Form.Group>
            <Form.Group className='mt-2'>
                <Form.Label htmlFor='description'>Description</Form.Label>
                <Form.Control
                    as='textarea' rows={3}
                    placeholder='Description'
                    value={houseState.description}
                    onChange={(e) =>
                        setHouseState({ ...houseState, description: e.target.value })
                    }
                />
            </Form.Group>
            <Form.Group className='mt-2'>
                <Form.Label htmlFor='price'>Price</Form.Label>
                <Form.Control
                    type='number'
                    placeholder='Price'
                    value={houseState.price}
                    onChange={(e) =>
                        setHouseState({ ...houseState, price: parseInt(e.target.value) })
                    }
                />
            </Form.Group>
            <Form.Group className='mt-2'>
                <Form.Label htmlFor='image'>Image</Form.Label>
                <Form.Control
                    id='image'
                    type='file'
                    onChange={onFileSelected}
                />
            </Form.Group>
            <Row sm={10} md={8} lg={8} className='mt-2'>
                <Image src={houseState.photo} />
            </Row>
            <Button
                variant='primary'
                className='mt-2'
                disabled={!houseState.address || !houseState.country}
                onClick={onSubmit}
            >
                Submit
            </Button>
        </Form>
    );
}

export default HouseForm;
import Loading from "../components/Loading";

type Args = {
    status: 'idle' | 'success' | 'error' | 'loading'
};

const ApiStatus = ({ status }: Args) => {
    switch (status) {
        case 'error':
            return <div>Error communicating with the API</div>
        case 'idle':
            return <div>Idle</div>
        case 'loading':
            return <Loading />
        default:
            throw Error('Unknown API state');
    }
}

export default ApiStatus;
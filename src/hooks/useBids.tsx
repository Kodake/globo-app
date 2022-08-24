import { useQuery, useQueryClient, useMutation } from 'react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import Problem from '../types/problem';
import { Bid } from '../types/bid';
import config from '../config';

const useFetchBids = (houseId: number) => {
    return useQuery<Bid[], AxiosError<Problem>>(['bids', houseId],
        () => axios.get(`${config.baseApiURL}/house/${houseId}/bids`)
            .then((resp) => resp.data));
};

const useAddBids = () => {
    const queryClient = useQueryClient();
    return useMutation<AxiosResponse, AxiosError<Problem>, Bid>(
        (b) => axios.post(`${config.baseApiURL}/house/${b.houseId}/bids`, b),
        {
            onSuccess: (_, bid) => {
                queryClient.invalidateQueries(['bids', bid.houseId]);;
            },
        }
    );
};

export { useFetchBids, useAddBids };
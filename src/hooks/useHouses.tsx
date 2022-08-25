import { useEffect, useState } from 'react'
import { House } from '../types/house';
import config from '../config';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useNavigate } from 'react-router-dom';
import Problem from '../types/problem';

const useHouses = () => {
    return useQuery<House[], AxiosError>('houses', () =>
        axios.get(`${config.baseApiURL}/houses`, { withCredentials: true })
            .then((resp) => resp.data)
    );
};

const useFetchHouse = (id: number) => {
    return useQuery<House, AxiosError>(['houes', id], () =>
        axios.get(`${config.baseApiURL}/house/${id}`)
            .then((resp) => resp.data)
    );
};

const useAddHouse = () => {
    const nav = useNavigate();
    const queryClient = useQueryClient();
    return useMutation<AxiosResponse, AxiosError<Problem>, House>(
        (h) => axios.post(`${config.baseApiURL}/houses`, h),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('houses');
                nav('/');
            }
        }
    )
};

const useUpdateHouse = () => {
    const nav = useNavigate();
    const queryClient = useQueryClient();
    return useMutation<AxiosResponse, AxiosError<Problem>, House>(
        (h) => axios.put(`${config.baseApiURL}/houses`, h),
        {
            onSuccess: (_, house) => {
                queryClient.invalidateQueries('houses');
                nav(`/house/${house.id}`);
            }
        }
    )
};

const useDeleteHouse = () => {
    const nav = useNavigate();
    const queryClient = useQueryClient();
    return useMutation<AxiosResponse, AxiosError, House>(
        (h) => axios.delete(`${config.baseApiURL}/houses/${h.id}`),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('houses');
                nav('/');
            }
        }
    )
};

export default useHouses;
export { useFetchHouse, useAddHouse, useUpdateHouse, useDeleteHouse };
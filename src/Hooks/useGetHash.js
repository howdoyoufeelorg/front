import { useEffect } from 'react';
import {action} from "../sagas"
import {useSelector} from "react-redux"

export const useGetHash = () => {
    const hash = useSelector(state => state.hash);
    useEffect(() => {
        if (!hash) {
            action('GET_HASH');
        }
    });
    return hash;
}
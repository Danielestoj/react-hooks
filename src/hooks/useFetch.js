import { useState, useEffect } from "react";
import axios from 'axios';


export default function useFetch(url){
    const [data, useData] = useState(null);
    const [loading, useLoading] = useState(true);
    const [error, useError] = useState(null);

    useEffect( () => {
        const controller = new AbortController();
        const signal = controller.signal;
        const fetchedData = async () => {

            try {
                useLoading(true);
                const respuesta = await axios.get(url, { signal });
                useData(respuesta.data);
            }catch (error) {
                useError(error);
            } finally {
                useLoading(false);
            }

        };
        fetchedData();
        return() => {
            controller.abort();
        };

    }, [url]);

    return [data, loading, error];

}


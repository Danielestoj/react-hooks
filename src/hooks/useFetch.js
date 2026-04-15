import { useState, useEffect } from "react";
import axios from 'axios';

export function useFetch(url){
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();

        const fetchedData = async () => {
            try {
                setLoading(true);
                const response = await axios.get(url, {
                    signal: controller.signal
                });
                setData(response.data);
            } catch (error) {
                if (axios.isCancel(error) || error.name === 'CanceledError') return;
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchedData();

        return () => {
            controller.abort();
        };
    }, [url]);

    return [data, loading, error];
}


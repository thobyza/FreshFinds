import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateGeolocation } from '../redux/geolocationSlice';

export const useGeoLocation = () => {
    const dispatch = useDispatch()

    const onSuccess = (location) => {
        dispatch(updateGeolocation({
            lat: location.coords.latitude,
            lng: location.coords.longitude,
        }));
    };


    const onError = () => {
        // setLocation({
        //     loaded: true,
        //     coordinates: { lat: null, lng: null },
        //     error: {
        //         code: error.code,
        //         message: error.message,
        //     },
        // });
    };

    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(onSuccess, onError);
        } else {
            // Handle the case where geolocation is not supported
        }
    }, [dispatch]);

    return null;
};

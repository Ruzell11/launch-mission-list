import React , { createContext, useContext, useEffect, useState}  from 'react';
import { fetchLaunchesMission } from './service/service';
import Spinner from './components/Spinner/Spinner';


const LaunchesContext = createContext(null);

const LaunchContextProvider = ({ children }) => {
    const [launchesMissionData, setLaunchesMissionData] = useState([]);
    const [filteredLaunchesData, setFilteredLaunchesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await fetchLaunchesMission();
            setFilteredLaunchesData(response);
            setLaunchesMissionData(response);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);



    if (loading) return <Spinner/>;
    if (error) return <p>Error loading data</p>;
    

    const value = {
        launchesMissionData,
        setLaunchesMissionData,
        filteredLaunchesData, 
        setFilteredLaunchesData
    }

    
    return (
        <LaunchesContext.Provider value={value}>
            {children}
        </LaunchesContext.Provider>
    )
};



const useLaunchContext = () => {
    return useContext(LaunchesContext);
}

export { useLaunchContext }
export default LaunchContextProvider;
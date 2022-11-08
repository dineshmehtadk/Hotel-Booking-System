import axios from "axios"
const { useEffect } = require("react");
const { useState } = require("react");



const useFetch=(url)=>{
    const[data,setData] = useState([]);
    const[loading,setLoading] = useState(false);
    const[error, setError] = useState(false);


    useEffect(()=>{
        const fetchData=async ()=>{
            setLoading(true);
            try{
                
                const res = await axios.get(url);
                setData(res.data)
            }
            catch(error){
                setError(error)
            }
            setLoading(false)

        }
        fetchData()
        
    },[])


    const refetchData=async ()=>{
        setLoading(true);
        try{
            const res = await axios.get(url);
            setData(res.data)
        }
        catch(error){
            setError(error)
        }
        setLoading(false)

    }

  return{data, loading,refetchData, error}


}

export default useFetch
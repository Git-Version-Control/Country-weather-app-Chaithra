import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./CountryDetails.module.css";

const CountryDetails = () => {
  const localState:any = useLocation().state;
  const [locationData, setLocationData] = useState<any>({
    location: { name: "", country: "", latitude: "",longitude:"" },
    current: { temperature: "",wind_speed:"", weather_icons: [], timezone_id: "" },
  });
  //const country_name=locationData.location.name;
  const quote = "\""; 
  const navigate = useNavigate();
  const [show,setShow]=useState(false);

  useEffect(() => {
    if (!localState.data) {
      navigate("/");
    } else {
      const { location, current } = localState.data;
      setLocationData({ location, current });
    }
  }, []);

  const [population, setPopulation] = useState<any[]>([]);
  const[flag,setFlag] =useState(" ")
  const fetchData = async() => {
    let base_url="https://restcountries.com/v3.1/name/"+quote+locationData.location.name+quote;
   
    const response=await fetch(base_url)
    const data=await response.json();

    setPopulation(data[0].population);
    setFlag(data[0].flags.png);
    /*console.log(data);*/
  };

  useEffect(() => { fetchData(); }, []);
 
  return (  
    <div className={styles.container}>
      <div className={styles.content}>
        <br></br> 
        <br></br>
        <br></br>
        <img src={flag} alt="" className="flag"/>
        <br></br>
        <button className="capital" onClick={()=>setShow(true)}>{locationData.location.name}</button>
       <p>
         Population :{population}
       </p>
        <p>
          Country :{locationData.location.country}
        </p>
        <p>
          Longitude :{locationData.location.lon}
        </p>
        <p>
          Latitude :{locationData.location.lat}
        </p>
        {
          show?(<div className={styles.weatherData}>
            <img
            className={styles.weatherIcon}
            alt="Image icon"
            src={locationData.current.weather_icons[0]}
          />
          <span>
            Temperature:{locationData.current.temperature}
            <sup>°C</sup>
          </span>
          <span>
            Wind speed: {locationData.current.wind_speed}
          </span> 
          <span>
            Timezone ID: {locationData.location.timezone_id}
          </span>       
        </div>):null
        }        
      </div>      
      <button onClick={() => navigate("/")}> ← Back</button> 
    </div>
  );
}
export default CountryDetails;
import { ChangeEventHandler, useEffect, useState } from "react";
import InputWithLabel from "../components/InputWithLabel";
import styles from "./InputPage.module.css";
import useWeatherApi from "../hooks/useApi";
import usePrevious from "../hooks/usePrevious";
import { useNavigate } from "react-router-dom";
const regex = /^[a-zA-Z]+$/;

const CountryInput = () => {
  const [countryName, setCountryName] = useState("");
  const [isSubmitDisabled, setSubmitDisabled] = useState(true);
  const [triggerFetch, setTriggerFetch] = useState(false);
  const previousCountry = usePrevious(countryName);
  const navigate = useNavigate();
  
  const { data, error, isLoading } = useWeatherApi(countryName, triggerFetch);

  
  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setCountryName(e.target.value);
  };
  const handleOnSumbit = (e: any) => {
    e.preventDefault();
    if (countryName !== previousCountry) setTriggerFetch((prev) => !prev);
  };

  useEffect(() => {
    if (data) navigate("/countryDetails", { state: { data } });
  }, [data]);

  useEffect(() => {
    if (countryName===" ") {
      setSubmitDisabled(true);
    } 
    else if(!regex.test(countryName)){
      setSubmitDisabled(true);
    }
    else if(countryName){
      setSubmitDisabled(false);
    }
    else setSubmitDisabled(true);
  }, [countryName]);

  if (error.type !== 0) {
    return (
      <div>
        {error.type === 400 ? (
          <div>
            <h1>Bad Request</h1>
            <a
              className={styles.tryAgain}
              onClick={() => window.location.reload()}
            >
              Try again
            </a>
          </div>
        ) : (
          <h1>Uh ho! Something went wrong!</h1>
        )}
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={handleOnSumbit}>
        <InputWithLabel
          id="countryInput"
          //labelName=""
          onChange={handleInputChange}
          value={countryName}
          placeholder="Country Name"

        />
        <button
          disabled={isSubmitDisabled}
          className={`${styles.submitButton} ${
            isSubmitDisabled ? styles.disabled : (""||!regex)
          }`}
          type="submit"
        >
          {isLoading ? "Please wait..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default CountryInput;

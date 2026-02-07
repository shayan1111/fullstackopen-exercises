import { useEffect, useState } from 'react'
import countryServices from './countryServices'


const CountrySearchResult = ({ countriesToShow, setSelectedCountry, selectedCountry }) => {
    // Make a button function
      const buttonDisplay = (selectedCountry, setSelectedCountry, country) => {
        // Make sure that it's not null and only the country's button that was clicked will be hide
        const isSelected = selectedCountry?.name.common === country.name.common
        if (isSelected) return <button type="button" onClick={() => setSelectedCountry(null)}>Hide</button>
        else return <button type="button" onClick={() => setSelectedCountry(country)}>Show</button>
      }
      
    // Make a function that returns the print details
    const renderCountryDetails = (country) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <h2>Languages</h2>
      <ul>
        {Object.values(country.languages).map(lang => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img
        src={country.flags.png}
        alt={`Flag of ${country.name.common}`}
        width={150}
      />
      {/* Show a Back button only if it makes sense */}
      {selectedCountry && buttonDisplay(selectedCountry, setSelectedCountry, country)}
    </div>
  );
};

    // If the length was greater than 10, print a message
    if (countriesToShow.length > 10) return <p>Too many matches, specify another filter</p>
    // If the 1 < length <= 10, first display the country name and the button to show the details.
    else if (countriesToShow.length > 1 && countriesToShow.length <= 10) {
      return (
        <div>
          {countriesToShow.map(country => (
          <div key={country.name.common}>
            {/* Display the country's name and it's button */}
            {country.name.common} 
            {buttonDisplay(selectedCountry, setSelectedCountry, country)}
          </div>
          ))}

          {/* Show the selected country if any */}
          {selectedCountry && renderCountryDetails(selectedCountry)}
        </div>
      )
    }
    // If the result was only 1, display it's details
    else if (countriesToShow.length === 1) {
      // 
      return renderCountryDetails(countriesToShow[0]);
    }
    // If no match was found, print a message
    else return <p>No match found, try again.</p>
  }

const App = () => {
  // First make 2 events for the data obtained and the country searched in the input
  const [results, setResults] = useState([]);
  const [searchCountry, setSearchCountry] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null)

  
  // Simplify the URL into a variable
  const baseURL = 'https://studies.cs.helsinki.fi/restcountries/api/all';
  
  // Initialize results with the promise returned via axios
  useEffect(() => {
    countryServices.getAll(baseURL)
    .then(response => {
      setResults(response.data)
    })
  }, [])
  
  // Make a variable that matches what the user has typed in the input
  const countriesToShow = results.filter(country => 
    country.name.common.toLowerCase().includes(searchCountry.toLowerCase())
  );

  
  
  // A function to update the searchCountry variable
  const handleSearchInput = (event) => {
    console.log(event.target.value)
    setSearchCountry(event.target.value)
  }

  return (
    <div>
        find countries <input value={searchCountry} onChange={handleSearchInput}/>
        <CountrySearchResult countriesToShow={countriesToShow} setSelectedCountry={setSelectedCountry} selectedCountry={selectedCountry}/>
    </div>
  )

}

export default App

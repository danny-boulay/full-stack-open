import { useEffect, useState} from "react";

const Countries = ({countries, filteredCountries, fetchWeather, weather}) => {
    const [selectedCountries, setSelectedCountries] = useState([])

    const filtered = countries.filter(country =>
        country.name.common.toLowerCase().includes(filteredCountries.toLowerCase())
    );

    useEffect(() => {
        if (filtered.length === 1) {
            const country = filtered[0];
            if (country.capitalInfo?.latlng && !weather[country.name.common]) {
                fetchWeather(
                    country.capitalInfo.latlng[0],
                    country.capitalInfo.latlng[1],
                    country.name.common
                );
            }
        }
    }, [filtered, fetchWeather, weather]);

    const renderCountryDetails = (country, showWeather = false) => (
        <div>
            <h1>{country.name.common}</h1>
            <p>Capital {country.capital}</p>
            <p>Area {country.area}</p>
            <h2>Languages</h2>
            <ul>
                {Object.values(country.languages).map(language => (
                    <li key={language}>{language}</li>
                ))}
            </ul>
            <img src={country.flags.png} alt={country.name.common} />
            {showWeather && weather[country.name.common] && (
                <div>
                    <h3>Weather in {country.capital}</h3>
                    <p>Temperature: {weather[country.name.common].main.temp}°C</p>
                    <p>Wind: {weather[country.name.common].wind.speed} m/s</p>
                    <p>Description: {weather[country.name.common].weather[0].description}</p>
                </div>
            )}
        </div>
    )

    if (filtered.length > 10) {
        return <div> Too many matches, specify another filter</div>
    }

    if (filtered.length === 0) {
        return <div>No matches found</div>;
    }

    if (filtered.length === 1) {
        return renderCountryDetails(filtered[0], true);
    }

    return (
        <div>
            {filtered.map(country =>
                <div key={country.name.common}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <p style={{margin: 0}} >
                            {country.name.common}
                        </p>
                        <button onClick={() => { setSelectedCountries(prev =>
                            prev.includes(country.name.common)
                                ? prev.filter(name => name !== country.name.common)
                                : [...prev, country.name.common]
                            );
                        }}>
                            {selectedCountries.includes(country.name.common) ? "Hide" : "Show"}
                        </button>
                    </div>
                    {selectedCountries.includes(country.name.common) && renderCountryDetails(country)}
                </div>
            )}
        </div>
    )
}

export default Countries
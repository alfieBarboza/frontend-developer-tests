const CountryList = (props: any) => {
    const { countries, selectedCountry, renderGenderFilter, renderCountryUsersList, toggleUserList } = props;

    return (
        <ul className="country-list">
            {countries.sort((currentItem: any, nextItem: any) => nextItem.qty - currentItem.qty).map((country: any) => (
                <li key={country.name} className="country">
                <span className="title" onClick={() => toggleUserList(country.name)}>{country.name} ({country.qty})</span>
                {selectedCountry === country.name && renderGenderFilter()}
                {selectedCountry === country.name && renderCountryUsersList()}
                </li>
            ))}
        </ul>
    );
}

export default CountryList;
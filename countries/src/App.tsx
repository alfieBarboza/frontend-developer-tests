import React, { useEffect, useState } from 'react';
import './App.css';
import { getUsers } from './api';
import { Country, User } from './types';
// import CountryList from './components/CountryList';

function App() {
  const [users, setUsers] = useState<Array<User>>([]);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedCountryUsers, setSelectedCountryUsers] = useState<Array<User>>([]);
  const [selectedGender, setSelectedGender] = useState<string>('all');

  useEffect(() => {
    // on mount, call API to retrieve users
    getUsers().then(data => {
      setUsers(data.results);
    });
  }, []);

  useEffect(() => {
    // when selected country or gender filter change, re-calculate country users list
    const countryUsers = users
      .filter(user => user.location.country === selectedCountry)
      .filter(user => selectedGender === 'all' || user.gender === selectedGender)
      .sort((currentItem, nextItem) => nextItem.registered.date.localeCompare(currentItem.registered.date));

    setSelectedCountryUsers(countryUsers);
  }, [selectedCountry, selectedGender]);

  const countries: Array<Country> = users.reduce((acc: Array<Country>, user: User) => {
    const country = acc.find(country => country.name === user.location.country);
    if (country) {
      // existing country, add quantity
      acc = acc.map(country => {
        if (country.name === user.location.country) country.qty++;
        return country;
      });
    } else {
      // new country, add to array
      acc = [...acc, { name: user.location.country, qty: 1 }];
      /**
       * I could also use:
       * acc.push({name: user.location.country, qty:1})
       * This is not a good practice
       */
    }
    return acc;
  }, []);

  const renderCountryUsersList = () => {
    if (!selectedCountry) return null;

    if (!selectedCountryUsers.length) return <label className="no-user">No users for this gender</label>;

    return (
      <div>
        <ul className="user-list">
          {selectedCountryUsers.map(user => {
            // object destructuring for easier readability and usage
            // I could just use user.xxx for assigning on the html but it's easier to read this way
            const { name: { first, last }, email, gender, location: { city, state }, registered: { date } } = user;

            return (
              <li key={email} className="user">
                <strong>{first} {last}</strong> - Gender: {gender} - City: {city} - State: {state} - Date Reg.: {new Date(date).toLocaleString()}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  const renderGenderFilter = () => {
    const genderList = ["all", "male", "female"];

    return (
      <div className="gender-filter">
        <label htmlFor="gender">Filter by Gender: </label>
        <select name="gender" value={selectedGender} onChange={event => setSelectedGender(event.target.value)}>
          {genderList.map(item => <option key={item} value={item}>{item}</option>)}
          {/* <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="all">All</option> */}
        </select>
      </div>
    );
  }

  
  const toggleUserList = (country: string) => {
    // If the user-List is opened then return selected country to null to close it
    const selected = selectedCountry === country ? null : country;
    setSelectedCountry(selected);

    //returns the gender filter to the default value
    setSelectedGender("all");
  }

  return (
    <div className="App">
      <ul className="country-list">
        {countries.sort((currentItem, nextItem) => nextItem.qty - currentItem.qty).map(country => (
          <li key={country.name} className="country">
            <span className="title" onClick={() => toggleUserList(country.name)}>{country.name} ({country.qty})</span>
            {/* Moved these two elements to their own function for readability */}
            {/* When the country is selected the gender filter should be rendered */}
            {selectedCountry === country.name && renderGenderFilter()}
            {/* When the country is selected the user list for that country should be rendered */}
            {selectedCountry === country.name && renderCountryUsersList()}
          </li>
        ))}
      </ul>
      {/* <CountryList
        countries={countries}
        selectedCountry={selectedCountry}
        renderGenderFilter={renderGenderFilter}
        renderCountryUsersList={renderCountryUsersList}
        toggleUserList={toggleUserList}
      /> */}
    </div>
  );
}

export default App;

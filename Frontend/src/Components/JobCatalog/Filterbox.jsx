import React from 'react';
import styles from './JobCatalog.module.css';
import { useState, useRef, useEffect } from 'react';
import Countries from '../Assets/countries.json';
import States from '../Assets/states.json';
import Cities from '../Assets/cities.json'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';

const Filterbox = () => {
  const countries = Countries;
  const states = States;
  const cities = Cities;
  const totalSectors = ['accountAndFinance', 'Banking', 'civilEngineering', 'Engineering', 'HRandRecruitment', 'InfoTech', 'Insurance', 'lifeSciencesAndFood', 'pharmaAndMedical', 'salesAndMarketing', 'Others'];
  var [selectedCountry, setSelectedCountry] = useState('India');
  var [inputText, setInputText] = useState('');
  var [locationInputText, setLocationInputText] = useState('');
  var [selectedState, setSelectedState] = useState('');
  var [selectedCities, setSelectedCities] = useState([]);
  var [filteredCities, setFilteredCities] = useState([]);
  var [filteredStates, setFilteredStates] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    location: false,
    skills: false,
    expectedSalary: false,
    yearsOfExperience: false,
    jobType: false,
    sectors: false,
  });
  const filterContainerRef = useRef(null);
  const [selectedSectors, setSelectedSectors] = useState([]);
  const allSectorsChecked = totalSectors.every(sector => selectedSectors.includes(`CB${sector}`));

  const handleFilterClick = (e, filter) => {
    var x = e.currentTarget;
    if (e.target === x || e.target.parentNode === x) {
      toggleFilterPopup(x);
    }
    else {
      return;
    }
    // setSelectedFilters((prevFilters) => ({
    //   ...prevFilters,
    //   [filter]: !prevFilters[filter],
    // }));
  };
  const toggleFilterPopup = (currentFilter) => {
    const filterPopups = document.querySelectorAll(
      `.${styles.FilterPopUpContainer}`
    );

    filterPopups.forEach((popup) => {
      if (popup !== currentFilter.children[1]) {
        popup.previousSibling.children[0].className = "fa fa-angle-down";
        popup.style.display = 'none';
      }
    });

    currentFilter.children[0].children[0].className = currentFilter.children[0].children[0].className === "fa fa-angle-down" ? "fa fa-angle-right" : "fa fa-angle-down";
    const currentPopup = currentFilter.children[1];
    currentPopup.style.display =
      currentPopup.style.display === 'block' ? 'none' : 'block';
  };
  const handleGlobalClick = (e) => {
    if (filterContainerRef.current && !filterContainerRef.current.contains(e.target)) {
      const filterPopups = document.querySelectorAll(
        `.${styles.FilterPopUpContainer}`
      );

      filterPopups.forEach((popup) => {
        popup.previousSibling.children[0].className = "fa fa-angle-down";
        popup.style.display = 'none';
      });
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleGlobalClick);

    return () => {
      document.removeEventListener('click', handleGlobalClick);
    };
  }, []);

  const handleResetFilters = () => {
    setSelectedFilters({
      location: false,
      skills: false,
      expectedSalary: false,
      yearsOfExperience: false,
      jobType: false,
      sectors: false,
    });
  };
  const handleCountryChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedCountry(selectedValue);
    setFilteredStates([]); // Reset filtered states when country changes
    let countryStates;
    countryStates = states.filter(state => state.country_name === selectedValue);// Filter states based on the selected country
    setFilteredStates(countryStates);
  };
  //Handle textinput changes and BackSpace changes
  const handleInputTextChange = (event) => {
    let hitKey = event.keyCode;
    let text = '';
    // Check for backspace key
    if (event.keyCode === 8) {
      if (selectedCountry.length > 0) {
        //if we do have selected state and seleceted cities
        if (selectedState.length > 0 && selectedCities.length > 0) {
          setLocationInputText(locationInputText.slice(0, -1));
          let tempText = locationInputText.slice(0, -1);
          let x = tempText.split("-");
          x = x[1];
          if (x.includes(",")) {
            let y = x.split(",");
            y = y.filter(function (item) { return item !== ""; });
            cityFiltering(y[y.length - 1]);
          }
          else {
            setSelectedCities([]);
            cityFiltering(x);
          }
        }
        //if we have only selected state but no cities where selected
        else if (selectedState.length > 0 && selectedCities.length <= 0) {
          setLocationInputText(locationInputText.slice(0, -1));
          let tempText = locationInputText.slice(0, -1);
          let x = tempText.split("-");
          x = x.filter(function (item) { return item !== ""; })
          if (x.length > 1) {
            let cityHint = x[x.length - 1];
            cityFiltering(cityHint);
          }
          else {
            setSelectedState('');
            setFilteredCities([]);
            StateFiltering(x[0]);
          }
        }
        // Case where we don't have both selected state and cities
        else if (selectedState.length <= 0 && selectedCities.length <= 0 && locationInputText === "") {
          setSelectedState('');
          setSelectedCities([]);
          setFilteredCities([]);
          setLocationInputText('');
          return;
        }
        else {
          text = locationInputText.slice(0, -1);
          setLocationInputText(text);
          if (text.length === 0) {
            setSelectedState('');
            setFilteredCities([]);
            const stateSuggestionList = document.getElementById("stateSuggestionList");
            stateSuggestionList.style.display = 'none';
          }
          else {
            StateFiltering(text);
          }
        }
      }
      else {
        alert("Please select country first");
      }
    }
    //Check for the key entered is from alphabet
    else if (hitKey >= 65 && hitKey <= 90) {
      if (selectedCountry.length > 0) {
        if (selectedState.length > 0 && selectedCities.length > 0) {
          text = locationInputText + event.key;
          setLocationInputText(text);
          let x = text.split("-");
          x = x.filter(function (item) { return item !== ""; })
          x = x[1];
          let y = x.split(",");
          y = y.filter(function (item) {
            return item !== "";
          });
          cityFiltering(y[y.length - 1]);
        }
        //if we have only selected state but no cities where selected
        else if (selectedState.length > 0 && selectedCities.length <= 0) {
          text = locationInputText + event.key;
          let x = text.split("-");
          setLocationInputText(text);
          cityFiltering(x[1]);
        }
        // Case where we don't have both selected state and cities
        else if (selectedState.length <= 0 && selectedCities.length <= 0) {
          text = locationInputText + event.key;
          setLocationInputText(text);
          StateFiltering(text);
        }
      }
      else {
        alert("Please select country first");
      }
    }
    else if (hitKey === 32) {
      return;
    }

  };
  function StateFiltering(hint) {
    var countryStates;
    // Filter states based on the selected country and input text
    countryStates = states.filter(state => state.country_name === selectedCountry);
    filteredStates = countryStates.filter(state =>
      state.name.toLowerCase().startsWith(hint.toLowerCase()));
    setFilteredStates(filteredStates);
    ToggleStateSuggestionListDisplay(hint);
    return filteredStates
  }
  function cityFiltering(hint) {
    let stateCities;
    if (hint.length > 0) {
      // Filter states based on the selected country and input text
      stateCities = cities.filter(city => city.state_name === selectedState);
      filteredCities = stateCities.filter(city =>
        city.name.toLowerCase().startsWith(hint.toLowerCase()));
      setFilteredCities(filteredCities);
      ToggleCitySuggestionListDisplay();
    }
    else {
      return;
    }
    return filteredCities;
  }
  const handleStateClick = (stateName) => {
    const stateSuggestionList = document.getElementById("stateSuggestionList");
    // Update the input text with the selected state and add a comma
    setLocationInputText(`${stateName}-`);
    setSelectedState(stateName);
    // Filter cities based on the selected state
    const selectedStateCities = cities.filter(
      (city) => city.state_name === stateName && city.country_name === selectedCountry
    );
    setFilteredCities(selectedStateCities);
    stateSuggestionList.style.display = "none";
    ToggleCitySuggestionListDisplay();
  };
  const handleSearchBoxClick = () => {
    if (selectedState.length > 0 && selectedCities.length > 0) {
      setLocationInputText(`${selectedState}-${selectedCities},`);
      ToggleCitySuggestionListDisplay();
    }
    else if (selectedState.length > 0 && selectedCities.length === 0) {
      setLocationInputText(`${selectedState}-`);
    }
  }
  const handleCityClick = (cityName) => {
    let CityList = document.getElementById("citySuggestionList");
    let City = [cityName];
    if (selectedCities.length === 0) {
      setSelectedCities(City);
      setLocationInputText(`${selectedState}-${cityName}`);
      CityList.style.display = "none";
    }
    else {
      let isSelected = selectedCities.includes(cityName);
      if (isSelected) {
        selectedCities = selectedCities.filter((city) => city !== cityName);
        setLocationInputText(`${selectedState}-${selectedCities}`)
        setSelectedCities(selectedCities);
        CityList.style.display = "none";
      }
      else {
        selectedCities = [...selectedCities, cityName];
        setLocationInputText(`${selectedState}-${selectedCities}`)
        setSelectedCities(selectedCities);
        CityList.style.display = "none";
      }
    }
  };
  function ToggleCitySuggestionListDisplay() {
    const citySuggestionList = document.getElementById("citySuggestionList");
    if (document.getElementById("bxStateSearch").value !== "") {
      if (citySuggestionList) {
        citySuggestionList.style.display = "block";
      }
      else {
        citySuggestionList.style.display = "none";
      }
    }
    else {
      citySuggestionList.style.display = "none";
    }
  }
  function ToggleStateSuggestionListDisplay(text) {
    const stateSuggestionList = document.getElementById("stateSuggestionList");
    if (stateSuggestionList) {
      if (text !== "") {
        stateSuggestionList.style.display = "block";
      }
      else {
        stateSuggestionList.style.display = "none";
      }
    }
    else {
      stateSuggestionList.style.display = "none";
    }
  }

  const handleApplyFilters = () => {
    // Implement your logic for applying filters here
    console.log('Applying Filters:', selectedFilters);
  };
  const handleSelectAllChange = () => {
    if (allSectorsChecked) {
      // Unselect "All Sectors" without affecting other checkboxes
      setSelectedSectors([]);
    } else {
      // Select "All Sectors" and all other checkboxes
      setSelectedSectors([...totalSectors.map(sector => `CB${sector}`)]);
    }
  };
  const handleCheckboxChange = (sector) => {
    if (sector === 'CBAllSectors') {
      // Handle the special case of "All Sectors" checkbox
      handleSelectAllChange();
    } else {
      // Handle individual sector checkbox
      const updatedSectors = [...selectedSectors];

      if (updatedSectors.includes(sector)) {
        updatedSectors.splice(updatedSectors.indexOf(sector), 1);
      } else {
        updatedSectors.push(sector);
      }

      setSelectedSectors(updatedSectors);
    }
  };
  const ToggleFiltersDisplay = (e) => {
    const filterDiv = filterContainerRef.current;
    if (filterDiv.style.height === "45px" || filterDiv.style.height === "") {
      filterDiv.style.height = "auto";
      filterDiv.style.overflowY = "scroll";
    }
    else {
      filterDiv.style.height = "45px";
      filterDiv.style.overflowY = "hidden";
    }
  }
  return (
    <div ref={filterContainerRef} className={styles.filterContainer}>
      <div className={styles.FilterBarResponsive}>
        <button onClick={(e) => ToggleFiltersDisplay(e)} className={classNames(styles.filterbtn, styles.Filterbtns)}>Select Filters<FontAwesomeIcon icon={faFilter} size='1.5x' /></button>
      </div>
      <div className={styles.FilterbtnsDiv}>
        <button className={styles.Filterbtns} onClick={handleResetFilters}>Reset Filters</button>
        <button className={styles.Filterbtns1} onClick={handleApplyFilters}>Apply Filters</button>
      </div>
      <ul>
        <li className={styles.filterEntity} onClick={(e) => handleFilterClick(e, 'location')}>
          <div className={styles.FilterItem}>
            Location <i class="fa fa-angle-down"></i>
          </div>
          <div className={styles.FilterPopUpContainer}>
            <div className={styles.popUpHeader}>
              <h4>Country</h4> <button className={styles.filterSpecificResetBtn}>Reset</button>
            </div>
            <div className={styles.popUpBody}>
              <select name="Country" id="countryFilter" value={selectedCountry} onChange={handleCountryChange} className={styles.countryFilter}>
                <option value="" disabled selected>
                  Select Country
                </option>
                {countries.map((country) => (
                  <option key={country.id} value={country.name}>
                    {`${country.name}`}
                  </option>
                ))}
              </select>
              <div id="stateNcity" className={styles.stateNcity}>
                <input type="text" id="bxStateSearch" placeholder='State/City' onClick={handleSearchBoxClick} className={styles.bxStateSearch} value={locationInputText} onKeyDown={handleInputTextChange} />
                <ul id="stateSuggestionList" className={styles.stateSuggestionList}>
                  {filteredStates.map(state => (
                    <li key={state.id} className={styles.listitem} onClick={() => handleStateClick(state.name)}>
                      {state.name}
                    </li>
                  ))}
                </ul>
                <ul id="citySuggestionList" className={styles.stateSuggestionList}>
                  {filteredCities.map((city) => (
                    <li key={city.id} className={styles.listitem} onClick={() => handleCityClick(city.name)}>
                      {city.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <button className={styles.Filterbtns} onClick={handleResetFilters}>Apply Filter</button>
          </div>
        </li>
        <li className={styles.filterEntity} onClick={(e) => handleFilterClick(e, 'skills')}>
          <div className={styles.FilterItem}>
            Skills <i class="fa fa-angle-down"></i>
          </div>
          <div className={styles.FilterPopUpContainer}>
            <div className={styles.popUpHeader}>
              <h4>Skills</h4> <button className={styles.filterSpecificResetBtn}>Reset</button>
            </div>
            <div className={styles.popUpBody}>
              <input type="text" id="bxSkillSearch" placeholder='Enter skills seperated by comma(,)' className={styles.bxStateSearch} />
            </div>
            <button className={styles.Filterbtns} onClick={handleResetFilters}>Apply Filter</button>
          </div>
        </li>
        <li className={styles.filterEntity} onClick={(e) => handleFilterClick(e, 'expectedSalary')}>
          <div className={styles.FilterItem}>
            Expected Salary <i class="fa fa-angle-down"></i>
          </div>
          <div className={styles.FilterPopUpContainer}>
            <div className={styles.popUpHeader}>
              <h4>Salary</h4> <button className={styles.filterSpecificResetBtn}>Reset</button>
            </div>
            <div className={styles.popUpBody}>
              <select name="salaryType" id="salaryType" className={styles.countryFilter}>
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly" selected>Monthly</option>
                <option value="Annually">Annually</option>
              </select>
              <input type="text" placeholder='Min Salary' className={styles.bxStateSearch} id="minSalary" />
              <input type="text" placeholder='Max Salary' className={styles.bxStateSearch} id="maxSalary" />
              <select name="Country" id="countryFilter" className={styles.countryFilter}>
                <option value="INR" selected>INR</option>
                <option value="USD">USD</option>
                <option value="CAD">CAD</option>
                <option value="EUR">EUR</option>
              </select>
            </div>
            <button className={styles.Filterbtns} onClick={handleResetFilters}>Apply Filter</button>
          </div>
        </li>
        <li className={styles.filterEntity} onClick={(e) => handleFilterClick(e, 'yearsOfExperience')}>
          <div className={styles.FilterItem}>
            Years of Experience <i class="fa fa-angle-down"></i>
          </div>
          <div className={styles.FilterPopUpContainer}>
            <div className={styles.popUpHeader}>
              <h4>Experience</h4> <button className={styles.filterSpecificResetBtn}>Reset</button>
            </div>
            <div className={styles.popUpBody}>
              <select className={styles.countryFilter}>
                <option value="" disabled selected hidden>
                  Select experience
                </option>
                <option value="">Fresher <span>(Less than 1 year)</span></option>
                <option value="">1 Year</option>
                <option value="">2 Year</option>
                <option value="">3 Year</option>
                <option value="">4 Year</option>
                <option value="">5 Year</option>
                <option value="">6 Year</option>
                <option value="">7 Year</option>
              </select>
            </div>
            <button className={styles.Filterbtns} onClick={handleResetFilters}>Apply Filter</button>
          </div>
        </li>
        <li className={styles.filterEntity} onClick={(e) => handleFilterClick(e, 'jobType')}>
          <div className={styles.FilterItem}>
            Job Type <i class="fa fa-angle-down"></i>
          </div>
          <div className={styles.FilterPopUpContainer}>
            <div className={styles.popUpHeader}>
              <h4>Job Type</h4> <button className={styles.filterSpecificResetBtn}>Reset</button>
            </div>
            <div className={styles.popUpBody}>
              <div className={styles.CheckbXDiv}>
                <input type="checkbox" name="CBcontract" id="CBcontract" />
                <label htmlFor="CBcontract" className="">Contract</label>
              </div>
              <div className={styles.CheckbXDiv}>
                <input type="checkbox" name="CBpermanent" id="CBpermanent" />
                <label htmlFor="CBpermanent" className="">Permanent</label>
              </div>
            </div>
            <button className={styles.Filterbtns} onClick={handleResetFilters}>Apply Filter</button>
          </div>
        </li>
        <li className={styles.filterEntity} onClick={(e) => handleFilterClick(e, 'sectors')}>
          <div className={styles.FilterItem}>
            Sectors  <i class="fa fa-angle-down"></i>
          </div>
          <div className={styles.FilterPopUpContainer}>
            <div className={styles.popUpHeader}>
              <h4>Sectors</h4> <button className={styles.filterSpecificResetBtn}>Reset</button>
            </div>
            <div className={styles.popUpBody}>
              <div className={styles.CheckbXDiv}>
                <input
                  type="checkbox"
                  name="CBAllSectors"
                  id="CBAllSectors"
                  checked={allSectorsChecked}
                  onChange={handleSelectAllChange}
                />
                <label htmlFor="CBAllSectors" className="">
                  All Sectors
                </label>
              </div>
              {totalSectors.map((sector) => (
                <div className={styles.CheckbXDiv} key={sector}>
                  <input
                    type="checkbox"
                    name={`CB${sector}`}
                    id={`CB${sector}`}
                    checked={selectedSectors.includes(`CB${sector}`)}
                    onChange={() => handleCheckboxChange(`CB${sector}`)}
                  />
                  <label htmlFor={`CB${sector}`} className="">{sector}</label>
                </div>
              ))}
            </div>
            <button className={styles.Filterbtns} onClick={handleResetFilters}>Apply Filter</button>
          </div>
        </li>
      </ul>
    </div>
  )
}

export default Filterbox

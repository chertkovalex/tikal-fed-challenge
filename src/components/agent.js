import React from 'react';

const getCountryIsolationDegree = (country, nAgents) =>
  country.reduce((degree, agent) => degree + nAgents[agent].isolated, 0);

const getCountriesAndAgentsNormalized = agentsList => {
  return agentsList.reduce(
    (acc, value) => {
      const { agent, country } = value;

      // Check whether an agent is isolated
      acc.agents[agent] = { isolated: acc.agents[agent] ? 0 : 1 };

      // Check if there is already a country
      if (!acc.countries[country]) {
        acc.countries[country] = [];
      }

      // Check if there is already an agent in a country
      if (!acc.countries[country].find(ag => ag === agent)) {
        acc.countries[country].push(agent);
      }
      return acc;
    },
    { countries: {}, agents: {} }
  );
};

const getMaxIsolatedCountry = ({ countries, agents }) => {
  // Go over countries
  return Object.keys(countries).reduce((acc, countryName) => {
    // Get isolation degree per country
    const degree = getCountryIsolationDegree(countries[countryName], agents);

    // If there isn't any country or country's degree is lower than current country's degree
    if (!acc.degree || acc.degree < degree) {
      return { countryName, degree };
    }
    return acc;
  }, {});
};

const Agent = ({ agentsList }) => {
  const maxIsolatedCountry = getMaxIsolatedCountry(
    getCountriesAndAgentsNormalized(agentsList)
  );

  return (
    <div>
      Most isolated country is {maxIsolatedCountry.countryName} with an
      isolation degree of {maxIsolatedCountry.degree}
    </div>
  );
};

export default Agent;

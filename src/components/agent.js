import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { forEach, maxBy, reduce } from 'lodash';

const nAgents = {};
const nCountries = {};

const getNormalizedCountriesByAgents = agentsList => {
  // First - get an array of unique countries with number of isolated agents
  forEach(agentsList, value => {
    const { agent, country } = value;

    // Check whether an agent is isolated
    if (nAgents[agent]) {
      nAgents[agent].isolated = 0;
    } else {
      nAgents[agent] = { isolated: 1 };
    }

    // Check if there is already a country
    if (!nCountries[country]) {
      nCountries[country] = { agents: {} };
    }

    // Check if there is already an agent in a country
    if (!nCountries[country].agents[agent]) {
      nCountries[country].agents[agent] = agent;
    }
  });

  return nCountries;
};

const getCountriesIsolationDegree = countries => {
  return reduce(
    countries,
    (result, country, countryName) => {
      const { agents } = country;
      const isolationDegree = reduce(
        agents,
        (degree, agent) => {
          return degree + nAgents[agent].isolated;
        },
        0
      );

      result.push({ country: countryName, isolationDegree });
      return result;
    },
    []
  );
};

class Agent extends Component {
  static propTypes = {
    agentsList: PropTypes.array.isRequired
  };

  render() {
    const nc = getNormalizedCountriesByAgents(this.props.agentsList);
    const isolationDegrees = getCountriesIsolationDegree(nc);
    const maxIsolatedCountry = maxBy(isolationDegrees, 'isolationDegree');

    return (
      <div>
        Most isolated country is {maxIsolatedCountry.country} with an isolation
        degree of {maxIsolatedCountry.isolationDegree}
      </div>
    );
  }
}

export default Agent;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { map, sortBy } from 'lodash';

const getTableRow = ({ agent, country, address, date, key }) => {
  return (
    <tr key={key}>
      <td>{agent}</td>
      <td>{country}</td>
      <td>{address}</td>
      <td>{date}</td>
    </tr>
  );
};

const getAgentsSortedByDate = agentsList => {
  return sortBy(agentsList, agent => {
    const { date } = agent;
    return new Date(date);
  });
};

const getTableHeader = () => {
  return (
    <thead>
      <tr>
        <th className="agent-id">Agent ID</th>
        <th className="country">Country</th>
        <th className="address">Address</th>
        <th className="date">Date</th>
      </tr>
    </thead>
  );
};

class TGrid extends Component {
  static propTypes = {
    agentsList: PropTypes.array.isRequired
  };

  render() {
    const { agentsList } = this.props;
    const sortedAgents = getAgentsSortedByDate(agentsList);

    return (
      <table className="t-grid">
        {getTableHeader()}
        <tbody>
          {map(sortedAgents, (agent, key) => getTableRow({ ...agent, key }))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="4">{agentsList.length} missions</td>
          </tr>
        </tfoot>
      </table>
    );
  }
}

export default TGrid;

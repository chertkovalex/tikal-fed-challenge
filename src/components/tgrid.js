import React from 'react';

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

const getAgentsSortedByDate = agentsList =>
  agentsList.sort((a, b) => new Date(a.date) - new Date(b.date));

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

const tGrid = ({ agentsList }) => {
  const sortedAgents = getAgentsSortedByDate(agentsList);

  return (
    <table className="t-grid">
      {getTableHeader()}
      <tbody>
        {sortedAgents.map((agent, key) => getTableRow({ ...agent, key }))}
      </tbody>
      <tfoot>
        <tr>
          <td colSpan="4">{agentsList.length} missions</td>
        </tr>
      </tfoot>
    </table>
  );
};

export default tGrid;

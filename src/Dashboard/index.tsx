import React from 'react';
import Menu from 'components/Menu';
import MapContainer from 'components/Map/containers';

function Dashboard(props: any) {
  return (
    <div className="dashboard">
      <Menu />
      <MapContainer />
    </div>
  );
}

export default Dashboard;

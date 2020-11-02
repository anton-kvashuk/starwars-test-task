import React from "react";
import ItemDetails, { Record } from "../item-details";
import { withSwapiService } from "../hoc-helpers";

const PlanetDetails = (props) => {
  return (
    <ItemDetails {...props}>
      <Record field="rotationPeriod" label="Rotation Period" />
      <Record field="diameter" label="Diameter" />
      <Record field="climate" label="Climate" />
      <Record field="gravity" label="Gravity" />
      <Record field="terrain" label="Terrain" />
      <Record field="population" label="Population" />
      <Record field="residents" label="Residents" />
    </ItemDetails>
  );
};

const mapMethodsToProps = (swapiService) => {
  return {
    getData: swapiService.getPlanet,
  };
};

export default withSwapiService(mapMethodsToProps)(PlanetDetails);

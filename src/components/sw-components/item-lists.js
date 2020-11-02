import React from "react";
import ItemList from "../item-list";
import {
  withData,
  withSwapiService,
  withChildFunction,
  compose,
} from "../hoc-helpers";

const renderPlanetShortInfo = ({ name, climate, population }) => (
  <span>
    {name}
    <br/> (Climate: {climate},<br/> Population: {population})
  </span>
);

const mapPlanetMethodsToProps = (swapiService) => {
  return {
    getData: swapiService.getAllPlanets,
  };
};

const PlanetList = compose(
  withSwapiService(mapPlanetMethodsToProps),
  withData,
  withChildFunction(renderPlanetShortInfo)
)(ItemList);

export { PlanetList };

import React, { Component } from "react";

import "./item-details.css";

const Residents = ({ list }) =>
  list.length
    ? list.map(({ name, birth_year }) => (
        <span className="residents">
          <span>Name: {name}; </span>
          <span>Birth Year: {birth_year}</span>
        </span>
      ))
    : 'No residents';

const Record = ({ item, field, label }) => {
  console.log('field', field);
  console.log(item[field]);
  return (
    <li className="list-group-item">
      <span className="term">{label}</span>
      <span>{field === 'residents' ? <Residents list={item[field]}/> : item[field]}</span>
    </li>
  );
};

export { Record };

export default class ItemDetails extends Component {
  state = {
    item: null,
    image: null,
  };

  componentDidMount() {
    this.updateItem();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.itemId !== prevProps.itemId ||
      this.props.getData !== prevProps.getData
    ) {
      this.updateItem();
    }
  }

  updateItem() {
    const { itemId, getData } = this.props;
    if (!itemId) {
      return;
    }

    getData(itemId).then((item) => {
      const residents = Promise.all(
        item.residents.map(url => fetch(url).then(res => res.json()))
      )
      .then(residents => {
        this.setState({
          item: { ...item, residents },
        });
      })

    });
  }

  render() {
    const { item } = this.state;
    if (!item) {
      return <span>Just a sec it must be your planet information</span>;
    }

    const { name } = item;

    return (
      <div className="item-details card">
        <div >
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            {React.Children.map(this.props.children, (child) => {
              return React.cloneElement(child, { item });
            })}
          </ul>
        </div>
      </div>
    );
  }
}

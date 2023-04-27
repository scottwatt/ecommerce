import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useStoreContext } from '../../utils/GlobalState';
import {
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
} from '../../utils/actions';
import { QUERY_CATEGORIES } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


function CategoryMenu() {
  const [state, dispatch] = useStoreContext();

  const { categories } = state;

  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

  useEffect(() => {
    if (categoryData) {
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: categoryData.categories,
      });
      categoryData.categories.forEach((category) => {
        idbPromise('categories', 'put', category);
      });
    } else if (!loading) {
      idbPromise('categories', 'get').then((categories) => {
        dispatch({
          type: UPDATE_CATEGORIES,
          categories: categories,
        });
      });
    }
  }, [categoryData, loading, dispatch]);

  const handleChange = (eventKey) => {
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: eventKey,
    });
  };
  

  return (
    <div>
    <DropdownButton
      id="category-dropdown"
      title="Categories"
      variant="secondary"
      onSelect={handleChange}
    >
      <Dropdown.Item eventKey="">Select a category</Dropdown.Item>
      {categories.map((item) => (
        <Dropdown.Item key={item._id} eventKey={item._id}>
          {item.name}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  </div>
  );
}

export default CategoryMenu;

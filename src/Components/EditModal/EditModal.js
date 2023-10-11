import React, { useState } from 'react'
import './EditModal.css'

const EditModal = ({ item, onSave, onClose }) => {

  const [itemToEdit, setItemToEdit] = useState({ ...item });

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // use prev approach when value depend on previous state
    setItemToEdit(prev => ({ ...prev, [name]: value }));
  }

  const handleSaveClick = (item) => {
    if (!isValid(item)) return;

    onSave(item);
    onClose();
    alert("Change saved successfully !");
  }

  const isValid = (item) => {
    if (item.property_name.length <= 0) {
      alert('Please enter a property name');
      return false;
    } else if (item.price < 1) {
      alert('Please enter a valid price');
      return false;
    } else if (item.address.length < 5) {
      alert('Please enter a valid address');
      return false;
    }else{
      return true;
    }
  }

    return (
      <div className='modal'>
        <div className="modal_content">
          <h2>Edit property</h2>
          <label htmlFor="">Property Name</label>
          <input type="text" name='property_name' value={itemToEdit.property_name} onChange={handleInputChange} />
          <label htmlFor="">Price</label>
          <input type="text" name='price' value={itemToEdit.price} onChange={handleInputChange} />
          <label htmlFor="">Address</label>
          <input type="text" name='address' value={itemToEdit.address} onChange={handleInputChange} />

          <div className="modal_btn">
            <button onClick={() => handleSaveClick(itemToEdit)}>Save</button>
            <button onClick={onClose}>Cancel</button>
          </div>

        </div>
      </div>
    )
  }

  export default EditModal;
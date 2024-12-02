import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const Billing = () => {
  const [formData, setFormData] = useState({
    name: '',
    checkIn: '',
    checkOut: '',
    regularRooms: [],
    kidsRoom: '',
    phoneNumber: '',
    email: '',
    items: [],
    paid: '',
    discount: 0,
  });

  const [item, setItem] = useState({ itemName: '', price: '', unit: '' });
  const [finalBill, setFinalBill] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRoomChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        regularRooms: [...prev.regularRooms, value],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        regularRooms: prev.regularRooms.filter((room) => room !== value),
      }));
    }
  };

  const handleAddItem = () => {
    if (item.itemName && item.price && item.unit) {
      setFormData((prev) => ({
        ...prev,
        items: [...prev.items, item],
      }));
      setItem({ itemName: '', price: '', unit: '' });
    } else {
      alert('Please fill in all item fields');
    }
  };

  const handleRemoveItem = (index) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const calculateDaysBetween = () => {
    if (formData.checkIn && formData.checkOut) {
      const checkInDate = new Date(formData.checkIn);
      const checkOutDate = new Date(formData.checkOut);
      const timeDiff = checkOutDate - checkInDate;
      return timeDiff > 0 ? Math.ceil(timeDiff / (1000 * 60 * 60 * 24)) : 0;
    }
    return 0;
  };

  const calculateFinalBill = () => {
    const days = calculateDaysBetween();
    const roomPrice = days * formData.regularRooms.length * 3000; // Example: $100 per regular room per day
    const kidsRoomPrice = days * (formData.kidsRoom === '#1' ? 2000 : 0); // Example: $50 per day for Kids Room #1
    const itemsTotal = formData.items.reduce(
      (sum, i) => sum + i.price * i.unit,
      0
    );
    let total = roomPrice + kidsRoomPrice + itemsTotal;
    const discountAmount = (formData.discount / 100) * total;
    setFinalBill(total - discountAmount);
  };

  const calculateBalance = () => {
    return finalBill - (formData.paid ? parseFloat(formData.paid) : 0);
  };

  const downloadPDF = () => {
    const doc = new jsPDF();

    // Homestay Info
    doc.setFontSize(12);
    doc.text(`Homestay Name: Pali's Nest`, 14, 20);
    doc.text(`Address: Bhimtal, Uttrakhand, 263136`, 14, 25);
    doc.text(`Contact: 9897074513`, 14, 30);
    doc.text(`Email: palisnest@yahoo.com`, 14, 35);

    // Title
    doc.setFontSize(16);
    doc.text('Billing Statement', 14, 45);

    // Customer Info (moving it to the right)
    doc.setFontSize(12);
    doc.text(`Name: ${formData.name}`, 14, 55);
    doc.text(`Phone Number: ${formData.phoneNumber}`, 14, 60);
    doc.text(`Email: ${formData.email}`, 14, 65);
    doc.text(`Check-In: ${formData.checkIn}`, 14, 70);
    doc.text(`Check-Out: ${formData.checkOut}`, 14, 75);

    // Rooms and Pricing Table
    const days = calculateDaysBetween();
    let yOffset = 85;
    doc.text('Rooms:', 14, yOffset);
    yOffset += 5;
    formData.regularRooms.forEach((room) => {
      doc.text(`Regular Room ${room}: 3000 Rs x ${days} days`, 14, yOffset);
      yOffset += 5;
    });

    if (formData.kidsRoom === '#1') {
      doc.text(`Kids Room #1: 2000 Rs x ${days} days`, 14, yOffset);
      yOffset += 5;
    }

    // Items Table
    yOffset += 10;
    doc.text('Items:', 14, yOffset);
    yOffset += 5;

    // Table for items
    doc.autoTable({
      startY: yOffset,
      head: [['Item Name', 'Price', 'Quantity']],
      body: formData.items.map((item) => [
        item.itemName,
        `${item.price}`,
        item.unit,
      ]),
    });
    yOffset = doc.lastAutoTable.finalY + 10;

    // Total and Discounts
    doc.text(`Total Bill: ${finalBill} Rs`, 14, yOffset);
    yOffset += 5;
    doc.text(`Discount: ${formData.discount}%`, 14, yOffset);
    yOffset += 5;
    doc.text(`Amount Paid: ${formData.paid} Rs`, 14, yOffset);
    yOffset += 5;
    doc.text(`Balance: ${calculateBalance()} Rs`, 14, yOffset);

    // Terms and Conditions
    doc.setFontSize(10);
    doc.text('Terms & Conditions:', 14, yOffset + 10);
    doc.text('1. Payment is due upon arrival.', 14, yOffset + 15);
    doc.text('2. Cancellations made less than 24 hours before check-in will incur a 50% fee.', 14, yOffset + 20);
    doc.text('3. Damage to property may result in additional charges.', 14, yOffset + 25);

    // Save the PDF
    doc.save('billing_statement.pdf');
  };

  return (
    <div>
      <h1>Billing</h1>
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Add New Bill</h5>

          <form>
            {/* Customer Details */}
            <div className="form-group mb-3">
              <label>Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter name"
              />
            </div>

            <div className="form-group mb-3">
              <label>Check-In</label>
              <input
                type="date"
                className="form-control"
                name="checkIn"
                value={formData.checkIn}
                onChange={handleChange}
              />
            </div>

            <div className="form-group mb-3">
              <label>Check-Out</label>
              <input
                type="date"
                className="form-control"
                name="checkOut"
                value={formData.checkOut}
                onChange={handleChange}
              />
            </div>

            {/* Room Selection */}
            <div className="form-group mb-3">
              <label>Regular Rooms</label>
              <div>
                {['#1', '#2', '#3'].map((room) => (
                  <div key={room} className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id={room}
                      value={room}
                      onChange={handleRoomChange}
                    />
                    <label className="form-check-label" htmlFor={room}>
                      Room {room}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-group mb-3">
              <label>Kids Room</label>
              <select
                className="form-control"
                name="kidsRoom"
                value={formData.kidsRoom}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option value="#1">#1</option>
                <option value="None">None</option>
              </select>
            </div>

            {/* Add Items */}
            <div className="form-group mb-3">
              <h5>Items</h5>
              <input
                type="text"
                className="form-control"
                placeholder="Item name"
                name="itemName"
                value={item.itemName}
                onChange={(e) => setItem({ ...item, itemName: e.target.value })}
              />
              <input
                type="number"
                className="form-control"
                placeholder="Price"
                name="price"
                value={item.price}
                onChange={(e) => setItem({ ...item, price: e.target.value })}
              />
              <input
                type="number"
                className="form-control"
                placeholder="Quantity"
                name="unit"
                value={item.unit}
                onChange={(e) => setItem({ ...item, unit: e.target.value })}
              />
              <button
                type="button"
                className="btn btn-primary mt-3"
                onClick={handleAddItem}
              >
                Add Item
              </button>
            </div>

            {/* Items List */}
            <div>
              {formData.items.map((item, index) => (
                <div key={index} className="d-flex justify-content-between">
                  <span>{item.itemName}</span>
                  <span>{item.price} x {item.unit}</span>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => handleRemoveItem(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* Pricing Details */}
            <div className="form-group mb-3">
              <label>Paid Amount</label>
              <input
                type="number"
                className="form-control"
                name="paid"
                value={formData.paid}
                onChange={handleChange}
              />
            </div>

            <div className="form-group mb-3">
              <label>Discount (%)</label>
              <input
                type="number"
                className="form-control"
                name="discount"
                value={formData.discount}
                onChange={handleChange}
              />
            </div>

            <button
              type="button"
              className="btn btn-primary"
              onClick={calculateFinalBill}
            >
              Calculate Final Bill
            </button>

            <div className="mt-3">
              <h5>Final Bill: {finalBill} Rs</h5>
              <h5>Balance: {calculateBalance()} Rs</h5>
            </div>

            <button
              type="button"
              className="btn btn-success mt-3"
              onClick={downloadPDF}
            >
              Download Bill as PDF
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Billing;

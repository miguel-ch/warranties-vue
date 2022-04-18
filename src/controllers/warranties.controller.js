import moment from "moment";
import WarrantyService from "../services/warranty.service.js";

export const getWarranties = (req, res) => {
  WarrantyService.getWarranties((err, warranties) => {
    // Error
    if (err) return res.status(err.statusCode).json(err.message);

    // Data send
    res.status(200).json(warranties);
  });
};
export const getWarranty = (req, res) => {
  // ID check
  let { id } = req.params;
  if (!id) return res.status(400).json({ message: "No ID given" });

  // Service
  WarrantyService.getWarranty(id, (err, warranty) => {
    // Error
    if (err) return res.status(err.statusCode).json(err.message);

    // Data send
    if (!warranty) return res.status(404).json({ message: "No warranty found" });
    res.status(200).json(warranty);
  });
};
export const createWarranty = (req, res) => {
  // Info check
  let { receipt, item, employee, detail, customer, customer_name } = req.body;
  if (!receipt || !item || !employee || !detail || !customer || !customer_name) return res.status(400).json({ message: "Incomplete information" });

  // Warranty object
  let warranty = {
    receipt: receipt,
    item: item,
    employee: employee,
    detail: detail,
    received_date: moment().format(),
    state: 0,
    customer: customer,
    customer_name: customer_name,
  };

  // Service
  WarrantyService.createWarranty(warranty, (err, data) => {
    // Error
    if (err) return res.status(err.statusCode).json({ message: err.message });

    // Returns the info

    if (data.changes <= 0) return res.status(400).json({ message: "No information created" });
    res.status(201).json({ message: "Created successfully" });
  });
};
export const updateWarranty = (req, res) => {
  // Info check
  let { id } = req.params;
  let { receipt, item, employee, detail, received_date, delivery_date, state, customer, customer_name } = req.body;
  if (!id || !receipt || !item || !employee || !detail || !received_date || !delivery_date || !state || !customer || !customer_name)
    return res.status(400).json({ message: "Incomplete information" });

  // Warranty object

  let warranty = {
    id: id,
    receipt: receipt,
    item: item,
    employee: employee,
    detail: detail,
    received_date: received_date,
    delivery_date: delivery_date,
    state: state,
    customer: customer,
    customer_name: customer_name,
  };

  // Service
  WarrantyService.updateWarranty(warranty, (err, data) => {
    // Error
    if (err) return res.status(err.statusCode).json(err.message);

    if (data.changes <= 0) return res.status(400).json({ message: "No information updated" });
    res.status(202).json({ message: "Updated successfully" });
  });
};

export const deliverWarranty = async (req, res) => {
  // Info check
  let { id } = req.params;
  if (!id) return res.status(400).json({ message: "Incomplete information" });

  WarrantyService.updateWarrantyDeliver({ warranty_id: id, delivery_date: moment().format(), state: 1 }, (err, data) => {
    // Error
    if (err) return res.status(err.statusCode).json(err.message);

    if (data.changes <= 0) return res.status(400).json({ message: "No warranty updated" });

    res.status(202).json({ message: "Updated successfully" });
  });
};

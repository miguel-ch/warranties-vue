import { modifyQuery, searchAllFromTable, searchQuery } from "../models/database.helper.js";

class WarrantyService {
  // Get all the warranty
  static getWarranties(next) {
    searchAllFromTable("garantias", next);
  }

  // Get a warranty by ID
  static getWarranty(id, next) {
    searchQuery("SELECT * FROM garantias WHERE id=?", [id], next);
  }

  // Insert a new warranty
  static createWarranty(warranty, next) {
    modifyQuery(
      "INSERT INTO garantias (factura, item, vendedor, detalle, fecha_recibida, estado, cliente, cliente_nombre) VALUES (?,?,?,?,?,?,?,?);",
      [warranty.receipt, warranty.item, warranty.employee, warranty.detail, warranty.received_date, warranty.state, warranty.customer, warranty.customer_name],
      next
    );
  }

  // Updates the state of a warranty
  static updateWarranty(warranty, next) {
    modifyQuery(
      "UPDATE garantias SET factura=?, item=?, vendedor=?, detalle=?, fecha_recibida=?, fecha_entrega=?, estado=?, cliente=?, cliente_nombre=? WHERE id=?",
      [
        warranty.receipt,
        warranty.item,
        warranty.employee,
        warranty.detail,
        warranty.received_date,
        warranty.delivery_date,
        warranty.state,
        warranty.customer,
        warranty.customer_name,
        warranty.id,
      ],
      next
    );
  }

  // Edit the state of warranty
  static updateWarrantyDeliver(deliver, next) {
    modifyQuery("UPDATE garantias SET fecha_entrega=?, estado=? WHERE id=? AND estado=0", [deliver.delivery_date, deliver.state, deliver.warranty_id], next);
  }
}

export default WarrantyService;

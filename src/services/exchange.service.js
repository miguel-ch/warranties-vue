import {
    searchQuery,
    modifyQuery,
    searchAllFromTable,
} from "../models/database.helper.js";

class ExchangeService {
    // Get all the exchanges
    static getAllExchanges(next) {
        searchAllFromTable("cambios", next);
    }

    // Get a exchange
    static getExchange(warrantyId, next) {
        searchQuery(
            "SELECT * FROM cambios WHERE id_garantia=?",
            warrantyId,
            next
        );
    }

    // Insert a new exchange
    static createExchange(exchange, next) {
        modifyQuery(
            "INSERT INTO cambios (id_garantia, item_cambio, factura_nueva) VALUES (?,?,?);",
            [exchange.warrantyId, exchange.item, exchange.receipt],
            next
        );
    }
}

export default ExchangeService;

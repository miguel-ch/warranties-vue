import ExchangeService from "../services/exchange.service.js";

export const getAllExchanges = (req, res) => {
  ExchangeService.getAllExchanges((err, exchanges) => {
    // Error
    if (err) return res.status(err.statusCode).json(err.message);

    // Data
    res.status(200).json(exchanges);
  });
};

export const getExchange = (req, res) => {
  // Info check
  let { warrantyId } = req.params;
  if (!warrantyId) return res.status(400).json({ message: "No information given" });

  // Service
  ExchangeService.getExchange(warrantyId, (err, exchange) => {
    if (err) return res.status(err.statusCode).json(err.message);

    if (!exchange) return res.status(404).json({ message: "No information found" });
    res.status(200).json(exchange);
  });
};

export const createExchange = (req, res) => {
  // Info check
  let { warrantyId, item, receipt } = req.body;
  if (!warrantyId || !item || !receipt) return res.status(400).json({ message: "No information given" });

  // Service
  ExchangeService.createExchange({ warrantyId, item, receipt }, (err, data) => {
    // Error
    if (err) return res.status(err.statusCode).json({ message: err.message });

    // Returns the info
    if (data.changes <= 0) return res.status(400).json({ message: "No information created" });
    res.status(201).json({ message: "Created successfully" });
  });
};

const express = require("express");
const app = express();

app.use(express.json());

// sample database
let restaurant = {
  restaurantId: 101,
  name: "Domino's Pizza",
  rating: 4.3,
  isOpen: true,
  menu: [
    { itemId: 1, name: "Margherita Pizza", price: 199 },
    { itemId: 2, name: "Farmhouse Pizza", price: 299 }
  ]
};

// GET - Fetch restaurant data
app.get("/restaurant", (req, res) => {
  res.status(200).json(restaurant);
});

// POST - Place an order
app.post("/order", (req, res) => {
  const orderDetails = req.body;

  res.status(201).json({
    message: "Order placed successfully",
    order: orderDetails
  });
});

// PATCH - Update restaurant status (open / close)
app.patch("/restaurant/status", (req, res) => {
  const { isOpen } = req.body;

  restaurant.isOpen = isOpen;

  res.status(200).json({
    message: "Restaurant status updated",
    isOpen: restaurant.isOpen
  });
});

// DELETE - Remove a menu item
app.delete("/menu/:itemId", (req, res) => {
  const itemId = Number(req.params.itemId);

  restaurant.menu = restaurant.menu.filter(
    (item) => item.itemId !== itemId
  );

  res.status(200).json({
    message: "Menu item deleted",
    menu: restaurant.menu
  });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/OrderModel.js";

//@desc create New Order
//@route POST /api/orders
//@access Public
export const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("no order Items");
  } else {
    const order = new Order({
      orderItems: orderItems.map((order) => ({
        ...order,
        product: order._id,
        _id: undefined,
      })),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    const createOrder = await order.save();

    res.status(201).json(createOrder);
  }
});

//@desc Get logged In Users Order
//@route Get /api/orders/myorders
//@access Private
export const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({user: req.user._id});
    res.status(200).json(orders);
});

//@desc Get Order By Id
//@route Get /api/orders/:id
//@access Private
export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email');
  if(order){
    res.status(200).json(order);
  }else{
    res.status(404);
    throw new Error('Order not found')
  }
});

//@desc Update Order to paid
//@route PUT /api/orders/:id/pay
//@access Private
export const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if(order){
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.email_address
    }
    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder)
  }else{
    res.status(404);
    throw new Error("Order not found")
  }

});

//@desc Update Order to delivered
//@route PUT /api/orders/:id/deliver
//@access Private/Admin
export const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if(order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  }else{
    res.status(400);
    throw new Error("Order not found");
  }
});

//@desc Get All orders
//@route Get /api/orders
//@access Private/Amin
export const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name');
  res.status(200).json(orders);
});

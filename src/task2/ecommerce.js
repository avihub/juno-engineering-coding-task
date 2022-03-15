////////////////////////////////////////////// Helper code, do not edit /////////////////////////////////////////
import { allIds, fetchOrderById } from "../api/index.js";

////////////////////////////////// Your code tasks is below //////////////////////////////////////////////////////

const fetchAllOrders = () => {
    const ids = allIds;
    // .....
    //   1. TODO: fetch all ids using the "fetchOrderById" and the given ids, make it work as efficient and clean as possible.
    const fetchPromises = ids.map(id => fetchOrderById(id));
    return Promise.all(fetchPromises);
};

const bucketOrdersByUsers = async () => {
    let ordersByUsers = {};
    //   2. TODO: using the function from section 1 you should now bucket the orders by user.
    // each key in the object (ordersByUsers) represents a userId and each value is an array of the orders of that user.
    const orders = await fetchAllOrders();
    orders.forEach(order => {
        if (ordersByUsers[order.userId]) {
            ordersByUsers[order.userId].push(order);
        } else {
            ordersByUsers[order.userId] = [order];
        }
    })

    return ordersByUsers;
};

const getLast2WeeksOrders = async () => {
    //   3. TODO: fetch all Ids and return array with only the last 2 weeks orders. make it work as efficient and clean as possible.
    const orders = await fetchAllOrders();
    const last2WeeksOrders = [];
    var twoWeeksMS = 1000 * 60 * 60 * 24 * 14;
    const twoWeeksAgoTimestamp = new Date() - twoWeeksMS;
    console.log('twoWeeksAgoTimestamp', twoWeeksAgoTimestamp)
    orders.forEach(order => {
        if (order.timestamp > twoWeeksAgoTimestamp) {
            last2WeeksOrders.push(order);
        }
    });

    return last2WeeksOrders;
};

const bucketOrdersByDate = async () => {
    let ordersByDate = {};
    //   4. TODO: using the function from section 3 bucket the orders by date.
    // each key in the object (ordersByDate) represents a day and each value is an array of the orders in that date.
    const last2weeksOrders = await getLast2WeeksOrders();
    last2weeksOrders.forEach(order => {
        const orderDate = new Date(order.timestamp).getDate();
        if (ordersByDate[orderDate]) {
            ordersByDate[orderDate].push(order);
        } else {
            ordersByDate[orderDate] = [order];
        }
    });

    return ordersByDate;
};

fetchAllOrders()
    .then(orders => { console.log(orders) });

bucketOrdersByUsers()
    .then(ordersByUsers => { console.log(ordersByUsers) });

getLast2WeeksOrders()
    .then(last2WeeksOrders => { console.log(last2WeeksOrders) });

bucketOrdersByDate()
    .then(orderrsByDate => { console.log(orderrsByDate) });

////////////////////////////////////////

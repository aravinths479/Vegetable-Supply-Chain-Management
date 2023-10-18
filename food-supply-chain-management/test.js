// Simulated data (you would fetch this from your database)
const sellers = [
  { userId: 'seller1', quantity: 150, location: 'Karnataka' },
  { userId: 'seller2', quantity: 100, location: 'Karnataka' },
  // ... other sellers
];

const buyers = [
  { userId: 'buyer1', quantity: 50, location: 'Tamil Nadu' },
  { userId: 'buyer2', quantity: 100, location: 'Tamil Nadu' },
  // ... other buyers
];

// Distribution Algorithm
function distributeTomatoes(sellers, buyers) {
  const allocations = [];

  buyers.forEach((buyer) => {
    sellers.forEach((seller) => {
      if (seller.quantity > 0 && seller.location !== buyer.location) {
        const allocatedTomatoes = Math.min(seller.quantity, buyer.quantity);
        if (allocatedTomatoes > 0) {
          allocations.push({
            sellerUserId: seller.userId,
            buyerUserId: buyer.userId,
            allocatedTomatoes,
          });

          // Update quantity for the seller and reduce quantity for the buyer
          seller.quantity -= allocatedTomatoes;
          buyer.quantity -= allocatedTomatoes;
        }
      }
    });
  });

  return allocations;
}

// Run the distribution algorithm
const tomatoAllocations = distributeTomatoes(sellers, buyers);
console.log(tomatoAllocations);

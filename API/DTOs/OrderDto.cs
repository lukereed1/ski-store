using API.Entities.OrderAggregate;

namespace API.DTOs
{
    public class OrderDto
    {
        public int Id { get; set; }
        public string BuyerId { get; set; }
        public ShippingAddress ShippingAddress { get; set; }
        public DateTime OrderData { get; set; }
        public List<OrderItemDto> OrderItems { get; set; }
        public long Subtotal { get; set; }
        public int DeliveryFee { get; set; }
        public string OrderStatus { get; set; }
        public long Total { get; set; }

    }
}
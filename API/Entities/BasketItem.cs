using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    [Table("BasketItems")]
    public class BasketItem
    {
        public int Id { get; set; }
        public int Quantity { get; set; }

        // Navigation properties (Relationships, Product ID is a foreign key need to specify class which it relates to below it)
        public int ProductId { get; set; }
        public Product Product { get; set; }
        // Must specify where this class is being used to ensure cascading delete
        public int BasketId { get; set; }
        public Basket Basket { get; set; }
    }
}
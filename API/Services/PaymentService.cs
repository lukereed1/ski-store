using API.Data.Migrations;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Stripe;

namespace API.Services
{
    public class PaymentService
    {
        private readonly IConfiguration _config;
        public PaymentService(IConfiguration config)
        {
            _config = config;
        }

        public async Task<ActionResult<PaymentIntent>> CreateOrUpdatePaymentIntent(Basket basket)
        {
            StripeConfiguration.ApiKey = _config["StripeSettings:SecretKey"];

            var service = new PaymentIntentService();
            var intent = new PaymentIntent();

            var subtotal = basket.Items.Sum(item => item.Quantity * item.Product.Price);
            var delivery = subtotal > 10000 ? 0 : 500;

            if (string.IsNullOrEmpty(basket.PaymentIntent))
            {
                var options = new PaymentIntentCreateOptions
                {
                    Amount = subtotal + delivery,
                    Currency = "usd",
                    PaymentMethodTypes = new List<string> { "card" }
                };

                intent = await service.CreateAsync(options);
                basket.PaymentIntent = intent.Id;
                basket.ClientSecret = intent.ClientSecret;
            }
            else
            {
                var options = new PaymentIntentUpdateOptions
                {
                    Amount = subtotal + delivery,
                };

                await service.UpdateAsync(basket.PaymentIntent, options);
            }

            return intent;
        }
    }
}
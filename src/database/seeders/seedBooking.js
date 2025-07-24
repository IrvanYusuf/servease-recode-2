require("module-alias/register");

require("dotenv").config();
const { faker } = require("@faker-js/faker/locale/id_ID");
const { Partner } = require("@/models/partner.model");
const { Service } = require("@/models/service.model");
const connectDb = require("@/database/db.js");
const { User } = require("@/models/user.model");
const { PaymentMethod } = require("@/models/paymentMethod.model");
const { APP_FEE } = require("@/constant/constant");
const { Booking } = require("@/models/booking.model");

const jumlah = process.argv[2] || 10;

const seedBooking = async () => {
  await connectDb();
  // 687b11888f6d6220ac217c90
  const partners = await Partner.find({ user_id: "687b11888f6d6220ac217c90" });
  const services = await Service.find({ user_id: "687b11888f6d6220ac217c90" });
  const paymentMethod = await PaymentMethod.find();
  const users = await User.find();

  if (partners.length === 0) {
    console.error("Partner atau Category kosong! Seed data terlebih dahulu.");
    process.exit(1);
  }

  const bookings = [];
  const paymentDue = new Date();
  paymentDue.setHours(paymentDue.getHours() + 24);
  for (let i = 0; i < jumlah; i++) {
    const randomUser = faker.helpers.arrayElement(users);
    const randomService = faker.helpers.arrayElement(services);
    const randomPartner = faker.helpers.arrayElement(partners);
    const randomPaymentMethod = faker.helpers.arrayElement(paymentMethod);
    const possibleStatus = ["pending", "confirmed"];
    bookings.push({
      partner_id: randomPartner._id,
      service_id: randomService._id,
      owner_id: "687b11888f6d6220ac217c90",
      user_id: "687cbb083aaf434d724f2385",
      address_id: "687cbb563aaf434d724f2393",
      payment_method_id: randomPaymentMethod._id,
      payment_status: "unpaid",
      payment_due: paymentDue,
      status: faker.helpers.arrayElement(possibleStatus),
      total_price: randomService.price + APP_FEE,
      sub_total: randomService.price,
      app_cost: APP_FEE,
      booking_date: faker.date.future(),
      booking_time: faker.helpers.arrayElement([
        "09:00",
        "10:00",
        "13:00",
        "15:00",
      ]),
      bring_ladder: faker.datatype.boolean(),
      review_status: faker.helpers.arrayElement(["not_reviewed"]),
      //   notes: faker.lorem.sentence(),
    });
  }
  //   }

  //   await Service.deleteMany();
  await Booking.insertMany(bookings);

  console.log(`✅ Seeded ${jumlah} fake bookings successfully.`);
  process.exit();
};

seedBooking();

require("module-alias/register");

require("dotenv").config();
const { faker } = require("@faker-js/faker/locale/id_ID");
const { Partner } = require("@/models/partner.model");
const { Category } = require("@/models/category.model");
const { Service } = require("@/models/service.model");
const connectDb = require("@/database/db.js");

const jumlah = process.argv[2] || 10;

const seedServices = async () => {
  await connectDb();

  const partners = await Partner.find({ user_id: "687b11888f6d6220ac217c90" });
  const categories = await Category.find();

  if (partners.length === 0 || categories.length === 0) {
    console.error("Partner atau Category kosong! Seed data terlebih dahulu.");
    process.exit(1);
  }

  const services = [];

  for (let i = 0; i < jumlah; i++) {
    const randomPartner = faker.helpers.arrayElement(partners);
    const randomCategory = faker.helpers.arrayElement(categories);

    services.push({
      name: faker.commerce.productName(),
      price: (faker.number.int({ min: 100, max: 5000 }) * 1000).toString(),
      description: faker.lorem.paragraph(),
      partner_id: randomPartner._id,
      category_id: randomCategory._id,
      user_id: "687b11888f6d6220ac217c90",
      thumbnail:
        faker.image.urlLoremFlickr({ category: "business" }) +
        `?random=${faker.string.uuid()}`,
      gallery_images: [
        faker.image.urlLoremFlickr({ category: "business" }),
        faker.image.urlLoremFlickr({ category: "abstract" }),
      ],
    });
  }

  await Service.deleteMany();
  await Service.insertMany(services);

  console.log(`✅ Seeded ${jumlah} fake services successfully.`);
  process.exit();
};

seedServices();

const { sequelize } = require("./db");
const { Restaurant, Menu } = require("./models/index");
const { seedRestaurant, seedMenu } = require("./seedData");

describe("Restaurant and Menu Models", () => {
  /**
   * Runs the code prior to all tests
   */
  beforeAll(async () => {
    // the 'sync' method will create tables based on the model class
    // by setting 'force:true' the tables are recreated each time the
    // test suite is run
    // await Restaurant.bulkCreate(seedRestaurant);
    // await Menu.bulkCreate(seedMenu);
    await sequelize.sync({ force: true });
  });

  test("can create a Restaurant", async () => {
    // TODO - write test
    const restaurant = await Restaurant.create({
      name: "Drews Kitchen",
      location: "queens,ny",
      cuisine: "new york",
    });

    expect(restaurant).toEqual(
      expect.objectContaining({
        name: "Drews Kitchen",
        location: "queens,ny",
        cuisine: "new york",
      })
    );
  });

  test("can create a Menu", async () => {
    // TODO - write test
    const menu = await Menu.create({
      title: "Drews Menu",
    });

    expect(menu).toEqual(
      expect.objectContaining({
        title: "Drews Menu",
      })
    );
  });

  test("can find Restaurants", async () => {
    // TODO - write test
    await Restaurant.bulkCreate(seedRestaurant);
    const restaurant = await Restaurant.findByPk(1);

    console.log("restaurant: ", restaurant);
    expect(restaurant).toEqual(
      expect.objectContaining({
        name: "Drews Kitchen",
        location: "queens,ny",
        cuisine: "new york",
      })
    );
  });

  test("can find Menus", async () => {
    // TODO - write test
    await Menu.bulkCreate(seedMenu);
    const menu = await Menu.findByPk(1);
    expect(menu).toEqual(
      expect.objectContaining({
        title: "Drews Menu",
      })
    );
  });

  test("can delete Restaurants", async () => {
    // TODO - write test
    await Restaurant.bulkCreate(seedRestaurant);
    const restaurant = await Restaurant.findByPk(2);
    await restaurant.destroy();
    const deletedRestaurant = await Restaurant.findByPk(2);

    expect(deletedRestaurant).toEqual(null);
  });
});

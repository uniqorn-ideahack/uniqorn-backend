require("dotenv").config();
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex("users").del();
  await knex("challenges").del();
  const users = await knex("users")
    .returning("id")
    .insert([
      {
        name: "Niklas",
        surname: "Eicker",
        email: "test@example.com",
        password: "$2a$11$YAgktWey7mDy02n2SFOlP.x0wEqBFR5mFdsgjwO7mXsfg2zWWnbg6"
      },
      {
        name: "Jon",
        surname: "Doe",
        email: "test2@example.com",
        password: "$2a$11$YAgktWey7mDy02n2SFOlP.x0wEqBFR5mFdsgjwO7mXsfg2zWWnbg6"
      },
      {
        name: "Jane",
        surname: "Doe",
        email: "test3@example.com",
        password: "$2a$11$YAgktWey7mDy02n2SFOlP.x0wEqBFR5mFdsgjwO7mXsfg2zWWnbg6"
      }
    ]);
  const challenges = await knex("challenges")
    .returning("id")
    .insert([
      {
        title: "Run for 30 mins",
        description:
          "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. ",
        points: 60
      },
      {
        title: "Meditation for sleep",
        description:
          "Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, conset vero eos et accusam et justo duo dolores et ea rebum.",
        points: 30
      },
      {
        title: "Read 30 pages",
        description:
          "At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet",
        points: 30
      }
    ]);
};

require("dotenv").config();
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex("teammates").del();
  await knex("gardens").del();
  await knex("users").del();
  await knex("teams").del();
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
  const teams = await knex("teams")
    .returning("id")
    .insert([
      {
        name: "Pokemon FTW"
      }, 
      {
        name: "Gardeners of god"
      }
    ]);
  await knex("gardens").insert([
    {
      team_id: teams[0],
      longitude: 7.5236,
      latitude: 51.5028,
      size: 2
    },
    {
      team_id: teams[1],
      longitude: 7.5146,
      latitude: 51.5093,
      size: 3
    },
    {
      longitude: 7.5163,
      latitude: 51.5012,
      size: 1
    },
    {
      longitude: 7.5261,
      latitude: 51.5087,
      size: 4
    },
    {
      longitude: 7.532,
      latitude: 51.5016,
      size: 2
    }
  ]);
  await knex("teammates").insert([
    {
      team_id: teams[0],
      user_id: users[0]
    },
    {
      team_id: teams[0],
      user_id: users[1]
    },
    {
      team_id: teams[1],
      user_id: users[0]
    }
  ]);
};

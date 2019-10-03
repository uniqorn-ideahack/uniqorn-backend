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
  await knex("buddies").insert([
    {
      user_one: users[0],
      user_two: users[1]
    },
    {
      user_one: users[1],
      user_two: users[2]
    }
  ]);
  const challenges = await knex("challenges")
    .returning("id")
    .insert([
      {
        title: "Run for 60 mins",
        description:
          "Go exercising today to run the marathon in 4 months under 4.30. Other people in your community achieved this goal already.",
        points: 60
      },
      {
        title: "Learn spanish",
        description:
          "Try to learn today 20 minutes Spanish, to talk in basic situations fluently in already 2 months!",
        points: 30
      },
      {
        title: "Read 30 pages",
        description: "Sit down and concentrate on a book for a while.",
        points: 30
      }
    ]);
};

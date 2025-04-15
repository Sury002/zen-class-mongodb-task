### 📄 `queries.js`
```js
// 1. Find all the topics which are taught in the month of October
db.topics.find({
  date: {
    $gte: ISODate("2020-10-01"),
    $lte: ISODate("2020-10-31")
  }
});

// 2. Find all the tasks which are given in the month of October
db.tasks.find({
  date: {
    $gte: ISODate("2020-10-01"),
    $lte: ISODate("2020-10-31")
  }
});

// 3. Find all the company drives which appeared between 15-Oct-2020 and 31-Oct-2020
db.company_drives.find({
  date: {
    $gte: ISODate("2020-10-15"),
    $lte: ISODate("2020-10-31")
  }
});

// 4. Find all the company drives and students who appeared for the placement
db.company_drives.aggregate([
  {
    $lookup: {
      from: "users",
      localField: "students_appeared",
      foreignField: "_id",
      as: "students"
    }
  }
]);

// 5. Find the number of problems solved by each user in codekata
db.codekata.aggregate([
  {
    $lookup: {
      from: "users",
      localField: "user_id",
      foreignField: "_id",
      as: "user"
    }
  },
  {
    $project: {
      _id: 0,
      user: { $arrayElemAt: ["$user.name", 0] },
      problems_solved: "$problems_solved"
    }
  }
]);

// 6. Find all the mentors who have mentee count more than 15
db.mentors.find({
  $expr: {
    $gt: [{ $size: "$mentees" }, 15]
  }
});

// 7. Find the number of users who are absent and task is not submitted between 15-Oct-2020 and 31-Oct-2020
const absentUsers = db.attendance.find({
  date: {
    $gte: ISODate("2020-10-15"),
    $lte: ISODate("2020-10-31")
  },
  status: "Absent"
}).map(a => a.user_id);

db.tasks.find({
  user_id: { $in: absentUsers },
  date: {
    $gte: ISODate("2020-10-15"),
    $lte: ISODate("2020-10-31")
  },
  submitted: false
}).count();

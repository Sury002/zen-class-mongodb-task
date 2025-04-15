# 📦 MongoDB Database Design for Zen Class Program

This document outlines the MongoDB schema design for the Zen Class program, covering all relevant collections.

---

## 

1. users

Represents the students in the program.

  "_id": ObjectId,
  "name": "Surya",
  "email": "Surya@example.com",
  "mentor_id": ObjectId,
  "codekata_score": 120
}

2. codekata

Tracks the number of problems solved by each user.

{
  "_id": ObjectId,
  "user_id": ObjectId,
  "problems_solved": 120
}

3. attendance

Tracks daily attendance for users.

{
  "_id": ObjectId,
  "user_id": ObjectId,
  "date": ISODate("2020-10-20"),
  "status": "Present"  // or "Absent"
}

4. topics

Represents topics taught in class.

{
  "_id": ObjectId,
  "topic": "React Hooks",
  "date": ISODate("2020-10-10")
}

5. tasks

Represents tasks assigned to users.

{
  "_id": ObjectId,
  "user_id": ObjectId,
  "task_name": "React Task",
  "date": ISODate("2020-10-10"),
  "submitted": true
}

6. company_drives

Tracks company drives and the students who appeared.

{
  "_id": ObjectId,
  "company": "Google",
  "date": ISODate("2020-10-25"),
  "students_appeared": [
    ObjectId("652e09cbd39..."),
    ObjectId("652e10aef11...")
  ]
}

7. mentors

Represents mentors and their mentees.

{
  "_id": ObjectId,
  "name": "Mentor Name",
  "email": "mentor@example.com",
  "mentees": [
    ObjectId("652e09cbd39..."),
    ObjectId("652e10aef11..."),
    ...
  ]
}

const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let id = 2;
const diaryList = [
  {
    id: 1,
    title: "오늘은 리액트 세션~",
    content: "리액트는 왜 이렇게 재밌을까?",
    date: "2023-11-22", // 날짜 추가
  },
];

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.get("/api/diary", function (req, res) {
  res.json(diaryList);
});

app.post("/api/diary", (req, res) => {
  const { title, content, date } = req.body;
  diaryList.push({
    id: id++,
    title,
    content,
    date,
  });
  return res.send("success");
});

app.delete("/api/diary/:id", (req, res) => {
  const { id } = req.params;
  console.log(`Deleting diary entry with ID: ${id}`);

  const index = diaryList.findIndex((diary) => diary.id === parseInt(id));

  if (index !== -1) {
    diaryList.splice(index, 1);
    return res.send("success");
  } else {
    return res.status(404).send("Diary not found");
  }
});

app.listen(4000, () => {
  console.log("server start!");
});

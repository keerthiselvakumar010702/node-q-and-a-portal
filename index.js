const express = require("express");
const app = express();
const port = 3000;


const {userRoute}=require("./routes/routeUser");
const {postRoute}=require("./routes/routePost");
const {answerRoute}=require("./routes/routeAnswer");


app.use(express.json());
app.use("/user",userRoute);
app.use("/post",postRoute);
app.use("/answer",answerRoute);





app.listen(port, () => console.log(`Listening on port ${port}..`));
import express from "express";
import { PrismaClient } from "@prisma/client";
import cors from 'cors'
import { emailBox } from "./email.js";


const app = express();
app.use(cors());
const prisma = new PrismaClient();

app.use(express.json());

// Create User
app.post("/user", async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    await prisma.user.findFirst({
      where: {
        email, 
      },
    })
    
    const user = await prisma.user.create({
      data: { name, email, phone },
    });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// store friend details
app.post("/friendDetails", async (req, res) => {
  try {
    const { name, email, phone, course } = req.body;
    const resposnse = await prisma.friendsDetails.findFirst({
      where: {
        email, 
      },
    })
    
    if(resposnse){
      res.status(400).json({error: 'User already exist'})
      return
    }
    const details = await prisma.friendsDetails.create({
      data: { name, email, phone, course },
    });
    
    res.json(details);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get All Users
app.get("/user", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});


// send mail
app.post('/email', async (req, res) => {
  const { name, email } = req.body
  try {
      await emailBox(name, email)

      res.json({
          res: 'Email send'
      })
  } catch (err) {
      console.log(err);
  }
})


const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

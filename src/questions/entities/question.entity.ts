import { Questions } from "src/prisma/generated/client";
import { User } from "../../users/entities/user.entity";
import { Answers } from "src/prisma/generated/client";

export class Question implements Questions {
  id: number;
  title: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
  userid: number; 
}
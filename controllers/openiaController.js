
import { config } from 'dotenv';
config();

import { GoogleGenerativeAI } from '@google/generative-ai';

import { GoogleAIFileManager, FileState } from "@google/generative-ai/server";
import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const mediaPath = __dirname + "/media";


// Controller for summary generation using OpenAI
export async function summaryController(req, res) {

  const { text } = req.body;
    if(!text){
      return res.status(400).json({success:false,message:"Enter some text"});
    }
    const  prompt =  `Summarize it in less words - ${text}`;
  

  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const result = await model.generateContent(prompt);
  console.log(result.response.text());
  return res.status(200).json(result.response.text());
}

// Controller for paragraph generation using OpenAI
export async function paragraphController(req, res) {
    const { text } = req.body;
    if(!text){
      return res.status(400).json({success:false,message:"Enter some text"});
    }
    const  prompt =  `Write a paragraph on - ${text}`;

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);
    console.log(result.response.text());
    return res.status(200).json(result.response.text());
}

// Controller for chatbot response generation using OpenAI
export async function chatbotController(req, res) {
  const { text } = req.body;
  if(!text){
    return res.status(400).json({success:false,message:"Enter some text"});
  }
  const  prompt =  `${text}`;

  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const result = await model.generateContent(prompt);
  console.log(result.response.text());
  return res.status(200).json(result.response.text());
}

// Controller for JavaScript code generation using OpenAI
export async function jsconverterController(req, res) {
  const { text } = req.body;
  if(!text){
    return res.status(400).json({success:false,message:"Enter some text"});
  }
  const  prompt =  `write code in JavaScript - ${text}`;

  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const result = await model.generateContent(prompt);
  console.log(result.response.text());
  return res.status(200).json(result.response.text());
}

// Controller for generating sci-fi images using Google Gemini
export async function grammerCheckerController(req, res) {
  const { text } = req.body;
  if(!text){
    return res.status(400).json({success:false,message:"Enter some text"});
  }
  const  prompt =  `correct the grammer and typo error - ${text}`;

  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const result = await model.generateContent(prompt);
  console.log(result.response.text());
  return res.status(200).json(result.response.text());
}




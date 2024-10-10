import { FormData } from "@/app/types";
import { google, sheets_v4 } from "googleapis";
import { NextResponse } from "next/server";

const auth = new google.auth.GoogleAuth({
  keyFile: "./service-account-key.json", // Path to your service account key
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const PUBLIC_GOOGLE_SHEET_ID = process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID;
const PUBLIC_GOOGLE_SHEET_RANGE = process.env.NEXT_PUBLIC_GOOGLE_SHEET_RANGE;

const sheets: sheets_v4.Sheets = google.sheets({ version: "v4", auth });
const SPREADSHEET_ID =
  PUBLIC_GOOGLE_SHEET_ID || "1jjtVwvKi6teu_3qrqQIun_81Rw7xoGOvqnpyeMGpwoI";
const RANGE = PUBLIC_GOOGLE_SHEET_RANGE || "Sheet1!B4:D"; // Example: Sheet1 columns A-E

export async function POST(request: Request) {
  const { name, password }: FormData = await request.json(); // Parse JSON request body

  try {
    // Validate input data
    if (!name || !password) {
      return NextResponse.json(
        { error: "Name and password are required fields" },
        { status: 400 }
      );
    }

    // Append new row to the Google Sheet
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: RANGE,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[name, password, new Date().toISOString()]], // Add current timestamp
      },
    });

    return NextResponse.json(
      { message: "Form data successfully submitted!" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error appending data to Google Sheets", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

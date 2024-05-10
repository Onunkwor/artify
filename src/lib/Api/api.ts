/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { toast } from "sonner";
const serverUrl = import.meta.env.VITE_SERVER_URL;
export const sendSignUpOtp = async ({
  email,
  subject,
  duration,
  message,
}: {
  email: string;
  subject: string;
  duration: number;
  message: string;
}) => {
  try {
    const url = `${serverUrl}/otp/generate-otp`;
    const response = await axios.post(url, {
      email,
      subject,
      duration,
      message,
    });
    return response.data;
  } catch (error: any) {
    console.log("Error sending user otp: ", error);
    toast.error(JSON.stringify(error.message));
  }
};

export const verifyOtp = async ({
  email,
  otp,
}: {
  email: string;
  otp: string;
}) => {
  try {
    const url = `${serverUrl}/otp/verify`;
    const response = await axios.post(url, { email, otp });
    return response.data;
  } catch (error: any) {
    console.log("Error verifying otp: ", error);
    toast.error(error.message);
  }
};

export const signUserUp = async ({
  firstName,
  lastName,
  email,
  password,
}: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) => {
  try {
    const url = `${serverUrl}/users/signUp`;
    const response = await axios.post(url, {
      firstName,
      lastName,
      email,
      password,
    });
    return response.data;
  } catch (error: any) {
    console.log("Error signing user up: ", error);
    toast.error(JSON.stringify(error.response.data.error));
  }
};

export const signUserIn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const url = `${serverUrl}/users/signIn`;
    const response = await axios.post(url, { email, password });
    return response.data;
  } catch (error: any) {
    console.log("Error signing user in: ", error);
    toast.error(JSON.stringify(error.response.data.error));
  }
};

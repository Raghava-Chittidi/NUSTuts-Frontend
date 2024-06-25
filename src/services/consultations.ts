import axios from "axios";
import { BookedConsultationsView, Consultation } from "../types";
import { AuthenticatedUser } from "../context/AuthContext";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getConsultationsForDate = async (
  tutorialId: number,
  date: string,
  user: AuthenticatedUser
): Promise<Consultation[]> => {
  try {
    const res = await axios.get(`${BASE_URL}/api/consultations/${tutorialId}`, {
      params: { date: date },
      headers: { Authorization: `Bearer ${user.tokens.accessToken}` },
    });
    return res.data.data.consultations;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getAllBookedConsultationsForStudent = async (
  tutorialId: number,
  date: string,
  time: string,
  user: AuthenticatedUser
): Promise<BookedConsultationsView[]> => {
  try {
    const studentBookedConsultations = await getAllBookedConsultations(
      true,
      tutorialId,
      date,
      time,
      user
    );
    return studentBookedConsultations;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getAllBookedConsultationsForTeachingAssistant = async (
  tutorialId: number,
  date: string,
  time: string,
  user: AuthenticatedUser
): Promise<BookedConsultationsView[]> => {
  try {
    const teachingAssistantBookedConsultations =
      await getAllBookedConsultations(false, tutorialId, date, time, user);
    return teachingAssistantBookedConsultations;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const getAllBookedConsultations = async (
  isStudent: boolean,
  tutorialId: number,
  date: string,
  time: string,
  user: AuthenticatedUser
): Promise<BookedConsultationsView[]> => {
  try {
    const res = isStudent
      ? await axios.get(
          `${BASE_URL}/api/consultations/student/${tutorialId}/${user.id}`,
          {
            params: {
              date: date,
              time: time,
            },
            headers: { Authorization: `Bearer ${user.tokens.accessToken}` },
          }
        )
      : await axios.get(
          `${BASE_URL}/api/consultations/teachingAssistant/${tutorialId}`,
          {
            params: {
              date: date,
              time: time,
            },
            headers: { Authorization: `Bearer ${user.tokens.accessToken}` },
          }
        );
    return res.data.data.bookedConsultations;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const bookConsultation = async (
  tutorialId: number,
  consultationId: number,
  user: AuthenticatedUser
): Promise<Consultation | null> => {
  try {
    const res = await axios.put(
      `${BASE_URL}/api/consultations/${tutorialId}/book/${consultationId}`,
      {},
      {
        params: { userId: user.id },
        headers: { Authorization: `Bearer ${user.tokens.accessToken}` },
      }
    );
    return res.data.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const cancelConsultation = async (
  tutorialId: number,
  consultationId: number,
  user: AuthenticatedUser
): Promise<Consultation | null> => {
  try {
    const res = await axios.put(
      `${BASE_URL}/api/consultations/${tutorialId}/cancel/${consultationId}`,
      {},
      {
        params: { userId: user.id },
        headers: { Authorization: `Bearer ${user.tokens.accessToken}` },
      }
    );
    return res.data.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};

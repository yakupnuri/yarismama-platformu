interface UserData {
  email: string;
  age: string;
  gender: string;
  avatarPreview: string;
  color: string;
  activities: {
    date: string;
    type: string;
    value: number;
    points: number;
  }[];
}

const tempStorage: { [key: string]: UserData } = {};

export const saveUserData = (email: string, data: Partial<UserData>) => {
  if (!tempStorage[email]) {
    tempStorage[email] = {
      email,
      age: "",
      gender: "",
      avatarPreview: "",
      color: "",
      activities: [],
    };
  }
  tempStorage[email] = { ...tempStorage[email], ...data };
  console.log("Veriler geçici dosyaya kaydedildi:", tempStorage);
};

export const getUserData = (email: string): UserData | null => {
  return tempStorage[email] || null;
};
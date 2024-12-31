interface UserData {
  email: string;
  username: string;
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
  prizes?: string;
}

const tempStorage: { [key: string]: UserData } = {
  "test@test.com": {
    email: "test@test.com",
    username: "test",
    age: "5",
    gender: "kiz",
    avatarPreview: "",
    color: "#8B5CF6",
    activities: [],
    prizes: "",
  }
};

export const saveUserData = (email: string, data: Partial<UserData>) => {
  if (!tempStorage[email]) {
    tempStorage[email] = {
      email,
      username: "",
      age: "",
      gender: "",
      avatarPreview: "",
      color: "",
      activities: [],
      prizes: "",
    };
  }
  tempStorage[email] = { ...tempStorage[email], ...data };
  console.log("Veriler geçici dosyaya kaydedildi:", tempStorage);
};

export const getUserData = (email: string): UserData | null => {
  return tempStorage[email] || null;
};

export const getAllUsersData = () => {
  console.log("Tüm kullanıcı verileri:", tempStorage);
  const users = Object.values(tempStorage).map(user => ({
    email: user.email,
    username: user.username,
    age: user.age,
    gender: user.gender
  }));
  console.log("Kayıtlı kullanıcılar:", users);
  return tempStorage;
};
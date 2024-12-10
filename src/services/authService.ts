export const login = (email: string, password: string) => {
  const mockUser = { email, token: 'mock-token', id: '12345' };
  localStorage.setItem('user', JSON.stringify(mockUser));
  return mockUser;
};

export const logout = () => {
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

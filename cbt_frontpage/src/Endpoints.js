// const baseURL = process.env.BACKEND_API_URL;


const baseURL = 'https://localhost:7097/api/';
export const getUsers = baseURL + 'users/getAll';
export const getUser = baseURL + 'users';
export const CreateUserURL = baseURL + 'users/create';
export const loginUserURL = baseURL + 'login_';
export const coursesUrl = baseURL + 'courses/getAll';
export const singleCourseURL = baseURL + 'courses/';
export const assessmentsURL = baseURL + 'assessment/getAll';
export const userURL = baseURL + 'Users/';
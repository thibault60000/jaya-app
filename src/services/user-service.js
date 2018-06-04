import {getAuthenticatedHttpHeaders, USER_API_URL} from '../settings'
import Axios from 'axios'

const STUDENT_ENDPOINT = `${USER_API_URL}/api/v1/student`
const ADMIN_ENDPOINT = `${USER_API_URL}/api/v1/admin`
const PROFESSOR_ENDPOINT = `${USER_API_URL}/api/v1/professor`
const TOKEN_ENDPOINT = `${USER_API_URL}/api/v1/token`
const CREDENTIALS_ENDPOINT = `${USER_API_URL}/api/v1/credentials`

export function loginStudent (email, password) {
  return Axios.post(`${STUDENT_ENDPOINT}/signin`, { email, password })
}

export function loginAdmin (email, password) {
  return Axios.post(`${ADMIN_ENDPOINT}/signin`, { email, password })
}

export function loginProfessor (email, password) {
  return Axios.post(`${PROFESSOR_ENDPOINT}/signin`, { email, password })
}

export function registerStudent (email, password, firstName, lastName, studentNumber, specializationId) {
  return Axios.post(`${STUDENT_ENDPOINT}/signup`, {
    email,
    password,
    firstName,
    lastName,
    studentNumber,
    specializationId
  })
}

export function registerProfessor (email, password, firstName, lastName) {
  return Axios.post(`${PROFESSOR_ENDPOINT}/signup`, {
    email,
    password,
    firstName,
    lastName
  })
}

export function verifyToken () {
  return Axios.post(`${TOKEN_ENDPOINT}/verify`, {}, {
    headers: getAuthenticatedHttpHeaders()
  })
}

export function validateStudent (studentId) {
  return Axios.post(`${STUDENT_ENDPOINT}/validate`, { id: studentId }, {
    headers: getAuthenticatedHttpHeaders()
  })
}

export function validateProfessor (professorId) {
  return Axios.post(`${PROFESSOR_ENDPOINT}/validate`, { id: professorId }, {
    headers: getAuthenticatedHttpHeaders()
  })
}

export function adminSetPassword (credentialsId, password) {
  return Axios.post(`${CREDENTIALS_ENDPOINT}/password/set`, { credentialsId, password }, {
    headers: getAuthenticatedHttpHeaders()
  })
}

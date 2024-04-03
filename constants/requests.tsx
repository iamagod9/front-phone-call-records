export const BACKEND_URL = 'http://127.0.0.1:5000'

// users
export const GET_USERS = '/users/'
export const CREATE_USER = '/users/create/'
export const DELETE_USER = '/users/' // /users/:id method DELETE
export const UPDATE_USER = '/users/' // /users/:id method PUT
export const GET_USERS_WITH_ROLE = '/users/get_users_with_role/'
export const GET_USER_BY_LOGIN = '/users/login/' ///users/login/:login
export const GET_USER_BY_ID = '/users/' // /users/:id
export const GET_USER_BY_EMAIL = '/users/email/' // /users/email/:email
export const GET_USERS_HAS_CREATED_BY_MANAGER = '/users/createdBy/' // /users/createdBy/:createdBy
export const BAN_USER = '/users/ban/' // /users/ban/:id

// roles
export const GET_ROLES = '/roles/'
export const GET_ROLE = '/roles/' // /roles/:id
export const CREATE_ROLE = '/roles/create/'
export const UPDATE_ROLE = '/roles/' // /roles/:id method PUT
export const DELETE_ROLE = '/roles/' // /roles/:id method DELETE
export const CREATE_RELATIONS_FOR_ROLES_AND_PERMISSIONS = '/roles/' // /roles/:roleId/:permissionId method POST
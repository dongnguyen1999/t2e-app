import { apiProxy } from '@/utils/proxy';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { isEmpty } from 'lodash';

const baseQuery = fetchBaseQuery({
  baseUrl: apiProxy(''),
  prepareHeaders: headers => {
    let userData = JSON.parse(localStorage.getItem('userData') || '{}');
    if (isEmpty(userData)) {
      userData = JSON.parse(localStorage.getItem('adminData') || '{}');
    }
    if (userData) {
      headers.set('authorization', `Bearer ${userData.token}`);
    }
    return headers;
  },
});

export default baseQuery;
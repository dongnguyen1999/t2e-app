import { Pages } from '@/constants/enums';
import { apiProxy } from '@/utils/proxy';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';

const baseQuery = fetchBaseQuery({
  baseUrl: apiProxy(''),
  prepareHeaders: headers => {
    const pathname = window.location.pathname;
    let userData;

    if (pathname.startsWith(Pages.ADMIN)) {
      userData = JSON.parse(localStorage.getItem('adminData') || '{}');
    } else {
      userData = JSON.parse(localStorage.getItem('userData') || '{}');
    }

    if (userData) {
      headers.set('authorization', `Bearer ${userData.token}`);
    }
    return headers;
  },
});

export default baseQuery;
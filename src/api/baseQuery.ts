import { apiProxy } from '@/utils/proxy';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';

const baseQuery = fetchBaseQuery({
  baseUrl: apiProxy(''),
});

export default baseQuery;
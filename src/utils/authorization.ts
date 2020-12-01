<<<<<<< HEAD
import axios from 'axios';

export const authorization = (token: string): void => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};
=======
import axios from 'axios';

export const authorization = (token: string): void => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};
>>>>>>> 7377281ff8e73210f80e181cbf2709b917949157

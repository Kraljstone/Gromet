import { navCard } from './navCard';

export const showNavCard = () => {
  const routesData = JSON.parse(localStorage.getItem('routesData'));

  routesData?.forEach((data) => {
    if (data.routeName !== '') {
      navCard(data);
    }
  });
};

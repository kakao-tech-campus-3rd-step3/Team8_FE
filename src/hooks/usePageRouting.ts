import { PATH } from '@utils/path';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

export const usePageRouting = () => {
  const navigate = useNavigate();

  const routingController = useMemo(
    () => ({
      home: () => navigate(PATH.HOME),
      landing: () => navigate(PATH.LANDING),
      login: () => navigate(PATH.LOGIN),
      register: () => navigate(PATH.REGISTER),
      space: () => navigate(PATH.SPACE),
      plan: {
        base: (id: string) => {
          return {
            waypoint: () => navigate(PATH.PLAN.WAYPOINT.replace(':id', id)),
            traveler: () => navigate(PATH.PLAN.TRAVELER.replace(':id', id)),
            map: () => navigate(PATH.PLAN.MAP.replace(':id', id)),
            memo: () => navigate(PATH.PLAN.MEMO.replace(':id', id)),
          };
        },
      },
      back: () => navigate(-1),
      //plan: (planId: string) => navigate(PATH.PLAN.replace(":planId", planId)),
    }),
    [navigate]
  );

  return routingController;
};

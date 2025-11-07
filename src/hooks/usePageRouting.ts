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
      plan: (id: string) => () => navigate(PATH.PLAN.replace(':id', id)),
      inbox: () => navigate(PATH.INBOX),
      back: () => navigate(-1),
    }),
    [navigate]
  );

  return routingController;
};

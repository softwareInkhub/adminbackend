import { NextPage } from 'next';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const ActivityTesterPage: NextPage = () => {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to the static HTML file
    window.location.href = '/public/ActivityTester.html';
  }, []);

  return null;
};

export default ActivityTesterPage; 
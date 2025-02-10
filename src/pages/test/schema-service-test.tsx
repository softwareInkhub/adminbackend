import { NextPage } from 'next';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const SchemaServiceTestPage: NextPage = () => {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to the static HTML file
    window.location.href = '/public/SchemaServiceTest.html';
  }, []);

  return null;
};

export default SchemaServiceTestPage; 
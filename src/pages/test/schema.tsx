import { NextPage } from 'next';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const SchemaPage: NextPage = () => {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to the static HTML file
    window.location.href = '/public/test.html';
  }, []);

  return null;
};

export default SchemaPage; 
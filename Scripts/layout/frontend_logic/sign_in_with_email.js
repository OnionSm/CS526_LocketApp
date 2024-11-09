async function fetchData() 
{
    try {
        const response = await fetch('http://localhost:5114/api/user/email/alice.smith@gmail.com', 
        {
        method: 'POST',
        headers: 
        {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer <token>'
        }
      });
      if (!response.ok) 
        {
        throw new Error('Network response was not ok');
        }
      const data = await response.json();
      console.log(data);
    } 
    catch (error) 
    {
      console.error('Error fetching data:', error);
    }
}

export default fetchData();

  

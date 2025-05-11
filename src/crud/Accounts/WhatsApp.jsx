import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const WhatsApp = ({ user, balance }) => {
  const [userMobile, setUserMobile] = useState(user?.Mobile || ''); // User's mobile number
  const [message, setMessage] = useState(
    `Hello from Vignan Degree College, 
    dear ${user?.sname || ''} ${user?.name || ''}, you have paid a fee of Rs. ${user?.amount || '0'}, and
    the balance amount is Rs. ${balance || '0'}.
    Thank you from Vignan Management`
  ); // Default message

  let { id } = useParams();

  const getApi = async () => {
    try {
      const { data } = await axios.get(`http://localhost:8080/api/vignan/student/${id}`);
      setUserMobile(data.Mobile); // Set the user's mobile number
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    getApi();
  }, [id]); // Dependency array includes 'id' to fetch when 'id' changes

  const apiURL = 'https://graph.facebook.com/v14.0'; // Base API URL
  const apiKey = 'AfYLUpAE76oiEmwe3AN3p9_'; // Replace with your actual access token
  const phoneNumberId = '9989092432'; // Replace with your phone number ID

  const sendMessage = () => {
    if (!userMobile) {
      console.error('Recipient phone number is missing.');
      return;
    }

    axios
      .post(
        `${apiURL}/${phoneNumberId}/messages`,
        {
          messaging_product: 'whatsapp',
          to: userMobile, // Recipient's phone number
          type: 'text',
          text: {
            body: message,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`, // Access token
            'Content-Type': 'application/json',
          },
        }
      )
      .then((response) => {
        console.log('Message sent successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error sending message:', error);
      });
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Send WhatsApp Message</h1>
      <div className="mb-4">
        <label className="block mb-2 font-medium">User Mobile Number</label>
        <input
          type="text"
          value={userMobile}
          onChange={(e) => setUserMobile(e.target.value)}
          className="border rounded p-2 w-full"
          placeholder="Enter mobile number"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2 font-medium">Message</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border rounded p-2 w-full"
          rows="4"
          placeholder="Enter your message"
        ></textarea>
      </div>
      <button
        onClick={sendMessage}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Send Message
      </button>
    </div>
  );
};

export default WhatsApp;

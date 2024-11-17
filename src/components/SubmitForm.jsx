import { useState } from 'react';
import { format } from 'date-fns';

function SubmitForm() {
  const [type, setType] = useState('confession');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!content.trim()) {
      setMessage('Please enter some content');
      return;
    }

    const submission = {
      id: Date.now(),
      type,
      content,
      timestamp: format(new Date(), 'PPpp'),
    };

    const submissions = JSON.parse(localStorage.getItem('submissions') || '[]');
    localStorage.setItem('submissions', JSON.stringify([...submissions, submission]));

    setContent('');
    setMessage('Successfully submitted!');
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Submit Anonymously</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2 font-medium">Type:</label>
          <div className="flex gap-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                value="confession"
                checked={type === 'confession'}
                onChange={(e) => setType(e.target.value)}
                className="mr-2 cursor-pointer"
              />
              Confession
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                value="roast"
                checked={type === 'roast'}
                onChange={(e) => setType(e.target.value)}
                className="mr-2 cursor-pointer"
              />
              Roast
            </label>
          </div>
        </div>

        <div>
          <label className="block mb-2 font-medium">Your {type}:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-32 p-3 border border-[#000ee]/20 rounded focus:outline-none focus:border-[#000ee] resize-none"
            placeholder={`Enter your ${type} here...`}
          />
        </div>

        <button
          type="submit"
          className="w-full md:w-auto px-8 py-3 bg-[#000ee] text-black text-lg font-semibold rounded-lg hover:bg-[#000ee]/90 transition-colors transform hover:scale-105 duration-200 shadow-lg"
        >
          Submit {type}
        </button>

        {message && (
          <p className={`text-lg font-medium ${message.includes('error') ? 'text-red-500' : 'text-green-600'}`}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
}

export default SubmitForm;
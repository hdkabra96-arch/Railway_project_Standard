import React, { useState, useEffect } from 'react';
import { getCertifications, updateCertifications } from '../../lib/api';
import { Save } from 'lucide-react';

export default function ManageCertifications() {
  const [text, setText] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    getCertifications().then(data => {
      setText(data.text);
    });
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    setMessage('');
    try {
      await updateCertifications(text);
      setMessage('Certifications updated successfully!');
    } catch (err) {
      setMessage('Failed to update certifications.');
    }
    setIsSaving(false);
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="max-w-3xl">
      <div className="bg-white border border-[#E5E5EA] rounded-[20px] p-6 relative shadow-[0_4px_12px_rgba(0,0,0,0.03)]">
        <div className="text-[12px] uppercase tracking-[1px] text-[#8E8E93] font-bold mb-4">Public Notice / Certifications</div>
        
        {message && (
          <div className={`mb-6 p-4 rounded-lg border text-sm font-medium ${message.includes('success') ? 'bg-[#E1F5E1] text-[#1B5E20] border-[#E1F5E1]' : 'bg-red-50 text-red-700 border-red-200'}`}>
            {message}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <textarea
              rows={8}
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full px-4 py-3 border border-[#E5E5EA] rounded-lg focus:ring-2 focus:ring-[#FFB800] outline-none resize-none text-[13px] text-[#1C1C1E]"
              placeholder="Enter certifications details..."
            />
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-[#FFB800] text-[#1C1C1E] px-5 py-2.5 rounded-lg font-semibold text-[13px] border-none cursor-pointer flex items-center disabled:opacity-70 hover:bg-[#e5a600] transition-colors"
            >
              <Save className="h-4 w-4 mr-2" />
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

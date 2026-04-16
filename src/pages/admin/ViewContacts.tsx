import React, { useState, useEffect } from 'react';
import { getContacts } from '../../lib/api';
import { Mail } from 'lucide-react';

export default function ViewContacts() {
  const [contacts, setContacts] = useState<any[]>([]);

  useEffect(() => {
    getContacts().then(data => {
      // Sort by newest first
      setContacts(data.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    });
  }, []);

  return (
    <div>
      <div className="bg-white border border-[#E5E5EA] rounded-[20px] p-6 relative shadow-[0_4px_12px_rgba(0,0,0,0.03)] overflow-hidden">
        <div className="text-[12px] uppercase tracking-[1px] text-[#8E8E93] font-bold mb-4">Contact Submissions</div>
        
        {contacts.length === 0 ? (
          <div className="py-12 text-center text-[#8E8E93] text-[13px]">
            <Mail className="h-12 w-12 mx-auto mb-4 text-[#E5E5EA]" />
            <p>No contact submissions yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {contacts.map((contact) => (
              <div key={contact.id} className="border border-[#E5E5EA] rounded-xl p-5 hover:border-[#FFB800] transition-colors">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="font-semibold text-[14px]">{contact.name}</div>
                    <a href={`mailto:${contact.email}`} className="text-[#8E8E93] text-[12px] hover:text-[#FFB800]">
                      {contact.email}
                    </a>
                  </div>
                  <div className="text-[11px] text-[#8E8E93]">
                    {new Date(contact.date).toLocaleDateString()}
                  </div>
                </div>
                <div className="bg-[#F2F2F7] p-3 rounded-lg text-[13px] text-[#1C1C1E] whitespace-pre-wrap">
                  {contact.message}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

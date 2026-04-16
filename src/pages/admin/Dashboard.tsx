import React, { useState, useEffect } from 'react';
import { getProjects, getServices, getContacts, getCertifications } from '../../lib/api';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [stats, setStats] = useState({ projects: 0, services: 0, contacts: 0 });
  const [recentProjects, setRecentProjects] = useState<any[]>([]);
  const [recentServices, setRecentServices] = useState<any[]>([]);
  const [recentContacts, setRecentContacts] = useState<any[]>([]);
  const [certText, setCertText] = useState('');

  useEffect(() => {
    Promise.all([getProjects(), getServices(), getContacts(), getCertifications()]).then(
      ([projects, services, contacts, certs]) => {
        setStats({
          projects: projects.length,
          services: services.length,
          contacts: contacts.length,
        });
        setRecentProjects(projects.slice(0, 5));
        setRecentServices(services.slice(0, 4));
        setRecentContacts(contacts.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 2));
        setCertText(certs.text);
      }
    );
  }, []);

  return (
    <div className="grid grid-cols-6 gap-5">
      {/* Stats Cards */}
      <div className="col-span-6 md:col-span-2 bg-white border border-[#E5E5EA] rounded-[20px] p-6 relative shadow-[0_4px_12px_rgba(0,0,0,0.03)]">
        <div className="text-[12px] uppercase tracking-[1px] text-[#8E8E93] font-bold mb-4">Active Projects</div>
        <div className="text-[36px] font-bold mb-1">{stats.projects}</div>
        <div className="text-[#27AE60] text-[12px] font-semibold">Total recorded</div>
      </div>
      <div className="col-span-6 md:col-span-2 bg-white border border-[#E5E5EA] rounded-[20px] p-6 relative shadow-[0_4px_12px_rgba(0,0,0,0.03)]">
        <div className="text-[12px] uppercase tracking-[1px] text-[#8E8E93] font-bold mb-4">New Enquiries</div>
        <div className="text-[36px] font-bold mb-1">{stats.contacts}</div>
        <div className="text-[#8E8E93] text-[12px]">Total submissions</div>
      </div>
      <div className="col-span-6 md:col-span-2 bg-white border border-[#E5E5EA] rounded-[20px] p-6 relative shadow-[0_4px_12px_rgba(0,0,0,0.03)]">
        <div className="text-[12px] uppercase tracking-[1px] text-[#8E8E93] font-bold mb-4">Services</div>
        <div className="text-[36px] font-bold mb-1">{stats.services}</div>
        <div className="text-[#8E8E93] text-[12px]">Active categories</div>
      </div>

      {/* Projects Card */}
      <div className="col-span-6 md:col-span-4 md:row-span-2 bg-white border border-[#E5E5EA] rounded-[20px] p-6 relative shadow-[0_4px_12px_rgba(0,0,0,0.03)]">
        <div className="text-[12px] uppercase tracking-[1px] text-[#8E8E93] font-bold mb-4">Live Website Projects</div>
        <table className="w-full border-collapse mt-2">
          <thead>
            <tr>
              <th className="text-left text-[11px] text-[#8E8E93] pb-3 border-b border-[#E5E5EA]">PROJECT NAME</th>
              <th className="text-left text-[11px] text-[#8E8E93] pb-3 border-b border-[#E5E5EA]">CLIENT</th>
              <th className="text-left text-[11px] text-[#8E8E93] pb-3 border-b border-[#E5E5EA]">STATUS</th>
              <th className="text-left text-[11px] text-[#8E8E93] pb-3 border-b border-[#E5E5EA]">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {recentProjects.map(p => (
              <tr key={p.id}>
                <td className="py-3.5 text-[13px] border-b border-[#f9f9f9]">{p.title}</td>
                <td className="py-3.5 text-[13px] border-b border-[#f9f9f9]">{p.client}</td>
                <td className="py-3.5 text-[13px] border-b border-[#f9f9f9]">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${p.status === 'Completed' ? 'bg-[#E1F5E1] text-[#1B5E20]' : 'bg-[#FFF4E5] text-[#663C00]'}`}>
                    {p.status}
                  </span>
                </td>
                <td className="py-3.5 text-[13px] border-b border-[#f9f9f9] text-[#FFB800] cursor-pointer font-medium">
                  <Link to="/admin/projects">Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Services Card */}
      <div className="col-span-6 md:col-span-2 md:row-span-2 bg-white border border-[#E5E5EA] rounded-[20px] p-6 relative shadow-[0_4px_12px_rgba(0,0,0,0.03)]">
        <div className="text-[12px] uppercase tracking-[1px] text-[#8E8E93] font-bold mb-4">Service Categories</div>
        {recentServices.map(s => (
          <div key={s.id} className="flex items-center gap-3 py-3 border-b border-[#f9f9f9]">
            <div className="w-9 h-9 bg-[#f0f0f0] rounded-lg flex items-center justify-center font-bold text-[14px] text-[#8E8E93] shrink-0">
              {s.title.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-[14px] truncate">{s.title}</div>
              <div className="text-[11px] text-[#8E8E93] truncate">{s.description}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Messages Card */}
      <div className="col-span-6 md:col-span-3 bg-white border border-[#E5E5EA] rounded-[20px] p-6 relative shadow-[0_4px_12px_rgba(0,0,0,0.03)]">
        <div className="absolute top-6 right-6 bg-[#FFB800] w-2 h-2 rounded-full"></div>
        <div className="text-[12px] uppercase tracking-[1px] text-[#8E8E93] font-bold mb-4">Contact Submissions</div>
        {recentContacts.length > 0 ? recentContacts.map(c => (
          <div key={c.id} className="flex flex-col gap-1 mb-4 last:mb-0">
            <div className="font-semibold text-[13px]">{c.name} • {c.email}</div>
            <div className="text-[12px] text-[#8E8E93] whitespace-nowrap overflow-hidden text-ellipsis">{c.message}</div>
            <div className="text-[10px] text-[#8E8E93]">{new Date(c.date).toLocaleDateString()}</div>
          </div>
        )) : (
          <div className="text-[13px] text-[#8E8E93]">No recent submissions.</div>
        )}
      </div>

      {/* Certifications Card */}
      <div className="col-span-6 md:col-span-3 bg-white border border-[#E5E5EA] rounded-[20px] p-6 relative shadow-[0_4px_12px_rgba(0,0,0,0.03)]">
        <div className="text-[12px] uppercase tracking-[1px] text-[#8E8E93] font-bold mb-4">Public Notice</div>
        <div className="text-[13px] leading-[1.6] line-clamp-3">
          {certText}
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { getServices, createService, updateService, deleteService } from '../../lib/api';
import { Plus, X } from 'lucide-react';

export default function ManageServices() {
  const [services, setServices] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ title: '', description: '', image: '' });

  const loadServices = async () => {
    const data = await getServices();
    setServices(data);
  };

  useEffect(() => {
    loadServices();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await updateService(editingId, formData);
    } else {
      await createService(formData);
    }
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({ title: '', description: '', image: '' });
    loadServices();
  };

  const handleEdit = (service: any) => {
    setFormData({
      title: service.title,
      description: service.description,
      image: service.image || ''
    });
    setEditingId(service.id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this service?')) {
      await deleteService(id);
      loadServices();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <div></div>
        <button
          onClick={() => {
            setEditingId(null);
            setFormData({ title: '', description: '', image: '' });
            setIsModalOpen(true);
          }}
          className="bg-[#FFB800] text-[#1C1C1E] px-5 py-2.5 rounded-lg font-semibold text-[13px] border-none cursor-pointer flex items-center hover:bg-[#e5a600] transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Service
        </button>
      </div>

      <div className="bg-white border border-[#E5E5EA] rounded-[20px] p-6 relative shadow-[0_4px_12px_rgba(0,0,0,0.03)] overflow-hidden">
        <div className="text-[12px] uppercase tracking-[1px] text-[#8E8E93] font-bold mb-4">All Services</div>
        <table className="w-full border-collapse mt-2">
          <thead>
            <tr>
              <th className="text-left text-[11px] text-[#8E8E93] pb-3 border-b border-[#E5E5EA]">SERVICE</th>
              <th className="text-left text-[11px] text-[#8E8E93] pb-3 border-b border-[#E5E5EA]">DESCRIPTION</th>
              <th className="text-right text-[11px] text-[#8E8E93] pb-3 border-b border-[#E5E5EA]">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id}>
                <td className="py-3.5 text-[13px] border-b border-[#f9f9f9]">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-[#f0f0f0] rounded-lg flex items-center justify-center font-bold text-[14px] text-[#8E8E93]">
                      {service.title.charAt(0)}
                    </div>
                    <div className="font-semibold">{service.title}</div>
                  </div>
                </td>
                <td className="py-3.5 text-[13px] border-b border-[#f9f9f9] text-[#8E8E93] max-w-xs truncate">{service.description}</td>
                <td className="py-3.5 text-[13px] border-b border-[#f9f9f9] text-right">
                  <button onClick={() => handleEdit(service)} className="text-[#FFB800] hover:text-[#e5a600] mr-4 font-medium">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(service.id)} className="text-red-500 hover:text-red-700 font-medium">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {services.length === 0 && (
              <tr>
                <td colSpan={3} className="py-8 text-center text-[#8E8E93] text-[13px]">No services found. Add one to get started.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-[#111111]/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[20px] shadow-xl w-full max-w-md overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-[#E5E5EA]">
              <h3 className="text-[18px] font-bold text-[#1C1C1E]">{editingId ? 'Edit Service' : 'Add Service'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-[#8E8E93] hover:text-[#1C1C1E]">
                <X className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-[13px] font-medium text-[#1C1C1E] mb-1">Title</label>
                <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-3 py-2 border border-[#E5E5EA] rounded-lg focus:ring-2 focus:ring-[#FFB800] outline-none text-[13px]" />
              </div>
              <div>
                <label className="block text-[13px] font-medium text-[#1C1C1E] mb-1">Description</label>
                <textarea required rows={4} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-3 py-2 border border-[#E5E5EA] rounded-lg focus:ring-2 focus:ring-[#FFB800] outline-none resize-none text-[13px]" />
              </div>
              <div>
                <label className="block text-[13px] font-medium text-[#1C1C1E] mb-1">Image URL</label>
                <input type="url" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="w-full px-3 py-2 border border-[#E5E5EA] rounded-lg focus:ring-2 focus:ring-[#FFB800] outline-none text-[13px]" placeholder="https://..." />
              </div>
              <div className="pt-4 flex justify-end space-x-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-[#8E8E93] hover:bg-[#F2F2F7] rounded-lg transition-colors text-[13px] font-medium">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-[#FFB800] text-[#1C1C1E] rounded-lg hover:bg-[#e5a600] transition-colors text-[13px] font-semibold">Save Service</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

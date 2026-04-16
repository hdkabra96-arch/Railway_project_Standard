import React, { useState, useEffect } from 'react';
import { getProjects, createProject, updateProject, deleteProject } from '../../lib/api';
import { Plus, X } from 'lucide-react';

export default function ManageProjects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ title: '', client: '', status: '', year: '', image: '' });

  const loadProjects = async () => {
    const data = await getProjects();
    setProjects(data);
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      await updateProject(editingId, formData);
    } else {
      await createProject(formData);
    }
    setIsModalOpen(false);
    setEditingId(null);
    setFormData({ title: '', client: '', status: '', year: '', image: '' });
    loadProjects();
  };

  const handleEdit = (project: any) => {
    setFormData({
      title: project.title,
      client: project.client,
      status: project.status,
      year: project.year,
      image: project.image || ''
    });
    setEditingId(project.id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      await deleteProject(id);
      loadProjects();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <div></div>
        <button
          onClick={() => {
            setEditingId(null);
            setFormData({ title: '', client: '', status: '', year: '', image: '' });
            setIsModalOpen(true);
          }}
          className="bg-[#FFB800] text-[#1C1C1E] px-5 py-2.5 rounded-lg font-semibold text-[13px] border-none cursor-pointer flex items-center hover:bg-[#e5a600] transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Project
        </button>
      </div>

      <div className="bg-white border border-[#E5E5EA] rounded-[20px] p-6 relative shadow-[0_4px_12px_rgba(0,0,0,0.03)] overflow-hidden">
        <div className="text-[12px] uppercase tracking-[1px] text-[#8E8E93] font-bold mb-4">All Projects</div>
        <table className="w-full border-collapse mt-2">
          <thead>
            <tr>
              <th className="text-left text-[11px] text-[#8E8E93] pb-3 border-b border-[#E5E5EA]">PROJECT NAME</th>
              <th className="text-left text-[11px] text-[#8E8E93] pb-3 border-b border-[#E5E5EA]">CLIENT</th>
              <th className="text-left text-[11px] text-[#8E8E93] pb-3 border-b border-[#E5E5EA]">STATUS</th>
              <th className="text-left text-[11px] text-[#8E8E93] pb-3 border-b border-[#E5E5EA]">YEAR</th>
              <th className="text-right text-[11px] text-[#8E8E93] pb-3 border-b border-[#E5E5EA]">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                <td className="py-3.5 text-[13px] border-b border-[#f9f9f9]">
                  <div className="flex items-center">
                    {project.image && (
                      <img src={project.image} alt="" className="h-8 w-8 rounded-md object-cover mr-3" />
                    )}
                    <div className="font-semibold">{project.title}</div>
                  </div>
                </td>
                <td className="py-3.5 text-[13px] border-b border-[#f9f9f9] text-[#8E8E93]">{project.client}</td>
                <td className="py-3.5 text-[13px] border-b border-[#f9f9f9]">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${project.status === 'Completed' ? 'bg-[#E1F5E1] text-[#1B5E20]' : 'bg-[#FFF4E5] text-[#663C00]'}`}>
                    {project.status}
                  </span>
                </td>
                <td className="py-3.5 text-[13px] border-b border-[#f9f9f9] text-[#8E8E93]">{project.year}</td>
                <td className="py-3.5 text-[13px] border-b border-[#f9f9f9] text-right">
                  <button onClick={() => handleEdit(project)} className="text-[#FFB800] hover:text-[#e5a600] mr-4 font-medium">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(project.id)} className="text-red-500 hover:text-red-700 font-medium">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {projects.length === 0 && (
              <tr>
                <td colSpan={5} className="py-8 text-center text-[#8E8E93] text-[13px]">No projects found. Add one to get started.</td>
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
              <h3 className="text-[18px] font-bold text-[#1C1C1E]">{editingId ? 'Edit Project' : 'Add Project'}</h3>
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
                <label className="block text-[13px] font-medium text-[#1C1C1E] mb-1">Client</label>
                <input required type="text" value={formData.client} onChange={e => setFormData({...formData, client: e.target.value})} className="w-full px-3 py-2 border border-[#E5E5EA] rounded-lg focus:ring-2 focus:ring-[#FFB800] outline-none text-[13px]" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-medium text-[#1C1C1E] mb-1">Status</label>
                  <input required type="text" value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full px-3 py-2 border border-[#E5E5EA] rounded-lg focus:ring-2 focus:ring-[#FFB800] outline-none text-[13px]" placeholder="e.g. Completed" />
                </div>
                <div>
                  <label className="block text-[13px] font-medium text-[#1C1C1E] mb-1">Year</label>
                  <input required type="text" value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})} className="w-full px-3 py-2 border border-[#E5E5EA] rounded-lg focus:ring-2 focus:ring-[#FFB800] outline-none text-[13px]" />
                </div>
              </div>
              <div>
                <label className="block text-[13px] font-medium text-[#1C1C1E] mb-1">Image URL</label>
                <input type="url" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="w-full px-3 py-2 border border-[#E5E5EA] rounded-lg focus:ring-2 focus:ring-[#FFB800] outline-none text-[13px]" placeholder="https://..." />
              </div>
              <div className="pt-4 flex justify-end space-x-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-[#8E8E93] hover:bg-[#F2F2F7] rounded-lg transition-colors text-[13px] font-medium">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-[#FFB800] text-[#1C1C1E] rounded-lg hover:bg-[#e5a600] transition-colors text-[13px] font-semibold">Save Project</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

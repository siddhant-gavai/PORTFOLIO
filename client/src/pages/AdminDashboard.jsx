import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { FaPlus, FaEdit, FaTrash, FaSignOutAlt } from 'react-icons/fa';

const AdminDashboard = () => {
    const { logout } = useAuth();
    const [projects, setProjects] = useState([]);
    const [view, setView] = useState('projects'); // 'projects' or 'messages'

    // Form State
    const [isEditing, setIsEditing] = useState(false);
    const [currentProject, setCurrentProject] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        techStack: '',
        category: 'Web App',
        githubLink: '',
        liveLink: '',
        imageUrl: ''
    });

    const fetchProjects = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/projects`);
            setProjects(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                await axios.delete(`${import.meta.env.VITE_API_URL}/api/projects/${id}`);
                fetchProjects();
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handleEdit = (project) => {
        setIsEditing(true);
        setCurrentProject(project);
        setFormData({
            title: project.title,
            description: project.description,
            techStack: project.techStack.join(', '),
            category: project.category,
            githubLink: project.githubLink || '',
            liveLink: project.liveLink || '',
            imageUrl: project.imageUrl || ''
        });
        setShowForm(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const projectData = {
            ...formData,
            techStack: formData.techStack.split(',').map(item => item.trim())
        };

        try {
            if (isEditing) {
                await axios.put(`${import.meta.env.VITE_API_URL}/api/projects/${currentProject._id}`, projectData);
            } else {
                await axios.post(`${import.meta.env.VITE_API_URL}/api/projects`, projectData);
            }
            setShowForm(false);
            setIsEditing(false);
            setFormData({
                title: '',
                description: '',
                techStack: '',
                category: 'Web App',
                githubLink: '',
                liveLink: '',
                imageUrl: ''
            });
            fetchProjects();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-primary">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
                    <button
                        onClick={logout}
                        className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                        <FaSignOutAlt /> Logout
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex gap-4 mb-8">
                    <button
                        onClick={() => setView('projects')}
                        className={`px-4 py-2 rounded-lg ${view === 'projects' ? 'bg-accent text-primary font-bold' : 'bg-white dark:bg-secondary text-gray-600 dark:text-gray-300'}`}
                    >
                        Manage Projects
                    </button>
                    {/* Messages Tab Placeholder */}
                    <button
                        disabled
                        className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
                    >
                        Messages (Coming Soon)
                    </button>
                </div>

                {/* Projects View */}
                {view === 'projects' && (
                    <div>
                        <div className="flex justify-end mb-6">
                            <button
                                onClick={() => {
                                    setIsEditing(false);
                                    setFormData({
                                        title: '',
                                        description: '',
                                        techStack: '',
                                        category: 'Web App',
                                        githubLink: '',
                                        liveLink: '',
                                        imageUrl: ''
                                    });
                                    setShowForm(!showForm);
                                }}
                                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                            >
                                <FaPlus /> {showForm ? 'Cancel' : 'Add New Project'}
                            </button>
                        </div>

                        {/* Form */}
                        {showForm && (
                            <div className="bg-white dark:bg-secondary p-6 rounded-xl shadow-lg mb-8">
                                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{isEditing ? 'Edit Project' : 'Add New Project'}</h3>
                                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="col-span-1">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
                                        <input type="text" name="title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:text-white" />
                                    </div>
                                    <div className="col-span-1">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                                        <select name="category" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:text-white">
                                            <option value="Web App">Web App</option>
                                            <option value="Mobile App">Mobile App</option>
                                            <option value="Design">Design</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                                        <textarea name="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required rows="3" className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:text-white"></textarea>
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tech Stack (comma separated)</label>
                                        <input type="text" name="techStack" value={formData.techStack} onChange={(e) => setFormData({ ...formData, techStack: e.target.value })} placeholder="React, Node.js, MongoDB" className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:text-white" />
                                    </div>
                                    <div className="col-span-1">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">GitHub Link</label>
                                        <input type="text" name="githubLink" value={formData.githubLink} onChange={(e) => setFormData({ ...formData, githubLink: e.target.value })} className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:text-white" />
                                    </div>
                                    <div className="col-span-1">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Live Link</label>
                                        <input type="text" name="liveLink" value={formData.liveLink} onChange={(e) => setFormData({ ...formData, liveLink: e.target.value })} className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:text-white" />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Image URL</label>
                                        <input type="text" name="imageUrl" value={formData.imageUrl} onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })} placeholder="https://..." className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:text-white" />
                                    </div>
                                    <div className="col-span-2 flex justify-end">
                                        <button type="submit" className="px-6 py-2 bg-accent text-primary font-bold rounded-lg hover:bg-opacity-80 transition-colors">
                                            {isEditing ? 'Update Project' : 'Update Project'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}

                        {/* List */}
                        <div className="grid gap-4">
                            {projects.map((project) => (
                                <div key={project._id} className="bg-white dark:bg-secondary p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 flex justify-between items-center">
                                    <div>
                                        <h3 className="font-bold text-gray-900 dark:text-white">{project.title}</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{project.category}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={() => handleEdit(project)} className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors">
                                            <FaEdit />
                                        </button>
                                        <button onClick={() => handleDelete(project._id)} className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors">
                                            <FaTrash />
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {projects.length === 0 && <p className="text-center text-gray-500">No projects found.</p>}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;

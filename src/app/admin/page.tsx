"use client";
import { useState, useEffect } from "react";

interface User {
    id: string;
    name: string;
    email: string;
    role: 'Owner' | 'Editor' | 'Viewer';
}

const LoginPage = ({ onLoginSuccess }: { onLoginSuccess: (user: User) => void }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        setIsLoading(true);
        setError('');

        // Simple client-side authentication
        const validEmail = 'vikaskurre80@gmail.com';
        const validPassword = 'procut1000cr';

        if (email === validEmail && password === validPassword) {
            const user = {
                id: 'user-1-owner',
                name: 'Vikas Kurre',
                email: validEmail,
                role: 'Owner' as const
            };

            sessionStorage.setItem('user', JSON.stringify(user));
            sessionStorage.setItem('isLoggedIn', 'true');
            onLoginSuccess(user);
        } else {
            setError('Invalid credentials');
        }

        setIsLoading(false);
    };
    
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white">
            <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-2xl border border-gray-700">
                <div className="flex justify-center mb-6">
                    
                </div>
                <h1 className="text-3xl font-bold text-center mb-6 text-neon-blue">Procut Admin Panel</h1>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full p-3 mb-4 bg-gray-700 text-white rounded border border-gray-600 focus:border-neon-purple focus:outline-none transition-colors"
                    disabled={isLoading}
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full p-3 mb-4 bg-gray-700 text-white rounded border border-gray-600 focus:border-neon-purple focus:outline-none transition-colors"
                    onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                    disabled={isLoading}
                />
                {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
                <button
                    onClick={handleLogin}
                    className="w-full py-3 bg-neon-purple hover:bg-neon-blue text-black font-bold rounded transition-all duration-300 disabled:opacity-50"
                    disabled={isLoading}
                >
                    {isLoading ? 'Logging in...' : 'Login'}
                </button>
            </div>
        </div>
    );
};



interface QuoteItem {
    id: string;
    name: string;
    emailWhatsApp: string;
    projectDetails: string;
    referenceStyle?: string;
    rawFootageLink?: string;
    createdAt: string;
    status: 'pending' | 'contacted' | 'completed';
}

interface PortfolioItem {
    id: number;
    title: string;
    description: string;
    category: 'Reels' | 'Real Estate' | 'Interviews' | 'Ads' | 'Cinematic';
    order: number;
    visible: boolean;
    media: {
        type: 'video' | 'image';
        url: string;
    }[];
    thumbnailUrl: string;
    createdAt: string;
    updatedAt: string;
    ownerId: string;
}

const AddPortfolioModal = ({ onClose, onAdd }: { onClose: () => void, onAdd: () => void }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState<'Reels' | 'Real Estate' | 'Interviews' | 'Ads' | 'Cinematic'>('Reels');
    const [mediaUrl, setMediaUrl] = useState('');
    const [mediaType, setMediaType] = useState<'video' | 'image'>('video');
    const [visible, setVisible] = useState(true);
    const [order, setOrder] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const storedData = localStorage.getItem('portfolioItems');
            const existingItems = storedData ? JSON.parse(storedData) : [];

            const newId = existingItems.length > 0 ? Math.max(...existingItems.map((item: PortfolioItem) => item.id)) + 1 : 1;

            const newItem = {
                id: newId,
                title,
                description,
                category,
                order,
                visible,
                media: [{ type: mediaType, url: mediaUrl }],
                thumbnailUrl: '',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                ownerId: ''
            };

            existingItems.push(newItem);
            localStorage.setItem('portfolioItems', JSON.stringify(existingItems));

            onAdd();
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Failed to add portfolio item');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-lg p-8 w-full max-w-lg border border-gray-700">
                <h2 className="text-2xl font-bold text-white mb-6">Add New Portfolio Item</h2>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <input
                            type="text"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full p-3 bg-gray-700 text-white rounded border border-gray-600 focus:border-neon-purple focus:outline-none"
                            required
                        />
                        <textarea
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full p-3 bg-gray-700 text-white rounded border border-gray-600 focus:border-neon-purple focus:outline-none"
                            rows={3}
                        />
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value as any)}
                            className="w-full p-3 bg-gray-700 text-white rounded border border-gray-600 focus:border-neon-purple focus:outline-none"
                        >
                            <option value="Reels">Reels</option>
                            <option value="Real Estate">Real Estate</option>
                            <option value="Interviews">Interviews</option>
                            <option value="Ads">Ads</option>
                            <option value="Cinematic">Cinematic</option>
                        </select>
                        <select
                            value={mediaType}
                            onChange={(e) => setMediaType(e.target.value as 'video' | 'image')}
                            className="w-full p-3 bg-gray-700 text-white rounded border border-gray-600 focus:border-neon-purple focus:outline-none"
                        >
                            <option value="video">Video</option>
                            <option value="image">Image</option>
                        </select>
                        <input
                            type="text"
                            placeholder="Media URL"
                            value={mediaUrl}
                            onChange={(e) => setMediaUrl(e.target.value)}
                            className="w-full p-3 bg-gray-700 text-white rounded border border-gray-600 focus:border-neon-purple focus:outline-none"
                            required
                        />
                        <input
                            type="number"
                            placeholder="Order"
                            value={order}
                            onChange={(e) => setOrder(parseInt(e.target.value) || 0)}
                            className="w-full p-3 bg-gray-700 text-white rounded border border-gray-600 focus:border-neon-purple focus:outline-none"
                        />
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="visible"
                                checked={visible}
                                onChange={(e) => setVisible(e.target.checked)}
                                className="h-4 w-4 rounded border-gray-300 text-neon-purple focus:ring-neon-purple"
                            />
                            <label htmlFor="visible" className="ml-2 block text-sm text-gray-300">
                                Visible
                            </label>
                        </div>
                    </div>
                    {error && <p className="text-red-500 text-sm text-center mt-4">{error}</p>}
                    <div className="flex justify-end gap-4 mt-6">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-gray-400 hover:text-white">Cancel</button>
                        <button type="submit" className="px-6 py-2 bg-neon-purple hover:bg-neon-blue text-black font-bold rounded" disabled={isLoading}>
                            {isLoading ? 'Adding...' : 'Add Item'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const EditPortfolioModal = ({ item, onClose, onUpdate }: { item: PortfolioItem, onClose: () => void, onUpdate: () => void }) => {
    const [title, setTitle] = useState(item.title);
    const [description, setDescription] = useState(item.description);
    const [category, setCategory] = useState(item.category);
    const [mediaUrl, setMediaUrl] = useState(item.media[0]?.url || '');
    const [mediaType, setMediaType] = useState<'video' | 'image'>(item.media[0]?.type || 'video');
    const [visible, setVisible] = useState(item.visible);
    const [order, setOrder] = useState(item.order);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const storedData = localStorage.getItem('portfolioItems');
            if (!storedData) throw new Error('No portfolio data found');

            const existingItems = JSON.parse(storedData);
            const itemIndex = existingItems.findIndex((i: PortfolioItem) => i.id === item.id);

            if (itemIndex === -1) throw new Error('Portfolio item not found');

            const updatedItem = {
                ...existingItems[itemIndex],
                title,
                description,
                category,
                order,
                visible,
                media: [{ type: mediaType, url: mediaUrl }],
                updatedAt: new Date().toISOString(),
            };

            existingItems[itemIndex] = updatedItem;
            localStorage.setItem('portfolioItems', JSON.stringify(existingItems));

            onUpdate();
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Failed to update portfolio item');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-lg p-8 w-full max-w-lg border border-gray-700">
                <h2 className="text-2xl font-bold text-white mb-6">Edit Portfolio Item</h2>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <input
                            type="text"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full p-3 bg-gray-700 text-white rounded border border-gray-600 focus:border-neon-purple focus:outline-none"
                            required
                        />
                        <textarea
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full p-3 bg-gray-700 text-white rounded border border-gray-600 focus:border-neon-purple focus:outline-none"
                            rows={3}
                        />
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value as any)}
                            className="w-full p-3 bg-gray-700 text-white rounded border border-gray-600 focus:border-neon-purple focus:outline-none"
                        >
                            <option value="Reels">Reels</option>
                            <option value="Real Estate">Real Estate</option>
                            <option value="Interviews">Interviews</option>
                            <option value="Ads">Ads</option>
                            <option value="Cinematic">Cinematic</option>
                        </select>
                        <select
                            value={mediaType}
                            onChange={(e) => setMediaType(e.target.value as 'video' | 'image')}
                            className="w-full p-3 bg-gray-700 text-white rounded border border-gray-600 focus:border-neon-purple focus:outline-none"
                        >
                            <option value="video">Video</option>
                            <option value="image">Image</option>
                        </select>
                        <input
                            type="text"
                            placeholder="Media URL"
                            value={mediaUrl}
                            onChange={(e) => setMediaUrl(e.target.value)}
                            className="w-full p-3 bg-gray-700 text-white rounded border border-gray-600 focus:border-neon-purple focus:outline-none"
                            required
                        />
                        <input
                            type="number"
                            placeholder="Order"
                            value={order}
                            onChange={(e) => setOrder(parseInt(e.target.value) || 0)}
                            className="w-full p-3 bg-gray-700 text-white rounded border border-gray-600 focus:border-neon-purple focus:outline-none"
                            min={0}
                        />
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="visible-edit"
                                checked={visible}
                                onChange={(e) => setVisible(e.target.checked)}
                                className="h-4 w-4 rounded border-gray-300 text-neon-purple focus:ring-neon-purple"
                            />
                            <label htmlFor="visible-edit" className="ml-2 block text-sm text-gray-300">
                                Visible
                            </label>
                        </div>
                    </div>
                    {error && <p className="text-red-500 text-sm text-center mt-4">{error}</p>}
                    <div className="flex justify-end gap-4 mt-6">
                        <button type="button" onClick={onClose} className="px-4 py-2 text-gray-400 hover:text-white">Cancel</button>
                        <button type="submit" className="px-6 py-2 bg-neon-purple hover:bg-neon-blue text-black font-bold rounded" disabled={isLoading}>
                            {isLoading ? 'Updating...' : 'Update Item'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
const AdminDashboard = ({ onLogout }: { onLogout: () => void }) => {
    const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
    const [quotes, setQuotes] = useState<QuoteItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
    const [activeTab, setActiveTab] = useState<'portfolio' | 'quotes'>('portfolio');

    const fetchPortfolioItems = () => {
        try {
            const storedData = localStorage.getItem('portfolioItems');
            if (storedData) {
                const data = JSON.parse(storedData);
                setPortfolioItems(data);
            } else {
                // Initialize with default items if none exist
                const defaultItems: PortfolioItem[] = [
                    {
                        id: 1,
                        title: "Luxury Real Estate Drone Footage",
                        description: "Professional aerial cinematography for high-end real estate showcasing. Capturing stunning landscapes and property features with cinematic angles.",
                        category: "Real Estate",
                        order: 1,
                        visible: true,
                        media: [{ type: "video", url: "https://youtu.be/DKrIVfpWAqE?si=JTui1srQWV2ny400" }],
                        thumbnailUrl: "",
                        createdAt: "2025-12-26T10:00:00.000Z",
                        updatedAt: "2025-12-26T10:00:00.000Z",
                        ownerId: ""
                    },
                    {
                        id: 2,
                        title: "Corporate Interview Reel",
                        description: "Professional interview production for corporate clients. High-quality lighting, sound, and editing for executive presentations.",
                        category: "Interviews",
                        order: 2,
                        visible: true,
                        media: [{ type: "video", url: "https://youtu.be/GzHI1R4KIsk?si=vPA8-eKFIfw202Bm" }],
                        thumbnailUrl: "",
                        createdAt: "2025-12-26T10:00:00.000Z",
                        updatedAt: "2025-12-26T10:00:00.000Z",
                        ownerId: ""
                    },
                    {
                        id: 3,
                        title: "Viral Social Media Reel",
                        description: "Engaging short-form content optimized for Instagram and TikTok. Fast-paced editing with trending music and effects.",
                        category: "Reels",
                        order: 3,
                        visible: true,
                        media: [{ type: "video", url: "https://youtu.be/UmuvFYXHAFA?si=uDrIUBTB0_hAx4X-" }],
                        thumbnailUrl: "",
                        createdAt: "2025-12-26T10:00:00.000Z",
                        updatedAt: "2025-12-26T10:00:00.000Z",
                        ownerId: ""
                    }
                ];
                localStorage.setItem('portfolioItems', JSON.stringify(defaultItems));
                setPortfolioItems(defaultItems);
            }
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Failed to fetch portfolio items');
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        setIsLoading(true);
        fetchPortfolioItems();
        fetchQuotes();
    }, []);

    const handleAddItem = () => {
        fetchPortfolioItems(); // This will reload from localStorage
        setIsAddModalOpen(false);
    };

    const handleUpdateItem = () => {
        fetchPortfolioItems();
        setEditingItem(null);
    };

    const handleDelete = async (itemId: number) => {
        if (window.confirm('Are you sure you want to delete this portfolio item?')) {
            try {
                const storedData = localStorage.getItem('portfolioItems');
                if (!storedData) throw new Error('No portfolio data found');

                const existingItems = JSON.parse(storedData);
                const filteredItems = existingItems.filter((item: PortfolioItem) => item.id !== itemId);

                localStorage.setItem('portfolioItems', JSON.stringify(filteredItems));
                fetchPortfolioItems();
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('Failed to delete portfolio item');
                }
            }
        }
    };

    const handleMoveUp = async (itemId: number) => {
        const item = portfolioItems.find(i => i.id === itemId);
        if (!item || item.order === 0) return;

        const targetOrder = item.order - 1;
        const targetItem = portfolioItems.find(i => i.order === targetOrder);
        if (!targetItem) return;

        try {
            const storedData = localStorage.getItem('portfolioItems');
            if (!storedData) throw new Error('No portfolio data found');

            const existingItems = JSON.parse(storedData);
            const itemIndex = existingItems.findIndex((i: PortfolioItem) => i.id === item.id);
            const targetIndex = existingItems.findIndex((i: PortfolioItem) => i.id === targetItem.id);

            if (itemIndex === -1 || targetIndex === -1) return;

            // Swap orders
            existingItems[itemIndex] = { ...existingItems[itemIndex], order: targetOrder, updatedAt: new Date().toISOString() };
            existingItems[targetIndex] = { ...existingItems[targetIndex], order: item.order, updatedAt: new Date().toISOString() };

            localStorage.setItem('portfolioItems', JSON.stringify(existingItems));
            fetchPortfolioItems();
        } catch (err) {
            setError('Failed to reorder items');
        }
    };

    const handleMoveDown = async (itemId: number) => {
        const item = portfolioItems.find(i => i.id === itemId);
        if (!item || item.order === portfolioItems.length - 1) return;

        const targetOrder = item.order + 1;
        const targetItem = portfolioItems.find(i => i.order === targetOrder);
        if (!targetItem) return;

        try {
            const storedData = localStorage.getItem('portfolioItems');
            if (!storedData) throw new Error('No portfolio data found');

            const existingItems = JSON.parse(storedData);
            const itemIndex = existingItems.findIndex((i: PortfolioItem) => i.id === item.id);
            const targetIndex = existingItems.findIndex((i: PortfolioItem) => i.id === targetItem.id);

            if (itemIndex === -1 || targetIndex === -1) return;

            // Swap orders
            existingItems[itemIndex] = { ...existingItems[itemIndex], order: targetOrder, updatedAt: new Date().toISOString() };
            existingItems[targetIndex] = { ...existingItems[targetIndex], order: item.order, updatedAt: new Date().toISOString() };

            localStorage.setItem('portfolioItems', JSON.stringify(existingItems));
            fetchPortfolioItems();
        } catch (err) {
            setError('Failed to reorder items');
        }
    };

    const fetchQuotes = async () => {
        try {
            const response = await fetch('/api/quotes');
            if (!response.ok) {
                throw new Error('Failed to fetch quotes');
            }
            const data = await response.json();
            setQuotes(data);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('Failed to fetch quotes');
            }
        }
    };

    const updateQuoteStatus = async (quoteId: string, status: 'pending' | 'contacted' | 'completed') => {
        try {
            // For now, we'll update the local state. In a full implementation, you'd have a PUT endpoint
            setQuotes(quotes.map(quote =>
                quote.id === quoteId ? { ...quote, status } : quote
            ));
        } catch (err) {
            setError('Failed to update quote status');
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-900 text-gray-300">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-800 p-6 flex flex-col justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white mb-8">Procut Admin</h1>
                    <nav className="flex flex-col space-y-4">
                        <button
                            onClick={() => setActiveTab('portfolio')}
                            className={`flex items-center p-2 rounded ${activeTab === 'portfolio' ? 'bg-gray-700 text-white' : 'hover:bg-gray-700'}`}
                        >
                            Portfolio
                        </button>
                        <button
                            onClick={() => setActiveTab('quotes')}
                            className={`flex items-center p-2 rounded ${activeTab === 'quotes' ? 'bg-gray-700 text-white' : 'hover:bg-gray-700'}`}
                        >
                            Quotes
                        </button>
                        <a href="#" className="flex items-center p-2 rounded hover:bg-gray-700"> Roles</a>
                        <a href="#" className="flex items-center p-2 rounded hover:bg-gray-700"> Settings</a>
                    </nav>
                </div>
                <button onClick={onLogout} className="flex items-center p-2 rounded hover:bg-red-800 bg-red-600 text-white"> Logout</button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-10">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold text-white">
                        {activeTab === 'portfolio' ? 'Portfolio Management' : 'Quote Requests'}
                    </h2>
                    {activeTab === 'portfolio' && (
                        <button onClick={() => setIsAddModalOpen(true)} className="flex items-center px-4 py-2 bg-neon-purple hover:bg-neon-blue text-black font-bold rounded transition-all">
                             Add New Project
                        </button>
                    )}
                </div>

                {/* Content Table */}
                {activeTab === 'portfolio' ? (
                    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
                        {isLoading ? (
                            <p className="p-8 text-center">Loading portfolio...</p>
                        ) : error ? (
                            <p className="p-8 text-center text-red-500">{error}</p>
                        ) : (
                            <table className="min-w-full">
                                <thead className="bg-gray-700 text-sm text-gray-400 uppercase">
                                    <tr>
                                        <th className="p-4 text-left">Order</th>
                                        <th className="p-4 text-left">Title</th>
                                        <th className="p-4 text-left">Category</th>
                                        <th className="p-4 text-left">Visible</th>
                                        <th className="p-4 text-left">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-700">
                                    {portfolioItems.length > 0 ? portfolioItems.map(item => (
                                        <tr key={item.id}>
                                            <td className="p-4 font-bold text-white">{item.order}</td>
                                            <td className="p-4 text-white">{item.title}</td>
                                            <td className="p-4">{item.category}</td>
                                            <td className="p-4">
                                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                                                    item.visible ? 'bg-green-500 text-black' : 'bg-gray-500 text-white'
                                                }`}>
                                                    {item.visible ? 'Visible' : 'Hidden'}
                                                </span>
                                            </td>
                                            <td className="p-4 flex space-x-2">
                                                <button onClick={() => setEditingItem(item)} className="p-2 text-blue-400 hover:text-blue-300" title="Edit">
                                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zm-2.207 2.207L3 14.207V17h2.793l8.379-8.379-2.793-2.793z"/></svg>
                                                </button>
                                                <button onClick={() => handleMoveUp(item.id)} className="p-2 text-gray-400 hover:text-white" title="Move Up">
                                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                                                </button>
                                                <button onClick={() => handleMoveDown(item.id)} className="p-2 text-gray-400 hover:text-white" title="Move Down">
                                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-2.293 2.293L9 10.414l2.293 2.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 01-1.414-1.414L7.586 9H4a1 1 0 010-2h3.586l-2.293-2.293z" clipRule="evenodd"/></svg>
                                                </button>
                                                <button onClick={() => handleDelete(item.id)} className="p-2 text-red-500 hover:text-red-400" title="Delete">
                                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"/></svg>
                                                </button>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan={5} className="p-8 text-center text-gray-500">No portfolio items found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>
                ) : (
                    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
                        {isLoading ? (
                            <p className="p-8 text-center">Loading quotes...</p>
                        ) : error ? (
                            <p className="p-8 text-center text-red-500">{error}</p>
                        ) : (
                            <table className="min-w-full">
                                <thead className="bg-gray-700 text-sm text-gray-400 uppercase">
                                    <tr>
                                        <th className="p-4 text-left">Name</th>
                                        <th className="p-4 text-left">Contact</th>
                                        <th className="p-4 text-left">Project</th>
                                        <th className="p-4 text-left">Status</th>
                                        <th className="p-4 text-left">Date</th>
                                        <th className="p-4 text-left">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-700">
                                    {quotes.length > 0 ? quotes.map(quote => (
                                        <tr key={quote.id}>
                                            <td className="p-4 text-white font-semibold">{quote.name}</td>
                                            <td className="p-4 text-gray-300">{quote.emailWhatsApp}</td>
                                            <td className="p-4 text-gray-300 max-w-xs truncate" title={quote.projectDetails}>
                                                {quote.projectDetails.substring(0, 50)}...
                                            </td>
                                            <td className="p-4">
                                                <select
                                                    value={quote.status}
                                                    onChange={(e) => updateQuoteStatus(quote.id, e.target.value as 'pending' | 'contacted' | 'completed')}
                                                    className="bg-gray-700 text-white rounded px-2 py-1 text-sm"
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="contacted">Contacted</option>
                                                    <option value="completed">Completed</option>
                                                </select>
                                            </td>
                                            <td className="p-4 text-gray-400 text-sm">
                                                {new Date(quote.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="p-4">
                                                <button
                                                    onClick={() => window.open(`https://wa.me/${quote.emailWhatsApp.replace(/[^0-9]/g, '')}`, '_blank')}
                                                    className="p-2 text-green-400 hover:text-green-300 mr-2"
                                                    title="Contact via WhatsApp"
                                                >
                                                    📱
                                                </button>
                                                <button
                                                    onClick={() => window.open(`mailto:${quote.emailWhatsApp}`, '_blank')}
                                                    className="p-2 text-blue-400 hover:text-blue-300"
                                                    title="Send Email"
                                                >
                                                    ✉️
                                                </button>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan={6} className="p-8 text-center text-gray-500">No quote requests found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>
                )}
            </main>

            {isAddModalOpen && <AddPortfolioModal onClose={() => setIsAddModalOpen(false)} onAdd={handleAddItem} />}
            {editingItem && <EditPortfolioModal item={editingItem} onClose={() => setEditingItem(null)} onUpdate={handleUpdateItem} />}
        </div>
    );
};

export default function AdminPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Persist login state across page reloads
        if (sessionStorage.getItem('isLoggedIn') === 'true') {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
    };

    const handleLogout = () => {
        sessionStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
    };

    if (!isLoggedIn) {
        return <LoginPage onLoginSuccess={handleLoginSuccess} />;
    }

    return <AdminDashboard onLogout={handleLogout} />;
}

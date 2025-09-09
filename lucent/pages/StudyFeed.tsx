import React, { useState, useMemo, useCallback, memo } from 'react';
import { Link } from 'react-router-dom';
import type { StudyMaterial, ReactionType, Comment } from '../types';
import { mockStudyMaterials, mockUsers } from '../data/mockData';
import SearchInput from '../components/SearchInput';
import LikeIcon from '../components/icons/LikeIcon';
import CelebrateIcon from '../components/icons/CelebrateIcon';
import InsightfulIcon from '../components/icons/InsightfulIcon';

const TypeBadge: React.FC<{ type: StudyMaterial['type'] }> = memo(({ type }) => {
    const colorClasses = {
        PDF: 'bg-red-500/10 text-red-700 dark:bg-red-500/20 dark:text-red-400',
        Reel: 'bg-blue-500/10 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400',
        Article: 'bg-green-500/10 text-green-700 dark:bg-green-500/20 dark:text-green-400',
        Notes: 'bg-yellow-500/10 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400',
    };
    return (
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${colorClasses[type]}`}>
            {type}
        </span>
    );
});

const ReactionButton: React.FC<{
  onReaction: (type: ReactionType) => void;
  type: ReactionType;
  count: number;
  children: React.ReactNode;
}> = memo(({ onReaction, type, count, children }) => {
    const handleClick = useCallback(() => {
        onReaction(type);
    }, [onReaction, type]);
    
    return (
        <button onClick={handleClick} className="flex items-center space-x-1 text-text-secondary-light dark:text-text-secondary-dark hover:text-text-accent-light dark:hover:text-text-accent-dark transition-colors" aria-label={`React with ${type}`}>
            {children}
            <span className="text-sm font-medium">{count}</span>
        </button>
    );
});

const CommentSection: React.FC<{
  comments: Comment[];
  onAddComment: (text: string) => void;
}> = memo(({ comments, onAddComment }) => {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment.trim());
      setNewComment('');
    }
  };

  return (
    <div className="mt-4 pt-4 border-t border-border-light dark:border-border-dark">
      <form onSubmit={handleSubmit} className="flex space-x-2">
        <img src={mockUsers[0].avatar} alt="Your avatar" className="w-8 h-8 rounded-full"/>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          className="flex-grow px-3 py-2 text-sm bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button type="submit" className="px-4 py-2 text-sm font-semibold bg-primary text-white rounded-full hover:bg-primary-hover disabled:opacity-50" disabled={!newComment.trim()}>
          Post
        </button>
      </form>
      <div className="mt-4 space-y-3">
        {comments.map(comment => (
          <div key={comment.id} className="flex items-start space-x-2">
            <img src={comment.authorAvatar} alt={comment.authorName} className="w-8 h-8 rounded-full" />
            <div className="bg-background-light dark:bg-background-dark rounded-lg px-3 py-2 text-sm">
              <Link to={`/profile/${comment.authorId}`} className="font-semibold text-text-primary-light dark:text-text-primary-dark hover:underline">{comment.authorName}</Link>
              <p className="text-text-secondary-light dark:text-text-secondary-dark">{comment.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});


const StudyMaterialCard: React.FC<{
    material: StudyMaterial;
    onReaction: (id: number, type: ReactionType) => void;
    onComment: (id: number, text: string) => void;
}> = memo(({ material, onReaction, onComment }) => {
    const [showComments, setShowComments] = useState(false);

    const isReel = material.type === 'Reel';
    
    const handleReaction = useCallback((type: ReactionType) => {
      onReaction(material.id, type);
    }, [onReaction, material.id]);

    const handleComment = useCallback((text: string) => {
        onComment(material.id, text);
    }, [onComment, material.id]);

    const cardClasses = isReel
      ? "bg-surface-light dark:bg-surface-dark rounded-xl shadow-soft flex flex-col hover:shadow-soft-lg transition-shadow duration-300 aspect-[9/16] max-h-[70vh] justify-between p-4 bg-cover bg-center text-white"
      : "bg-surface-light dark:bg-surface-dark p-6 rounded-xl shadow-soft flex flex-col justify-between hover:shadow-soft-lg transition-shadow duration-300";
    
    const textShadow = isReel ? { textShadow: '0 2px 4px rgba(0,0,0,0.5)' } : {};

    return (
        <div 
          className={cardClasses}
          style={isReel ? { backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.8) 20%, transparent 60%), url(https://picsum.photos/seed/${material.id}/300/500)` } : {}}
        >
            <div className={isReel ? 'flex-grow' : ''}>
                <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-3">
                        <Link to={`/profile/${material.authorId}`}>
                            <img src={material.authorAvatar} alt={material.authorName} className="w-10 h-10 rounded-full" />
                        </Link>
                        <div>
                            <Link to={`/profile/${material.authorId}`} className={`font-bold ${isReel ? 'text-white' : 'text-text-primary-light dark:text-text-primary-dark'} hover:underline`} style={textShadow}>{material.authorName}</Link>
                            <p className={`text-xs ${isReel ? 'text-gray-200' : 'text-text-secondary-light dark:text-text-secondary-dark'}`} style={textShadow}>{material.date}</p>
                        </div>
                    </div>
                    <TypeBadge type={material.type} />
                </div>
                <div className={isReel ? 'mt-4' : 'mt-4'}>
                    <h4 className={`font-bold ${isReel ? 'text-lg text-white' : 'text-lg text-text-accent-light dark:text-text-accent-dark'}`} style={textShadow}>{material.title}</h4>
                    <p className={`mt-2 text-sm ${isReel ? 'text-gray-200' : 'text-text-secondary-light dark:text-text-secondary-dark'}`} style={textShadow}>{material.description}</p>
                </div>
            </div>
            
            <div className={`mt-4 ${isReel ? '' : 'pt-4 border-t border-border-light dark:border-border-dark'}`}>
                {!isReel && (
                    <div className="flex flex-wrap gap-2 mb-4">
                        {material.tags.map(tag => (
                            <span key={tag} className="px-2 py-1 text-xs bg-background-light dark:bg-background-dark text-text-secondary-light dark:text-text-secondary-dark rounded-full">{tag}</span>
                        ))}
                    </div>
                )}
                
                <div className="flex justify-between items-center">
                    <div className="flex space-x-4">
                        <ReactionButton onReaction={handleReaction} type="like" count={material.reactions.like}><LikeIcon className="w-5 h-5" /></ReactionButton>
                        <ReactionButton onReaction={handleReaction} type="celebrate" count={material.reactions.celebrate}><CelebrateIcon className="w-5 h-5" /></ReactionButton>
                        <ReactionButton onReaction={handleReaction} type="insightful" count={material.reactions.insightful}><InsightfulIcon className="w-5 h-5" /></ReactionButton>
                    </div>
                     <button onClick={() => setShowComments(!showComments)} className={`text-sm font-medium ${isReel ? 'text-gray-200 hover:text-white' : 'text-text-secondary-light dark:text-text-secondary-dark hover:text-text-accent-light dark:hover:text-text-accent-dark'}`}>
                        {material.comments.length} Comments
                    </button>
                </div>

                {showComments && <CommentSection comments={material.comments} onAddComment={handleComment} />}
            </div>
        </div>
    );
});


const StudyFeed: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [materials, setMaterials] = useState<StudyMaterial[]>(mockStudyMaterials);

    // FIX: Correctly spread the reactions object instead of the whole material object.
    const handleReaction = useCallback((id: number, type: ReactionType) => {
        setMaterials(prev => prev.map(m => m.id === id ? { ...m, reactions: { ...m.reactions, [type]: m.reactions[type] + 1 } } : m));
    }, []);

    const handleAddComment = useCallback((id: number, text: string) => {
        const newComment: Comment = {
            id: Date.now(),
            authorId: mockUsers[0].id,
            authorName: mockUsers[0].name,
            authorAvatar: mockUsers[0].avatar,
            content: text,
            date: 'Just now'
        };
        setMaterials(prev => prev.map(m => m.id === id ? { ...m, comments: [...m.comments, newComment] } : m));
    }, []);

    const filteredMaterials = useMemo(() => {
        const lowercasedTerm = searchTerm.toLowerCase();
        if (!lowercasedTerm) return materials;

        return materials.filter(material =>
            material.title.toLowerCase().includes(lowercasedTerm) ||
            material.description.toLowerCase().includes(lowercasedTerm) ||
            material.authorName.toLowerCase().includes(lowercasedTerm) ||
            material.tags.some(tag => tag.toLowerCase().includes(lowercasedTerm))
        );
    }, [searchTerm, materials]);

    return (
        <div>
            <h3 className="text-3xl font-medium text-text-primary-light dark:text-text-primary-dark">Study Feed</h3>
            <p className="mt-2 text-text-secondary-light dark:text-text-secondary-dark">Discover and share study materials with your peers.</p>

            <div className="mt-8">
                <SearchInput
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search for notes, videos, articles by keyword, author, or tag..."
                    ariaLabel="Search study materials"
                />
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMaterials.length > 0 ? (
                    filteredMaterials.map(material => (
                        <StudyMaterialCard 
                            key={material.id} 
                            material={material} 
                            onReaction={handleReaction}
                            onComment={handleAddComment}
                        />
                    ))
                ) : (
                    <div className="col-span-full text-center py-12">
                      <h4 className="text-xl font-semibold text-text-primary-light dark:text-text-primary-dark">No materials found</h4>
                      <p className="mt-2 text-text-secondary-light dark:text-text-secondary-dark">Try adjusting your search terms.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudyFeed;
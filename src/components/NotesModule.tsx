import { useState } from "react";
import { Plus, Trash2, Edit2, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

interface Note {
  id: string;
  title: string;
  content: string;
  color: string;
  createdAt: Date;
}

const noteColors = [
  'bg-amber-50 border-amber-200',
  'bg-blue-50 border-blue-200',
  'bg-rose-50 border-rose-200',
  'bg-emerald-50 border-emerald-200',
  'bg-purple-50 border-purple-200',
];

export default function NotesModule() {
  const [notes, setNotes] = useState<Note[]>([
    { id: '1', title: 'Shopping List', content: 'Milk, Bread, Eggs, Vegetables', color: noteColors[0], createdAt: new Date() },
    { id: '2', title: 'Meeting Notes', content: 'Discuss project timeline with team', color: noteColors[1], createdAt: new Date() },
  ]);
  const [isCreating, setIsCreating] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const createNote = () => {
    if (newTitle.trim() || newContent.trim()) {
      const note: Note = {
        id: Date.now().toString(),
        title: newTitle || 'Untitled',
        content: newContent,
        color: noteColors[Math.floor(Math.random() * noteColors.length)],
        createdAt: new Date(),
      };
      setNotes([note, ...notes]);
      setNewTitle('');
      setNewContent('');
      setIsCreating(false);
    }
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-700">My Notes</h2>
        <Button
          onClick={() => setIsCreating(true)}
          className="bg-emerald-600 hover:bg-emerald-700"
        >
          <Plus className="w-4 h-4 mr-1" /> New
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <Input
          placeholder="Search notes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {isCreating && (
        <div className="bg-white rounded-xl p-4 shadow-md border border-slate-200 space-y-3">
          <Input
            placeholder="Note title..."
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <Textarea
            placeholder="Write your note..."
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            rows={4}
          />
          <div className="flex gap-2">
            <Button onClick={createNote} className="bg-emerald-600 hover:bg-emerald-700">
              Save Note
            </Button>
            <Button variant="outline" onClick={() => setIsCreating(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      <div className="grid gap-3">
        {filteredNotes.map((note) => (
          <div
            key={note.id}
            className={`${note.color} rounded-xl p-4 border shadow-sm`}
          >
            <div className="flex items-start justify-between">
              <h3 className="font-semibold text-slate-700">{note.title}</h3>
              <button
                onClick={() => deleteNote(note.id)}
                className="text-slate-400 hover:text-rose-500 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <p className="text-slate-600 text-sm mt-2">{note.content}</p>
            <p className="text-xs text-slate-400 mt-3">
              {note.createdAt.toLocaleDateString('hi-IN')}
            </p>
          </div>
        ))}

        {filteredNotes.length === 0 && (
          <div className="text-center py-12 text-slate-400">
            <p>No notes found</p>
            <p className="text-sm mt-1">Create your first note!</p>
          </div>
        )}
      </div>
    </div>
  );
}
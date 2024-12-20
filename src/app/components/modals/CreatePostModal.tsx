import React, { useState } from 'react'

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreatePostModal = ({ isOpen, onClose }: CreatePostModalProps) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [difficultyLevel, setDifficultyLevel] = useState<number>(0);

  const availableTags = [
    "Programozás",
    "Web fejlesztés",
    "Design",
    "Marketing",
    "Üzlet"
  ];

  const courseTypes = [
    "Videó kurzus",
    "Szöveges anyag",
    "Gyakorlati workshop",
    "Interaktív tananyag"
  ];

  const handleTagSelect = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleTypeSelect = (type: string) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter(t => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  const getDifficultyText = (level: number) => {
    switch(level) {
      case 0: return "Kezdő szint - Még csak ismerkedsz a témával";
      case 1: return "Alapszint - Az alapokat már ismered";
      case 2: return "Középhaladó - Már van némi tapasztalatod";
      case 3: return "Haladó - Magabiztosan mozogsz a témában";
      case 4: return "Szakértő - Mélyebb ismeretekre vágysz";
      case 5: return "Mester szint - A legkomolyabb kihívásokra is készen állsz";
      default: return "Válassz szintet";
    }
  };


  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={(e) => e.stopPropagation()}
    >
      <div 
        className="bg-white p-6 rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Új kurzus létrehozása</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Bal oldal - Borítókép feltöltés */}
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center h-[300px] flex flex-col items-center justify-center cover-upload">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="coverImage"
                />
                <label htmlFor="coverImage" className="cursor-pointer">
                  <div className="text-gray-500">
                    <svg className="mx-auto h-12 w-12 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span>Borítókép feltöltése</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Jobb oldal - Form elemek */}
            <div className="space-y-4">
              <div className="course-title">
                <label className="block text-sm font-medium text-gray-700">Kurzus címe</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-0 focus:ring-0 focus:outline-none"
                  placeholder="Add meg a kurzus címét"
                />
              </div>

              <div className="course-tags">
                <label className="block text-sm font-medium text-gray-700">Címkék</label>
                <div className="mt-1 flex flex-wrap gap-2">
                  {selectedTags.map(tag => (
                    <span 
                      key={tag} 
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleTagSelect(tag)}
                        className="ml-1 inline-flex text-blue-400 hover:text-blue-600"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
                <select 
                  className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-0 focus:ring-0 focus:outline-none"
                  onChange={(e) => handleTagSelect(e.target.value)}
                  value=""
                >
                  <option value="" disabled>Válassz címkéket...</option>
                  {availableTags
                    .filter(tag => !selectedTags.includes(tag))
                    .map(tag => (
                      <option key={tag} value={tag}>
                        {tag}
                      </option>
                    ))}
                </select>
              </div>

              <div className="course-type">
                <label className="block text-sm font-medium text-gray-700">Kurzus típusa</label>
                <div className="mt-1 flex flex-wrap gap-2">
                  {selectedTypes.map(type => (
                    <span 
                      key={type} 
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
                    >
                      {type}
                      <button
                        type="button"
                        onClick={() => handleTypeSelect(type)}
                        className="ml-1 inline-flex text-purple-400 hover:text-purple-600"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
                <select 
                  className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-0 focus:ring-0 focus:outline-none"
                  onChange={(e) => handleTypeSelect(e.target.value)}
                  value=""
                >
                  <option value="" disabled>Válassz kurzus típust...</option>
                  {courseTypes
                    .filter(type => !selectedTypes.includes(type))
                    .map(type => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                </select>
              </div>

              <div className="difficulty-level">
                <label className="block text-sm font-medium text-gray-700">
                  Nehézségi szint ({difficultyLevel})
                </label>
                <input
                  type="range"
                  min="0"
                  max="5"
                  step="1"
                  value={difficultyLevel}
                  onChange={(e) => setDifficultyLevel(Number(e.target.value))}
                  className="mt-1 block w-full appearance-none h-2.5 bg-gray-200 rounded-lg cursor-pointer range-slider"
                />
                <p className="mt-1 text-sm text-gray-500">
                  {getDifficultyText(difficultyLevel)}
                </p>
              </div>
            </div>
          </div>

          {/* Teljes szélességű elemek */}
          <div className="space-y-4">
            <div className="course-description">
              <label className="block text-sm font-medium text-gray-700">Kurzus leírása</label>
              <textarea
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-0 focus:ring-0 focus:outline-none p-2"
                placeholder="Add meg a kurzus részletes leírását..."
              />
            </div>

            <div className="file-upload">
              <label className="block text-sm font-medium text-gray-700">Csatolt anyagok</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                <div className="space-y-1 text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-[#8498FF] hover:text-blue-500 focus-within:outline-none">
                      <span>Fájlok feltöltése</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple />
                    </label>
                    <p className="pl-1">vagy húzd ide</p>
                  </div>
                  <p className="text-xs text-gray-500">PDF, DOC, PPT max. 10MB</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Mégse
            </button>
            <button
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#8498FF] hover:bg-[#667ffc]"
            >
              Mentés
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePostModal; 
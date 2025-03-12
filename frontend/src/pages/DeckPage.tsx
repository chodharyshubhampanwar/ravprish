import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDecks } from "../hooks/useDeck";
import LoadingSpinner from "../components/LoadingSpinner";
import { TbCardsFilled } from "react-icons/tb";
import FilterDropdown from "../components/FilterDropdown";
import { Filter, X } from "lucide-react";

const DeckList = () => {
  const navigate = useNavigate();
  const { data: decks, isLoading, error } = useDecks();

  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedGrade, setSelectedGrade] = useState("all");
  const [selectedBoard, setSelectedBoard] = useState("all");

  // Mobile filter modal state
  const [showFilterModal, setShowFilterModal] = useState(false);

  // Derive filter options from API decks
  const subjectOptions = useMemo(() => {
    if (!decks) return [];
    const set = new Set(
      decks.map((deck) => deck.subject).filter((s): s is string => Boolean(s))
    );
    return Array.from(set);
  }, [decks]);

  const gradeOptions = useMemo(() => {
    if (!decks) return [];
    const set = new Set(
      decks.map((deck) => deck.grade).filter((g): g is string => Boolean(g))
    );
    return Array.from(set);
  }, [decks]);

  const boardOptions = useMemo(() => {
    if (!decks) return [];
    const set = new Set(
      decks.map((deck) => deck.board).filter((b): b is string => Boolean(b))
    );
    return Array.from(set);
  }, [decks]);

  const filteredDecks = useMemo(() => {
    if (!decks) return [];
    return decks.filter((deck) => {
      const matchesSubject =
        selectedSubject === "all" || deck.subject === selectedSubject;
      const matchesGrade =
        selectedGrade === "all" || deck.grade === selectedGrade;
      const matchesBoard =
        selectedBoard === "all" || deck.board === selectedBoard;
      return matchesSubject && matchesGrade && matchesBoard;
    });
  }, [decks, selectedSubject, selectedGrade, selectedBoard]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="text-red-500 text-center">
          Error loading decks:{" "}
          {error instanceof Error ? error.message : "Unknown error"}
        </div>
      </div>
    );
  }

  // Reusable filter content
  const FilterContent = () => (
    <div className="w-full flex flex-col md:flex-row items-center gap-3">
      <FilterDropdown
        label="Subject"
        value={selectedSubject}
        options={subjectOptions.map((s) => ({ label: s, value: s }))}
        onChange={setSelectedSubject}
      />
      <FilterDropdown
        label="Grade"
        value={selectedGrade}
        options={gradeOptions.map((g) => ({ label: g, value: g }))}
        onChange={setSelectedGrade}
      />
      <FilterDropdown
        label="Board"
        value={selectedBoard}
        options={boardOptions.map((b) => ({ label: b, value: b }))}
        onChange={setSelectedBoard}
      />
      {(selectedSubject !== "all" ||
        selectedGrade !== "all" ||
        selectedBoard !== "all") && (
        <button
          onClick={() => {
            setSelectedSubject("all");
            setSelectedGrade("all");
            setSelectedBoard("all");
          }}
          className="flex items-center gap-2 px-4 py-2 text-sm bg-white hover:bg-gray-200 rounded-lg border border-gray-300 transition-colors"
        >
          <span>Clear All</span>
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Flashcard Decks
          </h1>
          <p className="text-gray-600">
            Browse and study from our collection of flashcard decks.
          </p>
        </div>

        {/* Desktop Filters */}
        <div className="hidden md:block mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-6 w-6 text-gray-600" />
            <h2 className="text-xl font-semibold text-gray-800">Filters</h2>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <FilterContent />
          </div>
        </div>

        {/* Mobile Filter Button */}
        <div className="md:hidden mb-6">
          <button
            onClick={() => setShowFilterModal(true)}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200 shadow-sm text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <Filter className="h-5 w-5" />
            <span>Filters</span>
          </button>
        </div>

        {/* Mobile Filter Modal */}
        {showFilterModal && (
          <div className="fixed inset-0 z-50">
            <div
              className="absolute inset-0 bg-black bg-opacity-50"
              onClick={() => setShowFilterModal(false)}
            />
            <div className="absolute top-0 left-0 w-full h-full bg-white transition-transform">
              <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    Filter Options
                  </h2>
                  <button
                    onClick={() => setShowFilterModal(false)}
                    className="text-xl font-bold text-gray-600"
                  >
                    &times;
                  </button>
                </div>
                <FilterContent />
                <div className="mt-6">
                  <button
                    onClick={() => setShowFilterModal(false)}
                    className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Deck Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredDecks.map((deck) => (
            <div
              key={deck.id}
              onClick={() => navigate(`/deck/${deck.id}`)}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer p-5 border border-gray-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 mb-1">
                    {deck.title}
                  </h2>
                  <p className="text-sm text-gray-600">{deck.description}</p>
                </div>
                <TbCardsFilled className="text-blue-600" size={20} />
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {deck.subject && (
                  <span className="inline-block px-2 py-1 bg-blue-100 text-blue-600 text-xs font-semibold rounded-full">
                    {deck.subject}
                  </span>
                )}
                {deck.grade && (
                  <span className="inline-block px-2 py-1 bg-green-100 text-green-600 text-xs font-semibold rounded-full">
                    {deck.grade}
                  </span>
                )}
                {deck.board && (
                  <span className="inline-block px-2 py-1 bg-purple-100 text-purple-600 text-xs font-semibold rounded-full">
                    {deck.board}
                  </span>
                )}
              </div>

              {/* Deck Meta */}
              <div className="flex justify-between items-center text-xs text-gray-500">
                <span>{deck.cards.length} cards</span>
                <span>
                  Updated {new Date(deck.updatedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredDecks.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            <h3 className="text-lg">No decks found matching your criteria</h3>
            <p className="mt-1">Try adjusting your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeckList;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGoals } from "../hooks/userGoals";
import { useUserGoals } from "../hooks/useUserGoals";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, Edit2, Trash2 } from "lucide-react";
import { Goal } from "../types/course";
import { useAuthStore } from "@/store/AuthStore";
import LoadingSpinner from "@/components/LoadingSpinner";

const GoalsList = () => {
  const navigate = useNavigate();
  const { goals, isLoading: goalsLoading } = useGoals();
  const currentUser = useAuthStore((state) => state.user?.id);
  const userId = currentUser || "";

  const {
    userGoals,
    userGoalsLoading,
    assignGoalMutation,
    removeGoalMutation,
    userGoalsError,
    userGoalsIsError,
  } = useUserGoals(userId || "");

  const [selectedGrade, setSelectedGrade] = useState("");
  const [selectedBoard, setSelectedBoard] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [goalToDelete, setGoalToDelete] = useState<null | {
    id: string;
    goal: Goal;
  }>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  if (!userId) {
    return <LoadingSpinner />;
  }

  if (userGoalsIsError) {
    return <div>Error loading user goals: {userGoalsError?.message}</div>;
  }

  if (goalsLoading || userGoalsLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading goals...</div>
      </div>
    );
  }

  const uniqueGrades = [...new Set(goals?.map((goal) => goal.grade) || [])];
  const uniqueBoards = [...new Set(goals?.map((goal) => goal.board) || [])];

  const handleSaveGoal = () => {
    const selectedGoal = goals?.find(
      (goal) => goal.grade === selectedGrade && goal.board === selectedBoard
    );
    if (selectedGoal) {
      const alreadyAssigned = userGoals?.some(
        (ug) => ug.goal.id === selectedGoal.id
      );
      if (!alreadyAssigned) {
        assignGoalMutation.mutate({
          supabaseUserId: userId, // use supabaseUserId
          goalId: selectedGoal.id,
        });
      }
    }
    setSelectedGrade("");
    setSelectedBoard("");
    setIsEditModalOpen(false);
  };

  const handleDeleteGoal = (userGoal: { id: string; goal: Goal }) => {
    setGoalToDelete(userGoal);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (goalToDelete) {
      removeGoalMutation.mutate(goalToDelete.id);
      setShowDeleteConfirm(false);
      setGoalToDelete(null);
    }
  };

  const navigateToCourses = (goal: Goal) => {
    navigate(`/courses/${goal.id}`);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Learning Goals</h2>
        {/* Edit Goals Dialog */}
        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Edit2 className="w-4 h-4" />
              Edit Goals
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Select Your Goal</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Grade</label>
                <Select value={selectedGrade} onValueChange={setSelectedGrade}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select grade" />
                  </SelectTrigger>
                  <SelectContent>
                    {uniqueGrades.map((grade) => (
                      <SelectItem key={`grade-${grade}`} value={grade}>
                        Grade {grade}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Board</label>
                <Select value={selectedBoard} onValueChange={setSelectedBoard}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select board" />
                  </SelectTrigger>
                  <SelectContent>
                    {uniqueBoards.map((board) => (
                      <SelectItem key={`board-${board}`} value={board}>
                        {board}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button
                onClick={handleSaveGoal}
                disabled={!selectedGrade || !selectedBoard}
              >
                Save Goal
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Render user-assigned goals */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {userGoals?.map((userGoal) => {
          const goal = userGoal.goal;
          return (
            <Card
              key={userGoal.id}
              className="hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <CardTitle className="flex justify-between items-start">
                  <span className="text-lg font-semibold">{goal.name}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteGoal(userGoal)}
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </CardTitle>
                <CardDescription>
                  Grade {goal.grade} | {goal.board}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{goal.description}</p>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  onClick={() => navigateToCourses(goal)}
                >
                  View Courses
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {/* Delete confirmation dialog */}
      <Dialog open={showDeleteConfirm} onOpenChange={setShowDeleteConfirm}>
        <DialogContent>
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <DialogTitle>Confirm Deletion</DialogTitle>
          </div>
          <p className="py-4">
            Are you sure you want to remove this goal? This action cannot be
            undone.
          </p>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setShowDeleteConfirm(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete Goal
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GoalsList;

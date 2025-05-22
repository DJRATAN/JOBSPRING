import { Button } from '@/components/ui/button';
import { RotateCcw, SkipForward } from 'lucide-react';
import { useState } from 'react';

const InterviewQuestions = ({ questions }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const currentQuestion = questions[currentIndex];

  return (
    <div className="max-w-xl mx-auto mt-6 p-4 bg-white rounded shadow">
      <div className="mb-4">
        <p className="text-lg font-semibold">
          Q{currentIndex + 1}: {currentQuestion.question}
        </p>
      </div>
      <div className='flex justify-between pt-10'>
        <p className="text-sm text-blue-800 mt-1">{currentQuestion.type}</p>

        {currentIndex < questions.length - 1 ? (
          <div className='flex flex-row gap-2'>
            <Button
              onClick={handleNext}
              className=" "
            >
              <RotateCcw className='h-4 w-4' /> Skip
            </Button>          <Button
              onClick={handleNext}
              className=" "
            >
              <SkipForward className='h-4 w-4' /> Next
            </Button>
          </div>
        ) : (
          <p className="text-green-600 font-semibold">End of questions!</p>
        )}
      </div>
    </div>
  );
};
export default InterviewQuestions;
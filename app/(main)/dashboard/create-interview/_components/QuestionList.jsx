import axios from 'axios'
import { ArrowRight, Loader, Loader2Icon } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import QuestionListContainer from './QuestionListContainer';
import { Button } from '@/components/ui/button';
import { useUser } from '@/app/provider';
import { v4 as uuidv4 } from 'uuid'
import { supabase } from '@/services/superbaseClient';
const QuestionList = ({ formData, onCreateLink }) => {
  const [loading, setLoading] = useState(true);
  const [questionList, setQuestionList] = useState();
  const { user } = useUser();
  const [saveLoading, setSaveLoading] = useState(false);

  useEffect(() => {
    if (formData) {
      console.log(formData)
      GenerateQuestionList();
    }
  }, [formData])
  const GenerateQuestionList = async () => {
    console.log("111", formData)
    setLoading(true);
    console.log("222", formData)
    try {
      const result = await axios.post("/api/ai-model", {
        ...formData,
      });
      console.log("333", formData)
      const Content = result.data.content;
      console.log("444", formData)
      const match = Content.match(
        /```json[\s\S]*?interviewQuestions\s*=\s*(\[[\s\S]*?\])[\s\S]*?```/
      );
      console.log("555", match)

      if (match && match[1]) {
        console.log("666", match[1])
        try {
          console.log("777", formData)
          const parsed = JSON.parse(match[1]); // Chuyển đổi chuỗi JSON thành object
          console.log("888", parsed)
          setQuestionList(parsed);
        } catch (e) {
          console.error("Lỗi parse JSON:", e);
        }
      }
      console.log("999", formData)
      setLoading(false);
    } catch (error) {
      console.log("000", formData)
      toast("Server Error, Try again!");
      setLoading(false);
    }
  };
  const onFinish = async () => {
    setSaveLoading(true)
    const interview_id = uuidv4();
    console.log("ljlksdjflsdj", interview_id)
    console.log("ddd", formData)
    const { data, error } = await supabase
      .from('Interview')
      .insert([
        {
          ...formData,
          questionList: questionList,
          userEmail: user?.email,
          interview_id: interview_id,
        },
      ])
      .select()
    setSaveLoading(false)
    onCreateLink(interview_id);
  }
  // const onFinish = async () => {
  //   setSaveLoading(true);

  //   const interview_id = uuidv4();
  //   console.log("Generated Interview ID:", interview_id);
  //   console.log("Form Data:", formData);
  //   console.log("Question List:", questionList);

  //   // Build payload explicitly
  //   const payload = {
  //     jobTitle: formData.jobPosition,
  //     jobDescription: formData.jobDescription,
  //     companyName: formData.companyName || '',
  //     department: formData.department || '',
  //     reqExperience: formData.reqExperience || 'Fresher',
  //     location: formData.location || '',
  //     salaryRange: formData.salaryRange || 'Not specified',
  //     applicationDeadline: formData.applicationDeadline || 'Not specified',
  //     noOfQuestions: formData.numberOfQuestions || 5,
  //     timeDuration: formData.timeDuration || 30,
  //     questionList: questionList || [],
  //     userEmail: user?.email || '',
  //     interview_id,
  //   };

  //   const { data, error } = await supabase
  //     .from('Interview')
  //     .insert([payload]);

  //   setSaveLoading(false);

  //   if (error) {
  //     console.error("Supabase Insert Error:", error.message, error.details);
  //     return;
  //   }

  //   console.log("Inserted Data:", data);
  //   onCreateLink(interview_id);
  // };

  return (
    <div>
      {loading &&
        <div className='p-5 bg-blue-50 rounded-xl border border-gray-100 flex gap-5 items-center'>
          <Loader2Icon className='animate-spin' />
          <div>
            <h2 className='text-primary font-medium'>Generating Interview Quetions</h2>
            <p className='text-primary'>Our AI is crafting personalized questions based on your job position</p>
          </div>
        </div>
      }
      {Array.isArray(questionList) && questionList?.length > 0 &&
        <div className='p-5 mt-6 border border-gray-300 rounded-xl bg-white shadow-sm'>
          <QuestionListContainer questionList={questionList} />
        </div>
      }
      {
        !loading && Array.isArray(questionList) && questionList.length > 0 && (
          <div className='flex justify-end mt-10 items-center' >
            <Button onClick={() => onFinish()} disabled={saveLoading}>
              {saveLoading && <Loader className='animate-spin' />}
              Create Interview Link & Finish <ArrowRight className='w-2 h-2 ml-1' /></Button>
          </div>
        )
      }
    </div>
  )
}

export default QuestionList
